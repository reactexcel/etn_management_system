import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  ordersOfToday: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  confirmOrder: {
    isLoading: false,
    isSuccess: false,
    isError: false
  }
};

const handleOrdersOfTodayRequest = (state, action) =>
  update(state, {
    ordersOfToday: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleOrdersOfTodaySuccess = (state, action) =>
  update(state, {
    ordersOfToday: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleOrdersOfTodayError = (state, action) =>
  update(state, {
    ordersOfToday: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleConfirmOrderRequest = (state, action) =>
  update(state, {
    confirmOrder: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleConfirmOrderSuccess = (state, action) =>
  update(state, {
    confirmOrder: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleConfirmOrderError = (state, action) =>
  update(state, {
    confirmOrder: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

export default handleActions(
  {
    [constants.ORDERS_TODAY_REQUEST]: handleOrdersOfTodayRequest,
    [constants.ORDERS_TODAY_SUCCESS]: handleOrdersOfTodaySuccess,
    [constants.ORDERS_TODAY_ERROR]: handleOrdersOfTodayError,
    [constants.CONFIRM_ORDER_REQUEST]: handleConfirmOrderRequest,
    [constants.CONFIRM_ORDER_SUCCESS]: handleConfirmOrderSuccess,
    [constants.CONFIRM_ORDER_ERROR]: handleConfirmOrderError
  },
  initialState
);
