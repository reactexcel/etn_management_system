import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";
import { toast } from "react-toastify";

export function* marketMakerRequest(action) {
  try {
    const response = yield call(fireAjax, "GET", "market/listMarkets", {});
    if (response) {
      yield put(actions.marketMakerSuccess(response.data.data));
    } else {
      yield put(actions.marketMakerError());
    }
  } catch (e) {
    yield put(actions.marketMakerError());
  }
}

export function* createMarketRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "POST",
      "market/createMarket",
      action.payload
    );
    if (response && response.status == 200) {
      toast.success("New Market Added");
      yield put(actions.marketMakerRequest());
      yield put(actions.createMarketSuccess());
    } else {
      toast.error("Something went Wrong");
      yield put(actions.createMarketError());
    }
  } catch (e) {
    toast.error("Something went Wrong");
    yield put(actions.createMarketError());
  }
}
