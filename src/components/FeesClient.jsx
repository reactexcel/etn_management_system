import React, { Component } from "react";
import { connect } from "react-redux";
import {
  clientFeeRequest,
  createClientFeeRequest,
  getCertificatesRequest
} from "../redux/actions";
import { numberWithCommas } from "./../services/generic";
import moment from "moment";
import GenericModal from "./GenericModal";
import NumericInput from "react-numeric-input";

class FeesClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      modal_title: "",
      index: 0,
      isin: "",
      brokerage_fee: "",
      management_fee: ""
    };
    if (!props.client_fees) {
      props.getClientFee();
    }
    if (!props.list_of_certificates) {
      props.getCertificates();
    }
  }
  openModal = (index, modal_title) => {
    this.setState({ is_modal_open: true, modal_title, index });
  };
  closeModal = () => {
    // this.props.resetFee();
    this.setState({ is_modal_open: false });
  };
  handleISINInput = e => {
    this.setState({ isin: e.target.value });
  };
  numericBrokerageFeeChange = value => {
    this.setState({ brokerage_fee: value });
  };
  numericManagementFeeChange = value => {
    this.setState({ management_fee: value });
  };
  actionModal = () => {
    const { modal_title, isin, brokerage_fee, management_fee } = this.state;
    if (modal_title === "add_fee") {
      if (isin && brokerage_fee && management_fee) {
        this.props.getCreateClientFee({ isin, brokerage_fee, management_fee });
        this.setState({ is_modal_open: false });
      }
    }
  };
  render() {
    const tableRows = [
      "ISIN",
      "Date",
      "Management Fees Client",
      "Brokerage Fees Client"
    ];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    let tableData;
    if (this.props.client_fees) {
      tableData = this.props.client_fees.map((item, index) => (
        <tr key={index}>
          <td>{item.isin}</td>
          <td> {moment(item.createdAt).format("MM/DD/YYYY")}</td>
          <td>
            {item.management_fee &&
              numberWithCommas(parseFloat(item.management_fee).toFixed(2))}
          </td>
          <td>
            {item.brokerage_fee &&
              numberWithCommas(parseFloat(item.brokerage_fee).toFixed(2))}
          </td>
        </tr>
      ));
    } else {
      tableData = (
        <tr>
          <td colSpan={tableRows.length}>No Data Available</td>
        </tr>
      );
    }

    const modalBody = () => {
      // if (this.state.modal_title === "add_fee") {
      let isin_list;
      if (this.props.list_of_certificates) {
        isin_list = this.props.list_of_certificates.map((item, index) => (
          <option key={index} value={item.isin}>
            {item.isin}
          </option>
        ));
      } else {
        isin_list = null;
      }
      return (
        <div>
          <p>ISIN :</p>
          <select
            className="form-control"
            value={this.state.isin}
            onChange={this.handleISINInput}
          >
            <option value="">Select ISIN</option>
            {isin_list}
          </select>
          <p>Management Fee :</p>
          <NumericInput
            className="form-control"
            value={this.state.management_fee}
            step={0.01}
            precision={2}
            onChange={this.numericManagementFeeChange}
            strict
          />
          <p>Brokerage Fee :</p>
          <NumericInput
            className="form-control"
            value={this.state.brokerage_fee}
            step={0.01}
            precision={2}
            onChange={this.numericBrokerageFeeChange}
            strict
          />
          {this.state.validation_message && (
            <span className="valid-message text-danger">
              Please Fill All Fields
            </span>
          )}
        </div>
      );
      // } else {
      //   return (
      //     <NumericInput
      //       className="form-control"
      //       step={0.01}
      //       // value={
      //       //   this.props.cirdan_fees_copy[this.state.index] &&
      //       //   this.props.cirdan_fees_copy[this.state.index][
      //       //     this.state.modal_title
      //       //   ]
      //       // }
      //       // onChange={this.numericInputChange}
      //       precision={2}
      //       strict
      //     />
      //   );
      // }
    };

    return (
      <div className="row">
        <GenericModal
          show={this.state.is_modal_open}
          title={this.state.modal_title}
          closeModal={this.closeModal}
          //   hideActionButton={true}
          actionModal={this.actionModal}
          actionButton={
            this.state.modal_title === "add_fee" ? "Add New Fee" : "Save"
          }
          //   type={this.state.type}
        >
          {modalBody()}
          {/* {this.state.type ? (
            modalBody()
          ) : (
            <ul className="list-group">{isin_list}</ul>
          )} */}
        </GenericModal>

        <div className="col-md-12">
          <div className="table-responsive mt-3">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>{tableHeads}</tr>
              </thead>
              <tbody>{tableData}</tbody>
            </table>
          </div>
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => this.openModal(null, "add_fee")}
          >
            Add Fee
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  client_fees: state.fees.client_fee.data,
  list_of_certificates: state.sales.certificateData.data
});
const mapDispatchToProps = dispatch => ({
  getClientFee: () => dispatch(clientFeeRequest()),
  getCreateClientFee: data => dispatch(createClientFeeRequest(data)),
  getCertificates: () => dispatch(getCertificatesRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeesClient);
