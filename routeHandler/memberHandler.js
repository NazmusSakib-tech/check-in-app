const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const Member = require('../schemas/memberSchema');

router.post('/signup', async (req, res) => {
    try {
        const newMember = new Member(req.body);
        const hashedPassword = await bcrypt.hash(req.body.pinCode, 10);
        newMember.pinCode = hashedPassword;
        newMember.save();
        res.send(newMember)
    } catch (error) {
        res.send("Not saved. Please try again");
    }
})

router.post('/login', async (req, res) => {
    try {
        const member = await Member.findOne({ mobile: req.body.mobile });
        console.log(member);
        const isValid = await bcrypt.compare(req.body.pinCode, member.pinCode);
        if (isValid) {
            // Please update the activity of the user. you get the activity in the req.body

            // console.log(req.body);
            console.log("valid");
            const { date, time, lat, long, pedoCount, batteryStatus } = req.body;
            const newActivity = {
                activityType: "loggedin",
                date,
                time,
                lat,
                long,
                pedoCount,
                batteryStatus,
            }
            const result = await Member.updateOne(
                { mobile: req.body.mobile },
                { $push: { activity: newActivity } }
            )
            // console.log(result);

            res.send(result)
        } else {
            res.send("Authentication failed");
        }
    } catch (error) {
        res.send("Authentication failed");
    }

})

module.exports = router;