/**
 * @author Ryan Fernandes
 */

import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "../css/RequestorApprovalTable.css";

export default class RequestorApprovalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
  }

  approve = (_id) => {
    fetch("http://localhost:5000/userrequest/Approve", {
      method: "PUT",
      body: JSON.stringify({
        id: _id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        alert("Request is approved");
        this.getDataForTable();
      });
  };
  reject = (_id) => {
    fetch("http://localhost:5000/userrequest/Reject", {
      method: "PUT",
      body: JSON.stringify({
        id: _id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        alert("Request is rejected");
        this.getDataForTable();
      });
  };

  getDataForTable() {
    fetch("http://localhost:5000/userrequest/Requestor")
      .then((res) => res.json())
      .then((user) => this.setState({ users: [...user] }));
  }
  componentDidMount() {
    this.getDataForTable();
  }

  renderTableData() {
    return this.state.users.map((user, index) => {
      const { _id, firstname, lastname, date, item, quantity } = user;
      return (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{firstname}</td>
          <td>{lastname}</td>
          <td>{date}</td>
          <td>{item}</td>
          <td>{quantity}</td>
          <td>
            <a
              href="#approve"
              onClick={this.approve.bind(this, _id)}
              style={{ marginRight: "5px", color: "green" }}
            >
              Approve
            </a>
            <a
              href="#reject"
              onClick={this.reject.bind(this, _id)}
              style={{ color: "red" }}
            >
              {" "}
              Reject
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="heading1">
          <h1>Requestor Approval Table</h1>
        </div>
        <div className="container">
          {" "}
          <br />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}
