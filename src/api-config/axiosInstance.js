import axios from 'axios';
import { serverUrl } from "../api-config/config.js";

const axiosInstance = axios.create({
    baseURL: serverUrl,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers.platform = 'web';

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default axiosInstance;