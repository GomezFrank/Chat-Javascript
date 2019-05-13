const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path')

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

app.set('port', process.env.PORT || 3000)
require('./sockets')(io);

//db coneccion
mongoose.connect('mongodb+srv://gomezfrank:gomezfrank@cluster0-fewm9.mongodb.net/test?retryWrites=true',{
    useNewUrlParser:true
})
    .then(db => console.log('Esta conectada la bd'))
    .catch(err => console.log(err));


//archivos static
app.use(express.static(path.join(__dirname, 'public')));

//empezando el server
server.listen(app.get('port'), () =>{
    console.log('Server or port', app.get('port'));
});