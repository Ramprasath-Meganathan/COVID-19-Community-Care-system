/**
 * The author of the file is Yaswanth Chiruvella - B00849892.
 */
import React, { Component } from "react";
import { Form, Col, Row, Button, Jumbotron } from "react-bootstrap";
import "../css/DonorForm.css";

export default class DonorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      itemtype: "",
      address: "",
      zip: "",
      quantity: "",
      success: false,
      touched: {
        phone: false,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  //HandleChange will update the state values when a user is typed in the form.
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === "phone") {
      this.setState({ touched: { phone: true } });
    }
  };

  // submitValidation will check whether the given phone number is valid or not.
  submitValidation() {
    return this.state.phone.length >= 10;
  }

  // This success is triggered when the donor form is successfully submitted.
  success = () => {
    return (
      <div>
        <Jumbotron style={{ backgroundColor: "#e9ecef" }}>
          <h1>Submitted Successfully</h1>
          <p>
            Thanks for reaching out to us. Your Donor Form submitted
            successfully. We will contact you soon.
          </p>
          <p>
            <a
              className="btn btn-primary my-2 my-sm-0"
              type="submit"
              href="/donorform"
            >
              Wanna do another Donation
            </a>
          </p>
        </Jumbotron>
      </div>
    );
  };

  //handleSubmit is triggered when the donor clicks on the submit button.
  handleSubmit(event) {
    event.preventDefault();
    // alert(JSON.stringify(this.state));
    fetch("/user", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then(() => {
        this.setState({ success: true });
      })
      .catch(function () {
        console.log("error");
      });
  }
  render() {
    const phonelength = this.state.phone.length;
    return (
      <div>
        {this.state.success ? (
          this.success()
        ) : (
          <React.Fragment>
            <div className="heading">
              <h1>Donate COVID-19 Protective Gear</h1>
              <li>All fields are required unless marked as optional.</li>
              <li>All masks have to 100% made of cotton.</li>
            </div>
            <div className="container">
              <div
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
                  <Form.Group as={Row} controlId="phone">
                    <Form.Label column md={2}>
                      Phone
                    </Form.Label>
                    <Col md={6}>
                      <Form.Control
                        type="number"
                        placeholder="Tel Number"
                        required
                        isInvalid={this.state.touched.phone && phonelength < 10}
                        isValid={this.state.touched.phone && phonelength >= 10}
                        value={this.state.phone.slice(0, 10)}
                        onChange={this.handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid phone number
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="valid">
                        Looks good
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Provide a valid phone number to enable Submit Button.
                      </Form.Text>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="address">
                    <Form.Label column md={2}>
                      Address
                    </Form.Label>
                    <Col md={6}>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Address"
                        autoFocus
                        required
                        value={this.state.address}
                        onChange={this.handleChange}
                      />
                      <Form.Text className="text-muted">
                        We will use this address for mask pickup.
                      </Form.Text>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="zip">
                    <Form.Label column md={2}>
                      Zip
                    </Form.Label>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Zip Code"
                        autoFocus
                        required
                        value={this.state.zip}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="itemtype">
                    <Form.Label column md={2}>
                      Gear
                    </Form.Label>
                    <Col md={6}>
                      <Form.Control
                        as="select"
                        onChange={this.handleChange}
                        value={this.state.itemtype}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Masks">Masks</option>
                        <option value="Gloves">Gloves</option>
                        <option value="Hand Wash">Hand Wash</option>
                        <option value="Face Shields">Face Shields</option>
                        <option value="Shields">Shields</option>
                        <option value="Eye Protective Gear">
                          Eye Protective Gear
                        </option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="quantity">
                    <Form.Label column md={2}>
                      Quantity
                    </Form.Label>
                    <Col md={6}>
                      <Form.Control
                        type="number"
                        placeholder=" Quantity"
                        autoFocus
                        required
                        value={this.state.quantity}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col xs={6} md={{ span: 4, offset: 2 }}>
                      <a href="/">
                        <Button variant="secondary">Not now</Button>
                      </a>
                    </Col>
                    <Col xs={6} md={{ span: 3 }}>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={!this.submitValidation()}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
