import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";
import { toast } from "react-toastify";

export function* cirdanFeeRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      "fee/listFees?calculated=false"
    );
    if (response && response.status == 200) {
      yield put(actions.cirdanFeeSuccess(response.data.data));
    } else {
      yield put(actions.cirdanFeeError());
    }
  } catch (e) {
    yield put(actions.cirdanFeeError());
  }
}

export function* updateCirdanFeeRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "PUT",
      "fee/updateFee",
      action.payload
    );
    if (response && response.status == 200) {
      yield put(actions.cirdanFeeRequest());
      toast.success("Fees Updated");
      yield put(actions.updateCirdanFeeSuccess());
    } else {
      toast.success("Something went wrong");
      yield put(actions.updateCirdanFeeError());
    }
  } catch (e) {
    toast.success("Something went wrong");
    yield put(actions.updateCirdanFeeError());
  }
}

export function* createCirdanFeeRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "POST",
      "fee/createFee",
      action.payload
    );
    if (response && response.status == 200) {
      yield put(actions.cirdanFeeRequest());
      toast.success("Fees Added");
      yield put(actions.createCirdanFeeSuccess());
    } else {
      toast.success("Something went wrong");

      yield put(actions.createCirdanFeeError());
    }
  } catch (e) {
    toast.success("Something went wrong");

    yield put(actions.createCirdanFeeError());
  }
}

export function* clientFeeRequest(action) {
  try {
    const response = yield call(fireAjax, "GET", "clientFee/listClientFees");
    if (response && response.status == 200) {
      yield put(actions.clientFeeSuccess(response.data.data));
    } else {
      yield put(actions.clientFeeError());
    }
  } catch (e) {
    yield put(actions.clientFeeError());
  }
}

export function* createClientFeeRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "POST",
      "clientFee/createClientFee",
      action.payload
    );
    if (response && response.status == 200) {
      yield put(actions.clientFeeRequest());
      toast.success("Fees Added");
      yield put(actions.createClientFeeSuccess());
    } else {
      toast.success("Something went wrong");

      yield put(actions.createClientFeeError());
    }
  } catch (e) {
    toast.success("Something went wrong");
    yield put(actions.createClientFeeError());
  }
}

export function* monthSplitRequest(action) {
  try {
    const response = yield call(fireAjax, "GET", "fee/getEndOfMonthSplit");
    if (response && response.status == 200) {
      yield put(actions.monthSplitSuccess(response.data));
    } else {
      yield put(actions.monthSplitError());
    }
  } catch (e) {
    yield put(actions.monthSplitError());
  }
}
