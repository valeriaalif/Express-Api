const express = require('express');
const router = express.Router()
const moviesModel = require('../models/moviesModel');

module.exports = router;


//Post Method
router.post('/AddMovie', async (req, res) => {
    const numOfDocs = await moviesModel.countDocuments();
    const movie = new moviesModel({
        movieId:(numOfDocs+1).toString(),
        movieName: req.body.movieName,
        movieDescription: req.body.movieDescription,
        movieReleaseDate: req.body.movieReleaseDate
    })

    try {
        const savedMovie = await movie.save();
        res.status(200).json(savedMovie)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}) 


//Get all Method
router.get('/getAllMovies', async (req, res) => {
    try{
        const movie = await moviesModel.find();
        res.json(movie)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method
router.patch('/updateMovie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMovie= req.body;
        const options = { new: true };

        const result = await postsModel.findByIdAndUpdate(
            id, updatedMovie, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/deleteMovie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await moviesModel.findByIdAndDelete(id)
        res.send(`Document with ${movie.movieName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Get by ID Method
router.get('/getMovie/:id', async (req, res) => {

    
    try{
        const movie = await moviesModel.findById(req.params.id);
        res.json(movie)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})