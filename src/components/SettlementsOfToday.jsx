import React, { Component } from "react";
import GenericModal from "./GenericModal";
import { connect } from "react-redux";
import { confirmSettlementRequest, getOrdersRequest } from "../redux/actions";
import moment from "moment";
import { numberWithCommas } from "./../services/generic";

class SettlementsOfToday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      is_modal_open: false,
      isin: "",
      settlement_status:""
    };
    if (!props.settlements.data) props.getSettlements();
  }
  inputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  openModal = (_id, isin) => {
    this.setState({ is_modal_open: true, isin, _id });
  };
  closeModal = () => {
    this.setState({ is_modal_open: false });
  };
  confirmSettlement = () => {
    let { isin, settlement_status, _id} =this.state;
    this.props.confirmSettlement({settlement_status, _id});
    this.setState({ is_modal_open: false });
  };
  handleInput = (e) => {
    this.setState({settlement_status:e.target.value})
  }
  render() {
    const tableRows = [
      "ISIN",
      "Total Amount",
      "Buy/Sell",
      "Sales P&L",
      "Market Maker Fees",
      "Transfer to IB",
      "IB account",
      "Status"
    ];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    let tableData;
    if (this.props.settlements.data) {
      const filterData = this.props.settlements.data.filter(item => {
        return (
          item.value_date &&
          moment(item.value_date).format("DD/MM/YYYY") ===
            moment().format("DD/MM/YYYY")
        );
      });
      if (filterData.length) {
        tableData = filterData.map((item, index) => {
          let transfertoIB;
          if(item.buy_or_sell === 'B'){
            transfertoIB = item.total_amount - item['sales_P&L'] - item.market_maker_fee;
          } else if(item.buy_or_sell === 'S'){
            transfertoIB = item.total_amount + item['sales_P&L'] - item.market_maker_fee;
          }
          return (
            <tr key={index}>
              <td>{item.isin}</td>
              <td>
                {item.total_amount &&
                  numberWithCommas(parseFloat(item.total_amount).toFixed(2))}
              </td>
              <td>{item.buy_or_sell}</td>
              <td>{item['sales_P&L']}</td>
              <td>{item.market_maker_fee}</td>
              <td>{isNaN(transfertoIB) ? '' : transfertoIB}</td>
              <td>{item.ib_account}</td>
              <td
                className="cursor-pointer"
                onClick={() => this.openModal(item._id, item.isin)}
              >
                {item.settlement_status}
              </td>
            </tr>
          );
        });
      } else {
        tableData = (
          <tr>
            <td colSpan={tableRows.length}>No Data Available</td>
          </tr>
        );
      }
    }
    return (
      <div className="row">
        <GenericModal
          show={this.state.is_modal_open}
          title="Confirm Trade Settlement Processed"
          closeModal={this.closeModal}
          actionModal={this.confirmSettlement}
          actionButton="Confirm"
        >
          <select
            className="form-control"
            value={this.state.status}
            onChange={this.handleInput}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Settled">Settled</option>
          </select>
        </GenericModal>
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
  settlements: state.salesdetails.ordersdata.data
});

const mapDispatchToProps = dispatch => ({
  confirmSettlement: isin => dispatch(confirmSettlementRequest(isin)),
  getSettlements: () => dispatch(getOrdersRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettlementsOfToday);
