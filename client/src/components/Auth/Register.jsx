import React from "react";
import "./register.css"
import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userRegister } from "../../Reducers/actions";
import { useDispatch } from "react-redux";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register(){

    const dispatch = useDispatch()
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleSubmit = () => {
        dispatch(userRegister(input))
    }
    const handleChange = (event) => {
        setInput((currentInput) => ({
          ...currentInput,
          [event.target.name]: event.target.value
        }))
    }

    return (
        <section>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <>
                <label>First Name</label>
                <input type='text' name='firstName' value={input.firstName} onChange={(e)=>handleChange(e)} required/>
                </>

                <>
                <label>Last Name</label>
                <input type='text' name='lastName' value={input.lastName} onChange={(e)=>handleChange(e)} required/>
                </>

                <>
                <label>Email</label>
                <input type='text' name='email' value={input.email} onChange={(e)=>handleChange(e)} required/>
                </>

                <>
                <label>Password</label>
                <input type='password' name='password' value={input.password} onChange={(e)=>handleChange(e)} required/>
                </>
                <br></br>
                <button type="submit">Sign up</button>
            </form>
        </section>
    )
}