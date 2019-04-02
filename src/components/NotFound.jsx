import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class NotFound extends Component {
  goHome = () => {
    const { role, history } = this.props;
    if (role === "sales") history.push("/" + role);
    else if (role === "middle") history.push("/" + role + "/orders_of_today");
    else history.push("/");
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <button className="btn btn-primary btn-lg" onClick={this.goHome}>
                Take Me Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  role: state.login.data.role
});

export default withRouter(connect(mapStateToProps)(NotFound));
