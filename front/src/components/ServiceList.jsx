import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import Service from "./Service";
import "../styles/servicelist.css"

function ServiceList() {
    const { services } = useContext(StateContext);

    return(
        <>
        <div className="servicePositions">
        {services.map((service) => (
            <Service service={service} key={service._id}/>
        ))}
        </div>
        </>
    )
}

export default ServiceList;