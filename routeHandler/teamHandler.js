const express = require('express');
const router = express.Router();
const Team = require('../schemas/teamSchema')
const Member = require('../schemas/memberSchema');


// Get team members list
router.get('/teamtrack/list/:teamcode', async (req, res) => {
    const result = await Team.findOne({ teamCode: req.params.teamcode })
    res.send(result.teamMembers);
})

// Get team members map
router.get('/membertrack/map/:mobile', async (req, res) => {
    const result = await Member.findOne({ mobile: req.params.mobile })
    res.send(result);
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