import React, { Component } from "react";
import ImageUploader from "react-images-upload";
import { Form, Col, Row, Button } from "react-bootstrap";
import "./Profileupdate.css";

export default class Profileupdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      pictures: [],
      touched: {
        telnum: false,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === "telnum") {
      this.setState({ touched: { telnum: true } });
    }
  };

  submitValidation() {
    return this.state.telnum.length >= 10;
  }

  handleSubmit(event) {
    alert("Your profile updated successfully.");
    event.preventDefault();
  }
  render() {
    const phonelength = this.state.telnum.length;
    return (
      <section className="container">
        <section className="row row-content">
          <article className="col-12">
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "10px",
                fontWeight: "600",
              }}
            >
              Edit your profile
            </h1>
            <h6 className="fielddescription">
              All fields are required unless marked as optional
            </h6>
            <ImageUploader
              withPreview={true}
              singleImage={true}
              buttonText="Upload a profile picture"
              onChange={this.onDrop}
              label={"Max file size:5mb, accepted: jpg|gif|png, (optional)"}
              withIcon={false}
            />
          </article>
          <article
            style={{ padding: "50px" }}
            className="col-12 col-md-9 offset-md-3 form"
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="firstname">
                <Form.Label column md={2}>
                  First Name
                </Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    autoFocus
                    required
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="lastname">
                <Form.Label column md={2}>
                  Last Name
                </Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    autoFocus
                    required
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column md={2}>
                  Email
                </Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    autoFocus
                    required
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="telnum">
                <Form.Label column md={2}>
                  Phone Number
                </Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="number"
                    placeholder="Tel Number"
                    required
                    isInvalid={this.state.touched.telnum && phonelength < 10}
                    isValid={this.state.touched.telnum && phonelength >= 10}
                    value={this.state.telnum.slice(0, 15)}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Invalid phone number
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">
                    Looks good
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Please provide valid phone number to enable Update Button.
                  </Form.Text>
                </Col>
              </Form.Group>
              <Form.Group id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Subscribe for Notifications"
                />
              </Form.Group>
              <Form.Group as={Row}>
                <Col xs={6} md={{ span: 4, offset: 2 }}>
                  <a href="/">
                    <Button variant="secondary">Cancel</Button>
                  </a>
                </Col>
                <Col xs={6} md={{ span: 3 }}>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!this.submitValidation()}
                  >
                    Update
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </article>
        </section>
      </section>
    );
  }
}
