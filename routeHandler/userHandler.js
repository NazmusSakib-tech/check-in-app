const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../schemas/userSchema');

router.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.save();
        res.send(newUser)
    } catch (error) {
        res.send("Not saved. Please try again");
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    res.send(req.body)
})

module.exports = router;