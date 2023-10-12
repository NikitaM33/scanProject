import { SET_ACCAUNT_INFO, SET_IS_LIMIT } from "../../constants";

const initialState = {
  accInfo: {},
  isLimit: false,
}

const accauntInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCAUNT_INFO:
      return {
        ...state,
        accInfo: action.payload
      }

    case SET_IS_LIMIT:
      return {
        ...state,
        isLimit: action.payload
      }

    default:
      return state;
  }
}

export default accauntInfo;
