const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    bookId: {
        type: Number,
        required: true
    },
    bookSKU: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
        required: true
    },
    bookPublisher: {
        type: String,
        required: true
    },
    bookReleaseDate: {
        type: String,
        required: true
    },
    bookISBN: {
        type: String,
        required: true
    },
    bookPrice: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Books', booksSchema);
