import axios from "axios";

const baseURL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: baseURL,
    // withCredentials: true
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;