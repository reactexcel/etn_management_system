import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signupRequest, signupReset } from "../redux/actions";
import { toast } from "react-toastify";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      role: "sales"
    };
    props.signupReset();
  }
  componentDidUpdate(prevProps) {
    const { isSuccess } = this.props.signup;
    if (isSuccess) {
      this.props.history.push("/");
    }
  }
  inputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { password, confirm_password } = this.state;
    if (password === confirm_password) this.props.signupRequest(this.state);
    else {
      toast.error("Passwords do not match");
    }
  };
  render() {
    return (
      <div className="register-page">
        <div className="form">
          <div className="text-center pb-3 fs-16">Sign Up</div>
          <form className="register-form" onSubmit={this.handleSubmit}>
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
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirm_password"
              value={this.state.confirm_password}
              onChange={this.inputChange}
              required
            />
            <select
              id="role"
              value={this.state.role}
              onChange={this.inputChange}
            >
              <option value="sales">Sales Office</option>
              <option value="middle">Middle Office</option>
            </select>
            <button type="submit">sign up</button>
            <p className="message">
              Already registered? <Link to="/">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.signup
});

const mapDispatchToProps = dispatch => ({
  signupRequest: data => dispatch(signupRequest(data)),
  signupReset: () => dispatch(signupReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
