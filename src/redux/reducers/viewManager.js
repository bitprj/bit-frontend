import * as actionTypes from "../utils/actionTypes";
import * as viewTypes from "../utils/viewTypes";

const initialState = {
  current_view_student: viewTypes.PROGRESS,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VIEW_STUDENT: {
      const newState = { ...state };
      newState.current_view_student = action.viewName;
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
