import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";

export function* getCertificatesRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      // `note/listNotes`
      `note/listNotes?confirm_status=true`
    );
    if (response && response.status == 200) {
      yield put(actions.getCertificatesSuccess(response.data.data));
    } else {
      yield put(actions.getCertificatesError());
    }
  } catch (error) {
    yield put(actions.getCertificatesError(error));
  }
}

export function* ibDataRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET2",
      `ThirdPartyNote/query/${action.payload}`
    );
    if (response && response.status == 200) {
      yield put(actions.ibDataSuccess(response.data));
    } else {
      yield put(actions.ibDataError());
    }
  } catch (error) {
    yield put(actions.ibDataError());
  }
}

export function* graphDataForDailyChange(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET2",
      `data/bbg/getAssetsHistoryStartEnd/${
        action.payload.isin
      }%20Corp/PX_LAST/${action.payload.start}/${action.payload.end}/${action.payload.currency}`
    );
    if (response && response.status == 200) {
      yield put(actions.graphDataForDailyChangeSuccess(response.data));
    } else {
      yield put(actions.graphDataForDailyChangeError());
    }
  } catch (error) {
    yield put(actions.graphDataForDailyChangeError());
  }
}

// export function* salesRequest(action) {
//   try {
//     // const response = yield call(fireAjax, "GET", "query/XS1878261012", {}, {});
//     const response = yield call(fireAjax, "GET", "note/listNotes", {}, {});

//     if (response) {
//       yield put(actions.salesSuccess(response.data.data));
//     }
//   } catch (error) {
//     yield put(actions.salesError(error));
//   }
// }
