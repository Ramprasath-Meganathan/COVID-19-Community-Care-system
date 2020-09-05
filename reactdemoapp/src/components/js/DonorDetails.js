/**
 * The author of the file is Yaswanth Chiruvella - B00849892.
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import "../css/DonorDetails.css";
class DonorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  // This will get the itemtype when the requestor is clicked on the product page.
  componentDidMount() {
    let item = this.props.location.state.data;
    console.log(this.props.location.state.data);
    fetch("/user/itemtype/" + item)
      .then((response) => response.json())
      .then((data) => this.setState({ results: data }));
  }

  // This will trigger the download feature.
  CellFormatter(cell, row) {
    return <Button onClick={() => console.log("ko")}>Enquire</Button>;
  }

  // Columns for the table.
  columns = [
    {
      dataField: "firstname",
      text: "First Name",
    },
    {
      dataField: "lastname",
      text: "Last Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "address",
      text: "Address",
    },
    {
      dataField: "phone",
      text: "Phone",
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
    {
      dataField: "zip",
      text: "Zip",
    },
    {
      dataField: "_id",
      text: "Contact",
      isDummyField: true,
      formatter: this.CellFormatter,
    },
  ];

  render() {
    console.log(this.state.results);
    return (
      <div>
        <div className="heading1">
          <h1>
            Available Donors
            <a
              className="btn btn-primary my-2 my-sm-0"
              style={{ float: "right" }}
              type="submit"
              href="/productpage"
            >
              <i className="fa fa-arrow-left"> Back to Products Page</i>
            </a>
          </h1>
        </div>
        {this.state.results.length > 0 ? (
          <div className="container">
            <BootstrapTable
              keyField="_id"
              data={this.state.results}
              columns={this.columns}
              wrapperClasses="table-responsive"
              striped={true}
              pagination={paginationFactory({
                paginationSize: 4,
                pageStartIndex: 1,
                sizePerPageList: [
                  {
                    text: "5",
                    value: 5,
                  },
                  {
                    text: "All",
                    value: this.state.results.length,
                  },
                ],
              })}
            />
          </div>
        ) : (
          <h1 style={{ textAlign: "center" }}>
            No donors are avaiable right now
          </h1>
        )}
      </div>
    );
  }
}
export default withRouter(DonorDetails);
