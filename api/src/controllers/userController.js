const {User} = require('../db')
const bcrypt = require('bcrypt')

async function register(req, res){
    const {firstName, lastName, email, password} = req.body
    try {
        const username = await User.findOne({where: {email: email}})
        if(username.email === email){
            return res.status(400).send('There is already a User registered with that email')
        }
        const hashedPW = await bcrypt.hash(password, 11)
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPW
        })
        res.send(newUser)
    } catch (error) {
        console.log(error)
    }
}

async function login(req, res){
    const {email, password} = req.body
    if (!email || !password) return res.status(400).send('Email and password are required')        
    try {
        const user = await User.findOne({where: {email: email}})
        if(!user) return res.status(401).send('You must register')
        const credentials = await bcrypt.compare(password, user.password)
        if(credentials) res.send('Login succsesful')
        else res.status(401).send('incorrect credentials')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {register, login};