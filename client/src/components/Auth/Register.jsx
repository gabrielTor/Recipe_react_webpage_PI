import React from "react";
import "./register.css"
import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userRegister } from "../../Reducers/actions";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default function Register(){

    const history = useHistory()
    const dispatch = useDispatch()
    const [error, setError] = useState({
        email: true,
        password: true
    })
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    useEffect(()=>{
        if(input.password){
            if(PWD_REGEX.test(input.password)) setError((cur) => ({...cur, password: false}))
            else setError((cur) => ({...cur, password: true}))
        }
        if(input.email){
            if(EMAIL_REGEX.test(input.email)) setError((cur) => ({...cur, email: false}))
            else setError((cur) => ({...cur, email: true}))
        }
    }, [input.password, input.email])

    const handleSubmit = () => {
        if(!error.email && !error.password) dispatch(userRegister(input))
        history.push('/login')
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
            <div id='reg-container'>
                <form id='register-form' onSubmit={handleSubmit}>

                    <div className="items">
                    <label>First Name</label>
                    <input type='text' name='firstName' value={input.firstName} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div className="items">
                    <label>Last Name</label>
                    <input type='text' name='lastName' value={input.lastName} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div className="items">
                    <label>
                        Email
                        <FontAwesomeIcon icon={faCheck} className={!error.email ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={!error.email || !input.email ? "hide" : "invalid"} />
                    </label>
                    <input type='text' autoComplete="off" name='email' value={input.email} onChange={(e)=>handleChange(e)} required/>
                    {!error.email || !input.email ? null :
                    <p className="box">
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        input a valid email address
                    </p>}
                    </div>

                    <div className="items">
                    <label>
                        Password
                        {!error.password ? <FontAwesomeIcon icon={faCheck} className='valid'/> : null}
                        {!error.password || !input.password ? null : <FontAwesomeIcon icon={faTimes} className='invalid'/>}
                    </label>
                    <input type='password' name='password' value={input.password} onChange={(e)=>handleChange(e)} required/>
                    {(!error.password || !input.password) ? null :
                    <p className="box">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.
                        Allowed special characters:<br></br> ! @ # $ %
                    </p>}
                    </div>

                    <button className='register-btn' disabled={error.email || error.password} type="submit">Sign up</button>

                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                </form>
            </div>
        </section>
    )
}