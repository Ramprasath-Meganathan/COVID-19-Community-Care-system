/**
 * @author Mayank Bagla
 */

import React, { useContext } from "react";
import logo from "../images/logo1.png";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";

const Navigation = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  const history = useHistory();
  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        history.push("/login");
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <LinkContainer exact to="/register">
          <Nav.Link>
            <span className="fa fa-user-plus fa-lg"></span> Register
          </Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/login">
          <Nav.Link>
            <span className="fa fa-sign-in fa-lg"></span> Login
          </Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/forgotpassword">
          <Nav.Link>
            <span className="fa fa-unlock fa-lg"></span> Forgot Password
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/contactus">
          <Nav.Link>
            <span className="fa fa-address-book fa-lg"></span> Contact Us
          </Nav.Link>
        </LinkContainer>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        {user.role === "admin" ? (
          <React.Fragment>
            <LinkContainer exact to="/admin">
              <Nav.Link>
                <span>Admin Dashboard</span>
              </Nav.Link>
            </LinkContainer>
          </React.Fragment>
        ) : null}



        {user.role === "Donor" ? (
          <React.Fragment>
            <LinkContainer exact to="/donorform">
              <Nav.Link>
                <span>Donor Form </span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/history">
              <Nav.Link>
                <span>History</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/dashboard">
              <Nav.Link>
                <span>Dashboard</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/contactus">
              <Nav.Link>
                <span>Contact Us</span>
              </Nav.Link>
            </LinkContainer>
          </React.Fragment>
        ) : null}
        {user.role === "Requestor" ? (
          <React.Fragment>
            <LinkContainer exact to="/productpage">
              <Nav.Link>Product Page</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/contactus">
              <Nav.Link>
                <span>Contact Us</span>
              </Nav.Link>
            </LinkContainer>
          </React.Fragment>
        ) : null}
        <Nav.Link onClick={onClickLogoutHandler}>Logout</Nav.Link>
      </>
    );
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          alt="Community Care logo"
          className="d-inline-block align-top"
        />
        <span style={{ padding: "0 10px" }}>
          <b>Community Care</b>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
