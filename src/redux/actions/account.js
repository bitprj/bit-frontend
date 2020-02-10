import AuthService from "../../services/AuthService";

import * as actionTypes from "../utils/actionTypes";

const authService = new AuthService();

// const addLoginTrace = () => {
//   return {
//     type: actionTypes.LOGIN
//   };
// };

export const initLogin = (user, pass, callback) => {
  console.log(user, pass, callback)
  return dispatch => {
    authService
      .postLogin(user, pass)
      .then(response => {
        console.log(response);
        callback();
      })
      .catch(error => {
        console.log(error);
        callback();
      });
  };
};
// remove logintrace
export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const initLogout = () => {};
