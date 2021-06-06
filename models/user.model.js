const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    controlNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const usersSchema = mongoose.model('UsersSchema', usersSchema, 'users');

module.exports = usersModel;
