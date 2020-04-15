const express = require('express');
const app = express();
const connection = require('./db/connection');
const {check, validationResult} = require('express-validator');
app.use(express.static('public'));
app.use(express.json());

//not working
const userRouter = require('./routes/users');
const messageRouter = require('./routes/messages');

app.use('/messages', messageRouter);
app.use('/users',userRouter);



























connection.once('open', ()=>{
    console.log('connected to database');
     const server = app.listen(8080, ()=>{
        console.log('listening on 8080');
    });
});
