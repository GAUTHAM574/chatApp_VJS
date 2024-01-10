const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getRoomUsers} = require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require('./router')
app.use(router)
const port = process.env.PORT || 5000;

io.on('connect', (socket)=>{
    console.log('We have a new connection');
    socket.on('Join', ({name, room}, callback) => {
        const { error, user } = addUser({id:socket.id, name, room});
        if(error) {
            return callback(error);
        }
        const now = new Date();
        const time = (now.getHours() <= 9 ? '0' + now.getHours(): now.getHours()) + ':' + (now.getMinutes() <= '9' ? '0'+now.getMinutes() : now.getMinutes());
        socket.emit('message', {user: 'admin', text :`Hello ${name}, welcome to the room ${room}`, time})
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text :`${name} has joined!`, time})
        
        socket.join(user.room);

        const usersObj = getRoomUsers(user.room);
        let usersinroom = []
        usersObj.forEach(user => {
            usersinroom.push(user.name);
        })
        io.to(user.room).emit('UserList', usersinroom)
        callback()
    });

    socket.on('sendMessage', ({message, time}, callback) => {
        const user = getUser(socket.id);
        if( user ) {
            io.to(user.room).emit('message', {user: user.name, text : message, time:time});
            callback();
        }
    });
    socket.on('disconnect', ()=>{
        console.log('Someone Disconnected')
        const user = getUser(socket.id);
        if(!user){
            return
        }
        removeUser(socket.id);
        const usersObj = getRoomUsers(user.room);
        let usersinroom = []
        usersObj.forEach(user => {
            usersinroom.push(user.name);
        })
        io.to(user.room).emit('UserList', usersinroom)
        const now = new Date();
        const time = (now.getHours() <= 9 ? '0' + now.getHours(): now.getHours()) + ':' + (now.getMinutes() <= '9' ? '0'+now.getMinutes() : now.getMinutes());
        io.to(user.room).emit('message', {user: 'admin', text :`${user.name} has left!`, time})
    })
})



server.listen(port, ()=>{
    console.log('Server is now live at', Date())
})
