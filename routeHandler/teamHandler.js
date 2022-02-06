const express = require('express');
const router = express.Router();
const Team = require('../schemas/TeamSchema')


// router.get('/', async (req, res) => {
// })

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


//await Team.find({ 'teamMembers': { $elemMatch: { mobile: mobile } } }


//Join MyTeam 
router.patch('/jointeam/:id', async (req, res) => {
    try {

        const _id = req.params.id;
        console.log(teamCode);
        const desairedTeam = await Team.findByIdAndUpdate(_id, { $push: { teamMembers: req.body } })
        console.log(req.body)
        res.status(201).send(desairedTeam, "join team");

    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router