import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrdersRequest } from "../redux/actions";
import moment from "moment";
import { numberWithCommas } from "./../services/generic";

class SettlementsOfToday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    if (!props.pastSettlements.data) props.getPastSettlements();
  }
  inputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  render() {
    const tableRows = [
      "ISIN",
      "Total Amount",
      "Buy/Sell",
      "Sales P&L",
      "Market Maker",
      "Market Maker Fees",
      "Transfer to IB",
      "IB account",
      "Settlement Date"
    ];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    let tableData;
    if (this.props.pastSettlements.data) {
      const filteredData = this.props.pastSettlements.data.filter(item => {
        return (
          item.isin.includes(this.state.search) &&
          item.value_date &&
          moment(item.value_date).format("DD/MM/YYYY") <=
            moment().format("DD/MM/YYYY")
        );
      });
      tableData = filteredData.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.isin}</td>
            <td>
              {item.total_amount &&
                numberWithCommas(parseFloat(item.total_amount).toFixed(2))}
            </td>
            <td>{item.buy_or_sell && item.buy_or_sell.toUpperCase()}</td>
            <td>
              {item["sales_P&L"] &&
                numberWithCommas(parseFloat(item["sales_P&L"]).toFixed(2))}
            </td>
            <td>{item.exchange && item.exchange}</td>
            <td>
              {item.market_maker_fee &&
                numberWithCommas(parseFloat(item.market_maker_fee).toFixed(2))}
            </td>
            <td>
              {item.total_amount.toString() &&
              item["sales_P&L"].toString() &&
              item.market_maker_fee.toString()
                ? numberWithCommas(
                    parseFloat(
                      item.total_amount -
                        item["sales_P&L"] -
                        item.market_maker_fee
                    ).toFixed(2)
                  )
                : null}
            </td>
            <td>{item.ib_account}</td>
            <td>{moment(item.value_date).format("MM/DD/YYYY")}</td>
          </tr>
        );
      });
    } else
      tableData = (
        <tr>
          <td colSpan={tableRows.length}>No Data Available</td>
        </tr>
      );
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
  // pastSettlements: [] // state.sales.certificateData.data
  pastSettlements: state.salesdetails.ordersdata.data
});

const mapDispatchToProps = dispatch => ({
  // getPastSettlements: () => dispatch(salesRequest()),
  getPastSettlements: () => dispatch(getOrdersRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettlementsOfToday);
