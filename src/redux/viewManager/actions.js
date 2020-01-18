import * as actionTypes from "../utils/actionTypes";

export const setViewStudent = viewName => {
  return {
    type: actionTypes.SET_VIEW_STUDENT,
    viewName
  };
};
