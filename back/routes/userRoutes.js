import express from 'express'
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from '../models/user.js'
import { verificationEmail } from '../middleware/verificationEmail.js'

const userRoutes = express.Router()

const genToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: '60d'})
}

// login

const loginUser = asyncHandler(async (req,res,next) => {
    const { email, password } = req.body
    const findUser = await User.findOne({email})

    if(findUser && ( await findUser.matchPasswords(password))){
        findUser.firstLogin = false;
        await findUser.save()
        res.json({
            id : findUser.id,
            name : findUser.name,
            email : findUser.email,
            googleImage : findUser.googleImage,
            isADmin : findUser.isADmin,
            token : genToken(findUser.id),
            active : findUser.active,
            firstLogin : findUser.firstLogin,
            created : findUser.createdAt
        })

    } else {
        res.status(401).send('Invalid Email or Password')
        throw new Error('User not found')
    }
})
// register

const registerUser = asyncHandler( async (req,res,next) => {
    const { email, password, name } = req.body
    const userExist = await User.create({ email, password, name })

    const newToken = genToken(userExist.id)
    verificationEmail(newToken, email, name)

    if(userExist){
        res.status(201).json({
            id : userExist.id,
            name : userExist.name,
            email : userExist.email,
            googleImage : userExist.googleImage,
            isADmin : userExist.isADmin,
            token : newToken,
            active : userExist.active,
            firstLogin : userExist.firstLogin,
            created : userExist.createdAt
        })
    } else {
        res.status(400).send('we could not register you')
        throw new Error('Something went wrong. Please check your informations')
    }

})
// verifyEmail

const verifyEmail = asyncHandler(async(req,res) => {
    const token = req.headers.authorization.split('')[1]

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded.id)

        if(user){
            user.active = true
            await user.save()
            res.json('thanks for activate your account, you can close the window')
        } else {
            res.status(404).send('user not found')
        }
    }
    catch(error){
        res.status(401).send('Email couldnt be verified')

    }
})
// password reset request

const passwordResetRequest = asyncHandler( async(req,res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email : email })

        if(user){
            const newToken = genToken(user.id)
            resetPassword(newToken, user.email, user.name, user.id)
            res.status(200).send(`We have send you a recover email to ${email}`)
        }
    } catch (error) {
        res.status(401).send(`There is no account with this email`)
    }

})
// password reset

const passwordReset = asyncHandler(async( req,res) => {
    const token = req.headers.authorization.split('')[1]

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded.id)

        if(user){
            user.password = req.body.password
            await user.save()
            res.json('password has been successfuly updated')
        } else {
            res.status(404).send('user not found')
        }
    }
    catch(error){
        res.status(401).send('Password reset failed')

    }
})

userRoutes.route('/login').post(loginUser)
userRoutes.route('/register').post(registerUser)
userRoutes.route('/verify-email').get(verifyEmail)
userRoutes.route('/passowrd-reset-request').post(passwordResetRequest)
userRoutes.route('/passowrd-reset').post(passwordReset)


export default userRoutes