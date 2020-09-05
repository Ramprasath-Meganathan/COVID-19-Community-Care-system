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

const ForgotPassword  = props=>{
  const [user,setUser] = useState({username:""});
  let timerID = useRef(null);
  const [message,setMessage] = useState(null);


  const handleChange  = e => {
    setUser({...user,[e.target.name]:e.target.value});
  };

  const history = useHistory();
  // const handleSubmit = event => {
  //   alert("Password Reset link has been sent to your email.");
  //   event.preventDefault();
  // };

  const handleSubmit = e =>{
    e.preventDefault();
    AuthService.forget(user).then(data=>{
       const {message} = data;
       setMessage(message);
       
       if(!message.msgError){
           timerID = setTimeout(() => {
               history.push('/');
           }, 1000);
       }
    });
}

  
    return (
      <section className="col-12 col-sm-7 offset-sm-3 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <article className="ForgotPassword">
        {message ? <Message message={message}/> : null }
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="username">
              <h3>Password Assistance</h3>
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                required
                name="username"
                type="email"
                value={user.username}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Enter a valid email.</Form.Text>
            </FormGroup>
            <Button style={{ padding: "10px" }} variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </article>
      </section>
    );
  }

  export default ForgotPassword ;