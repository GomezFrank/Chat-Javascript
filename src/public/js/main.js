$(function (){
    console.log('Entro por aqui');

    const socket = io();

    //Obteniendo los elementos del DOM desde la interfaz
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    ////Obteniendo los elementos del DOM desde la nicknameForm

    const $nickForm = $('#nickForm');
    const $nickname = $('#nickName');
    const $nickError = $('#nickError');

    const $user = $('#usernames');

    $nickForm.submit( e =>{
        e.preventDefault();
        socket.emit('new user', $nickname.val(), (data) => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else {
                $nickError.html(`
                    <div class = "alert alert-danger">
                    <strong>Este username ya exite!</strong>
                    </div>
                `);
            }
            $nickname.val('');
        });
    
    });

    

    //Capturar eventos
    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val(), (data) => {
            $chat.append(`<p class = "error">${data}</p>`)
        });
        $messageBox.val('');
    });

    socket.on('new message', (data)=>{
        $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '</br>' );
    });

    socket.on('usernames', (data) => {
        let html = '';
        for (let i =0; i < data.length; i++){
            html += `<p style = "color:green"><i class="fas fa-user"></i> ${data[i]} </p>`
        }
        $user.html(html);
    });

    socket.on('whisper', (data) => {
        $chat.append(`<p class = "whisper"><b>${data.nick}:</b> ${data.msg} </p>`);
    });

    socket.on('cargar mensajes', msgs => {
        for(let i = 0; i < msgs.length; i++){
            displayMsg(msgs[i]);
        }
    });

    function displayMsg(data){
        $chat.append(`<p class = "whisper"><b>${data.nick}:</b> ${data.msg} </p>`);
    }

})
