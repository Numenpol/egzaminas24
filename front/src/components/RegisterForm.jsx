import { useForm } from "react-hook-form";
import "../styles/registerForm.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/post";
import { useState } from "react";

function RegisterForm() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({})
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const formSubmitHandler = async (data) => {
        try {
        await registerUser(data);
        navigate("/login");
        reset();  
        } catch (error) {
            if (error.message === "Request failed with status code 500")
            setError("This email already exists");
        }
    }

    const password = watch("password")

    return (
        <>
            <div className="backgroundRegister"></div>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                <div className="registerForm">
                    <div className="inputNameRegister">Name<input placeholder="Name" {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name is too short" }, maxLength: { value: 20, message: "Name is too long" } })} /></div>
                    <div className="nameRegisterError">{errors.name && errors.name.message}</div>
                    <div className="inputEmailRegister">Email<input type="email" placeholder="Email"{...register("email", { required: "Email is required", maxLength: { value: 50, message: "Email is too long" } })} /></div>
                    <div className="emailRegisterError">{errors.email && errors.email.message}</div>
                    <div className="inputPasswordRegister">Password<input type="password" placeholder="Password"{...register("password", { required: "Enter a password", minLength: 6 })} /></div>
                    <div className="passwordRegisterError">{errors.password && errors.password.message}</div>
                    <div className="inputConPasswordRegister">Confirm Password<input type="password" placeholder="Confirm Password"{...register("passwordConfirm", { required: "Confirm the password", minLength: 6, validate: value => value === password || "Passwords do not match" })} /></div>
                    <div className="conPasswordRegisterError">{errors.passwordConfirm && errors.passwordConfirm.message}</div>
                    <div className="submitButtonRegister"><button type="submit" className="submitRegister">Sign up</button></div>
                    {error}
                </div>
            </form>
        </>
    )
}

export default RegisterForm;