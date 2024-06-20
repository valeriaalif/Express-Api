
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: Number
    },
    userRole: {
        required: true,
        type: String
    },
    userNickname: {
        required: true,
        type: String
    },
    userName: {
        required: true,
        type: String
    },
    userLastName: {
        required: true,
        type: String
    },
    userEmail: {
        required: true,
        type: String
    },
    userPassword: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)