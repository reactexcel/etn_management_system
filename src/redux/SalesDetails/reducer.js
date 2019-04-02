import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  overwrite: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  cancelOverwrite:{
    isLoading:false,
    isSuccess:false,
    isError:false
  },
  autoprice: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  graphdata: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {}
  },
  graphindexdata: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {}
  },
  ordersdata: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: []
  },
  feesdata: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {}
  },
  dataIB: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {}
  },
  confirmorder: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  manual_input: {
    ask_price: "",
    bid_price: "",
    spread: "",
    ask_size: "",
    bid_size: ""
  },
  updateUserBid: {
    isLoading: false,
    isSuccess: false,
    isError: false
  }
};

const handleSetManualInput = (state, action) =>
  update(state, {
    manual_input: {
      [action.payload.id]: { $set: action.payload.value }
    }
  });
const handleDataIBRequest = (state, action) =>
  update(state, {
    dataIB: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleDataIBSuccess = (state, action) =>
  update(state, {
    dataIB: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    },
    manual_input: {
      ask_size: { $set: action.payload.curAskSize },
      bid_size: { $set: action.payload.curBidSize }
    }
  });
const handleDataIBError = (state, action) =>
  update(state, {
    dataIB: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleGraphDataRequest = (state, action) =>
  update(state, {
    graphdata: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleGraphDataSuccess = (state, action) =>
  update(state, {
    graphdata: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleGraphDataError = (state, action) =>
  update(state, {
    graphdata: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleGraphIndexRequest = (state, action) =>
  update(state, {
    graphindexdata: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleGraphIndexSuccess = (state, action) =>
  update(state, {
    graphindexdata: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleGraphIndexError = (state, action) =>
  update(state, {
    graphindexdata: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleConfirmOrderRequest = (state, action) =>
  update(state, {
    confirmorder: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleConfirmOrderSuccess = (state, action) =>
  update(state, {
    confirmorder: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
    // manual_input: {
    //   ask_price: { $set: "" },
    //   bid_price: { $set: "" },
    //   spread: { $set: "" },
    //   ask_size: { $set: "" },
    //   bid_size: { $set: "" }
    // }
  });
const handleConfirmOrderError = (state, action) =>
  update(state, {
    confirmorder: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleOrdersDataRequest = (state, action) =>
  update(state, {
    ordersdata: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleOrdersDataSuccess = (state, action) =>
  update(state, {
    ordersdata: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleOrdersDataError = (state, action) =>
  update(state, {
    ordersdata: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleFeesDataRequest = (state, action) =>
  update(state, {
    feesdata: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleFeesDataSuccess = (state, action) =>
  update(state, {
    feesdata: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleFeesDataError = (state, action) =>
  update(state, {
    feesdata: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleOverwriteRequest = (state, action) =>
  update(state, {
    overwrite: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleOverwriteSuccess = (state, action) =>
  update(state, {
    overwrite: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
    // manual_input: {
    //   ask_price: { $set: "" },
    //   bid_price: { $set: "" },
    //   spread: { $set: "" },
    //   ask_size: { $set: "" },
    //   bid_size: { $set: "" }
    // }
  });
const handleOverwriteError = (state, action) =>
  update(state, {
    overwrite: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });
  const handleCancelOverwriteRequest = (state, action) =>
  update(state, {
    cancelOverwrite: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
  const handleCancelOverwriteSuccess=(state,action)=>
  update(state, {
    cancelOverwrite:{
        isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
      }
    
  });
  const handleCancelOverwriteError = (state, action) =>
  update(state, {
    cancelOverwrite: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });
const handleAutoPriceRequest = (state, action) =>
  update(state, {
    autoprice: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleAutoPriceSuccess = (state, action) =>
  update(state, {
    autoprice: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    },
    manual_input: {
      //   ask_price: { $set: "" },
      //   bid_price: { $set: "" },
      spread: { $set: "" }
      //   ask_size: { $set: "" },
      //   bid_size: { $set: "" }
    }
  });
const handleAutoPriceError = (state, action) =>
  update(state, {
    autoprice: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleUpdateUserBidRequest = (state, action) =>
  update(state, {
    updateUserBid: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleUpdateUserBidSuccess = (state, action) =>
  update(state, {
    updateUserBid: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    },
    manual_input: {
      ask_price: { $set: "" },
      bid_price: { $set: "" },
      spread: { $set: "" },
      // ask_size: { $set: "" },
      // bid_size: { $set: "" }
    }
  });
const handleUpdateUserBidError = (state, action) =>
  update(state, {
    updateUserBid: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

export default handleActions(
  {
    [constants.SET_MANUAL_INPUT]: handleSetManualInput,
    [constants.OVERWRITE_REQUEST]: handleOverwriteRequest,
    [constants.OVERWRITE_SUCCESS]: handleOverwriteSuccess,
    [constants.OVERWRITE_ERROR]: handleOverwriteError,
    [constants.AUTO_PRICE_REQUEST]: handleAutoPriceRequest,
    [constants.AUTO_PRICE_SUCCESS]: handleAutoPriceSuccess,
    [constants.AUTO_PRICE_ERROR]: handleAutoPriceError,
    [constants.GET_GRAPH_DATA_REQUEST]: handleGraphDataRequest,
    [constants.GET_GRAPH_DATA_SUCCESS]: handleGraphDataSuccess,
    [constants.GET_GRAPH_DATA_ERROR]: handleGraphDataError,
    [constants.GET_ORDERS_REQUEST]: handleOrdersDataRequest,
    [constants.GET_ORDERS_SUCCESS]: handleOrdersDataSuccess,
    [constants.GET_ORDERS_ERROR]: handleOrdersDataError,
    [constants.GET_DATA_IB_REQUEST]: handleDataIBRequest,
    [constants.GET_DATA_IB_SUCCESS]: handleDataIBSuccess,
    [constants.GET_DATA_IB_ERROR]: handleDataIBError,
    [constants.CONFIRM_ORDER_REQUEST]: handleConfirmOrderRequest,
    [constants.CONFIRM_ORDER_SUCCESS]: handleConfirmOrderSuccess,
    [constants.CONFIRM_ORDER_ERROR]: handleConfirmOrderError,
    [constants.GET_GRAPH_INDEX_REQUEST]: handleGraphIndexRequest,
    [constants.GET_GRAPH_INDEX_SUCCESS]: handleGraphIndexSuccess,
    [constants.GET_GRAPH_INDEX_ERROR]: handleGraphIndexError,
    [constants.GET_FEES_REQUEST]: handleFeesDataRequest,
    [constants.GET_FEES_SUCCESS]: handleFeesDataSuccess,
    [constants.GET_FEES_ERROR]: handleFeesDataError,
    [constants.UPDATE_USER_BID_REQUEST]: handleUpdateUserBidRequest,
    [constants.UPDATE_USER_BID_SUCCESS]: handleUpdateUserBidSuccess,
    [constants.UPDATE_USER_BID_ERROR]: handleUpdateUserBidError,
    [constants.CANCEL_OVERWRITE_REQUEST]:handleCancelOverwriteRequest,
    [constants.CANCEL_OVERWRITE_SUCCESS]:handleCancelOverwriteSuccess,
    [constants.CANCEL_OVERWRITE_ERROR]:handleCancelOverwriteError
  },
  initialState
);
