import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()

const instance = axios.create({
    baseURL: process.env.REACT_APP_GABR || "http://localhost:3001",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export default instance;