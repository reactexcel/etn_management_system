import { createAction } from "redux-actions";
import constants from "./constants";

export const loginRequest = createAction(constants.LOGIN_REQUEST);
export const isAlreadyLoggedIn = createAction(constants.IS_ALREADY_LOGGED_IN);
export const loginSuccess = createAction(constants.LOGIN_SUCCESS);
export const loginError = createAction(constants.LOGIN_ERROR);
export const loginReset = createAction(constants.LOGIN_RESET);
export const logout = createAction(constants.LOGOUT);

export const signupRequest = createAction(constants.SIGNUP_REQUEST);
export const signupSuccess = createAction(constants.SIGNUP_SUCCESS);
export const signupError = createAction(constants.SIGNUP_ERROR);
export const signupReset = createAction(constants.SIGNUP_RESET);

export const ordersTodayRequest = createAction(constants.ORDERS_TODAY_REQUEST);
export const ordersTodaySuccess = createAction(constants.ORDERS_TODAY_SUCCESS);
export const ordersTodayError = createAction(constants.ORDERS_TODAY_ERROR);

export const setManualInput = createAction(constants.SET_MANUAL_INPUT);
export const salesRequest = createAction(constants.SALES_REQUEST);
export const salesSuccess = createAction(constants.SALES_SUCCESS);
export const salesError = createAction(constants.SALES_ERROR);

export const overwriteRequest = createAction(constants.OVERWRITE_REQUEST);
export const overwriteSuccess = createAction(constants.OVERWRITE_SUCCESS);
export const overwriteError = createAction(constants.OVERWRITE_ERROR);

export const cancelOverwriteRequest=createAction(constants.CANCEL_OVERWRITE_REQUEST);
export const cancelOverwriteSuccess=createAction(constants.CANCEL_OVERWRITE_SUCCESS);
export const cancelOverwriteError=createAction(constants.CANCEL_OVERWRITE_ERROR);

export const createOrderRequest = createAction(constants.CREATE_ORDER_REQUEST);
export const createOrderSuccess = createAction(constants.CREATE_ORDER_SUCCESS);
export const createOrderError = createAction(constants.CREATE_ORDER_ERROR);

export const createOrdersRequest = createAction(
  constants.CREATE_ORDERS_REQUEST
);
export const createOrdersSuccess = createAction(
  constants.CREATE_ORDERS_SUCCESS
);
export const createOrdersError = createAction(constants.CREATE_ORDERS_ERROR);
export const addLocalOrder = createAction(constants.ADD_LOCAL_ORDER);
export const updateLocalOrder = createAction(constants.UPDATE_LOCAL_ORDER);
export const removeLocalOrder = createAction(constants.REMOVE_LOCAL_ORDER);

export const sendQueryRequest = createAction(
    constants.SEND_QUERY_REQUEST
);
export const sendQuerySuccess = createAction(
    constants.SEND_QUERY_SUCCESS
);
export const sendQueryError = createAction(constants.SEND_QUERY_ERROR);
export const updateFeeQuery = createAction(constants.UPDATE_FEE_QUERY)

export const getOrdersRequest = createAction(constants.GET_ORDERS_REQUEST);
export const getOrdersSuccess = createAction(constants.GET_ORDERS_SUCCESS);
export const getOrdersError = createAction(constants.GET_ORDERS_ERROR);

export const getFeesRequest = createAction(constants.GET_FEES_REQUEST);
export const getFeesSuccess = createAction(constants.GET_FEES_SUCCESS);
export const getFeesError = createAction(constants.GET_FEES_ERROR);

export const getCertificatesRequest = createAction(
  constants.GET_CERTIFICATES_REQUEST
);
export const getCertificatesSuccess = createAction(
  constants.GET_CERTIFICATES_SUCCESS
);
export const getCertificatesError = createAction(
  constants.GET_CERTIFICATES_ERROR
);

export const ibDataRequest = createAction(constants.IB_DATA_REQUEST);
export const ibDataSuccess = createAction(constants.IB_DATA_SUCCESS);
export const ibDataError = createAction(constants.IB_DATA_ERROR);

export const getDataIBRequest = createAction(constants.GET_DATA_IB_REQUEST);
export const getDataIBSuccess = createAction(constants.GET_DATA_IB_SUCCESS);
export const getDataIBError = createAction(constants.GET_DATA_IB_ERROR);

export const autoPriceRequest = createAction(constants.AUTO_PRICE_REQUEST);
export const autoPriceSuccess = createAction(constants.AUTO_PRICE_SUCCESS);
export const autoPriceError = createAction(constants.AUTO_PRICE_ERROR);

export const listNotesRequest = createAction(constants.LIST_NOTES_REQUEST);
export const listNotesSuccess = createAction(constants.LIST_NOTES_SUCCESS);
export const listNotesError = createAction(constants.LIST_NOTES_ERROR);

export const createNoteRequest = createAction(constants.CREATE_NOTE_REQUEST);
export const createNoteSuccess = createAction(constants.CREATE_NOTE_SUCCESS);
export const createNoteError = createAction(constants.CREATE_NOTE_ERROR);

export const deleteNoteRequest = createAction(constants.DELETE_NOTE_REQUEST);
export const deleteNoteSuccess = createAction(constants.DELETE_NOTE_SUCCESS);
export const deleteNoteError = createAction(constants.DELETE_NOTE_ERROR);


