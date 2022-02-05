const express = require('express');
const userHandler = require('./routeHandler/userHandler');

const app = express();

app.use('/user', userHandler);

app.listen(5000, () => console.log("server running on port: 5000"))