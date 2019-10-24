const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const Post = require('../Models/Post');



router.get('/', verify, async (req,res) =>{
    const posts = await Post.find();
    res.json(posts);
});

router.post('/', verify, async (req,res) =>{
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
    await Post.remove({_id: req.params.postId});
    res.json({status: "200", text: "Post deleted"});
})

module.exports = router;