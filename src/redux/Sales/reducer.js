import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  certificateData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: ""
  },
  IBData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: []
  },
  graphDataForDailyChange: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: []
  }
};

const handleCertificatesDataRequest = (state, action) =>
  update(state, {
    certificateData: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleCertificatesDataSuccess = (state, action) =>
  update(state, {
    certificateData: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $set: action.payload }
    }
  });
const handleCertificatesDataError = (state, action) =>
  update(state, {
    certificateData: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleIBDataRequest = (state, action) =>
  update(state, {
    IBData: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleIBDataSuccess = (state, action) =>
  update(state, {
    IBData: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
        data: { $push: [action.payload] }
    }
  });
const handleIBDataError = (state, action) =>
  update(state, {
    IBData: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleDailyChangeDataRequest = (state, action) =>
  update(state, {
    graphDataForDailyChange: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleDailyChangeDataSuccess = (state, action) =>
  update(state, {
    graphDataForDailyChange: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      data: { $push: [action.payload] }
    }
  });
const handleDailyChangeDataError = (state, action) =>
  update(state, {
    graphDataForDailyChange: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

export default handleActions(
  {
    [constants.GET_CERTIFICATES_REQUEST]: handleCertificatesDataRequest,
    [constants.GET_CERTIFICATES_SUCCESS]: handleCertificatesDataSuccess,
    [constants.GET_CERTIFICATES_ERROR]: handleCertificatesDataError,
    [constants.IB_DATA_REQUEST]: handleIBDataRequest,
    [constants.IB_DATA_SUCCESS]: handleIBDataSuccess,
    [constants.IB_DATA_ERROR]: handleIBDataError,
    [constants.GRAPH_DATA_FOR_DAILY_CHANGE_REQUEST]: handleDailyChangeDataRequest,
    [constants.GRAPH_DATA_FOR_DAILY_CHANGE_SUCCESS]: handleDailyChangeDataSuccess,
    [constants.GRAPH_DATA_FOR_DAILY_CHANGE_ERROR]: handleDailyChangeDataError
  },
  initialState
);
