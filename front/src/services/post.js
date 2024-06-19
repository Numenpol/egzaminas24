import axios from "axios";
const API_URLS = import.meta.env.VITE_API_URLS;
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data) => {
    let response = await axios.post (`${API_URLS}/signup`, data);
    return response.data;
}

export const loginUser = async (data) => {
    let response = await axios.post (`${API_URLS}/login`, data);
    const { token, data: { name, role, email, _id} } = response.data;
    const userInfo = { token, name, role, email, _id };
    localStorage.setItem("user", JSON.stringify(userInfo));
    return userInfo;
}

export const createService = async (data) => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    let  response = await axios.post(API_URL, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}