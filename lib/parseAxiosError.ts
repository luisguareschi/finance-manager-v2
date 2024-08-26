import toast from "react-hot-toast";

export const parseAxiosError = (error: any) => {
  let title = "Error";
  let message = "An error occurred";

  if (error.message) {
    message = error.message;
  }

  if (error?.response && error.response?.data) {
    if (typeof error.response.data === "object") {
      title = Object.keys(error.response.data)[0];
      message = error.response.data[title];
    }
  }

  // Remove _ from title and capitalize first letter
  title = title.replace(/_/g, " ");
  title = title.charAt(0).toUpperCase() + title.slice(1);

  toast.error(`${title}: ${message}`);
};
