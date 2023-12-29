const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

//Controllers
const formatMssg = require('./utils/messages')
const {
    userJoin,
    getCurrUser,
    userLeaves,
    getRoomUsers
} = require('./utils/users')


const app = express()
const server = http.createServer(app)
const io = socketio(server)
const serverName = 'chatApp Bot'


app.use(express.static(path.join(__dirname, 'public')))

//on connection
io.on('connection', (socket) => {

    //new join
    socket.on('joinRoom', ({
        username,
        room
    }) => {

        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        //welcum mmsg
        socket.emit('message', formatMssg(serverName, 'Welcome to the chat!'));
        //ssending announcement
        socket.broadcast
            .to(user.room)
            .emit('message', formatMssg(serverName, `${user.username} has joined`));

        //sending room users
        io.to(user.room).emit('userList', getRoomUsers(user.room));
    });

    //new msg
    socket.on('chatMessage', (msg) => {
        const user = getCurrUser(socket.id);
        io.to(user.room).emit('message', formatMssg(user.username, msg))
    })

    //on leave
    socket.on('disconnect', () => {
        const user = userLeaves(socket.id)
        if (user) {
            const userDel = user
            io.to(userDel.room).emit('message', formatMssg(serverName, `${userDel.username} has left `));
            io
                .to(user.room)
                .emit('userList', getRoomUsers(user.room));
        }
    })

})
const port = 3000 || process.env.PORT
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});