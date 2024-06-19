import { createContext, useState, useEffect } from 'react';
import { getAllServices, getAllRegisteredServices } from '../services/get';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [update, setUpdate] = useState(0);
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");
    const [registeredServices, setRegisteredServices] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchServices = async () => {
        try {
          const { data: {services}} = await getAllServices();
          setServices(services);
        } catch (error) {
          setError(error.message);
        }
      };

      const fetchRegisteredServices = async (id) => {
        try {
          const { data: {services}} = await getAllRegisteredServices(id);       
          setRegisteredServices(services);
        } catch (error) {
          setError(error.message);
        }
      }

    useEffect(() => {
      if(user){
      fetchServices();
      fetchRegisteredServices(user._id);
      } else
      fetchServices();
    }, [update]);

    return (
        <StateContext.Provider value={{setUpdate, update, user, services, registeredServices}}>
            {children}
            </StateContext.Provider>
    );
};