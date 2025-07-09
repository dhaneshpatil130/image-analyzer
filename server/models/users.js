const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('User', userschema);

module.exports = UserModel; // Export UserModel, not usermodels
