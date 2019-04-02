import React, { Component } from "react";
import { connect } from "react-redux";
import GenericModal from "./GenericModal";
import { confirmOrderRequest, getOrdersRequest } from "../redux/actions";
import { numberWithCommas } from "./../services/generic";
import moment from "moment";

class OrdersOfToday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      isin: "",
      _id: ""
    };
    if (!props.orders.data) {
      props.getOrders();
    }
  }
  openModal = (isin, _id) => {
    this.setState({ is_modal_open: true, isin, _id });
  };
  closeModal = () => {
    this.setState({ is_modal_open: false });
  };
  handleConfirmTradeOrder = () => {
    this.props.confirmTradeOrder(this.state._id);
    this.setState({ is_modal_open: false });
  };
  render() {
    const tableRows = [
      "ISIN",
      "Certificate Number",
      "Price",
      "buy/sell",
      "Total Amount",
      "Market Maker",
      "Trade Date",
      "Value Date",
      "Status",
      "IB account"
    ];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    let filteredData = [];
    if (this.props.orders.data) {
      filteredData = this.props.orders.data.filter(item => {
        return (
          moment(item.createdAt).format("DD/MM/YYYY") ===
          moment().format("DD/MM/YYYY")
        );
      });
    }
    const tableData = filteredData.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.isin}</td>
          <td>{item.certificate_number}</td>
          <td>
            {item.price && numberWithCommas(parseFloat(item.price).toFixed(2))}
          </td>
          <td>{item.buy_or_sell}</td>
          <td>
            {item.total_amount &&
              numberWithCommas(parseFloat(item.total_amount).toFixed(2))}
          </td>
          <td>{item.exchange}</td>
          <td>{moment(item.trade_date).format("MM/DD/YYYY")}</td>
          <td>{moment(item.value_date).format("MM/DD/YYYY")}</td>
          <td
            className="cursor-pointer"
            onClick={() => this.openModal(item.isin, item._id)}
          >
            {item.status ? "processed" : "-"}
          </td>
          <td>{item.ib_account}</td>
        </tr>
      );
    });
    return (
      <div className="row">
        <GenericModal
          show={this.state.is_modal_open}
          title="Confirm Trade Order Processed"
          closeModal={this.closeModal}
          actionModal={this.handleConfirmTradeOrder}
          actionButton="Confirm"
        />

        {this.props.past && (
          <div className="col-md-12 mt-3">
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
        )}
        <div className="col-md-12 mt-3">
          <div className="table-responsive">
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
  orders: state.salesdetails.ordersdata.data
});

const mapDispatchToProps = dispatch => ({
  confirmTradeOrder: isin => dispatch(confirmOrderRequest(isin)),
  getOrders: () => dispatch(getOrdersRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersOfToday);
