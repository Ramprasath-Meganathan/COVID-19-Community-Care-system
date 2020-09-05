import React, { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";
import { AuthContext } from "../../Context/AuthContext";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as dashConstants from "../../constants/DashboardConstants";

function Dashboard() {
  const [commitHistory, setCommitHistory] = useState([]);
  const { user } = useContext(AuthContext);

  /* Define constants depending on type of user. */
  let constants;
  if (user.role === "Donor") {
    constants = dashConstants.donorConstants;
  }
  if (user.role === "Requestor") {
    constants = dashConstants.requestorConstants;
  }
  useEffect(() => {
    fetch(constants.fetch + user.username)
      .then((response) => response.json())
      .then((data) => {
        setCommitHistory(data);
      })
      .catch((error) => console.log(error));

    return function cleanup() {};
  }, []);

  /* Convert date strings to date objects. */
  commitHistory.forEach((element) => {
    element.date = new Date(element.date);
  });

  /* Collumns for active donations table. */
  const cols = [
    {
      dataField: "donorhistory",
      text: "Date Posted",
    },
    {
      dataField: "itemtype",
      text: "Type of PPE",
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
  ];

  /* Sort donations by date, add data to arrays for graphs and table. */
  commitHistory.sort((a, b) => a.date - b.date);
  let activeDon = [];
  const dates = [];
  const quantities = [];
  const ppe = [];
  const cumulativeQty = [];
  commitHistory.forEach((element, index) => {
    if (element.active) activeDon.push(element);
    dates.push(element.date);
    quantities.push(element.quantity);
    ppe.push(element.itemtype);
    if (index === 0) cumulativeQty.push(element.quantity);
    else cumulativeQty.push(element.quantity + cumulativeQty[index - 1]);
  });

  /* All retrieved donations should appear on dashboard if requestor. */
  if (user.role === "Requestor") {
    activeDon = commitHistory;
  }

  return (
    <div className="container">
      {activeDon.length > 0 ? (
        <div className="container">
          <h1 className="heading1">{constants.donationsTable}</h1>
          <BootstrapTable
            keyField="_id"
            data={activeDon}
            columns={cols}
            wrapperClasses="table-responsive"
            striped={true}
            pagination={paginationFactory()}
          />
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>{constants.noDonationsTable}</h1>
      )}

      <hr></hr>

      {commitHistory.length > 0 ? (
        <div className="container">
          <h1 className="heading1">{constants.donationsGraphs}</h1>
          <Plot
            data={[
              {
                x: dates,
                y: quantities,
                type: "scatter",
                name: "Individual Donations",
                line: {
                  color: "rgb(55, 128, 191)",
                  width: 1,
                },
              },
              {
                x: dates,
                y: cumulativeQty,
                type: "scatter",
                name: "Cumulative Donations",
                line: {
                  color: "rgb(219, 64, 82)",
                  width: 3,
                },
              },
            ]}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            layout={{ autosize: true, title: "Donations Over Time" }}
          />
          <Plot
            data={[
              {
                values: quantities,
                labels: ppe,
                type: "pie",
                textinfo: "label+percent",
                textposition: "outside",
                automargin: true,
              },
            ]}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            layout={{ autosize: true, title: "PPE Proportions" }}
          />
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>{constants.noDonationsGraphs}</h1>
      )}
    </div>
  );
}

export default Dashboard;
