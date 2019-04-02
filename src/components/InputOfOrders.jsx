import React, { Component } from "react";
import GenericModal from "./GenericModal";
import { connect } from "react-redux";
import moment from "moment";
import {
  createOrdersRequest,
  addLocalOrder,
  updateLocalOrder,
  removeLocalOrder,
  getCertificatesRequest,
  marketMakerRequest
} from "../redux/actions";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";
import { numberWithCommas } from "./../services/generic";

class InputOfOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_modal_open: false,
      index: 0,
      data: [
        {
          buy_or_sell: "",
          certificate_number: "",
          commission: "",
          isin: "",
          price: "",
          total_amount: "",
          trade_date: "",
          value_date: "",
          'sales_P&L': "",
          market_maker_fee: "",
          exchange: "",
          ib_account: ""
        }
      ],
      modal_title: ""
    };
    if (!props.list_of_certificates) {
      props.getCertificates();
    }
    if (!props.list_of_market_maker.length) {
      props.marketMakerRequest();
    }
  }
  // componentDidMount() {
  //   // console.log(this.refs.datepicker);
  // }
  // componentDidUpdate() {
  //   if (this.state.is_modal_open && this.state.modal_title === "trade_date") {
  //     console.log(this.refs);
  //   }
  // }
  handleNewOrder = () => {
    this.props.addLocalOrder();
  };
  handleConfirmOrder = () => {
    const list = this.props.data && this.props.data.filter(
      item =>
        item.isin.length === 12 &&
        item.certificate_number &&
        item.price &&
        item.total_amount &&
        item.trade_date &&
        item.value_date &&
        item['sales_P&L'] &&
        item.market_maker_fee &&
        item.buy_or_sell &&
        item.exchange &&
        item.ib_account
    );
    this.props.confirmOrders(list);
    this.setState({ is_modal_open: false });
  };
  openModal = (index, modal_title, type) => {
    if (type) {
      this.setState({ is_modal_open: true, index, modal_title, type });
    } else {
      const list = this.props.data && this.props.data.filter(
        item =>
          item.isin.length === 12 &&
          item.certificate_number &&
          item.price &&
          item.total_amount &&
          item.trade_date &&
          item.value_date &&
          item['sales_P&L'] &&
          item.market_maker_fee &&
          item.buy_or_sell &&
          item.exchange &&
          item.ib_account
      );
      if (list.length) {
        this.setState({
          is_modal_open: true,
          modal_title: "confirming new orders",
          type: "",
          total_orders: list.length
        });
      } else {
        toast.error("Missing inputs for some fields");
      }
    }
  };
  closeModal = () => {
    this.setState({ is_modal_open: false });
  };
  handleInput = event => {
    const { modal_title: title, index } = this.state;
    if (title === "buy_or_sell") {
      if (
        event.target.value === "B" ||
        event.target.value === "S" ||
        event.target.value === ""
      ) {
        this.props.updateLocalOrder({
          index,
          title,
          value: event.target.value
        });
      }
    } else if (title === "isin") {
      const oneCertificate = this.props.list_of_certificates.filter(item => {
        return item.isin == event.target.value;
      })[0];
      this.props.updateLocalOrder({
        index,
        title: "ib_account",
        value: oneCertificate.ib_account
      });
      this.props.updateLocalOrder({ index, title, value: event.target.value });
    } else {
      this.props.updateLocalOrder({ index, title, value: event.target.value });
    }
  };
  // dateChangeRaw = e => {
  //   console.log(e.target.value);
  //   const x = new Date(e.target.value);
  //   console.log(x == "Invalid Date");
  //   console.log(this.props.data[this.state.index][this.state.modal_title]);
  // };
  dateChange = date => {
    const { index, modal_title: title } = this.state;
    this.props.updateLocalOrder({ index, title, value: date });
  };
  numericInputChange = value => {
    const { index, modal_title: title } = this.state;
    this.props.updateLocalOrder({ index, title, value });
  };
  render() {
    const tableRows = [
      "ISIN",
      "Certificate Number",
      "Price",
      "Total Amount",
      "Trade Date",
      "Value Date",
      "Sales P&L",
      "Market Maker Fee",
      "Exchange",
      "Buy or Sell",
      "IB Account"
    ];
    const tableHeads = tableRows.map((item, index) => (
      <th key={index}>{item}</th>
    ));
    const tableData = this.props.data && this.props.data.map((item, index) => (
      <tr className="cursor-pointer" key={index}>
        <td onClick={() => this.openModal(index, "isin", "text")}>
          {item.isin ? item.isin : "+"}
        </td>
        <td
          onClick={() => this.openModal(index, "certificate_number", "number")}
        >
          {item.certificate_number ? item.certificate_number : "+"}
        </td>
        <td onClick={() => this.openModal(index, "price", "number")}>
          {item.price
            ? numberWithCommas(parseFloat(item.price).toFixed(2))
            : "+"}
        </td>
        <td onClick={() => this.openModal(index, "total_amount", "number")}>
          {item.total_amount
            ? numberWithCommas(parseFloat(item.total_amount).toFixed(2))
            : "+"}
        </td>
        <td onClick={() => this.openModal(index, "trade_date", "date")}>
          {item.trade_date ? moment(item.trade_date).format("MM/DD/YYYY") : "+"}
        </td>
        <td onClick={() => this.openModal(index, "value_date", "date")}>
          {item.value_date ? moment(item.value_date).format("MM/DD/YYYY") : "+"}
        </td>
        <td onClick={() => this.openModal(index, "sales_P&L", "number")}>
          {item['sales_P&L']
            ? numberWithCommas(parseFloat(item['sales_P&L']).toFixed(2))
            : "+"}
        </td>
        <td onClick={() => this.openModal(index, "market_maker_fee", "number")}>
          {item.market_maker_fee
            ? numberWithCommas(parseFloat(item.market_maker_fee).toFixed(2))
            : "+"}
        </td>
        <td onClick={() => this.openModal(index, "exchange", "text")}>
          {item.exchange ? item.exchange : "+"}
        </td>
        <td onClick={() => this.openModal(index, "buy_or_sell", "text")}>
          {item.buy_or_sell ? item.buy_or_sell.toUpperCase() : "+"}
        </td>
        <td>
          {/* onClick={() => this.openModal(index, "ib_account", "text")}> */}
          {item.ib_account ? item.ib_account : "+"}
        </td>
        <td
          className="text-danger"
          onClick={() => {
            this.setState({ index: 0 });
            this.props.removeLocalOrder(index);
          }}
        >
          Cancel
        </td>
      </tr>
    ));
    const modalBody = () => {
      const { modal_title, index, type } = this.state;
      if (modal_title === "buy_or_sell") {
        return (
          <select
            className="form-control"
            value={this.props && this.props.data[index] && this.props.data[index][modal_title]}
            onChange={this.handleInput}
          >
            <option value="">Select B for Buy or S for Sell</option>
            <option value="B">B</option>
            <option value="S">S</option>
          </select>
        );
      } else if (modal_title === "isin") {
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
              value={this.props && this.props.data[index] && this.props.data[index][modal_title]}
              onChange={this.handleInput}
            >
              <option value="">Select ISIN</option>
              {isin_list}
            </select>
          );
        } else {
          return "Please add and confirm certificates from new note";
        }
      } else if (modal_title === "trade_date" || modal_title === "value_date") {
        return (
          <DatePicker
            selected={
              this.props && this.props.data[index] && this.props.data[index][modal_title] 
                ? new Date(this.props.data[index][modal_title])
                : null
            }
            value={
              this.props && this.props.data[index] && this.props.data[index][modal_title]
                ? moment(this.props.data[index][modal_title])
                    .format("MM/DD/YYYY")
                    .toString()
                : null}
            // customInputRef="ref"
            // readOnly
            // disabledKeyboardNavigation={true}
            onChange={this.dateChange}
            onChangeRaw={this.dateChangeRaw}
          />
        );
      } else if (
        modal_title === "price" ||
        modal_title === "total_amount" ||
        modal_title === "sales_P&L" ||
        modal_title === "market_maker_fee"
      ) {
        return (
          <NumericInput
            className="form-control"
            step={0.01}
            value={this.props && this.props.data[index] &&this.props.data[index][modal_title]}
            onChange={this.numericInputChange}
            precision={2}
            strict
          />
        );
      } else if (modal_title === "certificate_number") {
        return (
          <NumericInput
            className="form-control"
            value={this.props && this.props.data[index] && this.props.data[index][modal_title] || ""}
            onChange={this.numericInputChange}
            strict
          />
        );
      } else if (modal_title === "exchange") {
        if (this.props.list_of_market_maker.length) {
          const exchange_list = this.props.list_of_market_maker.map(
            (item, index) => (
              <option key={index} value={item.exchange}>
                {item.exchange}
              </option>
            )
          );
          return (
            <select
              className="form-control"
              value={this.props && this.props.data[index] && this.props.data[index][modal_title]}
              onChange={this.handleInput}
            >
              <option value="">Select Exchange</option>
              {exchange_list}
            </select>
          );
        } else {
          return "Please add exchanges from new market maker";
        }
      } else {
        return (
          <input
            value={this.props.data[index][modal_title] || ""}
            type={type}
            onChange={this.handleInput}
          />
        );
      }
    };
    return (
      <div className="row">
        <GenericModal
          show={this.state.is_modal_open}
          title={this.state.modal_title}
          closeModal={this.closeModal}
          actionButton="Confirm"
          actionModal={this.handleConfirmOrder}
          hideActionButton={this.state.type}
        >
          {this.state.type
            ? modalBody()
            : `confirm ${this.state.total_orders}  new Orders?`}
        </GenericModal>
        <div className="col-md-12">
          <div className="table-responsive mt-3">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  {tableHeads}
                  {this.props.data.length !== 0 && <th />}
                </tr>
              </thead>
              <tbody>{tableData}</tbody>
            </table>
          </div>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={this.handleNewOrder}
          >
            New Order
          </button>
        </div>
        <div className="col-md-3 offset-md-7">
          <button
            className="btn btn-primary w-100"
            onClick={() => this.openModal()}
          >
            Confirm Order(s)
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.inputoforders.data,
  list_of_certificates: state.sales.certificateData.data,
  list_of_market_maker: state.marketmaker.data
});

const mapDispatchToProps = dispatch => ({
  confirmOrders: data => dispatch(createOrdersRequest(data)),
  addLocalOrder: () => dispatch(addLocalOrder()),
  updateLocalOrder: data => dispatch(updateLocalOrder(data)),
  removeLocalOrder: index => dispatch(removeLocalOrder(index)),
  getCertificates: () => dispatch(getCertificatesRequest()),
  marketMakerRequest: () => dispatch(marketMakerRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputOfOrders);
