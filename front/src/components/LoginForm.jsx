import { useForm } from "react-hook-form";
import "../styles/loginForm.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/post";
import { useState, useContext } from "react";
import { StateContext } from "../utils/StateContext";

function LoginForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({})
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { setUpdate } = useContext(StateContext);

    const formSubmitHandler = async (data) => {
        try {
        await loginUser(data);
        setUpdate((update) => update + 1);
        navigate("/");
        reset();  
        } catch (error) {
            if (error.message == "Request failed with status code 401") {
                setError("Incorrect email or password");
              } else {
                setError(error.message);
              }
            }
    }

    return (
        <>
        <div className="backgroundLogin"></div>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                <div className="loginForm">
                    <div className="inputEmailLogin">Email<input type="email" placeholder="Email"{...register("email", { required: "Email is required", maxLength: { value: 50, message: "Email is too long" } })} /></div>
                    <div className="emailLoginError">{errors.email && errors.email.message}</div>
                    <div className="inputPasswordLogin">Password<input type="password" placeholder="Password"{...register("password", { required: "Enter a password", minLength: 6 })} /></div>
                    <div className="passwordLoginError">{errors.password && errors.password.message}</div>
                    <div className="submitButtonLogin"><button type="submit" className="submitLogin">Log in</button></div>
                    {error}
                </div>
            </form>
        </>
    )
}

export default LoginForm;