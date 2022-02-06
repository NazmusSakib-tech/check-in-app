const express = require('express');
const router = express.Router();
const Team = require('../schemas/teamSchema')


// Get team members track
router.get('/teamtrack', async (req, res) => {
    res.send("team track");
})

// Get my teams
router.get('/:mobile', async (req, res) => {
    const myTeams = await Team.find({ 'teamMembers': { $elemMatch: { mobile: req.params.mobile } } })
    res.send(myTeams)

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