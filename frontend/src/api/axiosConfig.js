import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the Token if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // usage of simple token storage
        if (token) {
            // Note: In our simple backend we didn't implement robust JWT verification middleware
            // But this is good practice for the frontend
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
