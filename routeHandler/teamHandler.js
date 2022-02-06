const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send("my teams")
})


module.exports = router