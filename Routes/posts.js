const express = require('express');
const router = express.Router();

const Post = require('../Models/Post');



router.get('/', async (req,res) =>{
    const posts = await Post.find();
    res.json(posts);
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

router.get('/:postId', async (req,res) =>{
    const post = await Post.findById(req.params.postId);
    res.json(post);
});

router.delete('/:postId', async(req,res) =>{
    await Post.remove({_id: req.params.postId});
    res.json({status: "200", text: "Post deleted"});
})

module.exports = router;