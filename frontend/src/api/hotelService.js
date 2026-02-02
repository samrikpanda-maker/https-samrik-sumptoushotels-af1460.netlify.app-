import api from './axiosConfig';

export const searchHotels = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/hotels?${params}`);
    return response.data;
};

export const getHotelDetails = async (id) => {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
};
