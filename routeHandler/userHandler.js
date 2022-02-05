const express = require('express');

const router = express.Router();

router.post('/signup', async (req, res) => {
    res.send("signup route")
})

router.post('/login', async (req, res) => {
    res.send("login route")
})

module.exports = router;