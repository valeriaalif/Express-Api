const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    movieId: {
        type: Number,
        required: true
    },
    movieName: {
        type: String,
        required: true
    },
    movieDescription: {
        type: String,
        required: true
    },
    movieReleaseDate: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Movies', moviesSchema);
