$(function(){
    //var socket = io.connect('http://localhost:5000')
    var socket = io.connect('https://blooming-island-60825.herokuapp.com')
    console.log('Client Connection');

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

    message.bind('keypress', (e) =>{
        var key = e.which || e.keyCode;
        if (key === 13) {
            console.log('Enter pressed');
            socket.emit('new_message', { message: message.val()})
        }
    })

    window.setInterval(function(){
        var chatroom_container = document.getElementById('chatroom_container');
        chatroom_container.scrollTop = chatroom_container.scrollHeight;
    }, 2000);
});