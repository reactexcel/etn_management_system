import constants from "./constants";
import { takeLatest, takeEvery } from "redux-saga/effects";
import { loginRequest, isAlreadyLoggedIn, logout } from "./Login/action";
import { signupRequest } from "./Signup/action";
import {
  getCertificatesRequest,
  ibDataRequest,
  graphDataForDailyChange
} from "./Sales/action";
import { confirmOrderRequest } from "./OrdersOfToday/action";
import { confirmSettlementRequest } from "./SettlementsOfToday/action";
import {
  overwriteRequest,
  cancelOverwriteRequest,
  autoPriceRequest,
  getGraphDataRequest,
  getOrdersRequest,
  getDataIBRequest,
  getGraphIndexRequest,
  getFeesRequest,
  updateCertificateRequest,
  updateUserBidRequest
} from "./SalesDetails/action";
import {
  listNotesRequest,
  createNoteRequest,
  updateNoteRequest,
  deleteNoteRequest
} from "./NewNote/action";
import { marketMakerRequest, createMarketRequest } from "./MarketMaker/action";
import { createOrdersRequest } from "./InputOfOrders/action";
import {
  cirdanFeeRequest,
  updateCirdanFeeRequest,
  createCirdanFeeRequest,
  clientFeeRequest,
  createClientFeeRequest,
  monthSplitRequest
} from "./Fees/action";

import {sendQueryRequest} from "./EndofMonthSplitExact/action"



function* watchActions() {
  yield takeLatest(constants.LOGIN_REQUEST, loginRequest);
  yield takeLatest(constants.LOGOUT, logout);
  yield takeLatest(constants.IS_ALREADY_LOGGED_IN, isAlreadyLoggedIn);
  yield takeLatest(constants.SIGNUP_REQUEST, signupRequest);

  yield takeLatest(constants.CREATE_ORDERS_REQUEST, createOrdersRequest);
  yield takeLatest(constants.GET_GRAPH_DATA_REQUEST, getGraphDataRequest);
  yield takeLatest(constants.GET_GRAPH_INDEX_REQUEST, getGraphIndexRequest);
  yield takeEvery(
    constants.GRAPH_DATA_FOR_DAILY_CHANGE_REQUEST,
    graphDataForDailyChange
  );
  yield takeEvery(constants.IB_DATA_REQUEST, ibDataRequest);

  yield takeLatest(constants.GET_DATA_IB_REQUEST, getDataIBRequest);
  yield takeLatest(constants.OVERWRITE_REQUEST, overwriteRequest);
  yield takeLatest(constants.CANCEL_OVERWRITE_REQUEST, cancelOverwriteRequest);
  yield takeLatest(constants.AUTO_PRICE_REQUEST, autoPriceRequest);
  yield takeEvery(
    constants.UPDATE_CERTIFICATE_REQUEST,
    updateCertificateRequest
  );

  yield takeLatest(constants.GET_ORDERS_REQUEST, getOrdersRequest);
  yield takeLatest(constants.GET_FEES_REQUEST, getFeesRequest);
  yield takeLatest(constants.GET_CERTIFICATES_REQUEST, getCertificatesRequest);

  yield takeLatest(constants.LIST_NOTES_REQUEST, listNotesRequest);
  yield takeLatest(constants.CREATE_NOTE_REQUEST, createNoteRequest);
  yield takeLatest(constants.UPDATE_NOTE_REQUEST, updateNoteRequest);
  yield takeLatest(constants.DELETE_NOTE_REQUEST,deleteNoteRequest);
  // yield takeLatest(constants.CREATE_ORDER_REQUEST, createOrderRequest);

  // yield takeLatest(constants.SALES_REQUEST, salesRequest);
  // yield takeLatest(constants.ORDERS_TODAY_REQUEST, ordersOfTodayRequest);
  yield takeLatest(constants.CONFIRM_ORDER_REQUEST, confirmOrderRequest);
  yield takeLatest(
    constants.CONFIRM_SETTLEMENT_REQUEST,
    confirmSettlementRequest
  );

  yield takeLatest(constants.MARKET_MAKER_REQUEST, marketMakerRequest);
  yield takeLatest(constants.CREATE_MARKET_REQUEST, createMarketRequest);
  yield takeLatest(constants.CIRDAN_FEE_REQUEST, cirdanFeeRequest);
  yield takeLatest(constants.UPDATE_CIRDAN_FEE_REQUEST, updateCirdanFeeRequest);
  yield takeLatest(constants.CREATE_CIRDAN_FEE_REQUEST, createCirdanFeeRequest);

  yield takeLatest(constants.UPDATE_USER_BID_REQUEST, updateUserBidRequest);
  yield takeLatest(constants.CLIENT_FEE_REQUEST, clientFeeRequest);
  yield takeLatest(constants.CREATE_CLIENT_FEE_REQUEST, createClientFeeRequest);

  yield takeLatest(constants.MONTH_SPLIT_REQUEST, monthSplitRequest);

  yield takeLatest(constants.SEND_QUERY_REQUEST, sendQueryRequest)
}

export default function* rootSaga() {
  yield [watchActions()];
}
