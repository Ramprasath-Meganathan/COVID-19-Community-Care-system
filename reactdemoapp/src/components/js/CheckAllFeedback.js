/**
 * Author : Ram prasath Meganathan (B00851418)
 * This page is used to check all the feedback registered by the users
 * Allowed roles:  Admin   
 */
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "../css/CheckAllFeedback.css";

export default class CheckAllFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFeedback: []
        };
    }

    componentDidMount() {
        this.results()
    }

    results() {
        axios.get('/user/feedback').then(res => {
            this.setState({ userFeedback: res.data })
        }).catch(err => {
            console.log(err)
        });
    }
    view(e, item) {
        e.preventDefault();
        this.props.history.push({
            pathname: "/userfeedback/view",
            state: { item },
        })
    }
    populateTable() {
        let i = 1
        return this.state.userFeedback.map((item, index) => {
            i++
            const { firstname, lastname, email, comment } = item
            return (
                <tr key={i}>
                    <td>
                        {firstname}
                    </td>
                    <td>
                        {lastname}
                    </td>
                    <td>
                        {email}
                    </td>
                    <td>
                        <a
                            href=""
                            onClick={(e) => { this.view(e, item) }}
                            style={{ marginRight: "5px", color: "blue" }}
                        >
                            View
                                </a>
                    </td>
                </tr>)
        });
    };


    render() {
        return (
            <section>
                <section className="heading1">
                    <h1>User Feedback Table</h1>
                </section>
                <section className="container">
                    <br />
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.populateTable()}

                        </tbody>
                    </Table>
                </section>
            </section>
        );
    }
}
