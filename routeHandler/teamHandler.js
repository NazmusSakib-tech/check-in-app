const express = require('express');
const router = express.Router();
const Team = require('../schemas/teamSchema')
const Member = require('../schemas/memberSchema');


// // Get team members list
// router.get('/teamtrack/memberlist/:teamcode', async (req, res) => {
//     // res.send(req.params.teamcode)
//     try {
//         const result = await Team.findOne({ teamCode: req.params.teamcode }).populate('teamMembers')
//         const teamMembers = result.teamMembers;
//         res.send(result);
//     } catch (error) {
//         res.send(error)
//     }
// })




// find member with device serialnumber

router.post('/validmember', async (req, res) => {
    console.log(req.body.deviceSerial)
    try {
        const member = await Member.findOne({ deviceSerial: req.body.deviceSerial }, { mobile: 1, syncCode: 1, _id: 0 })
        if (member) {
            res.status(200).send(member)
        } else {
            res.status(500).json({ message: 'Member Not Found' })
        }
    } catch (error) {
        res.status(500).send('membernotfound')
    }
})

// try {
//     router.post('/validmember', async (req, res) => {
//         const member = await Member.findOne({ deviceSerial: req.body.deviceSerial }, { mobile: 1, syncCode: 1, _id: 0 })
//         res.status(200).send(member)
//     })
// } catch (error) {
//     res.send(error)
// }



//********Create New Team***********/
router.post('/createteam', async (req, res) => {
    try {
        const newTeam = new Team(req.body)
        const crateTeam = await newTeam.save();
        res.status(201).send(crateTeam);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
})


//await Team.find({ 'teamMembers': { $elemMatch: { mobile: mobile } } }


/**********Join In a Team**********/
router.patch('/jointeam', async (req, res) => {
    try {

        const teamCode = req.body.teamCode;
        const mobileNumber = req.body.mobile;
        const myTeam = await Team.findOne({ teamCode: teamCode })
        const existingMobile = myTeam.teamMembers.find(member => member.mobile === mobileNumber)
        console.log(existingMobile)

        if (!existingMobile) {
            const result = await Team.updateOne({ teamCode: teamCode }, { $push: { teamMembers: { name: req.body.name, mobile: req.body.mobile, memberRole: 'pending' } } })
            res.status(201).send(result);

        } else {
            res.json({ messsage: "member already exists" })

        }

    } catch (err) {
        res.status(500).send(err);
    }
})

// /*********Approved team member in a team**********/

// router.patch('/memberApproved', async (req, res) => {
//     try {

//         const teamCode = req.body.teamCode;
//         const mobile = req.body.mobile;
//         console.log(teamCode, mobile);

//         const desairedTeam = await Team.updateOne({ teamCode: teamCode, 'teamMembers': { $elemMatch: { mobile: mobile } } }, { $set: { "teamMembers.$.memberRole": "member" } })
//         res.status(201).send(desairedTeam);

//     } catch (err) {
//         res.status(500).send(err);
//     }
// })


// Get team members map/activity
router.get('/membertrack/map/:mobile', async (req, res) => {
    try {
        const result = await Member.findOne({ mobile: req.params.mobile })
        // const x = { ...result }
        res.send(result);

    } catch (error) {
        res.send(error)
    }
})

// Get my teams
router.post('/:mobile', async (req, res) => {
    try {
        console.log(req.params.mobile);

        const myTeams2 = await Team.updateMany({ teamMembers: { $elemMatch: { mobile: req.params.mobile } } }, { $set: { teamMembers: { memberRole: "pending" } } })



        // myTeams2.map(myTeams1 => {
        //     const teamMembers = myTeams1.teamMembers;

        //     const filteredTeamMember = teamMembers.filter(teamMember => teamMember.mobile === req.params.mobile)
        //     console.log(filteredTeamMember);
        // })
        res.status(200).send(myTeams2)



    } catch (error) {
        res.status(500).send(error)
    }

})

module.exports = router