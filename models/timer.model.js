const mongoose = require('mongoose');

let timersSchema = new mongoose.Schema({
    subject: {
        type: String,
        require: true
    },
    minutes: {
        type: String,
        require: true
    },
    seconds: {
        type: String,
        require: true
    },
    type: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    }
});

const timersModel = mongoose.model('TimerSchema', timersSchema, 'timers');

module.exports = timersModel;
