import { appAPI } from "../../http";
import { SET_AUTH, WRONG_AUTH, CHECK_AUTH } from "../../constants";

export const setAuth = (payload) => ({ type: SET_AUTH, payload });
export const setAuthError = (payload) => ({ type: WRONG_AUTH, payload });
export const setCheckAuth = (payload) => ({ type: CHECK_AUTH, payload });

export const fetchAuth = (authData) => async (dispatch) => {
  try {
    const response = await appAPI.authenticate(authData);
    // console.log("DATA", response)

    if (response === 401) {
      dispatch(setAuthError(response));
    } else {
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("expire", response.data.expire);

      dispatch(setAuth(response.data.accessToken));
      window.location.replace("/");
    }
  } catch (err) {
    console.log('Get token error', err);
  }
};

export const setIsLogin = (isLoged) => async (dispatch) => {
  try {
    dispatch(setCheckAuth(isLoged));
  } catch (err) {
    console.log('Check token error', err);
  }
};
