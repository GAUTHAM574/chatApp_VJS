import {React} from 'react';
import './Styles/InfoBar.css';

const InfoBar = (props) => {
    return (
        <div className='InfoBar'>
            <div className='InfoLeftInnerConatiner'>
                <h1 className='InfoBlock'>
                    <span>Name : <span className='NameBlock'>{props.name}</span></span>
                </h1>
            </div>
            <div className='InfoMiddleInnerContainer'>
                <h2 className='RoomUserHeading'>Users</h2>
                <div className='RoomUserContainer'>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                    <div className='RoomUser'>hi</div>
                </div>
            </div>
            <div className='InfoRightInnerConatiner'>
                <a href="/Join">
                    <button className='LeaveButton'>Leave Room</button>
                </a>
            </div>
        </div>
    )
}

export default InfoBar;