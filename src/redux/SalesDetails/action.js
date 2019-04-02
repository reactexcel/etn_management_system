import { toast } from "react-toastify";
import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";

export function* getDataIBRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET2",
      `ThirdPartyNote/query/${action.payload}`
    );
    if (response && response.status == 200) {
      yield put(actions.getDataIBSuccess(response.data));
    } else {
      yield put(actions.getDataIBError());
    }
  } catch (error) {
    yield put(actions.getDataIBError());
  }
}

export function* getFeesRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `fee/listFees?calculated=true&isin=${action.payload}`
    );
    if (response && response.status == 200) {
      yield put(actions.getFeesSuccess(response.data.data));
    } else {
      yield put(actions.getFeesError());
    }
  } catch (e) {
    yield put(actions.getFeesError());
  }
}

export function* getOrdersRequest(action) {
  try {
    let response;
    if (action.payload) {
      response = yield call(
        fireAjax,
        "GET",
        `orders/listOrders?isin=${action.payload}`
      );
    } else {
      response = yield call(fireAjax, "GET", "orders/listOrders");
    }
    // , `orders/listOrders?isinId=${action.payload}`);
    if (response && response.status == 200) {
      yield put(actions.getOrdersSuccess(response.data));
    } else {
      yield put(actions.getOrdersError());
    }
  } catch (error) {
    yield put(actions.getOrdersError());
  }
}

export function* overwriteRequest(action) {
  let response;
  try {
    response = yield call(
      fireAjax,
      "POST2",
      "ThirdPartyNote/overwrite/U2552484",
      // `overwrite/${action.payload.isin}`,
      {
        mode: "FIX_PRICE",
        data: {
          BID: action.payload.bid_price,
          ASK: action.payload.ask_price,
          BID_SIZE: action.payload.bid_size,
          ASK_SIZE: action.payload.ask_size
        }
      }
    );
    if (response && response.status == 200) {
      toast.success("Overwrite Success");

      yield put(actions.overwriteSuccess(response));
    } else {
      toast.error("Overwrite Error");

      yield put(actions.overwriteError());
    }
  } catch (error) {
    toast.error("Overwrite Error");

    yield put(actions.overwriteError());
  }
}
export function* cancelOverwriteRequest(action) {
  try{
    const response = yield call(
      fireAjax,
      "POST2",
      "ThirdPartyNote/overwrite/U2552484",
      {
        mode: "AUTO"
      }
    );
    if (response && response.status == 200) {
      toast.success("Cancel Overwrite Success");

      yield put(actions.cancelOverwriteSuccess(response));
    } else {
      toast.error("Cancel Overwrite Error");

      yield put(actions.cancelOverwriteError());
    }
  }
  catch (error) {
    toast.error("Cancel Overwrite Error");

    yield put(actions.cancelOverwriteError());
  }
}
export function* autoPriceRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "POST2",
      "ThirdPartyNote/overwrite/U2552484",
      // `overwrite/${action.payload}`,
      {
        mode: "FIX_SPREAD",
        data:{
          SPREAD: action.payload.spread,
          ASK_SIZE: action.payload.ask_size,
          BID_SIZE: action.payload.bid_size,
        }
      }
    );
    if (response && response.status == 200) {
      toast.success("Autoprice Success");
      yield put(actions.autoPriceSuccess(response));
    } else {
      yield put(actions.autoPriceError());
    }
  } catch (e) {
    toast.error("Autoprice Error");
    yield put(actions.autoPriceError());
  }
}

export function* updateUserBidRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "POST",
      "userBid/createuserBid",
      action.payload
    );
    if (response && response.status == 200) {
      yield put(actions.getCertificatesRequest());
      yield put(actions.updateUserBidSuccess(response));
    } else {
      yield put(actions.updateUserBidError());
    }
  } catch (e) {
    yield put(actions.updateUserBidError());
  }
}

export function* updateCertificateRequest(action) {
  try {
    // let response;
    // if (action.payload._id) {
    const response = yield call(
      fireAjax,
      "PUT",
      "note/updatenote",
      action.payload
    );
    // }
    // else {
    //   response = yield call(
    //     fireAjax,
    //     "POST",
    //     "userBid/createuserBid",
    //     action.payload
    //   );
    // }
    if (response && response.status == 200) {
      yield put(actions.updateCertificateSuccess(response));
    } else {
      yield put(actions.updateCertificateError());
    }
  } catch (e) {
    yield put(actions.updateCertificateError());
  }
}

export function* getGraphDataRequest(action) {
  try {
    const todayDate = Math.floor(+new Date() / 1000);
    const yesterdayDate = Math.floor(
      new Date().setFullYear(new Date().getFullYear() - 1) / 1000
    );
    const response = yield call(
      fireAjax,
      "GET2",
      `data/bbg/getAssetsHistoryStartEnd/${
        action.payload.noteTicker
      }/PX_LAST/${yesterdayDate}/${todayDate}/${action.payload.currency}`
    );
    if (response && response.status == 200) {
      yield put(actions.getGraphDataSuccess(response.data));
    } else {
      yield put(actions.getGraphDataError());
    }
  } catch (error) {
    yield put(actions.getGraphDataError());
  }
}

export function* getGraphIndexRequest(action) {
  try {
    const todayDate = Math.floor(+new Date() / 1000);
    const yesterdayDate = Math.floor(
      new Date().setFullYear(new Date().getFullYear() - 1) / 1000
    );
    const response = yield call(
      fireAjax,
      "GET2",
      `data/bbg/getAssetsHistoryStartEnd/${action.payload.indexTicker}/PX_LAST/${yesterdayDate}/${todayDate}/${action.payload.currency}`
    );
    if (response && response.status == 200) {
      yield put(actions.getGraphIndexSuccess(response.data));
    } else {
      yield put(actions.getGraphIndexError());
    }
  } catch (error) {
    yield put(actions.getGraphIndexError());
  }
}
