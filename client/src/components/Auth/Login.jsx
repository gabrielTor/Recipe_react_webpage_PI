import styles from './auth.module.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userLogin, userLogout } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useLocalStorage from "./useLocalStorage"

export default function Login(){

    const history = useHistory()
    const dispatch = useDispatch()
    const [value, setValue] = useLocalStorage('persist')
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
        history.push('/home')
    }
    const handleLoggedIn = (event) => {
        if(event.target.checked){
            setValue(true)
        } else setValue(false)
    }

    return (
        <section className={styles.auth}>
            <button className={styles.goBack} onClick={()=>history.push('/home')}>&#10094; Go Back Home</button>
            <h1>Login</h1>
            <div className={styles.regContainer}>
                <form className={styles.registerForm} onSubmit={handleSubmit}>

                    <div className={styles.items}>
                        <label>Email</label>
                        <input type='text' autoComplete="off" name='email' value={input.email} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div className={styles.items}>
                        <label>Password</label>
                        <input type='password' name='password' value={input.password} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div className={styles.items}>
                        <button className={styles.registerBtn} type="submit">Sign in</button>
                    </div>

                    <div className={styles.items}>
                        <span className={styles.loggedIn}>
                            <label>Keep me logged in</label>
                            <input type="checkbox" value={value} checked={value} onChange={handleLoggedIn}/>
                        </span>
                    </div>

                    <p>
                        Not registered yet?<br />
                        <Link to="/register">Go Register</Link>
                    </p>

                </form>
            </div>
        </section>
    )
}