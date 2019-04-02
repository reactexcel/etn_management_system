import React, { Component } from "react";
import { connect } from "react-redux";
import GenericModal from "./GenericModal";
import { marketMakerRequest } from "../redux/actions";

class ListOfMarketMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      email: "",
      phone_no: "",
      contact_name: ""
    };
    if (!props.list_of_market_maker.length) props.marketMakerRequest();
  }
  openModal = item => {
    const { email, phone_no, contact_name } = item;
    this.setState({ is_modal_open: true, email, phone_no, contact_name });
  };
  closeModal = () => {
    this.setState({ is_modal_open: false });
  };

  render() {
    const tableRows = ["Exchange", "Name", "Details"];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    const tableData = this.props.list_of_market_maker.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.exchange}</td>
          <td>{item.name}</td>
          <td className="cursor-pointer" onClick={() => this.openModal(item)}>
            +
          </td>
        </tr>
      );
    });
    return (
      <div className="row">
        <GenericModal
          show={this.state.is_modal_open}
          title="Details"
          closeModal={this.closeModal}
          hideActionButton={true}
        >
          <div>Email: {this.state.email}</div>
          <div>Phone No: {this.state.phone_no}</div>
          <div>Contact Name: {this.state.contact_name}</div>
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
  list_of_market_maker: state.marketmaker.data
});

const mapDispatchToProps = dispatch => ({
  marketMakerRequest: () => dispatch(marketMakerRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfMarketMaker);
