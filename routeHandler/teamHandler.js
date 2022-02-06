const express = require('express');
const router = express.Router();

router.post('/createteam', async (req, res) => {
    const { teamCode, teamName, teamDescription, mobile } = req.body;
    // const 
    res.send("create team")
})


module.exports = router