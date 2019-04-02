import React, { Component } from "react";
import { connect } from "react-redux";
import {
  cirdanFeeRequest,
  updateLocalFee,
  resetFee,
  updateCirdanFeeRequest,
  createCirdanFeeRequest,
  getCertificatesRequest
} from "../redux/actions";
import { numberWithCommas } from "./../services/generic";
import GenericModal from "./GenericModal";
import NumericInput from "react-numeric-input";
import moment from "moment";

class FeesCirdan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      is_modal_open: false,
      modal_title: "",
      isin: "",
      management_fee: "",
      brokerage_fee: "",
      market_making_fee: "",
      validation_message: false
    };
    if (!props.cirdan_fees) {
      props.cirdanFeeRequest();
    }
    if (!props.list_of_certificates) {
      props.getCertificates();
    }
  }
  openModal = (index, modal_title) => {
    this.setState({ is_modal_open: true, modal_title, index });
  };
  closeModal = () => {
    this.props.resetFee();
    this.setState({ is_modal_open: false });
  };
  actionModal = () => {
    if (this.state.modal_title === "add_fee") {
      const {
        isin,
        management_fee,
        brokerage_fee,
        market_making_fee
      } = this.state;
      if (isin && management_fee && brokerage_fee && market_making_fee) {
        const oneCertificate = this.props.list_of_certificates.filter(item => {
          return item.isin === isin;
        })[0];
        this.props.createCirdanFeeRequest({
          isin,
          management_fee,
          brokerage_fee,
          market_making_fee,
          ib_account: oneCertificate.ib_account
        });
        this.setState({ is_modal_open: false });
      } else {
        this.setState({ validation_message: true });
      }
    } else {
      const { cirdan_fees_copy } = this.props;
      this.props.updateCirdanFeeRequest(cirdan_fees_copy[this.state.index]);
      this.setState({ is_modal_open: false });
    }
  };
  numericInputChange = value => {
    const { index: id, modal_title: title } = this.state;
    this.props.updateLocalFee({ id, title, value });
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
  numericMarketFeeChange = value => {
    this.setState({ market_making_fee: value });
  };
  render() {
    const tableRows = [
      "ISIN",
      "Date",
      "Management Fees Cirdan",
      "Brokerage Fees Cirdan",
      "Market Making Fees Cirdan"
    ];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    let tableData;
    if (this.props.cirdan_fees.length) {
      tableData = this.props.cirdan_fees.map((item, index) => (
        <tr key={index}>
          <td>{item.isin}</td>
          <td> {moment(item.createdAt).format("MM/DD/YYYY")}</td>
          <td
            className="cursor-pointer"
            onClick={() => this.openModal(index, "management_fee")}
          >
            {item.management_fee &&
              numberWithCommas(parseFloat(item.management_fee).toFixed(2))}
          </td>
          <td
            className="cursor-pointer"
            onClick={() => this.openModal(index, "brokerage_fee")}
          >
            {item.brokerage_fee &&
              numberWithCommas(parseFloat(item.brokerage_fee).toFixed(2))}
          </td>
          <td
            className="cursor-pointer"
            onClick={() => this.openModal(index, "market_making_fee")}
          >
            {item.market_making_fee &&
              numberWithCommas(parseFloat(item.market_making_fee).toFixed(2))}
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
      if (this.state.modal_title === "add_fee") {
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
            <p>Market Making Fee :</p>
            <NumericInput
              className="form-control"
              value={this.state.market_making_fee}
              step={0.01}
              precision={2}
              onChange={this.numericMarketFeeChange}
              strict
            />
            {this.state.validation_message && (
              <span className="valid-message text-danger">
                Please Fill All Fields
              </span>
            )}
          </div>
        );
      } else {
        return (
          <NumericInput
            className="form-control"
            step={0.01}
            value={
              this.props.cirdan_fees_copy[this.state.index] &&
              this.props.cirdan_fees_copy[this.state.index][
                this.state.modal_title
              ]
            }
            onChange={this.numericInputChange}
            precision={2}
            strict
          />
        );
      }
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
  cirdan_fees: state.fees.cirdan_fee.data,
  cirdan_fees_copy: state.fees.cirdan_fee.data_copy,
  list_of_certificates: state.sales.certificateData.data
});
const mapDispatchToProps = dispatch => ({
  cirdanFeeRequest: () => dispatch(cirdanFeeRequest()),
  updateLocalFee: data => dispatch(updateLocalFee(data)),
  resetFee: () => dispatch(resetFee()),
  updateCirdanFeeRequest: data => dispatch(updateCirdanFeeRequest(data)),
  createCirdanFeeRequest: data => dispatch(createCirdanFeeRequest(data)),
  getCertificates: () => dispatch(getCertificatesRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeesCirdan);
