const express = require('express');
const router = express.Router();

const Post = require('../Models/Post');



router.get('/', (req,res) =>{
    res.send("Post page");
});

router.post('/', async (req,res) =>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        res.json({message: err});
    }

});

router.get('/specific', (req,res) =>{
    res.send("Specific post");
});

module.exports = router;