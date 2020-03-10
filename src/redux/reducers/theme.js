import { SET_THEME } from '../actionTypes'
import defaultTheme from '../../styles/theme'

const initialState = defaultTheme

const theme = (state = initialState, action) => {
	if (action.type === SET_THEME) {
		return action.theme
	}
	return state
}

export default theme
