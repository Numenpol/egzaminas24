import "../styles/service.css"
import { useContext } from 'react';
import { StateContext } from "../utils/StateContext";
import { UpdateService } from "../services/update";
import { unRegisterFromService } from "../services/delete";

function RegisteredService({service}) {

    const { serviceName, category, date, price, rating, _id } = service;

    const { setUpdate } = useContext(StateContext);

    const starHandler = async (id, data) => {
        document.getElementById("starButton").disabled = 'disabled';
        await UpdateService(id, {...data, rating: rating+1});
        setUpdate((update) => update + 1);
    }

    const unregisterServiceHandler = async (id) => {
        document.getElementById("registerForServiceButton").disabled = 'disabled';  
        await unRegisterFromService(id);
        setUpdate((update) => update + 1);
    }

    return(
        <>
        <div className="serviceCard">
        <h3>{serviceName} - Category: {category}</h3>            
        <div className="serviceCardBottom">
        <p>{date}  </p>
        <p>{price}€</p>
        <p>★{rating}</p>
        <div>
        <button className="starButton" id="starButton" onClick={() => starHandler(_id)}>★</button>
        <button className="registerForServiceButton" id="registerForServiceButton" onClick={() => unregisterServiceHandler(_id)}>Unregister</button>   
        </div>
        </div>    
        </div>
        </>
    )
}

export default RegisteredService;