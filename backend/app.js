const express = require('express');
const cabinRouter = require('./routes/cabinRoutes');

const app = express();

app.use(express.json());


app.use('/api/v1/cabins', cabinRouter);




module.exports = app;