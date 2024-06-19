import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const deleteData = async (id) => {
  let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  }

  export const unRegisterFromService = async (id) => {
    let token = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios.delete(`${API_URL}/serviceregister/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
