const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', UserSchema);