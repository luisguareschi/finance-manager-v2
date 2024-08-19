import { useEffect, useState } from "react";

type platformTypes = "windows" | "android" | "ios" | "unknown";

const usePlatform = () => {
  const [platform, setPlatform] = useState<platformTypes>("unknown");

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (/windows/i.test(userAgent)) {
      setPlatform("windows");
    } else if (/android/i.test(userAgent)) {
      setPlatform("android");
    } else if (/ipad|iphone|ipod/i.test(userAgent)) {
      setPlatform("ios");
    } else {
      setPlatform("unknown");
    }
  }, []);

  return platform;
};

export default usePlatform;
