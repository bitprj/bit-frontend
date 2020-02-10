import { cloneDeep } from 'lodash'
import {
	objArrayClone,
	modifyNodeByContentfulId
} from '../../utils/deepObjUtils'
import {
	SET_ACTIVITY,
	SET_ACTIVITY_PROGRESS,
	SET_UNLOCKED_CARDS,
	SET_CARD,
	SET_HINT,
	SET_CURRENT_CARD_BY_INDEX,
	INCREMENT_CURRENT_CARD_INDEX,
	SET_LAST_CARD_UNLOCKED_INDEX_BY_ID,
	INCREMENT_LAST_CARD_UNLOCKED_INDEX
} from '../utils/actionTypes'

// import { changeProps, appendProps } from 'find-and'

const initialState = { currentCardIndex: 0, lastCardUnlockedIndex: 0 }

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVITY: {
			const nextState = { ...state, ...action.activity }
			return nextState
		}

		case SET_ACTIVITY_PROGRESS: {
			const nextState = { ...state, ...action.activityProgress }
			return nextState
		}

		case SET_UNLOCKED_CARDS: {
			const nextState = { ...state, cards: objArrayClone(state.cards) }
			const { unlockedCards } = action
			unlockedCards &&
				unlockedCards.some((card, i) => {
					Object.assign(nextState.cards[i], card)
					return i === nextState.lastCardUnlockedIndex
				})
			return nextState
		}

		case SET_CARD: {
			const nextState = { ...state, cards: objArrayClone(state.cards) }
			const { cards, lastCardUnlockedIndex } = nextState
			Object.assign(cards[lastCardUnlockedIndex], action.card)
			return nextState
		}

		case SET_HINT: {
			const { contentId, hint } = action
			const nextState = cloneDeep(state)
			return modifyNodeByContentfulId(nextState, contentId, {
				...hint
			})
		}

		case SET_CURRENT_CARD_BY_INDEX: {
      
			// const nextState = { ...state }
			// nextState.currentCardIndex = action.cardIndex
			// return nextState
		}
		case INCREMENT_CURRENT_CARD_INDEX: {
			const nextState = { ...state }
			nextState.currentCardIndex++
			return nextState
		}

		case SET_LAST_CARD_UNLOCKED_INDEX_BY_ID: {
			const nextState = { ...state }
			nextState.lastCardUnlockedIndex = action.cardIndex
			return nextState
		}
		case INCREMENT_LAST_CARD_UNLOCKED_INDEX: {
			const nextState = { ...state }
			nextState.lastCardUnlockedIndex++
			return nextState
		}

		default:
			return state
	}
}

export default reducer
