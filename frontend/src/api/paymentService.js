import api from './axiosConfig';

export const processPayment = async (paymentData) => {
    const response = await api.post('/payments', paymentData);
    return response.data;
};

export const validatePromoCode = async (code, bookingAmount) => {
    const response = await api.post('/offers/validate', { code, bookingAmount });
    return response.data;
};
