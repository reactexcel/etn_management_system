import React, { Component } from "react";
import GenericModal from "./GenericModal";
import { connect } from "react-redux";
import { createMarketRequest, createMarketReset } from "../redux/actions";
import NumericInput from "react-numeric-input";
import { numberWithCommas } from "./../services/generic";
import validator from "validator";

class MarketMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      is_modal_open: false,
      hide_action_button: false,
      type: "",
      modal_title: "",
      exchange: "",
      name: "",
      email: "",
      phone_no: "",
      input: "",
      contact_name: "",
      fees: "",
      error: "",
      details_saved: false,
      email_valid: false,
      phone_valid: false,
      contact_valid: false,
      valid_message: ""
    };
    props.createMarketReset();
  }
  componentDidUpdate() {
    if (this.props.marketmaker.createMarket.isSuccess)
      this.props.history.push("/middle/list_of_market_maker");
  }
  inputChange = event => {
    const { modal_title } = this.state;
    if (this.state.modal_title === "details" && this.state.details_saved) {
      this.setState({
        [event.target.id]: event.target.value,
        details_saved: false
      });
      // } else if (modal_title === "contact_name") {
      //   const contactValid =
      //     event.target.value !== "" && event.target.value.match("/^[a-zA-Z ]+$/");
      //     console.log(event.target.value, contactValid);

      //   if (contactValid) {
      //     this.setState({ [event.target.id]: event.target.value });
      //   } else {
      //     this.setState({ contact_valid: contactValid });
      //   }
    } else {
      this.setState({ [event.target.id]: event.target.value });
    }
  };
  numericInputChange = value => {
    this.setState({ input: parseFloat(value) });
  };
  phoneChange = value => {
    this.setState({ phone_no: value });
  };
  openModal = (type, title) => {
    this.setState({
      is_modal_open: true,
      type,
      modal_title: title,
      input: this.state[title]
    });
  };
  numericPhoneNumberChange = value => {
    this.setState({ phone_no: value });
  };
  actionModal = () => {
    const { modal_title } = this.state;
    if (modal_title === "details") {
      const emailValid =
        this.refs.email.checkValidity() && this.state.email !== "";
      const phoneValid = this.state.phone_no.length !== 0;
      const contactValid = this.state.contact_name !== "";
      if (!emailValid || !phoneValid || !contactValid) {
        this.setState({
          email_valid: !emailValid,
          phone_valid: !phoneValid,
          contact_valid: !contactValid
        });
      } else {
        this.setState({
          is_modal_open: false,
          email_valid: false,
          phone_valid: false,
          contact_valid: false,
          details_saved: true
        });
      }
    } else if (
      modal_title === "exchange" ||
      modal_title === "name" ||
      modal_title === "fees"
    ) {
      if (this.state.input.length === 0) {
        this.setState({ valid_message: "The above field is empty" });
      } else {
        this.setState({
          [this.state.modal_title]: this.state.input,
          valid_message: "",
          is_modal_open: false
        });
      }
    }
  };
  closeModal = () => {
    const { modal_title } = this.state;
    if (modal_title === "details") {
      if (this.state.details_saved) {
        this.setState({ valid_message: "", is_modal_open: false });
      } else {
        this.setState({
          exchange: "",
          phone_no: "",
          contact_name: "",
          valid_message: "",
          is_modal_open: false
        });
      }
    } else {
      this.setState({ input: "", is_modal_open: false, valid_message: "" });
    }
  };
  handleConfirmMarket = () => {
    const { exchange, name, email, phone_no, fees, contact_name } = this.state;
    if (exchange && name && email && phone_no && fees && contact_name)
      this.props.confirmMarketMaker({
        exchange,
        name,
        email,
        phone_no,
        fees,
        contact_name
      });
    else this.setState({ error: "Please fill all the Fields." });
  };
  render() {
    const tableRows = ["Exchange", "Name", "Details", "Fees"];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    const modalBody = () => {
      if (this.state.type) {
        if (this.state.modal_title === "fees") {
          return (
            <NumericInput
              className="form-control"
              step={0.01}
              onChange={this.numericInputChange}
              value={this.state.input}
              precision={2}
              strict={true}
            />
          );
        } else {
          return (
            <div>
              <input
                id="input"
                type={this.state.type}
                // id={this.state.modal_title}
                value={this.state.input}
                onChange={this.inputChange}
              />
              <span className="valid-message text-danger">
                {this.state.valid_message}
              </span>
            </div>
          );
        }
      } else {
        return (
          <div>
            <p>Email: </p>{" "}
            <input
              className="form-control"
              type="email"
              ref="email"
              id="email"
              value={this.state.email}
              onChange={this.inputChange}
            />
            {this.state.email_valid && (
              <span className="valid-message text-danger">Invalid Email</span>
            )}
            <p>Phone No: </p>{" "}
            <NumericInput
              className="form-control"
              value={this.state.phone_no}
              onChange={this.numericPhoneNumberChange}
              strict
            />
            {this.state.phone_valid && (
              <span className="valid-message text-danger">
                Phone Number can not be empty
              </span>
            )}
            <p>Contact Name: </p>{" "}
            <input
              className="form-control"
              type="text"
              id="contact_name"
              value={this.state.contact_name}
              onChange={e => {
                if (validator.matches(e.target.value, /^[a-zA-Z ]+$/)) {
                  this.inputChange(e);
                }
              }}
            />
            {this.state.contact_valid && (
              <span className="valid-message text-danger">
                Contact Name can not be empty and must be characters
              </span>
            )}
          </div>
        );
      }
    };
    return (
      <div className="row">
        <GenericModal
          show={this.state.is_modal_open}
          title={this.state.modal_title}
          closeModal={this.closeModal}
          // hideActionButton={true}
          actionModal={this.actionModal}
          actionButton="Save"
          type={this.state.type}
        >
          {modalBody()}
        </GenericModal>
        <div className="col-md-12 mt-3">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>{tableHeads}</tr>
              </thead>
              <tbody>
                <tr className="cursor-pointer">
                  <td onClick={() => this.openModal("text", "exchange")}>
                    {this.state.exchange ? this.state.exchange : "+"}
                  </td>
                  <td onClick={() => this.openModal("text", "name")}>
                    {this.state.name ? this.state.name : "+"}
                  </td>
                  <td onClick={() => this.openModal("", "details")}>+</td>
                  <td onClick={() => this.openModal("number", "fees")}>
                    {this.state.fees
                      ? numberWithCommas(parseFloat(this.state.fees).toFixed(2))
                      : "+"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-12 text-center">
          <p>{this.state.error}</p>
          <button
            className="btn btn-primary"
            onClick={this.handleConfirmMarket}
          >
            Confirm Market Maker
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  marketmaker: state.marketmaker
});

const mapDispatchToProps = dispatch => ({
  confirmMarketMaker: data => dispatch(createMarketRequest(data)),
  createMarketReset: () => dispatch(createMarketReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketMaker);
