const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.post('/register', async (req,res) => {
    const {error} = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const userExist = await User.findOne({username: req.body.username});
    if(userExist) {
        return res.status(400).send("Username already taken");
    }
    //Hash passwprds
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.status(200).send({username: user.username});
    } catch(err) {
        res.status(400).send(err);
    }
});
//Login
router.post('/login', async (req,res) => {
    const {error} = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({username: req.body.username});
    if(!user) {
        return res.status(400).send("Username not found");
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        return res.status(400).send("Invalid Passowrd");
    }
    //Create and assign token
    const token = jwt.sign({username: user.username}, process.env.TOKEN_SECRET );
    res.header('auth-token', token).send(token);
})


module.exports = router;