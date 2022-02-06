const express = require('express');
const mongoose = require('mongoose');
const userHandler = require('./routeHandler/userHandler');
const teamHandler = require('./routeHandler/teamHandler');

// db connection
mongoose.connect("mongodb://localhost/checkin").then(() => {
    console.log("db connection established");
}).catch(err => console.log("not connected"));

const app = express();
app.use(express.json());

app.use('/user', userHandler);
app.use('/myteam', teamHandler);

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(5000, "192.168.68.128", () => {
    console.log("server running on port: 5000")
})