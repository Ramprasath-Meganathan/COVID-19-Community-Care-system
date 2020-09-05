/**
 * @author Mayank Bagla
 */

// Used for protecting routes and allowing to impose Authorization based on user roles


import React,{useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext';

const UnPrivateRoute = ({component : Component,...rest})=>{
    const {isAuthenticated} = useContext (AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(isAuthenticated)
                return <Redirect to={{ pathname:'/',
                                        state: {from:props.location}}}/>

            return <Component {...props}/>
        }}/>
    )
}

export default UnPrivateRoute;