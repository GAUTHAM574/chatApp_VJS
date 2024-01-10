import React from "react";
import Display from './Display';
import InputBar from './InputBar';
import './Styles/Messages.css'
const Messages = ({room,message, messages, setMessage, sendMessage}) => {
    return (
        <div className="MssgOuterContainer">
            <h2 className = 'MssgHeading'>Chat App V2, Room : {room}</h2>
            <div className="MssgInnersContainer">
                <Display messages = {messages}/>
                <InputBar message = {message} setMessage = {setMessage} sendMessage = {sendMessage} />
            </div>
        </div>
    )
}

export default Messages;