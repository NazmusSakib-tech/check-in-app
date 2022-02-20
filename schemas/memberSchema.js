const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");


const memberSchema = new mongoose.Schema({
    name: String,
    mobile: {
        type: String,

    }, // unique
    pinCode: String,
    syncCode: {
        type: String,

    }, // unique
    deviceSerial: {
        type: String,

    },
    manufacture: {
        type: String,

    },
    modelNumber: {
        type: String,

    },
    activity: [
        {
            activityType: String,
            lat: String,
            long: String,
            pedoCount: Number,
            batteryStatus: String,
            date: { type: Date, default: dateThailand },
            time: String,
        }
    ]
});

const Member = new mongoose.model('Member', memberSchema);

module.exports = Member;