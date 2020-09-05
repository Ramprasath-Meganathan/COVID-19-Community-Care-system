/**
 * @author Mayank Bagla, Ryan Fernandes, Yaswanth Chiruvella , Ram prasath Meganathan(B00851418)
 */

import React, { Component } from "react";
import Icatalogue from "./ImageCatalogue";
import { Route, Switch } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Login from "./js/LoginForm";
import Register from "./js/RegisterForm";
import ContactUs from "./js/ContactUs";
import ForgotPassword from "./js/ForgotPassword";
import ResetPassword from "./js/ResetPassword";
import NotFound from "./js/NotFound";
import ProfileUpdate from "./Profileupdate";
import DonorForm from "./js/DonorForm";
import UserHistory from "./js/History";
import Dashboard from "./js/Dashboard";
import AdminPage from "./js/AdminPage";
import DonorApprovalTable from "./js/DonorApprovalTable";
import ProductPage from "./js/ProductPage";
import DonorDetails from "./js/DonorDetails";
import RequestorApprovalTable from "./js/RequestorApprovalTable";
import CheckAllFeedback from "./js/CheckAllFeedback";
import ViewFeedback from "./js/ViewFeedback";
import PrivateRoute from "../hocs/PrivateRoute";
import UnPrivateRoute from "../hocs/UnPrivateRoute";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <header>
          <Navigation />
        </header>
        <section>
          <Switch>
            <Route exact path="/">
              <Icatalogue />
            </Route>
            <UnPrivateRoute path="/login" component={Login} />
            <UnPrivateRoute path="/register" component={Register} />
            <Route exact path="/contactus"
              roles={["Donor", "Requestor"]}>
              <ContactUs />
            </Route>
            <UnPrivateRoute exact path="/contactus">
              <ContactUs />
            </UnPrivateRoute>
            <Route exact path="/forgotpassword">
              <ForgotPassword />
            </Route>
            <Route path="/resetlink">
              <ResetPassword />
            </Route>
            <Route exact path="/notfound">
              <NotFound />
            </Route>
            <Route exact path="/profileupdate">
              <ProfileUpdate />
            </Route>
            <PrivateRoute
              path="/donorform"
              roles={["Donor"]}
              component={DonorForm}
            />
            <PrivateRoute
              path="/history"
              roles={["Donor"]}
              component={UserHistory}
            />
            <PrivateRoute
              path="/productpage"
              roles={["Requestor"]}
              component={ProductPage}
            />
            <PrivateRoute
              path="/donordetails"
              roles={["Requestor"]}
              component={DonorDetails}
            />
            <PrivateRoute
              path="/dashboard"
              roles={["Donor", "Requestor"]}
              component={Dashboard}
            />
            <PrivateRoute
              path="/admin"
              roles={["admin"]}
              component={AdminPage}
            />
            <Route exact path="/donor/approvaltable">
              <DonorApprovalTable />
            </Route>
            <Route exact path="/requestor/approvaltable">
              <RequestorApprovalTable />
            </Route>
            <Route exact
              path="/userfeedback/checkAll"
              roles={["admin"]}
              render={(props) => <CheckAllFeedback {...props}></CheckAllFeedback>}
            ></Route>
            <Route
              path="/userfeedback/view"
              roles={["admin"]}
              render={(props) => <ViewFeedback {...props}></ViewFeedback>}
            ></Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
