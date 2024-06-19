import Modal from 'react-bootstrap/Modal';
import { deleteData } from "../services/delete";
import { useContext } from 'react';
import { StateContext } from "../utils/StateContext";
import "../styles/deletepopup.css";

function DeletePopup({setShowDelete, showDelete, id, serviceName}) {


    const { setUpdate } = useContext(StateContext);

    const handleDelete = async (id) => {
        await deleteData(id);
        setUpdate((update) => update + 1);
        setShowDelete(false);
    }

    return (
        <>
            <Modal
                show={showDelete}
                backdrop="true"
                keyboard={false}
                centered>
                    <p className="deletePopupText">Are you sure you want to delete {serviceName}</p>
            <div><button className="createServiceCloseButton" onClick={() => {setShowDelete(false)}}>Cancel</button> <button className="createServiceCreateButton" onClick={() => {handleDelete(id)}}>Delete</button></div>
            </Modal>
        </>
    );
}

export default DeletePopup;