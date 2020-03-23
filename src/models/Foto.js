'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

//modelo
const Foto = Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String
});

module.exports = model('Foto', Foto);
