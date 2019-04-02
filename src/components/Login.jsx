import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginRequest, isAlreadyLoggedIn, loginReset } from "../redux/actions";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    props.loginReset();
  }
  componentDidMount() {
    if (this.props.login.isSuccess) {
      if (this.props.login.data.role === "middle") {
        this.props.history.push("/middle/orders_of_today");
      } else {
        this.props.history.push("/sales");
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.login.isSuccess) {
      if (this.props.login.data.role === "middle") {
        this.props.history.push("/middle/orders_of_today");
      } else {
        this.props.history.push("/sales");
      }
    }
  }
  inputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.loginRequest(this.state);
  };
  render() {
    return (
      <div className="login-page">
        <div className="form">
          <div className="text-center pb-3 fs-16">Login</div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={this.state.email}
              onChange={this.inputChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={this.state.password}
              onChange={this.inputChange}
              required
            />
            <button type="submit">login</button>
            <p className="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: data => dispatch(loginRequest(data)),
  isAlreadyLoggedIn: () => dispatch(isAlreadyLoggedIn()),
  loginReset: () => dispatch(loginReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
