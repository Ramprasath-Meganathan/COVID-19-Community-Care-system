/**
 * @author Mayank Bagla
 */

const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose');
const userRequestRouter=require('./routes/UserRequestRouter');
const cors=require('cors');
const path = require('path');
app.use(cookieparser());
app.use(express.json());

mongoose.connect('mongodb+srv://user123:user123@cluster0.jfkas.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("connected succesfully to MongoDB");
});

app.use(cors());
const userRouter = require('./routes/User');
app.use('/user',userRouter);
app.use('/userrequest',userRequestRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('reactdemoapp/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'reactdemoapp','build','index.html'));
    });
}

const port = process.env.PORT || 5000;


app.listen(port,()=>{
    console.log("express server started");
});