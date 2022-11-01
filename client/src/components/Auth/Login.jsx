import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(){

    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const handleChange = (event) => {
        setInput((currentInput) => ({
          ...currentInput,
          [event.target.name]: event.target.value
        }))
    }
    const handleSubmit = () => {

    }

    return (
        <section>
            <h1>Login</h1>
            <div id='reg-container'>
                <form id='register-form' onSubmit={handleSubmit}>

                    <div className="items">
                    <label>Email</label>
                    <input type='text' autoComplete="off" name='email' value={input.email} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div className="items">
                    <label>Password</label>
                    <input type='password' name='password' value={input.password} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <button className='register-btn' type="submit">Sign up</button>

                    <p>
                        Not registered yet?<br />
                        <span className="line">
                            <Link to="/register">Go Register</Link>
                        </span>
                    </p>

                </form>
            </div>
        </section>
    )
}