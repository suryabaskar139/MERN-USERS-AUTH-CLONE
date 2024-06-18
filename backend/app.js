const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('./config/connectDb');
dotenv.config({path : path.join(__dirname,'config','config.env')})
const app = express();


connectDb();

app.get('/',(req,res) => {
    res.json("Welcome Home!")
});

app.listen(process.env.PORT,() => {
    console.log(`Server Connected to localhost`);
});
