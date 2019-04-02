import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
    sendQueryRequest,
    updateFeeQuery,
    getCertificatesRequest,
} from "../redux/actions";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";



class EndOfMonthSplitExact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_table_open: false,
      data:
          {
            isin: "",
            start_date: "",
            end_date: "",
            ib_account: "",
            total_amount_to_withdraw: "",
            management_fee: "",
            brokerage_fee_client: "",
              brokerage_fee_cirdan: ""
          }
    };
    if (!props.list_of_certificates) {
      props.getCertificates();
    }
  }

  handleISINInput = event=>{

      if (event.target.value === 'Select ISIN'){
          this.setState({is_table_open: false});
      }else {
          const oneCertificate = this.props.list_of_certificates.filter(item => {
              return item.isin === event.target.value;
          })[0];
          this.props.updateFeeQuery({
              title: "ib_account",
              value: oneCertificate? oneCertificate.ib_account: ""
          });
          this.props.updateFeeQuery({title: "isin", value: event.target.value});
          this.setState({is_table_open: false});
      }

  }

  dateChange = ( title, date) => {
    this.props.updateFeeQuery({ title, value: date });
      this.setState(  {is_table_open: false});
  };

  start_dateChange = (date) =>{
      this.dateChange('start_date', date);
  };

  end_dateChange = (date) =>{
        this.dateChange('end_date', date);
  };

  onQuery = ()=>{
      if (this.props.data && this.props.data.isin && this.props.data.isin.length === 12 &&
          this.props.data.ib_account && this.props.data.start_date && this.props.data.end_date
      ) {
          const query_info = this.props.data;
          this.props.query(query_info);
          this.setState({is_table_open: true});
      } else {
          toast.error('Missing some fields');
      }

 };
  render() {
    const tableRows = [
      "ISIN",
      "IB Account",
      "Start Date",
      "End Date(Exclusive)",
    ];
    const tableHeads = tableRows.map((item, index) => (
        <th key={index}>{item}</th>
    ));
    const isin_body = ()=> {
      if (this.props.list_of_certificates) {
        const isin_list = this.props.list_of_certificates.map(
            (item, index) => (
                <option key={index} value={item.isin}>
                  {item.isin}
                </option>
            )
        );
        return (
            <select
                className="form-control"
                value={this.props && this.props.data && this.props.data.isin}
                onChange={this.handleISINInput}
            >
              <option value="">Select ISIN</option>
              {isin_list}
            </select>
        );
      } else {
        return "Please add and confirm certificates from new note";
      }
    };

    const item = this.props.data;
    const tableData = (
        <tr >
          <td >
            {isin_body()}
          </td>
          <td>
            {item.ib_account ? item.ib_account : "-"}
          </td>
          <td>
            <DatePicker
                selected={
                  this.props && this.props.data && this.props.data.start_date
                      ? new Date(this.props.data.start_date)
                      : null
                }
                value={
                  this.props && this.props.data && this.props.data.start_date
                      ? moment(this.props.data.start_date)
                          .format("MM/DD/YYYY")
                          .toString()
                      : null}
                onChange={this.start_dateChange}
            />
          </td>
          <td >
            <DatePicker
                selected={
                  this.props && this.props.data && this.props.data.end_date
                      ? new Date(this.props.data.end_date)
                      : null
                }
                value={
                  this.props && this.props.data && this.props.data.end_date
                      ? moment(this.props.data.end_date)
                          .format("MM/DD/YYYY")
                          .toString()
                      : null}
                onChange={this.end_dateChange}
            />
          </td>
        </tr>
    );

    const result_head = [
      "ISIN",
      "IB Account",
      "Start Date",
      "End Date(Exclusive)",
      "Total Amount to Withdraw",
      "Brokerage Fee for Client",
      "Brokerage Fee for Cirdan",
      "Management Fee"
    ];

    const result_table_head = result_head.map((item, index) => (
        <th key={index}>{item}</th>
    ));

    const result_table_content = (
      <tr>
          <td>
              {this.props.data.isin}
          </td>
          <td>
              {this.props.data.ib_account}
          </td>
          <td>
              {moment(this.props.data.start_date)
                  .format("MM/DD/YYYY")
                  .toString()}
          </td>
          <td>
              {moment(this.props.data.end_date)
                  .format("MM/DD/YYYY")
                  .toString()}
          </td>
          <td>
              {this.props.data.total_amount_to_withdraw}
          </td>

          <td>
              {this.props.data.brokerage_fee_client}
          </td>

          <td>
              {this.props.data.brokerage_fee_cirdan}
          </td>
          <td>
              {this.props.data.management_fee}
          </td>
      </tr>
    );

    return (
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive mt-3">
              <table className="table table-striped table-bordered">
                <thead>
                <tr>
                  {tableHeads}
                </tr>
                </thead>
                <tbody>{tableData}</tbody>
              </table>
            </div>
          </div>
          <div className="col-md-2">
          </div>
          <div className="col-md-3 offset-md-7">
            <button
                className="btn btn-primary w-100"
                onClick={this.onQuery}
            >
              Query
            </button>
          </div>
            <div className="col-md-2">
            </div>
            <div className="col-md-12">
                <div className="table-responsive mt-3">
                    {this.state.is_table_open &&( <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            {result_table_head}
                        </tr>
                        </thead>
                        <tbody>{result_table_content}</tbody>
                    </table>)}
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.queryfee.data,
  list_of_certificates: state.sales.certificateData.data
});

const mapDispatchToProps = dispatch => ({
  query: data => dispatch(sendQueryRequest(data)),
    updateFeeQuery: data => dispatch(updateFeeQuery(data)),
  getCertificates: () => dispatch(getCertificatesRequest()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EndOfMonthSplitExact);
