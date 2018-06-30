$(function(){
    //var socket = io.connect('http://localhost:5000')
    var socket = io.connect('https://flatchat.herokuapp.com')
    console.log('Client Connection');

    var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
    var chatroom_container = $("#chatroom_container")

    var speechSynthesisEnabled = false;
    if('speechSynthesis' in window){
        speechSynthesisEnabled = true;
    }
    socket.on('connect', function(){
        console.log('Connected')
    })

    socket.on('disconnect', function(){
        console.log('disconnected');
    })
    var itsMe = false;

    socket.on('new_message', (data) => {
        if(itsMe === true){
            data.username = data.username === 'Anonymous' ? 'You' : data.username;
            message.val('')
            itsMe = false;
        } else {
            if(speechSynthesisEnabled === true && !muted){
                var msg = new SpeechSynthesisUtterance(data.username + ' says ' + data.message);
                msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name === 'Lekha'})[0];
                window.speechSynthesis.speak(msg);
            }
        }
        
        chatroom.append("<p class='newmessage'><strong>" + data.username + ":</strong> " + data.message + "</p>")
    })
    
    send_username.on('click', function(){
        socket.emit('change_username', {username: username.val()})
    })

    message.bind('keypress', (e) =>{
        var key = e.which || e.keyCode;
        if (key === 13) {
            itsMe = true;
            socket.emit('new_message', { message: message.val()})
        }
    })
    send_message.on('click', function(){
        itsMe = true;
        socket.emit('new_message', { message: message.val()})
    })

    var mouseInChatroom = false
    chatroom_container.mouseenter(function(){
        mouseInChatroom = true
    })
    chatroom_container.mouseleave(function(){
        mouseInChatroom = false
    })

    window.setInterval(function(){
        if(!mouseInChatroom){ 
            var chatroom_container = document.getElementById('chatroom_container');
            chatroom_container.scrollTop = chatroom_container.scrollHeight;
        }
    }, 3000);

    var muted = false;
    $("#infoToggler").click(function() {
        $(this).find('img').toggle();
        muted = !muted;
    })
});