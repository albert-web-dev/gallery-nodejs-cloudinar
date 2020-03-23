const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exhbs = require('express-handlebars');

//init
const app = express();
require('./dbconection');

//config port & engine
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'parcial'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
//obtener informacion e images que se suban
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false})); //entender solo texto

//configurar la subida de imágenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),  //dónde colocar la imágen
    filename: (req, file, callb) => {
        callb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));

//rutes
app.use(require('./routes/index'));

module.exports = app;