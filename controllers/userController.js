
const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router()
const bcrypt = require('bcrypt');
const  authenticateToken  = require('../Implementations/tokenAuth');
const authorizeRoles = require('../Implementations/authRoles');

module.exports = router;


//Post Method
router.post('/AddUser', async (req, res) => {
    const numOfDocs = await UserModel.countDocuments();
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 2);
    const user = new UserModel({
        userId:(numOfDocs+1).toString(),
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: hashedPassword
    })

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}) 


//Get all Method
router.get('/getAllUsers', async (req, res) => {
    try{
        const user = await UserModel.find();
        res.json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser= req.body;
        const options = { new: true };

        const result = await UserModel.findByIdAndUpdate(
            id, updatedUser, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndDelete(id)
        res.send(`Document with ${user.userName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Get by ID Method
router.get('/getUser/:id', async (req, res) => {
    
    try{
        const user = await UserModel.findById(req.params.id);
        res.json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})