const express = require('express');
const router = express.Router()
const booksModel = require('../models/booksModel');

module.exports = router;


//Post Method
router.post('/AddBook', async (req, res) => {
    const numOfDocs = await booksModel.countDocuments();
    const book = new booksModel({
        bookId:(numOfDocs+1).toString(),
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        bookDescription: req.body.bookDescription,
        bookPublisher: req.body.bookPublisher,
        bookReleaseDate: req.body.bookReleaseDate,
        bookSKU: req.body.bookSKU,
        bookISBN: req.body.bookISBN,
        bookPrice: req.body.bookPrice
    })

    try {
        const savedBook = await book.save();
        res.status(200).json(savedBook)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}) 


//Get all Method
router.get('/getAllBooks', async (req, res) => {
    try{
        const book = await booksModel.find();
        res.json(book)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method
router.patch('/updateBook/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBook= req.body;
        const options = { new: true };

        const result = await booksModel.findByIdAndUpdate(
            id, updatedBook, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/deleteBook/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await booksModel.findByIdAndDelete(id)
        res.send(`Document with ${book.bookName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Get by ID Method
router.get('/getBook/:id', async (req, res) => {

    
    try{
        const book = await booksModel.findById(req.params.id);
        res.json(book)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})