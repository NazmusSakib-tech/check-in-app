const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../schemas/userSchema');

router.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const hashedPassword = await bcrypt.hash(req.body.pinCode, 10);
        newUser.pinCode = hashedPassword;
        newUser.save();
        res.send(newUser)
    } catch (error) {
        res.send("Not saved. Please try again");
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ mobile: req.body.mobile });
        console.log(user);
        const isValid = await bcrypt.compare(req.body.pinCode, user.pinCode);
        if (isValid) {
            // Please update the activity of the user. you get the activity in the req.body



            res.send(user)
        } else {
            res.send("Authentication failed");
        }
    } catch (error) {
        res.send("Authentication failed");
    }

})

module.exports = router;