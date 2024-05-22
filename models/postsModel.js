const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true
    },
    postName: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    postAuthor: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Posts', postsSchema);
