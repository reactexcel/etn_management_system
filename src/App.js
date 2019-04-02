import React, { Component } from "react";
import "./styles/App.scss";
import Login from "./components/Login";
import Sales from "./components/Sales";
import SalesDetails from "./components/SalesDetails";
import Signup from "./components/Signup";
import Middle from "./components/Middle";
import MarketMaker from "./components/MarketMaker";
import NewNote from "./components/NewNote";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./RootRouter";
import { isAlreadyLoggedIn } from "./redux/actions";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor(props) {
    super(props);
    props.isAlreadyLoggedIn();
  }
  render() {
    return (
      <div className="container fs-14">
        <ToastContainer />
        <Router>
          <Switch>
            <PrivateRoute
              userRole="sales"
              path="/sales_details/:id"
              component={SalesDetails}
            />
            <Redirect from="/sales_details" to="/sales" />
            <PrivateRoute userRole="sales" path="/sales" component={Sales} />
            <PrivateRoute
              userRole="middle"
              path="/new_note"
              component={NewNote}
            />
            <PrivateRoute
              userRole="middle"
              path="/market_maker"
              component={MarketMaker}
            />
            <PrivateRoute userRole="middle" path="/middle" component={Middle} />
            <Route path="/signup" component={Signup} />
            <Route path="/" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  isAlreadyLoggedIn: () => dispatch(isAlreadyLoggedIn())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
