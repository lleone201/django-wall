import * as actionTypes from "./actionTypes";
import axios from "axios";

//These are defined and basically serve as events to trigger things later on

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("likedPosts");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

//Checks whether the users token has expired yet.
export const checkTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};

//Gives user a token and saves in local storage
export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    console.log(username);
    console.log(password);
    axios
      .post("rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        //Have to store the user token in local storage and not the state because the state will
        //go away if the page is refreshed or another page is visited.
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 2000);
        localStorage.setItem("token", token);
        localStorage.setItem("user", username);
        var likedPosts = [];
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        //localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        //dispatch(checkTimeout(expirationDate));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authRegister = (username, email, password1, password2) => {
  //Parameters required by django's Rest Framework
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        //Have to store the user token in local storage and not the state because the state will
        //go away if the page is refreshed or another page is visited.
        const token = res.data.key;
        //const expirationDate = new Date(new Date().getTime() + 3600 * 2000);
        localStorage.setItem("token", token);
        localStorage.setItem("user", username);
        let likedPosts = [];
        localStorage.setItem("likedPosts", likedPosts);
        //localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        //dispatch(checkTimeout(expirationDate));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token == null) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      // const expirationDate = new Date(localStorage.getItem("expirationDate"));
      // if (expirationDate <= new Date()) {
      //   dispatch(logout());
      // } else {
      //   dispatch(authSuccess(token));
      //   dispatch(checkTimeout((expirationDate.getTime() - new Date.getTime()) / 1000));
      // }
    }
  };
};
