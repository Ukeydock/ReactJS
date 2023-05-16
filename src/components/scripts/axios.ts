import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("appToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
