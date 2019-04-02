import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  cirdan_fee: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: "",
    data_copy: ""
  },
  client_fee: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: "",
    data_copy: ""
  },
  month_split: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: ""
  }
};

const handleCirdanFeeRequest = (state, action) =>
  update(state, {
    cirdan_fee: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleCirdanFeeSuccess = (state, action) =>
  update(state, {
    cirdan_fee: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload },
      data_copy: { $set: action.payload }
    }
  });
const handleCirdanFeeError = (state, action) =>
  update(state, {
    cirdan_fee: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });
const handleLocalFeeUpdate = (state, action) =>
  update(state, {
    data_copy: {
      [action.payload.id]: {
        $merge: {
          [action.payload.title]: action.payload.value
        }
      }
    }
  });
const handleResetFee = (state, action) =>
  update(state, { client_fee: { data_copy: { $set: state.data } } });

const handleClientFeeRequest = (state, action) =>
  update(state, {
    client_fee: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleClientFeeSuccess = (state, action) =>
  update(state, {
    client_fee: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload },
      data_copy: { $set: action.payload }
    }
  });
const handleClientFeeError = (state, action) =>
  update(state, {
    client_fee: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleMonthSplitRequest = (state, action) =>
  update(state, {
    month_split: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" }
    }
  });
const handleMonthSplitSuccess = (state, action) =>
  update(state, {
    month_split: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleMonthSplitError = (state, action) =>
  update(state, {
    month_split: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

export default handleActions(
  {
    [constants.CIRDAN_FEE_REQUEST]: handleCirdanFeeRequest,
    [constants.CIRDAN_FEE_SUCCESS]: handleCirdanFeeSuccess,
    [constants.CIRDAN_FEE_ERROR]: handleCirdanFeeError,
    [constants.UPDATE_LOCAL_FEE]: handleLocalFeeUpdate,
    [constants.RESET_FEE]: handleResetFee,
    [constants.CLIENT_FEE_REQUEST]: handleClientFeeRequest,
    [constants.CLIENT_FEE_SUCCESS]: handleClientFeeSuccess,
    [constants.CLIENT_FEE_ERROR]: handleClientFeeError,
    [constants.MONTH_SPLIT_REQUEST]: handleMonthSplitRequest,
    [constants.MONTH_SPLIT_SUCCESS]: handleMonthSplitSuccess,
    [constants.MONTH_SPLIT_ERROR]: handleMonthSplitError
  },
  initialState
);
