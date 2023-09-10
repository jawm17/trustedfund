const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true    
    },
    goal: {
        type: String,
        required: true
    },
    checkpoints: {
        type: Array,
    },
    creatorAddress: {
        type: String,
        required: true
    },
    alloPoolId: {
        type: String,
    },
    alloProfileId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Project', ProjectSchema);