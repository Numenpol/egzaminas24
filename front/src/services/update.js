import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const UpdateService = async (id, data) => {
  let token = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.patch(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}

export const RegisterForService = async (id, data) => {
  let token = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.patch(`${API_URL}/serviceregister/${id}`, data,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}