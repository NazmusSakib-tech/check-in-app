const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    mobile: String, // unique
    pinCode: String,
    syncCode: String, // unique
    deviceSerial: String,
    manufacture: String,
    modelNumber: String,
    activity: [
        {
            activityType: {
                type: String,
                enum: ["loggedin", "loggedout", "ping"]
            },
            lat: String,
            long: String,
            pedoCount: Number,
            batteryStatus: String,
            date: String,
            time: String,
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;