import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getAllServices = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const getAllRegisteredServices = async (id) => {
    const response = await axios.get(`${API_URL}/registeredservices/${id}`);
    return response.data;
}

export const getOneService = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}