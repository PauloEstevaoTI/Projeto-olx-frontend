import React from "react"
import { Navigate } from "react-router-dom"
import { isLogued } from "../helpers/AuthHandler"


const RouteHandler = ( { children, ...rest }) => {

   let logged = isLogued();

   let authorized = (rest.private && !logged) ? false : true;
   console.log(children)
   

   return authorized ? children : <Navigate to="/signin/" />

}

export default RouteHandler;