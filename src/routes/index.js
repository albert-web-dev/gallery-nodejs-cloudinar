const express = require('express');
const Controller = require('../controller/index');
const router = express.Router();

//rutas
router.get('/', Controller.home);
router.get('/images/add', Controller.images);
router.post('/images/add', Controller.upload_image);
router.get('/images/delete/:photo_id', Controller.delete);

module.exports = router;