import axios from "axios";

// const baseURL = 'http://localhost:8000/api/'; // for localhost
export const baseURL = 'http://192.168.1.2:8000/api/'; // for shared api local


const api = axios.create({
    baseURL: baseURL,
    // withCredentials: true
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;