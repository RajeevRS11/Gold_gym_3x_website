require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

port = process.env.PORT;

const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

app.listen(port, () => {
  console.log(`Server is starting at http://localhost:${port}/`);
});
