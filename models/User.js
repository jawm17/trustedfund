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
    projectsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    projectsInvested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

module.exports = mongoose.model('User', UserSchema);