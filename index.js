const express = require('express');
const mongoose = require('mongoose');
const memberHandler = require('./routeHandler/memberHandler');
const teamHandler = require('./routeHandler/teamHandler');

// db connection
mongoose.connect("mongodb://localhost:27017/checkin-test").then(() => {
    console.log("db connection established");
}).catch(err => console.log("not connected"));

const app = express();
app.use(express.json());

app.use('/member', memberHandler);
app.use('/myteams', teamHandler);

app.get('/', (req, res) => {
    res.send("Hello")
})

// function errorHandler(err, req, res, next) {
//     if (res.headersSent) {
//         return next(err)
//     }
//     res.status(500)
//     res.render('error', { error: err })
// }

app.listen(9000, () => {
    console.log("server running on port: 9000")
})