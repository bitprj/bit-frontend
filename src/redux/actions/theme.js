import { SET_THEME } from "../actionTypes";

export const setTheme = theme => {
  return { type: SET_THEME, theme };
};

export default setTheme;
