import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";
import {
  localStore,
  setLoggedUser,
  getLoggedUser
} from "../../services/localStore";
import { toast } from "react-toastify";

export function* loginRequest(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(fireAjax, "POST", "user/login", {
      email,
      password
    });
    if (response && response.status == 200 ) {
      yield put(
        actions.loginSuccess(
          setLoggedUser(response.data.data.accessToken).token
        )
      );
    } else {
      toast.error(response.data.message);
      yield put(actions.loginError());
    }
  } catch (e) {
    toast.error(e.response.data.message);
    yield put(actions.loginError(e.response.data.message));
  }
}

export function* isAlreadyLoggedIn(action) {
  const token = getLoggedUser().token;

  if (token) {
    yield put(actions.loginSuccess(token));
  } else {
    yield put(actions.logout());
  }
}

export function* logout(action) {
  yield call(localStore, "clear");
}
