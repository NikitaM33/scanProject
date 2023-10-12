import axios from "axios";

import { API_URL } from "../../constants";

// INSTANCE
const instance = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

// INTERCEPTOR
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default instance;
