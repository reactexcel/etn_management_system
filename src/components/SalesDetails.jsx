import React, { Component } from "react";
import GenericModal from "./GenericModal";
import { Line, Chart } from "react-chartjs-2";
import moment from "moment";
import { numberWithCommas } from "./../services/generic";
import NumericInput from "react-numeric-input";
import {
  overwriteRequest,
  cancelOverwriteRequest,
  autoPriceRequest,
  setManualInput,
  getGraphDataRequest,
  createOrderRequest,
  getOrdersRequest,
  getDataIBRequest,
  getGraphIndexRequest,
  getFeesRequest,
  getCertificatesRequest,
  updateUserBidRequest
} from "../redux/actions";
import { connect } from "react-redux";
import Loader from "react-loader";

class SalesDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      modal_title: "",
      error: "",
      _id: "",
      indexTicker:"",
      noteTicker:"",
      // isin: props.location.state ? props.location.state.isin : "",
      isin: props.match.params ? props.match.params.id : "",
      status: false,
      show_modal_action: false
    };
    if (!props.match.params.id) {
      props.history.push("/sales");
    } else {
      props.getFeesRequest(props.match.params.id);
      props.getOrders(props.match.params.id);
    }
    if (!props.certificates.length) {
      props.certificateRequest();
    }
    if (props.location.state) {
      props.setManualInput({
        id: "ask_size",
        value: props.location.state.curAskSize
      });
      props.setManualInput({
        id: "bid_size",
        value: props.location.state.curBidSize
      });
      // props.getGraphData(props.location.state.isin);
      props.getGraphData(props.match.params.id);
    }
    // props.getGraphData("XS1877338043");
    if (!Object.keys(props.graph_index_data).length) {
      props.getGraphIndexData();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      bid_price,
      ask_price,
      bid_size,
      ask_size
    } = this.props.manual_input;
    if (
      bid_price &&
      ask_price &&
      this.state.error === "Please fill Bid/Ask Price"
    ) {
      this.setState({ error: "" });
    }
    if (
      parseInt(bid_price) < parseInt(ask_price) &&
      this.state.error === "Bid Price cannot be greater than Ask Price"
    ) {
      this.setState({ error: "" });
    }
    if (this.props.certificates_success && !this.state.status) {
      const oneCertificate = this.props.certificates.filter(
        item => item.isin === this.props.match.params.id
      )[0];

      if (oneCertificate) {
        const { _id, isin, ib_account, indexTicker,noteTicker, currency } = oneCertificate;
        const graphDataPayload={
          currency,
          noteTicker
        }
        const indexGraphPayload={
          currency,
          indexTicker
        }
        this.setState({ _id, isin, indexTicker , noteTicker });
        // if (!this.props.location.state) {
            this.props.getGraphData(graphDataPayload)
            this.token1 = setInterval(()=>{ this.props.getGraphData(graphDataPayload); }, 60000);
            this.props.getGraphIndexData(indexGraphPayload)
            this.token2 = setInterval(()=>{ this.props.getGraphIndexData(indexGraphPayload); }, 60000);
            this.props.getDataIBRequest(ib_account);
        // }
      } else {
        this.props.history.push("/sales");
      }
      this.setState({ status: true });
    }
    if (
      this.props.overwrite_success &&
      this.props.overwrite_success !== prevProps.overwrite_success
    ) {
      this.props.updateUserBid({
        note_id: this.state._id,
        manual_bid_price: bid_price,
        manual_ask_price: ask_price,
        manual_bid_size: bid_size,
        manual_ask_size: ask_size
      });
    }
    if (
      this.props.canceloverwrite_success &&
      this.props.canceloverwrite_success !== prevProps.canceloverwrite_success
    ) {
      this.props.updateUserBid({
        note_id: this.state._id,
        manual_bid_price: "",
        manual_ask_price: "",
        manual_bid_size: "",
        manual_ask_size: ""
      });
    }

    if (
      this.props.autoprice_success &&
      this.props.autoprice_success !== prevProps.autoprice_success
    ) {
      this.props.updateUserBid({
        note_id: this.state._id,
        manual_bid_price: "",
        manual_ask_price: "",
        manual_bid_size: bid_size,
        manual_ask_size: ask_size
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.token1);
    clearInterval(this.token2);
  }
  manualInputChange = event => {
    this.props.setManualInput({
      id: this.state.modal_title,
      value: event.target.value
    });
  };
  openModal = price => {
    if (price === "spread") {
      this.setState({
        is_modal_open: true,
        modal_title: price,
        show_modal_action: false
      });
    } else {
      this.setState({
        is_modal_open: true,
        modal_title: price,
        show_modal_action: true
      });
    }
  };
  closeModal = () => {
    this.setState({ is_modal_open: false });
  };
  handleOverwrite = () => {
    const {
      bid_price,
      ask_price,
      bid_size,
      ask_size
    } = this.props.manual_input;
    if (bid_price && bid_size && ask_price && ask_size) {

      if (parseFloat(bid_price) < parseFloat(ask_price)) {
        this.props.overwriteRequest({
          bid_price,
          ask_price,
          bid_size,
          ask_size
        });
        this.setState({ error: "" });
      } else {
        this.setState({ error: "Bid Price cannot be greater than Ask Price" });
      }
    } else if (bid_price && ask_price) {
      if (parseInt(bid_price) < parseInt(ask_price)) {
        this.props.overwriteRequest({
          bid_price,
          ask_price
        });
        this.setState({ error: "" });
      } else {
        this.setState({ error: "Bid Price cannot be greater than Ask Price" });
      }
    } else {
      this.setState({ error: "Please fill Bid/Ask Price" });
    }
  };

  handleCancelOverwrite=()=>{
   this.props.cancelOverwriteRequest()
  }

  handleAutoPrice = () => {
    const { spread, bid_size, ask_size } = this.props.manual_input;
    if (spread && ask_size && bid_size) {
      this.props.autoPriceRequest({
        spread,
        ask_size,
        bid_size
      });
      this.setState({ error: "", is_modal_open: false });
    } else if (spread) {
      this.props.autoPriceRequest({
        spread
      });
      this.setState({ error: "", is_modal_open: false });
    } else {
      this.setState({
        error: "Please fill spread field for auto price.",
        is_modal_open: false
      });
    }
  };
  handleManualInputType = event => {
    event.persist();
    this.setState(prevState => ({
      [event.target.id]: !prevState[event.target.id]
    }));
  };
  onMarketChange = event => {
    this.setState({ marketId: event.target.value });
  };
  numericInputChange = value => {
    // this.setState({ input: parseFloat(value) });
    this.props.setManualInput({
      id: this.state.modal_title,
      value
    });
  };
  render() {
    Chart.defaults.line.spanGaps = true;
    let data1 = {};
    let data2 = {};
    // tick range of the two charts
    let maxData1 = 0;
    let minData1 = 0;
    let maxData2 = 0;
    let minData2 = 0;

    if (this.props.graph_index_data[this.state.indexTicker && this.state.indexTicker.replace( / /g, "%20")]) {

      const keys = Object.keys(
        this.props.graph_index_data[this.state.indexTicker && this.state.indexTicker.replace(/ /g, "%20")]["PX_LAST"]
      ).map(item => moment(item * 1000).format("MM/DD/YYYY"));

      data1 = {
        labels: keys,
        datasets: [
          {
            data: Object.values(
              this.props.graph_index_data[this.state.indexTicker && this.state.indexTicker.replace(/ /g, "%20")]["PX_LAST"]
            ),
            borderWidth: 4,
            borderColor: "#CCD1D1",
            fill: false
          }
        ]
      };
    }

    if (this.props.graph_data[this.state.noteTicker && this.state.noteTicker.replace(/ /g, "%20")]) {
      const keys = Object.keys(
        this.props.graph_data[this.state.noteTicker && this.state.noteTicker.replace(/ /g, "%20")]["PX_LAST"]
      ).map(item => moment(item * 1000).format("MM/DD/YYYY"));

      data2 = {
        labels: keys,
        datasets: [
          {
            data: Object.values(
              this.props.graph_data[this.state.noteTicker && this.state.noteTicker.replace(/ /g, "%20")]["PX_LAST"]
            ),
            borderWidth: 4,
            borderColor: "grey",
            fill: false
          }
        ]
      };
    }

    // find the min/max of data
      try {
      maxData1 = 1.1 * Math.max(...Object.values(this.props.graph_index_data[this.state.indexTicker && this.state.indexTicker.replace(/ /g, "%20")]["PX_LAST"]));
      minData1 = 0.9 * Math.min(...Object.values(this.props.graph_index_data[this.state.indexTicker && this.state.indexTicker.replace(/ /g, "%20")]["PX_LAST"]));
      maxData2 = 1.1 * Math.max(...Object.values(this.props.graph_data[this.state.noteTicker && this.state.noteTicker.replace(/ /g, "%20")]["PX_LAST"]));
      minData2 = 0.9 * Math.min(...Object.values(this.props.graph_data[this.state.noteTicker && this.state.noteTicker.replace(/ /g, "%20")]["PX_LAST"]));
    } catch (e) {
          console.log('cannot find data.');
      }

    const options1 = {
      legend: { display: false },
      // tooltips: false,
      elements: {
        line: {
          tension: 0
        },
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true,
              display: true,
              max: maxData1,
              min: minData1
            }
          }
        ]
      }
    };

    const options2 = {
      legend: { display: false },
      // tooltips: false,
      elements: {
        line: {
          tension: 0
        },
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true,
              display: true,
              max: maxData2,
              min: minData2
            }
          }
        ]
      }
    };
    let ordersList;
    if (this.props.order_data.data) {
      ordersList = this.props.order_data.data.map((item, index) => (
        <tr key={index}>
          <td>{moment(item.trade_date).format("MM/DD/YYYY")}</td>
          <td>{item.certificate_number}</td>
          <td>
            {" "}
            {item.buy_or_sell === "S" && "-"}
            {item.total_amount && numberWithCommas(parseFloat(item.total_amount).toFixed(2))}
          </td>
          <td>{item.exchange}</td>
        </tr>
      ));
    } else {
      ordersList = (
        <tr>
          <td colSpan="4">
            <Loader loaded={!this.props.orders_loading} top="62%" radius={5} />
          </td>
        </tr>
      );
    }
    return (
      <div className="row mt-5">
        <GenericModal
          show={this.state.is_modal_open}
          title={this.state.modal_title}
          closeModal={this.closeModal}
          actionButton="Save"
          actionModal={this.handleAutoPrice}
          hideActionButton={this.state.show_modal_action}
          closeButton={this.state.modal_title === "spread" ? "Cancel" : "Save"}
        >
          {this.state.modal_title === "ask_size" ||
          this.state.modal_title === "bid_size" ? (
            <NumericInput
              className="form-control"
              onChange={this.numericInputChange}
              value={this.props.manual_input[this.state.modal_title]}
              strict={true}
            />
          ) : (
            <NumericInput
              className="form-control"
              step={0.01}
              onChange={this.numericInputChange}
              value={this.props.manual_input[this.state.modal_title]}
              precision={4}
              strict={true}
            />
          )}
        </GenericModal>
        <div className="col-md-6 mb-md-4">
          <div className="table-wrapper-scroll-y">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Certificates Number</th>
                  <th>Total Amount</th>
                  <th>Exchange</th>
                </tr>
              </thead>
              <tbody>{ordersList}</tbody>
            </table>
          </div>
          <div className="text-center fw-bold">Last Orders</div>
        </div>
        <div className="col-md-6 mb-md-4">
          <Line data={data1} options={options1} />
          <div className="text-center fw-bold">Index Graph</div>
          <Line data={data2} options={options2} />
          <div className="text-center fw-bold">Certificate Graph</div>
        </div>
        {/* <div className="col-md-6 mb-md-4">
          <Line data={data} options={options} />
          <div className="text-center fw-bold">Performance Graph</div>
        </div> */}

        <div className="col-md-6 mb-md-4">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Period</th>
                <th>Brokerage Fees</th>
                <th>Management Fees</th>
                <th>Market Making Fees</th>
              </tr>
            </thead>
            {this.props.fee_data.MTD ? (
              <tbody>
                <tr>
                  <td>MTD</td>
                  <td>
                    {numberWithCommas(
                      parseFloat(this.props.fee_data.MTD.brokerage_fee).toFixed(
                        2
                      )
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      parseFloat(
                        this.props.fee_data.MTD.management_fee
                      ).toFixed(2)
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      parseFloat(
                        this.props.fee_data.MTD.market_making_fee
                      ).toFixed(2)
                    )}
                  </td>
                </tr>
                <tr>
                  <td>YTD</td>
                  <td>
                    {numberWithCommas(
                      parseFloat(this.props.fee_data.YTD.brokerage_fee).toFixed(
                        2
                      )
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      parseFloat(
                        this.props.fee_data.YTD.management_fee
                      ).toFixed(2)
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      parseFloat(
                        this.props.fee_data.YTD.market_making_fee
                      ).toFixed(2)
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Since inception</td>
                  <td>
                    {numberWithCommas(
                      parseFloat(
                        this.props.fee_data.inception.brokerage_fee
                      ).toFixed(2)
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      parseFloat(
                        this.props.fee_data.inception.management_fee
                      ).toFixed(2)
                    )}
                  </td>
                  <td>
                    {numberWithCommas(
                      parseFloat(
                        this.props.fee_data.inception.market_making_fee
                      ).toFixed(2)
                    )}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="12">
                    <Loader
                      loaded={!this.props.fees_loading}
                      top="62%"
                      radius={5}
                    />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <div className="text-center fw-bold">Fees</div>
        </div>
        <div className="col-md-6">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Current Bid Size</th>
                <th>Current Bid Price</th>
                <th>Current Ask Price</th>
                <th>Current Ask Size</th>
                <th>Current Spread</th>
              </tr>
            </thead>
            <tbody>
              {this.props.location.state ? (
                <tr>
                  <td>{this.props.location.state.curBidSize}</td>
                  <td>{this.props.location.state.curBid}</td>
                  <td>{this.props.location.state.curAsk}</td>
                  <td>{this.props.location.state.curAskSize}</td>
                  <td>{this.props.location.state.curSpread}</td>
                </tr>
              ) : Object.keys(this.props.ib_data).length !== 0 ? (
                <tr>
                  <td>{this.props.ib_data.curBidSize}</td>
                  <td>{this.props.ib_data.curBid}</td>
                  <td>{this.props.ib_data.curAsk}</td>
                  <td>{this.props.ib_data.curAskSize}</td>
                  <td>{this.props.ib_data.curSpread}</td>
                </tr>
              ) : (
                <tr height="45px">
                  <td colSpan="5">
                    <Loader
                      loaded={!this.props.ibdata_loading}
                      top="37%"
                      radius={5}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Manual Bid Size</th>
                <th>Manual Bid Price</th>
                <th>Manual Ask Price</th>
                <th>Manual Ask Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="cursor-pointer"
                  onClick={() => this.openModal("bid_size")}
                >
                  {this.props.manual_input.bid_size &&
                    numberWithCommas(this.props.manual_input.bid_size)}
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => this.openModal("bid_price")}
                >
                  {this.props.manual_input.bid_price &&
                    numberWithCommas(
                      parseFloat(this.props.manual_input.bid_price).toFixed(2)
                    )}
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => this.openModal("ask_price")}
                >
                  {this.props.manual_input.ask_price &&
                    numberWithCommas(
                      parseFloat(this.props.manual_input.ask_price).toFixed(2)
                    )}
                </td>
                <td
                  className="cursor-pointer"
                  onClick={() => this.openModal("ask_size")}
                >
                  {this.props.manual_input.ask_size &&
                    numberWithCommas(this.props.manual_input.ask_size)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 offset-md-6 text-center">
          <div className="mb-3">{this.state.error}</div>
          <button className="btn btn-primary" onClick={this.handleOverwrite}>
            Overwrite
          </button>
          <button className="btn btn-primary ml-2" onClick={this.handleCancelOverwrite}>
            Cancel Overwrite
          </button>
          <button
            className="btn btn-primary ml-2"
            onClick={() => this.openModal("spread")}
          >
            Automatic Price
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manual_input: state.salesdetails.manual_input,
  certificates: state.sales.certificateData.data,
  certificates_success: state.sales.certificateData.isSuccess,
  autoprice_success: state.salesdetails.autoprice.isSuccess,
  overwrite_success: state.salesdetails.overwrite.isSuccess,
  canceloverwrite_success:state.salesdetails.cancelOverwrite.isSuccess,
  graph_data: state.salesdetails.graphdata.data,
  graph_index_data: state.salesdetails.graphindexdata.data,
  order_data: state.salesdetails.ordersdata.data,
  fee_data: state.salesdetails.feesdata.data,
  orders_loading: state.salesdetails.ordersdata.isLoading,
  fees_loading: state.salesdetails.feesdata.isLoading,
  ibdata_loading: state.salesdetails.dataIB.isLoading,
  ib_data: state.salesdetails.dataIB.data
});

const mapDispatchToProps = dispatch => ({
  overwriteRequest: data => dispatch(overwriteRequest(data)),
  cancelOverwriteRequest:()=>dispatch(cancelOverwriteRequest()),
  autoPriceRequest: data => dispatch(autoPriceRequest(data)),
  setManualInput: data => dispatch(setManualInput(data)),
  certificateRequest: () => dispatch(getCertificatesRequest()),
  getGraphData: data => dispatch(getGraphDataRequest(data)),
  createOrderRequest: data => dispatch(createOrderRequest(data)),
  getOrders: data => dispatch(getOrdersRequest(data)),
  getDataIBRequest: ib_account => dispatch(getDataIBRequest(ib_account)),
  getGraphIndexData: data => dispatch(getGraphIndexRequest(data)),
  getFeesRequest: data => dispatch(getFeesRequest(data)),
  updateUserBid: data => dispatch(updateUserBidRequest(data)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesDetails);
