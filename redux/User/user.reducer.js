import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "./user.types";
import Cookies from "js-cookie";
const intitialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {},
  isLoggedIn: Cookies.get("isLoggedIn") ? true : false,
};
export const userReducer = (state = intitialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      Cookies.set("user", JSON.stringify(action.payload));
      Cookies.set("isLoggedIn", true);
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      Cookies.remove("user");
      Cookies.remove("isLoggedIn");
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    case UPDATE_USER:
      Cookies.set("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
