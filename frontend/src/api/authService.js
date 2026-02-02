import api from './axiosConfig';

export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data)); // Save user info
        localStorage.setItem('token', 'mock-token-' + Date.now()); // Mock token
    }
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
