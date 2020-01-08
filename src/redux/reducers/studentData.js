import { cloneDeep, merge } from "lodash";
import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STUDENT_DATA: {
      const newState = cloneDeep(state);
      newState.is_student_data_loaded = true;
      return merge(newState, action.studentData);
    }
    case actionTypes.SET_CURRENT_TRACK: {
      const newState = cloneDeep(state);
      newState.current_track = { ...action.currentTrack };
      return newState;
    }
    case actionTypes.SET_CURRENT_TOPIC: {
      const newState = cloneDeep(state);
      newState.current_topic = { ...action.currentTopic };
      return newState;
    }
    case actionTypes.SET_SUGGESTED_ACTIVITY: {
      const newState = cloneDeep(state);
      newState.suggested_activity = { ...action.suggestedActivity };
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
