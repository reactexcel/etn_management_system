import { combineReducers } from "redux";
import login from "./Login/reducer";
import signup from "./Signup/reducer";
import sales from "./Sales/reducer";
import salesdetails from "./SalesDetails/reducer";
import ordersoftoday from "./OrdersOfToday/reducer";
import settlementsoftoday from "./SettlementsOfToday/reducer";
import newnote from "./NewNote/reducer";
import marketmaker from "./MarketMaker/reducer";
import inputoforders from "./InputOfOrders/reducer";
import queryfee from "./EndofMonthSplitExact/reducer";
import fees from "./Fees/reducer";

const appReducer = combineReducers({
  login,
  signup,
  sales,
  newnote,
  salesdetails,
  ordersoftoday,
  settlementsoftoday,
  marketmaker,
  inputoforders,
  fees,
  queryfee
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
