/**
 * Author : Ram prasath Meganathan (B00851418)
This page is used to check all the View the individual feedback registered by the user
 * Allowed Roles: Admin
 */

import React, { Component } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { withRouter } from 'react-router-dom'
import "../css/ViewFeedback.css";

class ViewFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.location.state.item.firstname,
            lastname: this.props.location.state.item.lastname,
            email: this.props.location.state.item.email,
            comment: this.props.location.state.item.comments
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    handleSubmit(event) {
        alert("All requests are shown");
        event.preventDefault();
    }
    render() {

        return (
            <section>
                <section className="heading">
                    <h1>View User Feedback</h1>
                </section>
                <section className="container">
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
                                        disabled
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
                                        disabled
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
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="comment">
                                <Form.Label column md={2}>
                                    Comment
                </Form.Label>
                                <Col md={6}>
                                    <Form.Control
                                        as="textarea"
                                        rows="5"
                                        placeholder="Comment"
                                        autoFocus
                                        required
                                        value={this.state.comment}
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col xs={6} md={{ span: 4, offset: 2 }}>
                                    <a href="/userfeedback/checkAll">
                                        <Button variant="secondary">Not now</Button>
                                    </a>
                                </Col>
                                <Col xs={6} md={{ span: 3 }}>
                                    <a
                                        role="button"
                                        className="btn btn-info"
                                        href="mailto:communitycare@halifax.org"
                                    >
                                        <i className="fa fa-envelope-o"></i> Reply
                </a>
                                </Col>
                            </Form.Group>
                        </Form>
                    </article>
                </section>
            </section>
        );
    }
}
export default withRouter(ViewFeedback)