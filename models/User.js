const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    address : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('User',UserSchema);