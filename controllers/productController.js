const express = require('express');
const router = express.Router()
const productModel = require('../models/productModel');

module.exports = router;


//Post Method
router.post('/AddProduct', async (req, res) => {
    const numOfDocs = await productModel.countDocuments();
    const product = new productModel({
        productId:(numOfDocs+1).toString(),
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription
    })

    try {
        const savedProduct = await product.save();
        res.status(200).json(savedProduct)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}) 


//Get all Method
router.get('/getAllProducts', async (req, res) => {
    try{
        const product = await productModel.find();
        res.json(product)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method
router.patch('/updateProduct/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct= req.body;
        const options = { new: true };

        const result = await productModel.findByIdAndUpdate(
            id, updatedProduct, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel.findByIdAndDelete(id)
        res.send(`Document with ${product.productName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Get by ID Method
router.get('/getProduct/:id', async (req, res) => {

    
    try{
        const product = await productModel.findById(req.params.id);
        res.json(product)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})