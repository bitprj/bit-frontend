import {
	SET_ACTIVITY,
	SET_CURRENT_CARD_BY_INDEX,
	INCREMENT_CURRENT_CARD_INDEX,
	SET_LAST_CARD_COMPLETED_INDEX_BY_ID,
	INCREMENT_LAST_CARD_COMPLETED_INDEX
} from '../utils/actionTypes'

const initialState = { currentCardIndex: 1, lastCardCompletedIndex: 1 }

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVITY: {
			console.log(action.activity)
			return { ...state, ...action.activity }
		}

		case SET_CURRENT_CARD_BY_INDEX: {
			const newState = { ...state }
			newState.currentCardIndex = action.cardIndex
			return newState
		}
		case INCREMENT_CURRENT_CARD_INDEX: {
			const newState = { ...state }
			newState.currentCardIndex++
			return newState
		}

		case SET_LAST_CARD_COMPLETED_INDEX_BY_ID: {
			const newState = { ...state }
			newState.lastCardCompletedIndex = action.cardIndex
			return newState
		}
		case INCREMENT_LAST_CARD_COMPLETED_INDEX: {
			const newState = { ...state }
			newState.lastCardCompletedIndex++
			return newState
		}

		default:
			return state
	}
}

export default reducer
