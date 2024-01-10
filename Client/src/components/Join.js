import React, {useState} from "react";
import { Link } from 'react-router-dom';
import './Styles/Join.css'
const Join = () => {
    const [name, setName ] = useState('');
    const [room, setRoom ] = useState('');
    return (
        <div className="JoinOuterContainer">
            <div className="JoinInnerBorderContainer">
                <div className="JoinInnerContainer">
                    <h1 className="heading">Join up</h1>
                    <form className="FormConatiner">
                        <div className="InputContainer">
                            <input type='text' id="FormName" placeholder='Name' required className="inputField" onChange={(event) => setName(event.target.value)}></input>
                            <label for="FormName" className="inputLabel">Name</label>
                        </div>
                        <div className="InputContainer">
                            <input type='text' id = "FormRoom" placeholder='Room' required  className="inputField" onChange={(event) => setRoom(event.target.value)}></input>
                            <label for="FormRoom" className="inputLabel">Room</label>
                        </div>
                        <div className="ButtonContainer">
                            <div className="ButtonInnerConatiner">
                            <Link onClick = {event => (!name || !room)? event.preventDefault() : null } to= {`/Chat?name=${name}&room=${room}`}>
                                <button className="submit-button" type="submit">Join Room</button>
                            </Link>
                            </div>
                            <div className="ButtonInnerConatiner">
                            <Link to= {'/'}>
                                <button className="submit-button" type="submit">Create Room</button>
                            </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join;