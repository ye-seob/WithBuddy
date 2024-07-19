import axios from "axios";
import { refreshToken } from "./token";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    console.log(accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        const accessToken = getCookie("accessToken");
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;
        return instance(originalRequest);
      } catch (error) {
        console.error("토큰 재발급 실패", error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

export default instance;
