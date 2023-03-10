import React from "react";
import {Routes , Route } from 'react-router-dom'

import Home from './pages/Home'
import About from  './pages/About'
import NotFound from './pages/NotFound'
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default () => {
    return(
        <Routes>
            <Route element = {<Home/>} exact path="/" />
            <Route element = {<About />} exact path="/about" />
            <Route element= {<SignIn />} exact path ="/signin"></Route>
            <Route element ={<SignUp />} exact path ="signup"></Route>
            <Route element= {<NotFound />} exact path="*"></Route>
        </Routes>        
    
    )
}


