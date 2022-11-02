import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userLogin, userLogout } from "../../Reducers/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Login(){

    const history = useHistory()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    useEffect(()=>{
        dispatch(userLogout())
    }, [dispatch])

    const handleChange = (event) => {
        setInput((currentInput) => ({
          ...currentInput,
          [event.target.name]: event.target.value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(userLogin(input))
        // history.push('/home')
    }

    return (
        <section>
            <button className="goBack" onClick={()=>history.push('/home')}>	◄ Go Back Home</button>
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

                    <button className='register-btn' type="submit">Sign in</button>

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