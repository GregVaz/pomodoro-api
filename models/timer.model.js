const mongoose = require('mongoose');

let timersSchema = new mongoose.Schema({
    subject: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    type: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    }
});

const timersModel = mongoose.model('TimerSchema', timersSchema, 'timers');

module.exports = timersModel;
