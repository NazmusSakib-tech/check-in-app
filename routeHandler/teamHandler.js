const express = require('express');
const router = express.Router();
const Team = require('../schemas/TeamSchema')


router.get('/', async (req, res) => {
})

//Create New Team
router.post('/createteam', async (req, res) => {
    try {
        const newTeam = new Team(req.body)
        const crateTeam = await newTeam.save();
        res.status(201).send(crateTeam);
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router