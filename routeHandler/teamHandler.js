const express = require('express');
const router = express.Router();
const Member = require('../schemas/memberSchema');

router.post('/createteam', async (req, res) => {
    const { teamCode, teamName, teamDescription, mobile } = req.body;
    // const member = await Member.findOne({ mobile })

    res.send("member")
})


module.exports = router