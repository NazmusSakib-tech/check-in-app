const mongoose = require('mongoose');


const teamSchema = new mongoose.Schema({
    teamCode: String, // unique
    name: String,
    desc: String,
    parentTeam: String,
    teamMembers: [
        {
            name: String,
            mobile: String,
            memberRole: String, // owner, admin, member, pending
        }
    ]

})

// teamSchema.path('teamCode').validate(async (teamCode) => {
//     const teamCodeCount = await mongoose.model.Team.countDocuments({ teamCode })
//     return !teamCodeCount

// }, 'Team Already exist')

const Team = new mongoose.model("Team", teamSchema);
module.exports = Team;