import { SET_THEME } from "../utils/actionTypes";

export const setTheme = theme => {
  return { type: SET_THEME, theme };
};

export default setTheme;
