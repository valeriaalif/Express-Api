const express = require('express');
const router = express.Router()
const postsModel = require('../models/postsModel');

module.exports = router;


//Post Method
router.post('/AddPost', async (req, res) => {
    const numOfDocs = await postsModel.countDocuments();
    const post = new postsModel({
        postId:(numOfDocs+1).toString(),
        postName: req.body.postName,
        postDescription: req.body.postDescription,
        postAuthor: req.body.postAuthor
    })

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}) 


//Get all Method
router.get('/getAllPosts', async (req, res) => {
    try{
        const post = await postsModel.find();
        res.json(post)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method
router.patch('/updatePost/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPost= req.body;
        const options = { new: true };

        const result = await postsModel.findByIdAndUpdate(
            id, updatedPost, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/deletePost/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postsModel.findByIdAndDelete(id)
        res.send(`Document with ${post.postName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Get by ID Method
router.get('/getPost/:id', async (req, res) => {

    
    try{
        const post = await postsModel.findById(req.params.id);
        res.json(post)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})