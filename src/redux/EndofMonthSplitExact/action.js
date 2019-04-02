import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";
import { toast } from "react-toastify";

export function* sendQueryRequest(action) {
    try {
        const response = yield call(
            fireAjax,
            "POST",
            "fee/getEndOfMonthSplitExact",
            action.payload
        );

        // fake backend
        // const response = {
        //     status: 200,
        //     data:
        //         {
        //             isin: "XS124334314",
        //             start_date: "2019-03-01",
        //             end_date: "2019-10-01",
        //             ib_account: "312",
        //             total_amount_to_withdraw: 100,
        //             management_fee: 10,
        //             brokerage_fee_client: 10,
        //             brokerage_fee_sales: 10
        //         }
        // };
        if (response && response.status === 200) {
            yield put(actions.sendQuerySuccess(response.data));
        } else {
            toast.error("Something went Wrong");
            yield put(actions.sendQueryError());
        }
    } catch (e) {
        toast.error("Something went Wrong");
        yield put(actions.sendQueryError());
    }

}
