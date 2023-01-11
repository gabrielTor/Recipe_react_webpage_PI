import styles from './auth.module.css'
import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userRegister } from "../../redux/actions";
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
        <section className={styles.auth}>
            <h1>Register</h1>
            <div className={styles.regContainer}>
                <form className={styles.registerForm} onSubmit={handleSubmit}>

                    <div className={styles.items}>
                        <label>First Name</label>
                        <input type='text' name='firstName' value={input.firstName} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div className={styles.items}>
                        <label>Last Name</label>
                        <input type='text' name='lastName' value={input.lastName} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div className={styles.items}>
                        <label>
                            Email
                            <FontAwesomeIcon icon={faCheck} className={!error.email ? styles.valid : styles.hide} />
                            <FontAwesomeIcon icon={faTimes} className={!error.email || !input.email ? styles.hide : styles.invalid} />
                        </label>
                        <input type='text' autoComplete="off" name='email' value={input.email} onChange={(e)=>handleChange(e)} required/>
                        {!error.email || !input.email ? null :
                        <p className={styles.box}>
                            <FontAwesomeIcon icon={faInfoCircle}/> input a valid email address
                        </p>}
                    </div>

                    <div className={styles.items}>
                        <label>
                            Password
                            {!error.password ? <FontAwesomeIcon icon={faCheck} className={styles.valid}/> : null}
                            {!error.password || !input.password ? null : <FontAwesomeIcon icon={faTimes} className={styles.invalid}/>}
                        </label>
                        <input type='password' name='password' value={input.password} onChange={(e)=>handleChange(e)} required/>
                        {(!error.password || !input.password) ? null :
                        <p className={styles.box}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.
                            Allowed special characters:<br></br> ! @ # $ %
                        </p>}
                    </div>
                    
                    <div className={styles.items}>
                        <button className={styles.registerBtn} disabled={error.email || error.password} type="submit">Sign up</button>
                    </div>

                    <p>
                        Already registered?<br />
                        <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}