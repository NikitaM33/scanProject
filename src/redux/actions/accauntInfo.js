import { appAPI } from "../../http";
import { SET_ACCAUNT_INFO, SET_IS_LIMIT } from "../../constants";

export const setAccInfo = (payload) => ({ type: SET_ACCAUNT_INFO, payload });
export const setIsLimit = (payload) => ({ type: SET_IS_LIMIT, payload });

export const fetchAccauntInfo = () => async (dispatch) => {
  const response = await appAPI.getAccInfo();

  dispatch(setIsLimit(true));
  dispatch(setAccInfo(response.data));
};
