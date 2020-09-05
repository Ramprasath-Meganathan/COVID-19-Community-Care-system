/**
 * The author of the file is Yaswanth Chiruvella - B00849892.
 */
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import "../css/History.css";

function History() {
  const [commitHistory, setCommitHistory] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`/user/username/` + user.username)
      .then((res) => res.json())
      .then((data) => {
        setCommitHistory(data);
      })
      .catch((error) => console.log(error));
  });

  // This will trigger the download.
  const CellFormatter = (cell, row) => {
    return <Button onClick={() => console.log("download")}>Download</Button>;
  };

  //Columns headings for the History Table.
  const columns = [
    {
      dataField: "donorhistory",
      text: "Donated Date",
    },
    {
      dataField: "itemtype",
      text: "Donated Item",
    },
    {
      dataField: "quantity",
      text: "Quantity Donated",
    },
    {
      dataField: "_id",
      text: "Download",
      isDummyField: true,
      formatter: CellFormatter,
    },
  ];

  return (
    <div>
      <div className="heading1">
        <h1>
          Available Donors
          <a
            className="btn btn-primary my-2 my-sm-0"
            style={{ float: "right" }}
            type="submit"
            href="/donorform"
          >
            <i className="fa fa-arrow-left"> Back to Donation Page</i>
          </a>
        </h1>
      </div>

      <div className="container">
        <BootstrapTable
          keyField="_id"
          data={commitHistory}
          columns={columns}
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
                value: commitHistory.length,
              },
            ],
          })}
        />
      </div>
    </div>
  );
}

export default History;
