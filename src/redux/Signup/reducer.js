import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: {}
};

const handleSignupRequest = (state, action) =>
  update(state, {
    isLoading: { $set: true },
    isSuccess: { $set: false },
    isError: { $set: false },
    message: { $set: "" }
  });
const handleSignupSuccess = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isSuccess: { $set: true },
    isError: { $set: false }
  });
const handleSignupError = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isSuccess: { $set: false },
    isError: { $set: true },
    message: { $set: action.payload }
  });
const handleSignupReset = (state, action) =>
  update(state, { $merge: initialState });

export default handleActions(
  {
    [constants.SIGNUP_REQUEST]: handleSignupRequest,
    [constants.SIGNUP_SUCCESS]: handleSignupSuccess,
    [constants.SIGNUP_ERROR]: handleSignupError,
    [constants.SIGNUP_RESET]: handleSignupReset
  },
  initialState
);
