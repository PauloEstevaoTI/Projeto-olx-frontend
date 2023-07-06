import React from "react";
import { Routes , Route } from 'react-router-dom'
import  RouteHandler  from "./components/RouteHandler";

import Home from './pages/Home'
import About from  './pages/About'
import NotFound from './pages/NotFound'
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";
import AddAd from "./pages/AddAd";

export default () => {
    return(
        <Routes>
            <Route element = {<Home/>} exact path="/" />
            <Route element = {<About />} exact path="/about" />
            <Route element= {<SignIn />} exact path ="/signin"></Route>
            <Route element ={<SignUp />} exact path ="/signup"></Route>
            <Route element ={<AdPage />} exact path="/ads/:id"></Route>
            <Route element= {<NotFound />} exact path="*"></Route>
            <Route 
                path="/post-and-add"
                element={
                    <RouteHandler private>
                        <AddAd />
                    </RouteHandler>
                }
            />
        </Routes>        
    
    )
}