export const updateNewNote = createAction(constants.UPDATE_NEW_NOTE);
export const resetNote = createAction(constants.RESET_NOTE);
export const updateNoteRequest = createAction(constants.UPDATE_NOTE_REQUEST);
export const updateNoteSuccess = createAction(constants.UPDATE_NOTE_SUCCESS);
export const updateNoteError = createAction(constants.UPDATE_NOTE_ERROR);

export const createMarketRequest = createAction(
  constants.CREATE_MARKET_REQUEST
);
export const createMarketSuccess = createAction(
  constants.CREATE_MARKET_SUCCESS
);
export const createMarketError = createAction(constants.CREATE_MARKET_ERROR);
export const createMarketReset = createAction(constants.CREATE_MARKET_RESET);

export const marketMakerRequest = createAction(constants.MARKET_MAKER_REQUEST);
export const marketMakerSuccess = createAction(constants.MARKET_MAKER_SUCCESS);
export const marketMakerError = createAction(constants.MARKET_MAKER_ERROR);

export const getGraphDataRequest = createAction(
  constants.GET_GRAPH_DATA_REQUEST
);
export const getGraphDataSuccess = createAction(
  constants.GET_GRAPH_DATA_SUCCESS
);
export const getGraphDataError = createAction(constants.GET_GRAPH_DATA_ERROR);

export const graphDataForDailyChange = createAction(
  constants.GRAPH_DATA_FOR_DAILY_CHANGE_REQUEST
);
export const graphDataForDailyChangeSuccess = createAction(
  constants.GRAPH_DATA_FOR_DAILY_CHANGE_SUCCESS
);
export const graphDataForDailyChangeError = createAction(
  constants.GRAPH_DATA_FOR_DAILY_CHANGE_ERROR
);

export const getGraphIndexRequest = createAction(
  constants.GET_GRAPH_INDEX_REQUEST
);
export const getGraphIndexSuccess = createAction(
  constants.GET_GRAPH_INDEX_SUCCESS
);
export const getGraphIndexError = createAction(constants.GET_GRAPH_INDEX_ERROR);

export const confirmOrderRequest = createAction(
  constants.CONFIRM_ORDER_REQUEST
);
export const confirmOrderSuccess = createAction(
  constants.CONFIRM_ORDER_SUCCESS
);
export const confirmOrderError = createAction(constants.CONFIRM_ORDER_ERROR);

export const confirmSettlementRequest = createAction(
  constants.CONFIRM_SETTLEMENT_REQUEST
);
export const confirmSettlementSuccess = createAction(
  constants.CONFIRM_SETTLEMENT_SUCCESS
);
export const confirmSettlementError = createAction(
  constants.CONFIRM_SETTLEMENT_ERROR
);

export const updateCertificateRequest = createAction(
  constants.UPDATE_CERTIFICATE_REQUEST
);
export const updateCertificateSuccess = createAction(
  constants.UPDATE_CERTIFICATE_SUCCESS
);
export const updateCertificateError = createAction(
  constants.UPDATE_CERTIFICATE_ERROR
);

export const createCirdanFeeRequest = createAction(
  constants.CREATE_CIRDAN_FEE_REQUEST
);
export const createCirdanFeeSuccess = createAction(
  constants.CREATE_CIRDAN_FEE_SUCCESS
);
export const createCirdanFeeError = createAction(
  constants.CREATE_CIRDAN_FEE_ERROR
);

export const cirdanFeeRequest = createAction(constants.CIRDAN_FEE_REQUEST);
export const cirdanFeeSuccess = createAction(constants.CIRDAN_FEE_SUCCESS);
export const cirdanFeeError = createAction(constants.CIRDAN_FEE_ERROR);
export const updateLocalFee = createAction(constants.UPDATE_LOCAL_FEE);
export const resetFee = createAction(constants.RESET_FEE);

export const updateCirdanFeeRequest = createAction(
  constants.UPDATE_CIRDAN_FEE_REQUEST
);
export const updateCirdanFeeSuccess = createAction(
  constants.UPDATE_CIRDAN_FEE_SUCCESS
);
export const updateCirdanFeeError = createAction(
  constants.UPDATE_CIRDAN_FEE_ERROR
);

export const updateUserBidRequest = createAction(
  constants.UPDATE_USER_BID_REQUEST
);
export const updateUserBidSuccess = createAction(
  constants.UPDATE_USER_BID_SUCCESS
);
export const updateUserBidError = createAction(constants.UPDATE_USER_BID_ERROR);

export const clientFeeRequest = createAction(constants.CLIENT_FEE_REQUEST);
export const clientFeeSuccess = createAction(constants.CLIENT_FEE_SUCCESS);
export const clientFeeError = createAction(constants.CLIENT_FEE_ERROR);

export const createClientFeeRequest = createAction(
  constants.CREATE_CLIENT_FEE_REQUEST
);
export const createClientFeeSuccess = createAction(
  constants.CREATE_CLIENT_FEE_SUCCESS
);
export const createClientFeeError = createAction(
  constants.CREATE_CLIENT_FEE_ERROR
);

export const monthSplitRequest = createAction(constants.MONTH_SPLIT_REQUEST);
export const monthSplitSuccess = createAction(constants.MONTH_SPLIT_SUCCESS);
export const monthSplitError = createAction(constants.MONTH_SPLIT_ERROR);
