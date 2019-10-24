const express = require('express');
const router = express.Router();
const joi = require('joi');
const User = require('../Models/User');

const schema = joi.object().keys({
    username: joi.string().required().min(5),
    name: joi.string().required().min(6),
    password: joi.string().required().min(6)
});

router.post('/register', async (req,res) => {
    const {error} = joi.validate(req.body, schema);
    if(error) {
        return res.status(400).send(error.details[0].message);
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