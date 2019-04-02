import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";
import { toast } from "react-toastify";

export function* signupRequest(action) {
  try {
    const { email, password, role } = action.payload;
    const response = yield call(fireAjax, "POST", "user/register", {
      email,
      password,
      role
    });
    if (response && response.status == 200) {
      toast.success("Signup Successful! Now You can Login.");
      yield put(actions.signupSuccess());
    } else {
      toast.error("Invalid Login!");
      yield put(actions.signupError());
    }
  } catch (e) {
    if (e.response.data.error === 1) {
      toast.error("Invalid Login!");
    }
    yield put(actions.signupError(e.response.data.message));
  }
}
