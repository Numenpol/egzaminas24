import { useContext } from "react";
import "../styles/header.css"
import { useNavigate } from "react-router-dom";
import { StateContext } from "../utils/StateContext";

function Header() {
    const { setUpdate, user } = useContext(StateContext);

    const navigate = useNavigate();
    
    const homeClickHandler = () => {
    navigate("/");;
    }

    const loginClickHandler = () => {
    navigate("/login");
    }

    const registerClickHandler = () => {
    navigate("/register");
    }

    const logoutClickHandler = () => {
    localStorage.removeItem("user");
    setUpdate((update) => update + 1);
    }

    const registeredServicesClickHandler = () => {
    navigate("/services");
    }

    return(
        <>
        <div className="header">
        <p className="homeText" onClick={() => homeClickHandler()}>Home</p>
        {!user ? "" : <p className="registeredServicesText" onClick={() => registeredServicesClickHandler()}>Registered Services</p>}
        {!user ? <p className="loginText" onClick={() => loginClickHandler()}>Login</p> : <p className="logoutText" onClick={() => logoutClickHandler()}>Log out</p>}
        {!user ? "" : <h5 className="userEmail">{user.name} <p className="userRole">{user.role}</p></h5> }        
        {!user ? <p className="registerText" onClick={() => registerClickHandler()}>Register</p> : ""}
        </div>
        </>
    );
}

export default Header;