import React, {useEffect, useState} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import './Styles/Chat.css'
import { useLocation } from "react-router";

import InfoBar from './InfoBar';
import Messages from "./Messages";
let socket;

const Chat = () => {
    const location = useLocation();

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const SERVERLOACTION = 'localhost:5000';

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);

        socket = io(SERVERLOACTION, {transports:['websocket']});
        setName(name);
        setRoom(room);

        socket.emit('Join', {name, room}, ()=>{
            
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [SERVERLOACTION, location.search]);
    //effect only if serverlocation or url changes

    useEffect (() => {
        console.log(messages);
        socket.on('message', (message)=>{
            messages.push(message);
            setMessages(messages);
            var elem = document.querySelector('.DisplayInnerContainer');
            if(elem){
                elem.scrollTop = elem.scrollHeight;
            }
            console.log('messagealert')
        })
        socket.on('UserList', (usersList) => {
            const divConatiner = document.querySelector('.RoomUserContainer');
            let innerhtml = ``;
            usersList.forEach(user => {
                innerhtml += `<div class = 'RoomUser'>${user}</div>`
            });
            divConatiner.innerHTML = innerhtml;
        })
    }, [messages]);
    const sendMessage = (event) => {
        event.preventDefault()
        if(message) {
            const now = new Date();
            const time = (now.getHours() <= 9 ? '0' + now.getHours(): now.getHours()) + ':' +( now.getMinutes() <= '9' ? '0'+now.getMinutes() : now.getMinutes());
            socket.emit('sendMessage', {message, time}, () => setMessage(''));
        }
    }
    let props = {
        room ,
        name 
    }
    return (
        <div className="ChatOuterConatiner">
            <div className="ChatInnerContainer">
                <InfoBar {...props}/>
                <div className="ColumnSeperator"></div>
                <Messages room = {room} message = {message} messages = {messages} setMessage={setMessage} sendMessage = {sendMessage} />
            </div>
        </div>
    )
}

export default Chat;
