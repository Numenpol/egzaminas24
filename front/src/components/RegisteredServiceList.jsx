import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import RegisteredService from "./RegisteredService";
import "../styles/servicelist.css"

function RegisteredServiceList() {
    const { registeredServices } = useContext(StateContext);

    return(
        <>
        <div className="servicePositions">
        {registeredServices.map((service) => (
            <RegisteredService service={service} key={service._id}/>
        ))}
        </div>
        </>
    )
}

export default RegisteredServiceList;