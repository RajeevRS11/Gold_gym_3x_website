const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
require('dotenv').config();

port = process.env.PORT;
// localhost = '127.0.0.1';

const express = require('express');
const app = express();


const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

// app.listen(port, localhost, ()=>{
//     console.log(`Server is starting at http://${localhost}:${port}/`);
// })

app.listen(port, ()=>{
    console.log(`Server is starting at http://${port}/`);
})