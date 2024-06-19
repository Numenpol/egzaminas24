import "../styles/service.css"
import { useState, useEffect, useContext } from 'react';
import { StateContext } from "../utils/StateContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DeletePopup from "./DeletePopup";
import EditPopup from "./EditPopup";
import { UpdateService, RegisterForService } from "../services/update";

function Service({service}) {
    const [userRole, setUserRole] = useState("");
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [serviceId, setServiceId] = useState("");

    const { serviceName, category, date, price, rating, _id } = service;

    const { user, update, setUpdate } = useContext(StateContext);

    useEffect(() => {
        if (!user) {

        } else {
            const { role } = user;
            setUserRole(role);
        }
    }, [update])

    const deleteShowHandler = (id) => {
        setShowDelete(true);
        setServiceId(id);
    }

    const editShowHandler = (id) => {
        setShowEdit(true);
        setServiceId(id);
    }

    const registerServiceHandler = async (id) => {
        document.getElementById("registerForServiceButton").disabled = 'disabled';  
        await RegisterForService(id);
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
        {!user ? "" : <button className="registerForServiceButton" id="registerForServiceButton" onClick={() => registerServiceHandler(_id)}>Register</button>}
        </div>
        </div>
        {userRole == "admin" ? 
        <Dropdown>
        <Dropdown.Toggle variant="success">
        Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => editShowHandler(_id)}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => deleteShowHandler(_id)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown> 
        : ""}         
        </div>
        <DeletePopup showDelete={showDelete} setShowDelete={setShowDelete} id={serviceId} serviceName={serviceName}/>
        <EditPopup showEdit={showEdit} setShowEdit={setShowEdit} id={serviceId}/>
        </>
    )
}

export default Service;