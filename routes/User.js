const express = require('express');
const userRouter = express.Router();
const Project = require("../models/Project");
const User = require('../models/User');

const message = { msgBody: "Error has occured", msgError: true };

userRouter.post('/get-user-data', async (req, res) => {
    const { address } = req.body;
    // check if user already exists
    User.findOne({ address: address.toLowerCase() }, async (err, user) => {
        if (err) res.status(500).json({ message });
        else if (user) {
            res.status(200).json({ user });
        } else {
            userData = {
                address: address.toLowerCase()
            }
            const newUser = new User(userData);
            newUser.save((err, user) => {
                if (err) res.status(500).json({ message });
                else {
                    res.status(200).json({ user, "new": true });
                }
            });
        }
    });
});

module.exports = userRouter;