const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.post('/register', async (req,res) => {
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