import React from "react";
import {Routes , Route } from 'react-router-dom'

import Home from './pages/Home'
import About from  './pages/About'

export default () => {
    return(
        <Routes>
            <Route element = {<Home/>} exact path="/" />
            <Route element = {<About />} exact path="/about" />
        </Routes>        
    
    )
}


