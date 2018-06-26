$(function(){
    var socket = io.connect('http://localhost:3000')
    console.log('Client Connection: ');

    var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
    
    socket.on('connect', function(){
        console.log('Connected')
    })

    socket.on('disconnect', function(){
        console.log('disconnected');
    })

    send_message.on('click', function(){
        console.log('Clicked ! :: ' + message.val())
        socket.emit('new_message', { message: message.val()})
    })

    socket.on('new_message', (data) => {
        console.log('NEW MEssage')
        message.val('')
        chatroom.append("<p class='newmessage'><strong>" + data.username + ":</strong> " + data.message + "</p>")
    })

    send_username.on('click', function(){
        socket.emit('change_username', {username: username.val()})
    })

    window.setInterval(function(){
        chatroom.scrollTop(chatroom[0].scrollHeight);
    }, 5000);
});