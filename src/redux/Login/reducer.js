import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
  message: ""
};

const handleLoginRequest = (state, action) =>
  update(state, {
    isLoading: { $set: true },
    isSuccess: { $set: false },
    isError: { $set: false },
    message: { $set: "" }
  });
const handleLoginSuccess = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false },
    data: { $set: action.payload }
  });
const handleLoginError = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isSuccess: { $set: false },
    isError: { $set: true },
    message: { $set: action.payload }
  });

const handleLoginReset = (state, action) =>
  update(state, { $merge: initialState });

export default handleActions(
  {
    [constants.LOGIN_REQUEST]: handleLoginRequest,
    [constants.LOGIN_SUCCESS]: handleLoginSuccess,
    [constants.LOGIN_ERROR]: handleLoginError,
    [constants.LOGIN_RESET]: handleLoginReset
  },
  initialState
);
