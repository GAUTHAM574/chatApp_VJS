import React from "react";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Join from "./components/Join";
import Chat from "./components/Chat";
import Create from "./components/Create";

const App = () => {return (
        <Router>
            <Routes>
                <Route path = "/" exact element = {<Create/>}/>
                <Route path = "/Join" element = {<Join/>}/>
                <Route path = "/Chat" element = {<Chat/>}/>
            </Routes>
        </Router>
    );}


export default App;