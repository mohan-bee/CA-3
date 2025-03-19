const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const User = require('./userModel')


app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err))

app.post('/signup', async (req,res) => {
    try {
        const {username, email, password, dateOfBirth} = req.body
        if(!username.trim()){
            return res.status(401).json({msg: "Username cannot be empty!"})
        }
        if(!email.trim()){
            return res.status(401).json({msg: "Email cannot be empty!"})
        }
        if(password.length < 8 || password.length >= 16){
            return res.status(401).json({msg: "Password Length should be greater than 8 or equal to 16"})
        }
        const newUser = new User({username, email, password, dateOfBirth})
        await newUser.save()
        return res.status(201).json({msg: "User Signed Up Successfully!", user: newUser})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc:error.message})
    }
})

app.listen(3000, () => {
    console.log("Server is Running at PORT 3000")
})