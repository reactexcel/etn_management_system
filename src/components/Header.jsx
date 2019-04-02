import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  logout = () => {
    this.props.history.push("/");
    this.props.handleLogout();
  };
  render() {
    let to;
    if (this.props.loginData.role === "sales") {
      to = "/sales";
    } else {
      to = "/middle/orders_of_today";
    }
    return (
      <div className="row py-3">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-md navbar-light bg-light justify-content-between">
            {/* <Link className="navbar-brand" to={to}>
              LOGO
            </Link> */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav1"
              aria-controls="navbarNav1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav1">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to={to}>
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <form className="form-inline">
              <button
                className="btn btn-secondary"
                onClick={() => this.logout()}
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginData: state.login.data
});

export default connect(mapStateToProps)(Header);
