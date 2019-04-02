import React, { Component } from "react";
import { connect } from "react-redux";
import { monthSplitRequest } from "../redux/actions";

class EndOfMonthSplit extends Component {
  constructor(props) {
    super(props);
    // if (!props.month_split) {
    props.getMonthSplit();
    // }
  }

  render() {
    const tableRows = [
      "ISIN",
      "Sub account",
      "Total Amount to withdraw",
      "Management Fees",
      "brokerage fees client",
      "brokerage fees sales"
    ];
    const tableHeads = tableRows.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
    let tableData;
    if (this.props.month_split) {
      tableData = this.props.month_split.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item._id}</td>
            <td>{item.ib_account}</td>
            <td>
              {(item.management_fee ? parseFloat(item.management_fee) : 0) +
                (item.brokerage_fee_client
                  ? parseFloat(item.brokerage_fee_client)
                  : 0) +
                (item.brokerage_fee_cirdan
                  ? parseFloat(item.brokerage_fee_cirdan)
                  : 0)}
            </td>
            <td>{item.management_fee}</td>
            <td>{item.brokerage_fee_client}</td>
            <td>{item.brokerage_fee_cirdan}</td>
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
    return (
      <div className="row">
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
  month_split: state.fees.month_split.data.data
});
const mapDispatchToProps = dispatch => ({
  getMonthSplit: () => dispatch(monthSplitRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndOfMonthSplit);
