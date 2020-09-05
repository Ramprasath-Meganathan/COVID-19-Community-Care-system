/**
 * @author Mayank Bagla
 */

// Used for protecting routes and allowing to impose Authorization based on user roles

import React,{useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext';

const PrivateRoute = ({component : Component,roles,...rest})=>{
    const {isAuthenticated, user} = useContext (AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(!isAuthenticated)
                return <Redirect to={{ pathname:'/login',
                                        state: {from:props.location}}}/>

            if(!roles.includes(user.role))
                return <Redirect to={{ pathname:'/',
                                        state: {from:props.location}}}/>

            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;