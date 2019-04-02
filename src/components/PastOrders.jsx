import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrdersRequest } from "../redux/actions";
import moment from "moment";
import { numberWithCommas } from "./../services/generic";

class PastOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    if (!props.orders.data) {
      props.getOrders();
    }
  }
  inputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  render() {
    const tableRows = [
      "ISIN",
      "Certificate Number",
      "Price",
      "Total Amount",
      "Buy/Sell",
      "Market Maker",
      "Trade Date",
      "Settlement Date",
      "IB account"
    ];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    let filteredData = [];
    if (this.props.orders.data) {
      filteredData = this.props.orders.data.filter(item => {
        return (
          item.isin.includes(this.state.search) &&
          moment(item.createdAt).format("DD/MM/YYYY") !==
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
          <td>
            {item.total_amount &&
              numberWithCommas(parseFloat(item.total_amount).toFixed(2))}
          </td>
          <td>{item.buy_or_sell}</td>
          <td>{item.exchange}</td>
          <td>
            {item.trade_date && moment(item.trade_date).format("MM/DD/YYYY")}
          </td>
          <td>
            {item.value_date && moment(item.value_date).format("MM/DD/YYYY")}
          </td>
          <td>{item.ib_account}</td>
        </tr>
      );
    });
    return (
      <div className="row">
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
  getOrders: () => dispatch(getOrdersRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PastOrders);
