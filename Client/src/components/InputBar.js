import React from "react";
import './Styles/InputBar.css'
const InputBar = ({message, setMessage, sendMessage}) => {
    var keyPressed = {}
    return (
        <div className="InputOuterContainer">
            <div className="InputInnerContainer">
                <input type="paragraph" placeholder="Type a Message" value = {message} className="MessageInput" 
                    onChange={(event) => setMessage(event.target.value)} 
                    onKeyDown = { event => {
                        keyPressed[event.key] = true;
                        if(keyPressed['Shift'] && keyPressed['Enter']){
                            setMessage(message);
                        }
                        else if(event.key === 'Enter' && event.target.value){
                            sendMessage(event);
                        }
                    }}
                    onKeyUp = { event => {keyPressed[event.key] = false}}
                />
                <button className="EnterMessage" onClick={(event) => sendMessage(event)}> Send</button>
            </div>
        </div>
    )
}

export default InputBar;