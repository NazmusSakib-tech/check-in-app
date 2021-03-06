const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
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

})

const Team = new mongoose.model('Team', teamSchema);

module.exports = Team;