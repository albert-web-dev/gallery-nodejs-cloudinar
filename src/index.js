if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const app = require('./app');

app.listen(app.get('port'), () =>{
    console.log('Server en el puerto ', app.get('port'));
    console.log('Enviroments '+process.env.NODE_ENV);
});