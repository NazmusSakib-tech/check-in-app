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

//********Create New Team***********/
router.post('/createteam', async (req, res) => {
    try {
        const newTeam = new Team(req.body)
        const crateTeam = await newTeam.save();
        res.status(201).send(crateTeam);
    } catch (err) {
        res.status(500).send(err);
    }
})


//await Team.find({ 'teamMembers': { $elemMatch: { mobile: mobile } } }


/**********Join In a Team**********/
router.patch('/jointeam', async (req, res) => {
    try {

        const teamCode = req.body.teamCode;
        console.log(teamCode);
        const desairedTeam = await Team.updateOne({ teamCode: teamCode }, { $push: { teamMembers: { mobile: req.body.mobile, memberRole: 'pending' } } })
        res.status(201).send(desairedTeam);

    } catch (err) {
        res.status(500).send(err);
    }
})

/*********Approved team member in a team**********/

router.patch('/memberApproved', async (req, res) => {
    try {

        const teamCode = req.body.teamCode;
        const mobile = req.body.mobile;
        console.log(teamCode, mobile);

        const desairedTeam = await Team.updateOne({ teamCode: teamCode, 'teamMembers': { $elemMatch: { mobile: mobile } } }, { $set: { "teamMembers.$.memberRole": "member" } })
        res.status(201).send(desairedTeam);

    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router