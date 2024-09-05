import baseAxios, { AxiosError } from "axios";
import { parseAxiosError } from "@/lib/parseAxiosError";

const createAxiosInstance = () => {
  const instance = baseAxios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  // set the content type to json
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.patch["Content-Type"] = "application/json";
  instance.defaults.headers.get["Content-Type"] = "application/json";

  // include the token in the header
  instance.interceptors.request.use(async (request) => {
    const authToken = localStorage.getItem("token");
    if (authToken && request.headers && !request.headers.Authorization) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }
    return request;
  });

  // handle token expired and get new token with refresh token
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        !localStorage.getItem("refreshToken") &&
        !localStorage.getItem("token")
      ) {
        window.location.href = "/login";
      }
      if (
        error.response.status === 401 &&
        error.response.data.code === "token_not_valid" &&
        !originalRequest._retry &&
        localStorage.getItem("refreshToken") &&
        localStorage.getItem("token") &&
        !error.response.request.responseURL.includes("refresh")
      ) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await instance.post("/auth/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("token", data.access);
        return instance(originalRequest);
      } else if (
        error.response.status === 401 &&
        error.response.data.code === "token_not_valid" &&
        error.response.request.responseURL.includes("refresh")
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );

  // use parseAxiosError to show error message
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any, any>) => {
      if (error?.response?.status === 401 || !error?.response?.status) {
        console.error(error);
        return;
      }
      parseAxiosError(error);
    },
  );

  return instance;
};

const axios = createAxiosInstance();

export default axios;
