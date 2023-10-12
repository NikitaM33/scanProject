import { SET_AUTH, WRONG_AUTH, CHECK_AUTH, USER } from "../../constants";

const initialState = {
  user: {},
  isLogin: false,
  wrongPass: false,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isLogin: action.payload ? true : false,
      };

    case WRONG_AUTH:
      return {
        ...state,
        wrongPass: action.payload === 401 ? true : false,
      };

    case CHECK_AUTH:
      return {
        ...state,
        isLogin: action.payload,
      };

    case USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default Auth;
