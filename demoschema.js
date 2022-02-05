const memberSchema = {
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
            date: String,
            time: String,
            lat: String,
            long: String,
            pedoCount: Number,
            batteryStatus: String,
        }
    ]
}

const teamSchema = {
    teamCode: String, // unique
    name: String,
    desc: String,
    parentTeam: String,
    teamMembers: [
        {
            mobile: String,
            memberRole: String, // owner, admin, member, pending
        }
    ]

}

const organizationSchema = {
    name: String,
    id: String,
    description: String,
    members: [
        { adminid: String } //admin id come from memberid
    ]
}
