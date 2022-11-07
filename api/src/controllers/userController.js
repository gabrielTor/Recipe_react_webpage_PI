const {User} = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config();


async function register(req, res){
    const {firstName, lastName, email, password} = req.body
    try {
        const username = await User.findOne({where: {email: email}})
        if(username){
            return res.status(409).send('There is already a User registered with that email')
        }
        const hashedPW = await bcrypt.hash(password, 11)
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPW
        })
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })
        let message = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Welcome to the Food webApp',
            text: 'You have successfully registered to the Food webApp and can know login to view delicious recipes and/or create some of your own!'
        }
        await mailTransporter.sendMail(message)
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
        if(credentials){
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "userEmail": user.email
                    }
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: '10m' }
            )
            const refreshToken = jwt.sign(
                {"userEmail": user.email},
                process.env.REFRESH_TOKEN,
                {expiresIn: '1d'}
            )
            user.refreshToken = refreshToken
            await user.save()
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.send({token: accessToken, user: `Welcome ${user.firstName} ${user.lastName}`})
        } 
        else res.status(401).send('incorrect credentials')
    } catch (error) {
        console.log(error)
    }
}

async function handleRefresh(req, res){
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    const user = await User.findOne({where: {refreshToken: refreshToken}})
    if(!user) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err || user.email !== decoded.userEmail) return res.sendStatus(403)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "userEmail": decoded.userEmail
                    }
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: '10m' }
            );
            res.send({token: accessToken, user: user})
        }
    );

}

async function logout(req, res){
    // On client, also delete the accessToken
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    const refreshToken = cookies.jwt

    const user = await User.findOne({where: {refreshToken: refreshToken}})
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    user.refreshToken = ''
    await user.save()
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = {register, login, handleRefresh, logout};