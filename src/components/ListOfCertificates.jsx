import React, { Component } from "react";
import { connect } from "react-redux";
import GenericModal from "./GenericModal";
import { salesRequest, getCertificatesRequest } from "../redux/actions";

class ListOfCertificates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      index: ""
    };
    if (!props.list_of_certificates) {
      props.getCertificates();
    }
  }
  openModal = index => {
    this.setState({ is_modal_open: true, index });
  };
  closeModal = () => {
    this.setState({ is_modal_open: false });
  };
  render() {
    let tableData;
    const tableRows = ["ISIN", "Sales", "Client Details"];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    if (this.props.list_of_certificates) {
      tableData = this.props.list_of_certificates.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.isin}</td>
            <td> {item.sales}</td>
            <td
              className="cursor-pointer"
              onClick={() => this.openModal(index)}
            >
              +
            </td>
          </tr>
        );
      });
    } else {
      tableData = (
        <tr>
          <td colSpan="3">No Data Available</td>
        </tr>
      );
    }
    return (
      <div className="row">
        <GenericModal
          show={this.state.is_modal_open}
          title="Client Details"
          closeModal={this.closeModal}
          hideActionButton={true}
        >
          {this.props.list_of_certificates[this.state.index] && (
            <div>
              <div>
                Client Full Name:{" "}
                {
                  this.props.list_of_certificates[this.state.index]
                    .client_full_name
                }
              </div>
              <div>
                Client Email:{" "}
                {this.props.list_of_certificates[this.state.index].client_email}
              </div>
              <div>
                Client Phone No:{" "}
                {
                  this.props.list_of_certificates[this.state.index]
                    .client_phone_number
                }
              </div>
            </div>
          )}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list_of_certificates: state.sales.certificateData.data
});

const mapDispatchToProps = dispatch => ({
  getCertificates: () => dispatch(getCertificatesRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfCertificates);
