const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger= require('./winston/logger');

const userRouter = require('./routes/users');


//dotenv
require('dotenv').config();
const url = process.env.MONGO_URL;
const port = process.env.port || 8000;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/userdetails',userRouter);


mongoose.connect(url,{useNewurlParser:true});
const connection = mongoose.connection;

connection.on('open',()=>{
    logger.log('info','connected to db')
})

app.listen(port,()=>logger.log('info','server is running...'))