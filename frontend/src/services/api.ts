import axios from "axios";

// localhost
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
// export const baseURL = 'http://192.168.1.2:8000/api/'; // for shared api local


const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
);

export default api;