const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gold_gym_3x');
// port = 3000;
port = process.env.PORT || 3000;
hostname = '127.0.0.1';

const express = require('express');
const app = express();

require('dotenv').config();

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

app.listen(port, hostname,()=>{
    console.log(`Server is starting at http://${hostname}:${port}/`);
})