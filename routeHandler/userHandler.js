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
    const user = await User.findOne({ mobile: req.body.mobile });
    console.log(user);
    const isValid = await bcrypt.compare(req.body.pinCode, user.pinCode);
    if (isValid) {
        // DO What you want to do after successfull login

        res.send(req.body)
    } else {
        res.send("Authentication failed");
    }

})

module.exports = router;