/**
 * @author Mayank Bagla
 */

// Registration Form


import React, { useState, useRef,useEffect } from "react";
import {
  Form,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import '../css/RegisterForm.css'
import AuthService from '../../Services/AuthService';
import Message from '../../components/Message';
import { useHistory } from "react-router-dom";


const Register = props=>{
  const [user,setUser] = useState({username:"", password: "",firstname: "",lastname: "", role: ""});
  const [input, setInput] = useState({confirmPassword:""});
  
  const [message,setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(()=>{
      return ()=>{
          clearTimeout(timerID);
      }
  },[]);

  const onChange = e=>{
    e.preventDefault();
      setUser({...user,[e.target.name]:e.target.value});
  }

  const validateForm = e=>{
    return user.password === input.confirmPassword;
  }

  const passwordCheck = e=>{
    e.preventDefault();
    setInput({...input,[e.target.name]:e.target.value});
  }

  const resetForm = ()=>{
      setUser({username:"",password:"",firstname: "",lastname: "",role:""});
      setInput({confirmPassword:""});
  }
  const history = useHistory();
  const onSubmit = e =>{
      e.preventDefault();
      AuthService.register(user).then(data=>{
         const {message} = data;
         setMessage(message);
         resetForm();
         if(!message.msgError){
             timerID = setTimeout(() => {
                 history.push('/login');
             }, 1000);
         }
      });
  }

  return(
     

    <section className="container">
    <article className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
      <section className="Register">
      {message ? <Message message={message}/> : null }
        <form onSubmit={onSubmit}>
          <h3>Create Account</h3>
          <small>All fields are required unless marked as optional</small>
          <Form.Row>
            <Form.Group as={Col} controlId="firstname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                autoFocus
                required
                size="sm"
                type="text"
                name="firstname"
                placeholder="First name"
                value={user.firstname}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                name="lastname"
                required
                size="sm"
                type="text"
                placeholder="Last name"
                value={user.lastname}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
          <FormGroup controlId="username">
            <FormLabel>Email</FormLabel>
            <FormControl
              name="username"
              required
              type="email"
              size="sm"
              value={user.username}
              onChange={onChange}
            />
            <Form.Text
              style={{ paddingBottom: "0px" }}
              className="text-muted"
            >
              We'll never share your email with anyone else.
            </Form.Text>
          </FormGroup>
          <Form.Group controlId="role">
            <Form.Label>User Type</Form.Label>
            <Form.Control
              as="select"
              onChange={onChange}
              value={user.role}
              required
              name="role"
              size="sm"
            >
              <option value="">Select</option>
              <option value="Donor">Donor</option>
              <option value="Requestor">Requestor</option>
            </Form.Control>
          </Form.Group>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              name="password"
              required
              minLength={8}
              maxLength={20}
              size="sm"
              value={user.password}
              placeholder="Atleast 8 characters long"
              onChange={onChange}
              type="password"
            />
            <Form.Text
              style={{ paddingBottom: "0px" }}
              className="text-muted"
            >
              Your password must be 8-20 characters long.
            </Form.Text>
          </FormGroup>
          <FormGroup controlId="confirmpassword">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              required
              type="password"
              size="sm"
              value={input.confirmPassword}
              onChange={passwordCheck}
              name="confirmPassword"
              isInvalid={
                user.password !== input.confirmPassword
              }
              isValid={
                user.password === input.confirmPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              Please make sure your passwords match
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              Looks good
            </Form.Control.Feedback>
          </FormGroup>
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Subscribe for Notifications"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={!validateForm()}
          >
            Create your Account
          </Button>
          <Form.Text
            style={{ paddingBottom: "0px", textAlign: "center" }}
            className="text-muted"
          >
            Button will be enabled when both passwords match.
          </Form.Text>
          <p className="divider">
            <span>OR</span>
          </p>
          <a
            style={{ textAlign: "center", paddingTop: "5px" }}
            href="/login"
          >
            Already have an account?
          </a>
        </form>
        
      </section>
    </article>
    </section>

  )
}


export default Register;

