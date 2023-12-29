const socket = io();
const Form = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Getting userdetails from form
const {
    username,
    room
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

//Updating User room
const roomName = document.getElementById('room-name')
roomName.innerHTML = room

//making a joining announcement
socket.emit('joinRoom', {
    username,
    room
});

//sending chat message
Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//on any message through socket
socket.on('message', (message) => {
    console.log(message)
    updateMessage(message);
})

//getting userlist from server
socket.on('userList', (users) => {
    console.log(users)
    const sidebarList = document.getElementById("users")
    str = ``
    users.forEach((user) => {
        str += `<li>${user.username}</li>`
    })
    sidebarList.innerHTML = str;
})


//updating innerHTML
function updateMessage(message) {

    const div = document.createElement('div');
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>`;
    document.querySelector('.chat-messages').appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;

}