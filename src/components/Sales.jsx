import React, { Component } from "react";
import { connect } from "react-redux";
import GenericModal from "./GenericModal";
import moment from "moment";
import { Link } from "react-router-dom";
import { numberWithCommas } from "./../services/generic";
import {
  getCertificatesRequest,
  ibDataRequest,
  getGraphIndexRequest,
  updateCertificateRequest,
  graphDataForDailyChange
} from "../redux/actions";
import Loader from "react-loader";

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      is_modal_open: false,
      modal_title: "",
      status: false,
      status2: false,
      daily_change_percent: [],
      client_email: "",
      client_full_name: "",
      client_phone_number: ""
    };
    if (!props.notes) props.notesRequest();
  }
  componentDidMount() {
    if (
      this.props.notes.length &&
      !this.props.ib_data.length &&
      !this.state.status
    ) {
      this.props.notes.map(item => {
        this.props.ibDataRequest(item.ib_account);
      });
      this.setState({ status: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.notes.length && !this.state.status) {
      this.props.notes.map(item => {
        this.props.ibDataRequest(item.ib_account);
        //[x]: add more into this payload, including isin, startdate, enddate, and currency
        const yesterdayDate = Math.floor(
          new Date().setFullYear(new Date().getFullYear() - 1) / 1000
        );
        const todayDate = Math.floor(+new Date() / 1000);
        const myPayload = {
          isin: item.isin,
          start: yesterdayDate,
          end: todayDate,
          currency: item.currency
        };
        this.props.graphDataForDailyChange(myPayload);
      });
      this.setState({ status: true });
    }
    if (
      this.props.graph_data_for_daily_change.length ===
        this.props.notes.length &&
      this.props.graph_data_for_daily_change.length !==
        this.state.daily_change_percent.length
    ) {
      const dailyChangeCalculated = [];
      this.props.notes.map((item, index) => {
        const daily_change_data = this.props.graph_data_for_daily_change.find(
          graphitem => {
            return Object.keys(graphitem)[0].includes(item.isin);
          }
        )[`${item.isin}%20Corp`]["PX_LAST"];
        const less_daily_change_data = Object.values(daily_change_data).slice(
          daily_change_data.length - 2,
          daily_change_data.length
        );
        const daily_change =
          (less_daily_change_data[0] / less_daily_change_data[1] - 1) * 100;
        dailyChangeCalculated.push(daily_change);

        // TODO: I cannot set this state: daily_change_percent. I always got a empty list.
        if (dailyChangeCalculated.length > 0) {
          console.log(dailyChangeCalculated);
          // this.setState({ daily_change_percent: dailyChangeCalculated });
          console.log(this.state.daily_change_percent);
          console.log(this.state);
          this.setState((state, props) => ({
            daily_change_percent: dailyChangeCalculated
          }));
        }
      });
    }
    if (
      this.props.notes.length &&
      this.props.notes.length === this.props.ib_data.length &&
      !this.state.status2 &&
      this.state.daily_change_percent
    ) {
      this.props.notes.map((item, index) => {
        const {
          curBid: bid_price,
          curAsk: ask_price,
          curBidSize: bid_size,
          curAskSize: ask_size,
          indexTicker,
          noteTicker
        } = this.props.ib_data.find(ele => ele.isin == item.isin);
        const { _id } = item;
        const daily_change_percent = this.state.daily_change_percent[index];
        console.log("console.log(this.props.daily_change_percent);");
        console.log(this.state.daily_change_percent);
        console.log(daily_change_percent);
        this.props.updateCertificate({
          _id,
          bid_price,
          bid_size,
          ask_price,
          ask_size,
          indexTicker,
          noteTicker,
          daily_change_percent
        });
      });
      this.setState({ status2: true });
    }
  }
  openModal = item => {
    const { client_email, client_full_name, client_phone_number } = item;
    this.setState({
      is_modal_open: true,
      client_email,
      client_full_name,
      client_phone_number
    });
  };
  inputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  priceClick = price => {
    this.setState({ is_modal_open: true, modal_title: price });
  };
  closeModal = () => {
    this.setState({ is_modal_open: false });
  };
  render() {
    let tableData;
    if (this.props.notes.length) {
      //console.log(this.props.notes);
      const filteredData = this.props.notes.filter((item, index) => {
        return item.isin && item.isin.includes(this.state.search);
      });
      if (this.props.ib_data.length === this.props.notes.length)
        console.log(this.props.ib_data, this.props.notes);

      tableData = filteredData.map((item, index) => {
        return (
          <tr key={index}>
            <td className="cursor-pointer">
              <Link
                to={{
                  pathname: `/sales_details/${item.isin}`,
                  // state: this.props.notes[index].ask_price ? this.props.notes[index] : this.props.ib_data[index]
                  state: this.props.ib_data.find(ele => ele.isin == item.isin)
                }}
              >
                {item.isin}
              </Link>
            </td>
            <td className="cursor-pointer" onClick={() => this.openModal(item)}>
              +
            </td>
            <td>{item.currency}</td>
            <td>
              {item.maturity_date &&
                moment(item.maturity_date).format("MM/DD/YYYY")}
            </td>
            {/* {this.props.ib_data.length === this.props.notes.length ? ( */}
            {!item.ask_price &&
            this.props.ib_data.length === this.props.notes.length ? (
              <>
                <td>
                  {!item.daily_change_percent
                    ? this.state.daily_change_percent[index]
                    : item.daily_change_percent}
                </td>
                <td>
                  {
                    this.props.ib_data.find(ele => ele.isin == item.isin)
                      .curBidSize
                  }
                </td>
                <td
                  className="cursor-pointer"
                  // onClick={() => this.priceClick("bid_price")}
                >
                  {numberWithCommas(
                    parseFloat(
                      this.props.ib_data.find(ele => ele.isin == item.isin)
                        .curBid
                    ).toFixed(2)
                  )}
                  {item.manual_bid_price && item.manual_ask_price && (
                    <span className="manual-input-status" />
                  )}
                </td>
                <td
                  className="cursor-pointer"
                  // onClick={() => this.priceClick("ask_price")}
                >
                  {numberWithCommas(
                    parseFloat(
                      this.props.ib_data.find(ele => ele.isin == item.isin)
                        .curAsk
                    ).toFixed(2)
                  )}
                  {item.manual_bid_price && item.manual_ask_price && (
                    <span className="manual-input-status" />
                  )}
                </td>
                <td>
                  {
                    this.props.ib_data.find(ele => ele.isin == item.isin)
                      .curAskSize
                  }
                </td>
              </>
            ) : (
              <>
                <td>{item.daily_change_percent}</td>
                <td>
                  {item.manual_bid_size ? item.manual_bid_size : item.bid_size}
                </td>
                <td>
                  {item.manual_bid_price
                    ? numberWithCommas(
                        parseFloat(item.manual_bid_price).toFixed(2)
                      )
                    : item.bid_price &&
                      numberWithCommas(parseFloat(item.bid_price).toFixed(2))}
                  {item.manual_bid_price && item.manual_ask_price && (
                    <span className="manual-input-status" />
                  )}
                </td>
                <td>
                  {item.manual_ask_price
                    ? numberWithCommas(
                        parseFloat(item.manual_ask_price).toFixed(2)
                      )
                    : item.ask_price &&
                      numberWithCommas(parseFloat(item.ask_price).toFixed(2))}
                  {item.manual_bid_price && item.manual_ask_price && (
                    <span className="manual-input-status" />
                  )}
                </td>
                <td>
                  {item.manual_ask_size ? item.manual_ask_size : item.ask_size}
                </td>
              </>
            )}
            <td>{item.number_of_units}</td>
            <td>{item.aum}</td>
            <td>
              {item.commission &&
                numberWithCommas(parseFloat(item.commission).toFixed(2))}
            </td>
            <td>
              {!item.indexTicker &&
              this.props.ib_data.length === this.props.notes.length
                ? this.props.ib_data.find(ele => ele.isin == item.isin)
                    .indexTicker
                : item.indexTicker}
            </td>
          </tr>
        );
      });
    } else {
      tableData = (
        <tr>
          <td colSpan="12">
            <Loader loaded={this.props.notes_loading} top="62%" radius={5} />
          </td>
        </tr>
      );
    }
    return (
      <div className="row mt-5 fs-12">
        <GenericModal
          show={this.state.is_modal_open}
          title="Client Details"
          closeModal={this.closeModal}
          hideActionButton={true}
          // actionButton="Confirm"
        >
          <div>
            <div>Full Name : {this.state.client_full_name}</div>
            <div>Email : {this.state.client_email}</div>
            <div>Phone Number : {this.state.client_phone_number}</div>
          </div>
        </GenericModal>
        <div className="col-md-12">
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
              <thead className="thead">
                <tr>
                  <th>ISIN</th>
                  <th>Client</th>
                  <th>Currency</th>
                  <th>Maturity</th>
                  <th>Daily Change %</th>
                  <th>Bid Size</th>
                  <th>Bid Price</th>
                  <th>Ask Price</th>
                  <th>Ask Size</th>
                  <th>Inventory</th>
                  <th>AUM</th>
                  <th>Commissions</th>
                  <th>Index Ticker</th>
                </tr>
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
  graph_data_for_daily_change: state.sales.graphDataForDailyChange.data,
  notes: state.sales.certificateData.data,
  notes_loading: state.sales.certificateData.isLoading,
  ib_data: state.sales.IBData.data
});

const mapDispatchToProps = dispatch => ({
  notesRequest: () => dispatch(getCertificatesRequest()),
  getGraphIndexData: () => dispatch(getGraphIndexRequest()),
  ibDataRequest: data => dispatch(ibDataRequest(data)),
  updateCertificate: data => dispatch(updateCertificateRequest(data)),
  graphDataForDailyChange: data => dispatch(graphDataForDailyChange(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sales);
