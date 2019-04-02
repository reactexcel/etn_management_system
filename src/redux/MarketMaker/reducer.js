import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  createMarket: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  listMarket: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  data: []
};
const handleMarketMakerRequest = (state, action) =>
  update(state, {
    listMarket: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleMarketMakerSuccess = (state, action) =>
  update(state, {
    listMarket: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    },
    data: { $set: action.payload }
  });
const handleMarketMakerError = (state, action) =>
  update(state, {
    listMarket: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleCreateMarketRequest = (state, action) =>
  update(state, {
    createMarket: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleCreateMarketSuccess = (state, action) =>
  update(state, {
    createMarket: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleCreateMarketError = (state, action) =>
  update(state, {
    createMarket: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });
  const handleCreateMarketReset = (state, action) =>
  update(state, {
    createMarket: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });

export default handleActions(
  {
    [constants.MARKET_MAKER_REQUEST]: handleMarketMakerRequest,
    [constants.MARKET_MAKER_SUCCESS]: handleMarketMakerSuccess,
    [constants.MARKET_MAKER_ERROR]: handleMarketMakerError,
    [constants.CREATE_MARKET_RESET]: handleCreateMarketReset,
    [constants.CREATE_MARKET_REQUEST]: handleCreateMarketRequest,
    [constants.CREATE_MARKET_SUCCESS]: handleCreateMarketSuccess,
    [constants.CREATE_MARKET_ERROR]: handleCreateMarketError
  },
  initialState
);
