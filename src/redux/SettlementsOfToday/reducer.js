import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  settlementOfToday: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  confirmSettlement: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  data: [{ isin: "XYZ0123", status: "" }, { isin: "ABC0123", status: "" }]
};

const handleSettlementOfTodayRequest = (state, action) =>
  update(state, {
    settlementOfToday: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleSettlementOfTodaySuccess = (state, action) =>
  update(state, {
    settlementOfToday: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleSettlementOfTodayError = (state, action) =>
  update(state, {
    settlementOfToday: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleConfirmSettlementRequest = (state, action) =>
  update(state, {
    confirmSettlement: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleConfirmSettlementSuccess = (state, action) => {
  const copy = state.data;
  copy.forEach((element, i) => {
    if (element.isin === action.payload.isin) {
      // copy[i].status = "Processed";
      copy[i].status = action.payload.status;
    }
  });
  return update(state, {
    confirmSettlement: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    },
    data: { $set: copy }
  });
};

const handleConfirmSettlementError = (state, action) =>
  update(state, {
    confirmSettlement: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

export default handleActions(
  {
    // [constants.ORDERS_TODAY_REQUEST]: handleSettlementOfTodayRequest,
    // [constants.ORDERS_TODAY_SUCCESS]: handleSettlementOfTodaySuccess,
    // [constants.ORDERS_TODAY_ERROR]: handleSettlementOfTodayError,
    [constants.CONFIRM_SETTLEMENT_REQUEST]: handleConfirmSettlementRequest,
    [constants.CONFIRM_SETTLEMENT_SUCCESS]: handleConfirmSettlementSuccess,
    [constants.CONFIRM_SETTLEMENT_ERROR]: handleConfirmSettlementError
  },
  initialState
);
