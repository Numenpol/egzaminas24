import Modal from 'react-bootstrap/Modal';
import "../styles/createservice.css";
import { useForm } from "react-hook-form";
import { createService } from '../services/post';
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";

function CreateService({ show, setShow }) {

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({})
    const { setUpdate } = useContext(StateContext);

    const formSubmitHandler = async (data) => {
        try {
            await createService(data);
            setUpdate((update) => update + 1);
            handleClose();
            reset();
        } catch (error) {

        }
    }

    const watchCategory = watch("category")

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                backdrop="true"
                keyboard={false}
                centered>
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                    <div className="serviceNameInput">Service name<input type="text" placeholder="Service name"{...register("serviceName", { required: "Enter the service's name", maxLength: { value: 50, message: "Name is too long" } })} /></div>
                    <div className="serviceNameErrorInput">{errors.tripName && errors.tripName.message}</div>
                    <div className="categoryInput">Category<select name="Service" defaultValue="Hair" {...register("category")}>
                        <option value="Hair">Hair</option>
                        <option value="Face">Face</option>
                        <option value="Body">Body</option>                        
                        <option value="Nails">Nails</option>
                        <option value="Feet">Feet</option>
                        </select>
                    </div>
                    <div className="categoryErrorInput">{errors.category && errors.category.message}</div>
                    <div className="dateInput">Date<input type="date" {...register("date", { required: "Enter a date" })} /></div>
                    <div className="dateErrorInput">{errors.date && errors.date.message}</div>
                    <div className="priceInput">Price<input type="number" placeholder="Euros" {...register("price", { required: "Enter a price" })} /></div>
                    <div className="priceErrorInput">{errors.price && errors.price.message}</div>
                    <div><button className="createServiceCloseButton" onClick={handleClose} type="button">Close</button><button className="createServiceCreateButton" type="submit">Create</button></div>
                </form>
            </Modal>
        </>
    );
}

export default CreateService;