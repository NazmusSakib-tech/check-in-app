const express = require('express');
const mongoose = require('mongoose');
const userHandler = require('./routeHandler/userHandler');

// db connection
mongoose.connect("mongodb://localhost/checkin").then(() => {
    console.log("db connection established");
}).catch(err => console.log("not connected"));

const app = express();
app.use(express.json());

app.use('/user', userHandler);

app.listen(5000, () => console.log("server running on port: 5000"))