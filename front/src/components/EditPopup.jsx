import Modal from 'react-bootstrap/Modal';
import { UpdateService } from "../services/update";
import { useState, useEffect, useContext } from 'react';
import { StateContext } from "../utils/StateContext";
import { useForm } from "react-hook-form";


function EditPopup({id, showEdit, setShowEdit}) {
    const [serviceId, setServiceId] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({})
    const { setUpdate } = useContext(StateContext);

    const handleEdit = async (data) => {
        setServiceId(id);
        await UpdateService(serviceId, data);
        setUpdate((update) => update + 1);
        setShowEdit(false);
    }

    return (
        <>
            <Modal
                show={showEdit}
                backdrop="true"
                keyboard={false}
                centered>
                <form onSubmit={handleSubmit(handleEdit)}>
                    <div className="serviceNameInput">Service name<input type="text" placeholder="Service name"{...register("serviceName", {maxLength: { value: 50, message: "Name is too long" } })} /></div>
                    <div className="serviceNameErrorInput">{errors.tripName && errors.tripName.message}</div>
                    <div className="imageErrorInput">{errors.image && errors.image.message}</div>
                    <div className="categoryInput">Category<select name="Service" defaultValue="Hair" {...register("category")}>
                        <option value="Hair">Hair</option>
                        <option value="Face">Face</option>
                        <option value="Body">Body</option>                        
                        <option value="Nails">Nails</option>
                        <option value="Feet">Feet</option>
                        </select>
                    </div>
                    <div className="categoryErrorInput">{errors.category && errors.category.message}</div>
                    <div className="dateInput">Date<input type="date" {...register("date")} /></div>
                    <div className="dateErrorInput">{errors.date && errors.date.message}</div>
                    <div className="priceInput">Price<input type="number" placeholder="Euros" {...register("price")} /></div>
                    <div className="priceErrorInput">{errors.price && errors.price.message}</div>
                <div><button className="createServiceCloseButton" onClick={() => {setShowEdit(false)}} type="button">Close</button><button className="createServiceCreateButton" type="submit">Edit</button></div>
                </form>
            </Modal>
        </>
    );
}

export default EditPopup;