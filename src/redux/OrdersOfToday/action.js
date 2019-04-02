import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";

export function* confirmOrderRequest(action) {
  try {
    const response = yield call(fireAjax, "PUT", "orders/updateOrder", {
      _id: action.payload,
      status: true
    });
    if (response && response.status == 200) {
      yield put(actions.confirmOrderSuccess(response));
      yield put(actions.getOrdersRequest());
    } else {
      yield put(actions.confirmOrderError());
    }
  } catch (e) {
    yield put(actions.confirmOrderError());
  }
}
