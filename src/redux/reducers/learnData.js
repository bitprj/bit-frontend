import { SET_ACTIVITY } from '../utils/actionTypes'

const initialState = {}

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case SET_ACTIVITY: {
      console.log(state)
      return { ...state, ...action.activity }
    }
		// case SET_ALL_CARDS: {
		// 	const newState = { ...state }
		// 	newState.allCards = { ...action.allCards }
		// 	console.log(newState)
		// 	return newState
		// }
		default:
			return state
	}
}

export default reducer
