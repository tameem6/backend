const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const {registerValidation, loginValidation} = require('../validation');


router.post('/register', async (req,res) => {
    const {error} = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const userExist = await User.findOne({username: req.body.username});
    if(userExist) {
        return res.status(400).send("Username already taken");
    }
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});

// router.post('/login', (req,res) => {

// })


module.exports = router;