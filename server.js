const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('pages/index')
});

server = app.listen(3000);

//socket io
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('New user connected')
    socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username
    });

    socket.on('new_message', (data) => {
        console.log('server NEW MEssage:' + data.message.length)
        if(data.message.length != 0){
            io.sockets.emit('new_message', {message: data.message, username: socket.username});
        }
    })
});