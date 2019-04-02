import React, { Component } from "react";
import { connect } from "react-redux";
import GenericModal from "./GenericModal";
import "../styles/middle.scss"
import {
  updateNewNote,
  resetNote,
  updateNoteRequest,
  createNoteRequest,
  listNotesRequest,
  deleteNoteRequest
} from "../redux/actions";
import moment from "moment";
import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";
import { numberWithCommas } from "./../services/generic";
import validator from "validator";

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      is_modal_open: false,
      hide_action_button: false,
      type: "",
      modal_title: "sales",
      id: 0,
      new_isin: "",
      valid_message: "",
      email_valid: false,
      phone_valid: false,
      full_name_valid: false
    };
    props.listNotesRequest();
  }
  inputChange = event => {
    if (event.target.id === "search") {
      this.setState({ search: event.target.value });
    } else {
      if (this.state.modal_title === "isin") {
        this.setState({ new_isin: event.target.value });
      } else {
        this.props.updateNewNote({
          id: this.state.id,
          title: event.target.id ? event.target.id : this.state.modal_title,
          value: event.target.value
        });
      }
    }
  };
  dateChange = date => {
    this.props.updateNewNote({
      id: this.state.id,
      title: this.state.modal_title,
      value: date
    });
  };
  numericInputChange = value => {
    this.props.updateNewNote({
      id: this.state.id,
      title: this.state.modal_title,
      value
    });
  };
  numericClientManagementChange = value => {
    this.props.updateNewNote({
      id: this.state.id,
      title: "client_management_fees",
      value
    });
  };
  numericSalesManagementChange = value => {
    this.props.updateNewNote({
      id: this.state.id,
      title: "sales_management_fees",
      value
    });
  };
  numericPhoneNumberChange = value => {
    this.props.updateNewNote({
      id: this.state.id,
      title: "client_phone_number",
      value
    });
  };
  openModal = (type, title, index) => {
    if (type === "") {
      this.setState({
        valid_message: "",
        is_modal_open: true,
        type,
        modal_title: title,
        hide_action_button: true
      });
    } else {
      this.setState({
        valid_message: "",
        is_modal_open: true,
        type,
        modal_title: title,
        hide_action_button: false,
        id: index
      });
    }
  };
  actionModal = () => {
    if (this.state.modal_title === "isin") {
      if (this.state.new_isin.length !== 12) {
        this.setState({ valid_message: "ISIN must 12 characters" });
      } else {
        this.props.createNoteRequest({ isin: this.state.new_isin });
        this.setState({ is_modal_open: false, new_isin: "" });
      }
    } else if (this.state.modal_title === "client_details") {
      const emailValid =
        this.refs.client_email.checkValidity() &&
        this.refs.client_email.value !== "";
      const phoneValid = this.props.new_notes_copy[this.state.id]
        .client_phone_number;
      const fullNameValid = this.props.new_notes_copy[this.state.id]
        .client_full_name
        ? this.props.new_notes_copy[this.state.id].client_full_name != ""
        : false;

      if (!emailValid || !phoneValid || !fullNameValid) {
        this.setState({
          email_valid: !emailValid,
          phone_valid: !phoneValid,
          full_name_valid: !fullNameValid
        });
      } else {
        if (
          this.props.new_notes_copy[this.state.id].client_email !==
          this.props.new_notes[this.state.id].client_email ||
          this.props.new_notes_copy[this.state.id].client_phone_number !==
          this.props.new_notes[this.state.id].client_phone_number ||
          this.props.new_notes_copy[this.state.id].client_full_name !==
          this.props.new_notes[this.state.id].client_full_name
        ) {
          this.props.updateNoteRequest(
            this.props.new_notes_copy[this.state.id]
          );
        }
        this.setState({
          is_modal_open: false,
          email_valid: false,
          phone_valid: false,
          full_name_valid: false
        });
      }
    } else if (this.state.modal_title === "management_fees") {
      if (
        this.props.new_notes_copy[this.state.id].sales_management_fees &&
        this.props.new_notes_copy[this.state.id].client_management_fees
      ) {
        if (
          this.props.new_notes_copy[this.state.id].sales_management_fees !==
          this.props.new_notes[this.state.id].sales_management_fees ||
          this.props.new_notes_copy[this.state.id].client_management_fees !==
          this.props.new_notes[this.state.id].client_management_fees
        ) {
          this.props.updateNoteRequest(
            this.props.new_notes_copy[this.state.id]
          );
        }
        this.setState({ is_modal_open: false });
      } else {
        this.setState({ valid_message: "Please fill both management fees" });
      }
    } else {
      if (
        this.props.new_notes_copy[this.state.id][this.state.modal_title] ==
        undefined ||
        this.props.new_notes_copy[this.state.id][this.state.modal_title] === ""
      ) {
        if (this.state.modal_title === "currency") {
          this.setState({ valid_message: "Please select a currency" });
        } else {
          this.setState({ valid_message: "The above field is empty" });
        }
      } else {
        if (
          this.props.new_notes_copy[this.state.id][this.state.modal_title] !==
          this.props.new_notes[this.state.id][this.state.modal_title]
        ) {
          this.props.updateNoteRequest(
            this.props.new_notes_copy[this.state.id]
          );
        }
        this.setState({ is_modal_open: false });
      }
    }
  };
  closeModal = () => {
    this.props.resetNote();
    this.setState({ is_modal_open: false });
  };
  handleConfirmNewNote = item => {
    if (item.isin) {
      item.confirm_status = true;
      this.props.updateNoteRequest(item);
      this.setState({ is_modal_open: false });
    }
  };
  onDeleteClick = (id) => {
    this.props.onDeleteClick(id)
  }
  render() {
    const tableRows = [
      "ISIN",
      "Client Details",
      "Sales",
      "Currency",
      "Issue Date",
      "Maturity Date",
      "Denomination",
      "Number of Units",
      "Standard Spread",
      "Brokerage Fees",
      "Management Fees Split",
      "One Off Fee",
      "Issuance Cost",
      "Running Cost",
      "IB Sub-Account",
      "Delete"
    ];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    const filteredData = this.props.new_notes.filter(item => {
      return item.isin.includes(this.state.search);
    });
    const isin_list = this.props.new_notes.map((item, i) => {
      let complete_status = false;
      if (
        item.client_full_name &&
        item.client_email &&
        item.client_phone_number &&
        item.sales &&
        item.currency &&
        item.issue_date &&
        item.maturity_date &&
        item.denomination &&
        item.number_of_units &&
        item.standard_spread &&
        item.brokerage_fees &&
        item.sales_management_fees &&
        item.client_management_fees &&
        item.one_off_fee &&
        item.issuance_cost &&
        item.running_cost &&
        item.ib_account
      ) {
        complete_status = true;
      }
      return (
        <li
          key={i}
          className={`list-group-item cursor-pointer ${
            complete_status ? "text-success" : "text-danger"
            }`}
          onClick={() => complete_status && this.handleConfirmNewNote(item)}
        >
          {item.isin}{" "}
          <span className="badge badge-danger">
            {!complete_status && "Missing inputs for some fields"}
          </span>
        </li>
      );
    });
    const tableData = filteredData.map((item, index) => {
      return (
        <tr key={index} className="cursor-pointer">
          <td>{item.isin}</td>
          <td onClick={() => this.openModal("text", "client_details", index)}>
            +
          </td>
          <td onClick={() => this.openModal("text", "sales", index)}>
            {item.sales}
          </td>
          <td onClick={() => this.openModal("text", "currency", index)}>
            {item.currency}
          </td>
          <td onClick={() => this.openModal("date", "issue_date", index)}>
            {item.issue_date && moment(item.issue_date).format("MM/DD/YYYY")}
          </td>
          <td onClick={() => this.openModal("date", "maturity_date", index)}>
            {item.maturity_date &&
              moment(item.maturity_date).format("MM/DD/YYYY")}
          </td>
          <td onClick={() => this.openModal("number", "denomination", index)}>
            {item.denomination && numberWithCommas(item.denomination)}
          </td>
          <td
            onClick={() => this.openModal("number", "number_of_units", index)}
          >
            {item.number_of_units && numberWithCommas(item.number_of_units)}
          </td>
          <td
            onClick={() => this.openModal("number", "standard_spread", index)}
          >
            {item.standard_spread}
          </td>
          <td onClick={() => this.openModal("number", "brokerage_fees", index)}>
            {item.brokerage_fees &&
              numberWithCommas(parseFloat(item.brokerage_fees).toFixed(2))}
          </td>
          <td
            onClick={() => this.openModal("number", "management_fees", index)}
          >
            {item.sales_management_fees &&
              item.client_management_fees &&
              numberWithCommas(
                (
                  parseFloat(item.sales_management_fees) +
                  parseFloat(item.client_management_fees)
                )
                  .toFixed(2)
                  .toString()
              )}
          </td>
          <td onClick={() => this.openModal("number", "one_off_fee", index)}>
            {item.one_off_fee &&
              numberWithCommas(parseFloat(item.one_off_fee).toFixed(2))}
          </td>
          <td onClick={() => this.openModal("number", "issuance_cost", index)}>
            {item.issuance_cost &&
              numberWithCommas(parseFloat(item.issuance_cost).toFixed(2))}
          </td>
          <td onClick={() => this.openModal("number", "running_cost", index)}>
            {item.running_cost &&
              numberWithCommas(parseFloat(item.running_cost).toFixed(2))}
          </td>
          <td onClick={() => this.openModal("text", "ib_account", index)}>
            {item.ib_account}
          </td>
          <td className="delIcon">
            <i className="fas fa-trash-alt" onClick={() => { this.onDeleteClick(item._id) }}></i>
          </td>
        </tr>
      );
    });
    const modalBody = () => {
      const { modal_title } = this.state;
      if (modal_title === "management_fees") {
        return (
          <div>
            <p>Sales Management Fees:</p>
            <NumericInput
              className="form-control"
              value={this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
                this.props.new_notes_copy[this.state.id]
                  .sales_management_fees || ""
              }
              step={0.01}
              precision={2}
              onChange={this.numericSalesManagementChange}
              strict
            />
            <p>Client Management Fees:</p>
            <NumericInput
              className="form-control"
              value={
                this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
                this.props.new_notes_copy[this.state.id]
                  .client_management_fees || ""
              }
              step={0.01}
              precision={2}
              onChange={this.numericClientManagementChange}
              strict
            />
            <span className="valid-message text-danger">
              {this.state.valid_message}
            </span>
          </div>
        );
      } else if (modal_title === "client_details") {
        return (
          <div>
            <p>Client Full Name:</p>
            <input
              className="form-control"
              type="text"
              id="client_full_name"
              value={
                this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
                this.props.new_notes_copy[this.state.id].client_full_name || ""
              }
              onChange={e => {
                if (validator.matches(e.target.value, /^[a-zA-Z ]+$/)) {
                  this.inputChange(e);
                }
              }}
            />
            {this.state.full_name_valid && (
              <span className="valid-message text-danger">
                Full Name can not be empty and must be characters
              </span>
            )}
            <p>Client Email:</p>
            <input
              className="form-control"
              type="email"
              ref="client_email"
              id="client_email"
              value={this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
                this.props.new_notes_copy[this.state.id].client_email || ""
              }
              onChange={this.inputChange}
            />
            {this.state.email_valid && (
              <span className="valid-message text-danger">Invalid Email</span>
            )}
            <p>Client Phone Number:</p>
            <NumericInput
              className="form-control"
              value={this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
                this.props.new_notes_copy[this.state.id].client_phone_number ||
                ""
              }
              onChange={this.numericPhoneNumberChange}
              strict
            />
            {this.state.phone_valid && (
              <span className="valid-message text-danger">
                Phone Number can not be empty
              </span>
            )}
          </div>
        );
      } else if (modal_title === "currency") {
        return (
          <div>
            <select
              value={
                this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
                this.props.new_notes_copy[this.state.id].currency}
              onChange={this.inputChange}
              className="form-control"
            >
              <option value="">Please Select a Currency</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="CHF">CHF</option>
              <option value="GBP">GBP</option>
            </select>
            <span className="valid-message text-danger">
              {this.state.valid_message}
            </span>
          </div>
        );
      } else if (modal_title === "isin") {
        return (
          <div>
            <input
              type="text"
              value={this.state.new_isin}
              onChange={this.inputChange}
            />
            <span className="valid-message text-danger">
              {this.state.valid_message}
            </span>
          </div>
        );
      } else if (
        modal_title === "issue_date" ||
        modal_title === "maturity_date"
      ) {
        return (
          <DatePicker
            selected={this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
              this.props.new_notes_copy[this.state.id][
              `${this.state.modal_title}`
              ]
              ? new Date(
                this.props.new_notes_copy[this.state.id][
                `${this.state.modal_title}`
                ]
              )
              : new Date()
            }
            value={this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
              this.props.new_notes_copy[this.state.id][
              `${this.state.modal_title}`
              ]
              ? moment(
                this.props.new_notes_copy[this.state.id][
                `${this.state.modal_title}`
                ]
              )
                .format("MM/DD/YYYY")
                .toString()
              : moment()
                .format("MM/DD/YYYY")
                .toString()
            }
            onChange={this.dateChange}
          />
        );
      } else if (
        this.state.modal_title === "brokerage_fees" ||
        this.state.modal_title == "issuance_cost" ||
        this.state.modal_title === "one_off_fee" ||
        this.state.modal_title === "running_cost" ||
        this.state.modal_title === "standard_spread"
      ) {
        return (
          <NumericInput
            className="form-control"
            value={this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
              this.props.new_notes_copy[this.state.id][
              `${this.state.modal_title}`
              ] || ""
            }
            step={0.01}
            onChange={this.numericInputChange}
            precision={2}
            strict
          />
        );
      } else if (
        this.state.modal_title === "denomination" ||
        this.state.modal_title === "number_of_units"
      ) {
        return (
          <NumericInput
            className="form-control"
            value={this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
              this.props.new_notes_copy[this.state.id][
              `${this.state.modal_title}`
              ] || ""
            }
            onChange={this.numericInputChange}
            strict
          />
        );
      } else {
        return (
          <div>
            <input
              type={this.state.type}
              value={this.props.new_notes_copy && this.props.new_notes_copy[this.state.id] &&
                this.props.new_notes_copy[this.state.id][
                `${this.state.modal_title}`
                ] || ""
              }
              onChange={this.inputChange}
            />
            <span className="text-danger">{this.state.valid_message}</span>
          </div>
        );
      }
    };
    return (
      <div className="row mt-5 fs-14">
        <GenericModal
          show={this.state.is_modal_open}
          title={this.state.modal_title}
          closeModal={this.closeModal}
          hideActionButton={this.state.hide_action_button}
          actionModal={this.actionModal}
          actionButton={
            this.state.modal_title === "isin" ? "Create new note" : "Save"
          }
          type={this.state.type}
        >
          {this.state.type ? (
            modalBody()
          ) : (
              <ul className="list-group">{isin_list}</ul>
            )}
        </GenericModal>
        <div className="col-md-12">
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              id="search"
              value={this.state.search}
              onChange={this.inputChange}
            />
            <button type="submit">
              <i className="material-icons">search</i>
            </button>
          </div>
        </div>
        <div className="col-md-12 fs-12">
          <div className="table-responsive mt-3">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>{tableHeads}</tr>
              </thead>
              <tbody>{tableData}</tbody>
            </table>
          </div>
        </div>
        <div className="col-md-12 text-center">
          <button
            className="btn btn-primary"
            onClick={() => this.openModal("text", "isin")}
          >
            New Note
          </button>
          <button
            className="btn btn-primary ml-3"
            onClick={() => this.openModal("", "Confirmation of New Note")}
          >
            Confirm Note
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  new_notes: state.newnote.noteData,
  new_notes_copy: state.newnote.noteDataCopy
});

const mapDispatchToProps = dispatch => ({
  listNotesRequest: () => dispatch(listNotesRequest()),
  updateNewNote: data => dispatch(updateNewNote(data)),
  resetNote: () => dispatch(resetNote()),
  updateNoteRequest: data => dispatch(updateNoteRequest(data)),
  createNoteRequest: data => dispatch(createNoteRequest(data)),
  onDeleteClick: data => dispatch(deleteNoteRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNote);
