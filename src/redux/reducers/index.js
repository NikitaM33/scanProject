import { combineReducers } from "redux";

import Auth from './Auth';
import accauntInfo from './accauntInfo';
import objectSearchState from './objectSearch';

const rootReducer = combineReducers({
  Auth,
  accauntInfo,
  objectSearchState,
});

export default rootReducer;
