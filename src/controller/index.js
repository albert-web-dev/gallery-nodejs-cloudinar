'use strict'

//const path = require('path');
const Foto = require('../models/Foto');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRERT 
});

var controller = {
    home:async (req, res) => {
        let photos = await Foto.find();
        return res.render('images', {photos});
    },
    images:async (req, res) =>{
        const photos = await Foto.find();
        return res.render('image_form', {photos});
    },
    upload_image:async (req, res) => {
        try{
            const response = await cloudinary.v2.uploader.upload(req.file.path);
            const newFoto = new Foto({
                title: req.body.title,
                description: req.body.description,
                imageURL: response.url,
                public_id: response.public_id
            });
            await newFoto.save();
            await fs.unlink(req.file.path);
            return res.redirect('/');
        }catch(err){
            console.log(err);
        }
    },
    delete:async (req, res) =>{
        const {photo_id} = req.params;
        let photo = await Foto.findByIdAndDelete(photo_id);
        let response = await cloudinary.v2.uploader.destroy(photo.public_id);
        return res.redirect('/images/add')
    }
}

module.exports = controller;