import React, { useState, useContext } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import "../css/LoginForm.css";
/**
 * @author Mayank Bagla
 */

// ULogin Form

import AuthService from "../../Services/AuthService";
import Message from "../../components/Message";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";

const LoginForm = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        if (user.role === "Donor") history.push("/donorform");
        else history.push("/productpage");
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div className="col-12 col-sm-7 offset-sm-3 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <div className="Login">
        <form onSubmit={onSubmit}>
          <FormGroup controlId="email">
            <h3>Login</h3>
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              required
              type="email"
              name="username"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              required
              name="password"
              onChange={onChange}
              type="password"
            />
          </FormGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <p className="divider">
            <span>OR</span>
          </p>
          <div style={{ padding: "10px" }} className="text-center">
            <a style={{ paddingLeft: "15px" }} href="/register">
              Sign up
            </a>
            <span className="p-2">|</span>
            <a href="/forgotpassword">Forgot Password</a>
          </div>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </div>
  );
};

export default LoginForm;
