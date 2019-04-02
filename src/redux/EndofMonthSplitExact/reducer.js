import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data:
        {
            isin: "",
            start_date: "",
            end_date: "",
            ib_account: "",
            total_amount_to_withdraw: "",
            management_fee: "",
            brokerage_fee_client: "",
            brokerage_fee_sales: ""
        }

};


const handleUpdateQueryInformatioon = (state, action) =>
    update(state, {
        data: {
            [action.payload.title]: {
                $set: action.payload.value
            }
        }
        }
    );

const handleSendQueryRequest = (state, action) =>
    update(state, {
        isLoading: { $set: true },
        isSuccess: { $set: false },
        isError: { $set: false }
    });

const handleSendQuerySuccess = (state, action) => {
    const payload_copy = action.payload.data;
    console.log(payload_copy)
    return update(state, {
        isLoading: { $set: false },
        isSuccess: { $set: true },
        isError: { $set: false },
        data: { $set: payload_copy }
    });
};

const handleSendQueryError = (state, action) =>
    update(state, {
        isLoading: { $set: false },
        isSuccess: { $set: false },
        isError: { $set: true }
    });

export default handleActions(
    {
        [constants.SEND_QUERY_REQUEST]: handleSendQueryRequest,
        [constants.SEND_QUERY_SUCCESS]: handleSendQuerySuccess,
        [constants.SEND_QUERY_ERROR]: handleSendQueryError,
        [constants.UPDATE_FEE_QUERY]: handleUpdateQueryInformatioon,
    },
    initialState
);