const express = require('express');
const router = express.Router();
router.post('/register', (req,res) => {
    res.send('Register');
});

// router.post('/login', (req,res) => {

// })


module.exports = router;