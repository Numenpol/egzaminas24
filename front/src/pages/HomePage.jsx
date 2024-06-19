import { useState, useEffect, useContext } from 'react';
import Header from "../components/Header";
import "../styles/homepage.css";
import { StateContext } from "../utils/StateContext";
import HeaderPhotoChange from '../components/HeaderPhotoChange';
import CreateService from '../components/CreateService';
import ServiceList from '../components/ServiceList';

function HomePage() {
    const [show, setShow] = useState(false);
    const [userRole, setUserRole] = useState("");

    const { user, update } = useContext(StateContext);

    useEffect(() => {
        if (!user) {

        } else {
            const { role } = user;
            setUserRole(role);
        }
    }, [update])

    const handleShow = () => setShow(true);

    return (
        <>
            <Header />
            <HeaderPhotoChange/>
            <h1 className="homeHeaderText">Services</h1>
            {userRole == "admin" ? <div className='createServiceButtonHomePosition'><button className="createServiceButtonHome" onClick={handleShow}>Create a Tour</button></div> : ""}
            <CreateService show={show} setShow={setShow}/>
            <ServiceList/>
        </>
    );
}

export default HomePage;
