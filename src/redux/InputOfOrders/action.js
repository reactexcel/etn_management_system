import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";
import { toast } from "react-toastify";

export function* createOrdersRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "POST",
      "orders/createOrder",
      action.payload
    );
    if (response) {
      if(response.data.data.success.length) {
        toast.success(`${response.data.data.success.length} order(s) added`);
      }
      if (response.data.data.unsuccessful.length) {
        toast.error(`${response.data.data.unsuccessful.length} order(s) failed`);
      }
      yield put(actions.getOrdersRequest());
      yield put(actions.createOrdersSuccess(response.data.data.unsuccessful));
    }
  } catch (e) {
    toast.error("Something went Wrong");
    yield put(actions.createOrdersError());
  }
}
