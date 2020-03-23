'use strict'

const mongoose = require('mongoose');

//conexión con mongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}).then(db =>{
    console.log('conexión exitosa a MDB');
}).catch(err =>{
    console.log(err);
});