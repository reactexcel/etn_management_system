import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
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
      exchange: "",
      ib_account: ""
    }
  ]
};

const handleAddLocalOrder = (state, action) =>
  update(state, {
    data: {
      $push: [
        {
          buy_or_sell: "",
          certificate_number: "",
          commission: "",
          isin: "",
          price: "",
          total_amount: "",
          trade_date: "",
          value_date: "",
          exchange: "",
          ib_account: ""
        }
      ]
    }
  });

const handleUpdateLocalOrder = (state, action) =>
  update(state, {
    data: {
      [action.payload.index]: {
        [action.payload.title]: { $set: action.payload.value }
      }
    }
  });

const handleRemoveLocalOrder = (state, action) =>
  update(state, {
    
    data: {
      $splice: [[ action.payload, 1]]
      // [action.payload.title]: { $set: action.payload.value }
    }
  });

const handleCreateOrdersRequest = (state, action) =>
  update(state, {
    isLoading: { $set: true },
    isSuccess: { $set: false },
    isError: { $set: false }
  });
const handleCreateOrdersSuccess = (state, action) => {
  const payload_copy = action.payload.map(item => {
    item.trade_date = new Date(item.trade_date);
    item.value_date = new Date(item.value_date);
    return item;
  });
  // const state_copy = state.data.filter(item => {
  //   console.log(payload_copy.indexOf(item));

  //   return payload_copy.indexOf(item) < 0;
  // });
  return update(state, {
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false },
    data: { $set: payload_copy }
    // data: { $set: state_copy }
  });
};

const handleCreateOrdersError = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isSuccess: { $set: false },
    isError: { $set: true }
  });

export default handleActions(
  {
    [constants.CREATE_ORDERS_REQUEST]: handleCreateOrdersRequest,
    [constants.CREATE_ORDERS_SUCCESS]: handleCreateOrdersSuccess,
    [constants.CREATE_ORDERS_ERROR]: handleCreateOrdersError,
    [constants.ADD_LOCAL_ORDER]: handleAddLocalOrder,
    [constants.UPDATE_LOCAL_ORDER]: handleUpdateLocalOrder,
    [constants.REMOVE_LOCAL_ORDER]: handleRemoveLocalOrder
  },
  initialState
);
