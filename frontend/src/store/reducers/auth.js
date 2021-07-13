import * as actionTypes from "../actions/actionTypes";
import updateObj from "../util";

const initialState = {
  token: null,
  error: null,
  //Loading will be used for the spinner while waiting for user to be authenticated.
  loading: false,
};

const authStart = (state, action) => {
  return updateObj(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObj(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObj(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObj(state, {
    token: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      //Just in case it is not one of the above actions
      return state;
  }
};

export default reducer;
