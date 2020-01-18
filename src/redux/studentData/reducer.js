import * as actionTypes from "../utils/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STUDENT_DATA: {
      const newState = { ...state };
      newState.is_student_data_loaded = true;
      return { ...newState, ...action.studentData };
    }
    case actionTypes.SET_CURRENT_TRACK: {
      const newState = { ...state };
      newState.current_track = { ...action.currentTrack };
      return newState;
    }
    case actionTypes.SET_CURRENT_TOPIC: {
      const newState = { ...state };
      newState.current_topic = { ...action.currentTopic };
      return newState;
    }
    case actionTypes.SET_SUGGESTED_ACTIVITY: {
      const newState = { ...state };
      newState.suggested_activity = { ...action.suggestedActivity };
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
