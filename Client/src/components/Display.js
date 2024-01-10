import React from "react";
import './Styles/Display.css'
const Display = ({messages}) => {
    return (
        <div className="DisplayOuterContainer">
            <div className="DisplayInnerContainer">
                {
                    messages.map((message, i) => {
                        // console.log(document.querySelector('.NameBlock').innerText, message.user)
                        if(message.user === document.querySelector('.NameBlock').innerText) {
                            return <div key={i} className="DisplayContainerRight">
                                <div className="messageContainerRight"> 
                                    {/* <div className="username">{message.user}</div> */}
                                    <div className="usermessage">{message.text}</div>
                                    <div className="time">{message.time}</div>
                                </div>
                                <div className="RightBubble">
                                    <div className="RightBubbleInner"></div>
                                </div>
                            </div>
                        } 
                        else{
                            return <div key={i} className="DisplayContainerLeft">
                                <div className="LeftBubble">
                                    <div className="LeftBubbleInner"></div>
                                </div>
                                <div className="messageContainerLeft"> 
                                    <div className="username">{message.user}</div>
                                    <div className="usermessage">{message.text}</div>
                                    <div className="time">{message.time}</div>
                                </div>
                            </div>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Display;