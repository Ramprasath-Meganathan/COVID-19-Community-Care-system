/**
 * @author Mayank Bagla
 */

import React, { Component,useState,useRef } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Form,
} from "react-bootstrap";
import "../css/ForgotPassword.css";
import AuthService from '../../Services/AuthService';
import Message from '../../components/Message';
import { useHistory } from "react-router-dom";

const ResetPassword  = props=>{
  const [user,setUser] = useState({newPass:"",resetLink:""});
  let timerID = useRef(null);
  const [message,setMessage] = useState(null);


  const handleChange  = e => {
    
    let token = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
    setUser({newPass:e.target.value,resetLink:token});
    
  };

  const history = useHistory();
  // const handleSubmit = event => {
  //   alert("Password Reset link has been sent to your email.");
  //   event.preventDefault();
  // };

  const handleSubmit = e =>{
    e.preventDefault();
    AuthService.reset(user).then(data=>{
       const {message} = data;
       setMessage(message);
       
       if(!message.msgError){
           timerID = setTimeout(() => {
               history.push('/');
           }, 2000);
       }
    });
}

  
    return (
      <section className="col-12 col-sm-7 offset-sm-3 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <article className="ForgotPassword">
        {message ? <Message message={message}/> : null }
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="newPass">
              <h3>Password Assistance</h3>
              <FormLabel>Password</FormLabel>
              <FormControl
                autoFocus
                required
                minLength={8}
                maxLength={20}
                name="newPass"
                type="password"
                placeholder="Atleast 8 characters long"
                value={user.newPass}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Enter a valid password.</Form.Text>
            </FormGroup>
            <Button style={{ padding: "10px" }} variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </article>
      </section>
    );
  }

  export default ResetPassword ;