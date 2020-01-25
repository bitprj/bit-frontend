import * as actionTypes from "../utils/actionTypes";

const type = localStorage.getItem("userType");

const initialState = {
  userType: type ? type : "Visitor"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        userType: "Student"
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        userType: "Visitor"
      };
    default:
      return state;
  }
};

export default reducer;
