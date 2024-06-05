require('dotenv').config();
const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  authenticateToken  = require('../Implementations/tokenAuth');
const authorizeRoles = require('../Implementations/authRoles');
module.exports = router;


//Post Method
router.post('/RegisterAccount', async (req, res) => {
    const numOfDocs = await UserModel.countDocuments();
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 2);
    const user = new UserModel({
        userId:(numOfDocs+1).toString(),
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userRole: req.body.userRole,
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

router.post('/Login', async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const user = await UserModel.findOne({ userEmail });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        if (req.headers['authorization']) {
            authenticateToken(req, res, async () => {
              const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
              });
              res.status(200).json({ token });
            });
          } else {
            // Issue a new token
            const token = jwt.sign({ Id: user._id,userRole: user.userRole, userName: user.userName}, process.env.JWT_SECRET, {
              expiresIn: '1h',
            });
            res.status(200).json({ token });
          }
        } catch (error) {
          res.status(500).json({ error: 'Login failed' });
        }
      });
 