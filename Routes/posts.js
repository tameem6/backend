const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const Post = require('../Models/Post');
const {postValidation} = require('../validation');


router.get('/', verify, async (req,res) =>{
    const posts = await Post.find();
    if(posts.length === 0) {
        res.status(404).json({"message": "No data available"});
    }
    else {
    res.json(posts);
    }
});

router.post('/', verify, async (req,res) =>{
    const {error} = postValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
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

router.get('/:postId', verify, async (req,res) =>{
    const post = await Post.findById(req.params.postId);
    res.json(post);
});

router.delete('/:postId', verify, async(req,res) =>{
    await Post.deleteOne({_id: req.params.postId});
    res.json({status: "200", text: "Post deleted"});
})

module.exports = router;