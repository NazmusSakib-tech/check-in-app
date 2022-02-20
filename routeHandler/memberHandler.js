const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const Member = require('../schemas/memberSchema');
const { redirect } = require('express/lib/response');

router.post('/signup', async (req, res) => {
    // console.log(req.body);
    const { mobile, syncCode } = req.body;
    try {
        const member = await Member.findOne({ mobile: mobile });
        if (!member) {
            const isSyncExist = await Member.findOne({ syncCode: syncCode });
            if (!isSyncExist) {
                const newMember = new Member(req.body);
                const hashedPassword = await bcrypt.hash(req.body.pinCode, 10);
                newMember.pinCode = hashedPassword;
                const result = await newMember.save();
                res.send(result);
            } else {
                res.status(501).send("Sync exist");
            }
        } else {
            res.status(501).send("Already exist");
        }


    } catch (error) {
        res.status(501).send(error);
    }
})

// change mobile and member update 
router.post('/reregistration', async (req, res) => {

    const filter = { mobile: req.body.mobile };
    const update = req.body;
    try {


        const updateMember = await Member.findOneAndUpdate(filter, update, {
            new: true
        });
        const hashedPassword = await bcrypt.hash(req.body.pinCode, 10);
        updateMember.pinCode = hashedPassword;
        const result = await updateMember.save();
        res.status(200).send(result);

    } catch (error) {
        res.status(404).json({ message: "user not found" });
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