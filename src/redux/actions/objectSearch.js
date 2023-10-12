import { appAPI } from "../../http";
import { SET_OBJECT_SEARCH } from "../../constants";

export const setObjectSearch = (payload) => ({ type: SET_OBJECT_SEARCH, payload })

export const objectSearch = (searchData) => async (dispatch) => {
  try {
    const response = await appAPI.fetchObjectSearch(searchData);
    dispatch(setObjectSearch(response.data));
  } catch (error) {
    console.warn('Fetch object search is failed', error);
  }
}

export const objSearch = (searchData) => async (dispatch) => {
  try {
    const response = await appAPI.fetchObject(searchData);
    console.log("SEARCHED", response);
  } catch (error) {
    console.warn('Fetch object search is failed', error);
  }
}
