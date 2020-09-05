/**
 * @author Ryan Fernandes , Ram prasath Meganathan(B00851418)
 * This page will be the task flow page for admin where they can approve/deny requests and check all user feedback
 * Allowed roles : admin
 */

import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../css/AdminPage.css";

export default class AdminPage extends Component {
  render() {
    return (
      <Container>
        <Row
          className="justify-content-md-center"
          style={{
            textAlign: "center",
            borderBottom: "1px",
            paddingTop: "50px",
          }}
        >
          <Col sm={5} md={5} style={{ borderBottom: "1px ridge" }}>
            <Card bg="success" text="white">
              <Card.Header>Donors</Card.Header>
              <Card.Body>
                <Card.Title>
                  Donor
                  <br />
                  Requests
                </Card.Title>
                <LinkContainer exact to="/donor/approvaltable">
                  <Button variant="primary">Approve/Reject</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={5} md={5}>
            <Card bg="secondary" text="white">
              <Card.Header>Requestors</Card.Header>
              <Card.Body>
                <Card.Title>
                  Requestor
                  <br />
                  Requests
                </Card.Title>
                <LinkContainer exact to="/requestor/approvaltable">
                  <Button variant="primary">Approve/Reject</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{
            textAlign: "center",
            borderBottom: "1px",
            paddingTop: "50px",
          }}
        >
          <Col sm={5} md={5}>
            <Card bg="info" text="white">
              <Card.Header>Feedback</Card.Header>
              <Card.Body>
                <Card.Title>
                  Check all
                  <br />
                user  Feedbacks
                </Card.Title>
                <LinkContainer exact to="/userfeedback/checkAll">
                  <Button variant="primary">View now</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    );
  }
}
