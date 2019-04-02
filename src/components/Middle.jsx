import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import OrdersOfToday from "./OrdersOfToday";
import PastOrders from "./PastOrders";
import SettlementsOfToday from "./SettlementsOfToday";
import PastSettlements from "./PastSettlements";
import EndOfMonthSplit from "./EndOfMonthSplit";
import ListOfCertificates from "./ListOfCertificates";
import ListOfMarketMaker from "./ListOfMarketMaker";
import InputOfOrders from "./InputOfOrders";
import FeesCirdan from "./FeesCirdan";
import FeesClient from "./FeesClient";
import { connect } from "react-redux";
import EndOfMonthSplitExact from "./EndOfMonthSplitExact";

class Middle extends Component {
  handleNewNote = event => {
    event.preventDefault();
    this.props.history.push("/new_note");
  };
  handleMarketMaker = event => {
    event.preventDefault();
    this.props.history.push("/market_maker");
  };
  render() {
    return (
      <div className="row mt-5">
        <div className="col-lg-2 col-md-3 pr-md-0">
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto mt-2 mt-md-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname === "/middle/orders_of_today"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/orders_of_today"
                  >
                    Orders of Today
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname ===
                      "/middle/settlements_of_today"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/settlements_of_today"
                  >
                    Settlements of Today
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname ===
                      "/middle/end_of_month_split"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/end_of_month_split"
                  >
                    End of Month Split (Indicative)
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                      className={`nav-link ${
                          this.props.location.pathname ===
                          "/middle/end_of_month_split_exact"
                              ? "active"
                              : ""
                          }`}
                      to="/middle/end_of_month_split_exact"
                  >
                    End of Month Split (Exact)
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname === "/middle/past_orders"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/past_orders"
                  >
                    Past Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname ===
                      "/middle/past_settlements"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/past_settlements"
                  >
                    Past Settlements
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname ===
                      "/middle/list_of_certificates"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/list_of_certificates"
                  >
                    List of Certificates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname ===
                      "/middle/list_of_market_maker"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/list_of_market_maker"
                  >
                    List of Market Maker
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname === "/middle/input_of_orders"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/input_of_orders"
                  >
                    Input of Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname === "/middle/fees_cirdan"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/fees_cirdan"
                  >
                    Daily Fees Cirdan
                  </Link>
                </li><li className="nav-item">
                  <Link
                    className={`nav-link ${
                      this.props.location.pathname === "/middle/fees_client"
                        ? "active"
                        : ""
                    }`}
                    to="/middle/fees_client"
                  >
                    Daily Fees Client
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-lg-10 col-md-9 mt-3 mt-md-0 pl-md-0">
          <div className="col-md-12 h-100 border mb-md-3">
            <Route
              path="/middle/settlements_of_today"
              component={SettlementsOfToday}
            />
            <Route
              path="/middle/past_settlements"
              component={PastSettlements}
            />
            <Route path="/middle/orders_of_today" component={OrdersOfToday} />
            <Route path="/middle/past_orders" component={PastOrders} />
            <Route
              path="/middle/end_of_month_split"
              component={EndOfMonthSplit}
            />
            <Route
                path="/middle/end_of_month_split_exact"
                component={EndOfMonthSplitExact}
            />
            <Route
              path="/middle/list_of_certificates"
              component={ListOfCertificates}
            />
            <Route
              path="/middle/list_of_market_maker"
              component={ListOfMarketMaker}
            />
            <Route path="/middle/input_of_orders" component={InputOfOrders} />
            <Route path="/middle/fees_cirdan" component={FeesCirdan} />
            <Route path="/middle/fees_client" component={FeesClient} />
          </div>
        </div>
        <div className="col-md-3 mt-3 mt-md-5 ">
          <button
            className="btn btn-primary  w-100"
            onClick={this.handleNewNote}
          >
            New Note
          </button>
        </div>
        <div className="col-md-3 offset-md-6 text-right mt-3 mt-md-5">
          <button
            className="btn btn-primary w-100"
            onClick={this.handleMarketMaker}
          >
            New Market Maker
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Middle);
