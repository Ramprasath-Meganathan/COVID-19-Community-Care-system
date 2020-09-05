/**
 * Author : Ram prasath Meganathan (B00851418) - This page is used for registering feedback in the database 
 * Allowed Roles: All unregistered users, Registered roles: donor, admin
 */
import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ConfirmMessage from '../../components/ConfirmMessage';
import "../css/ContactUs.css";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      textbox: "",
      message:""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (event) => {
    axios.post('/user/addfeedback', {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      comments: this.state.textbox
    }).then(res => {
      console.log(res)
      this.setState({message: "Feedback Sent successfully"});
      return res.data
    }).catch(err => {
      console.log(err)
    })
    this.setState ( {
      firstname: "",
      lastname: "",
      email: "",
      textbox: ""});
      setTimeout(() =>  this.setState({message: ""}), 3000);
    event.preventDefault();
  };

  render() {
    return (
      <section>
        <section className="container">
          <h1 style={{ textAlign: "center" }}>
            <b>Get in Touch</b>
          </h1>
          <section className="row row-content align-items-center">
            <article className="col-12 col-sm-7 ContactUs">
            {this.state.message.length>0 ? <ConfirmMessage message={this.state.message}/> : null }
              <form onSubmit={this.handleSubmit}>
                <h3>Contact Us</h3>
                <small>All fields are required unless marked as optional</small>
                <Form.Row>
                  <Form.Group as={Col} controlId="firstname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      autoFocus
                      required
                      size="sm"
                      type="text"
                      placeholder="First name"
                      value={this.state.firstname}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="lastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      autoFocus
                      required
                      size="sm"
                      type="text"
                      placeholder="Last name"
                      value={this.state.lastname}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form.Row>
                <FormGroup controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    autoFocus
                    required
                    type="email"
                    size="sm"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <Form.Text
                    style={{ paddingBottom: "0px" }}
                    className="text-muted"
                  >
                    We'll never share your email with anyone else.
                  </Form.Text>
                </FormGroup>
                <Form.Group>
                  <Form.Label>Tell us more</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="textbox"
                    maxLength={800}
                    rows="4"
                    required
                    value={this.state.textbox}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </form>
            </article>
            <section
              style={{ textAlign: "center" }}
              className="col-12 col-sm-auto offset-sm-1"
            >
              <h1 style={{ paddingTop: "50px", fontweight: "700" }}>
                Our Address
              </h1>
              <address style={{ fontSize: "100%" }}>
                6050 University Avenue
                <br />
                Halifax, NS B3H 4R2
                <br />
                Canada
                <br />
                <i className="fa fa-phone"></i>: +1-123-456-7890
                <br />
                <i className="fa fa-envelope"></i>:
                <a href="mailto:communitycare@halifax.org">
                  communitycare@halifax.org
                </a>
              </address>
              <section className="btn-group" role="group">
                <a
                  role="button"
                  className="btn btn-success"
                  href="tel:+85212345678"
                >
                  <i className="fa fa-phone"></i> Call
                </a>
                <a
                  role="button"
                  className="btn btn-primary"
                  href="skype:YourSkypeName?call"
                >
                  <i className="fa fa-skype"></i> Skype
                </a>
                <a
                  role="button"
                  className="btn btn-info"
                  href="mailto:communitycare@halifax.org"
                >
                  <i className="fa fa-envelope-o"></i> Email
                </a>
              </section>
            </section>
          </section>
        </section>
        <Image
          src="https://images.unsplash.com/photo-1473163928189-364b2c4e1135?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920"
          fluid
          alt="First slide"
          style={{ paddingBottom: "20px" }}
        />
      </section>
    );
  }
}
