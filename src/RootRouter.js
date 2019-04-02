import React, { Component } from "react";
import { localStore } from "./services/localStore";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import { logout } from "./redux/actions";

const RootRouter = ({ component: Component, userRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStore("token") && rest.loginData.role === userRole ? (
          <div>
            <Header handleLogout={rest.logout} {...props} />
            <Component {...props} />
          </div>
        ) : (
          <NotFound />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  loginData: state.login.data
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RootRouter)
);
