import { cloneDeep, merge as mergeDeep, get } from 'lodash'
import {
	STATE_CARD,
	STATE_HINT
} from '../../components/Learn/Content/NextButton'
// import { iterateNodes } from '../../utils/deepObjUtils'
import {
	SET_ACTIVITY,
	SET_ACTIVITY_PROGRESS,
	SET_UNLOCKED_CARDS,
	SET_CARD_STATUSES,
	SET_CARD,
	SET_HINT,
	SET_CURRENT_CARD_BY_INDEX,
	INCREMENT_CURRENT_CARD_INDEX,
	SET_LAST_CARD_UNLOCKED_INDEX_BY_ID,
	INCREMENT_LAST_CARD_UNLOCKED_INDEX,
	INCREMENT_CURRENT_HINT_STEP,
	RESET_BUTTON_STATE_AND_HINT_STEP
} from '../utils/actionTypes'

const initialState = {
	indicators: {
		currentCardIndex: undefined,
		lastCardUnlockedIndex: undefined,
		lastHintUnlockedId: undefined,
		currentButtonState: STATE_CARD,
		currentHintStep: 0
	},
	cards: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVITY: {
			return { ...state, ...action.activity }
		}

		case SET_ACTIVITY_PROGRESS: {
			return {
				...state,
				indicators: { ...state.indicators, ...action.activityProgress }
			}
		}

		case SET_UNLOCKED_CARDS: {
			const nextState = {
				...state,
				cards: cloneDeep(state.cards)
			}
			mergeDeep(nextState.cards, action.unlockedCards)
			return nextState
		}

		case SET_CARD_STATUSES: {
			const nextState = {
				...state,
				cards: cloneDeep(state.cards)
			}
			action.cardStatuses.forEach((cardStatus, i) => {
				const card = nextState.cards[i]
				mergeDeep(card.hints, cardStatus)
				hintStatusSeparation(card)
			})
			return nextState
		}

		case SET_CARD: {
			const nextState = {
				...state,
				cards: cloneDeep(state.cards)
			}
			const {
				cards,
				indicators: { lastCardUnlockedIndex }
			} = nextState
			hintStatusSeparation(action.card)
			mergeDeep(cards[lastCardUnlockedIndex], action.card)
			return nextState
		}

		case SET_HINT: {
			// use hints not lockedhints instead because lockedhints removes lower stuff
			const { id, contentId, hint: nextHint } = action
			const nextState = cloneDeep(state)
			const {
				cards,
				indicators: { currentCardIndex }
			} = nextState
			const card = cards[currentCardIndex]

			nextState.indicators.lastHintUnlockedId = id
			nextState.indicators.currentButtonState = STATE_HINT

			const hintUnlockMovement = node => {
				if (!node.hints) return
				if (!node.unlockedHints) return alert('bruh chill, wait a sec')
				// TODO make a notification: wait a bit nicer

				node.hints.some(hint => {
					// find hint
					if (hint.contentfulId === contentId) {
						nextHint.isUnlocked = true
						mergeDeep(hint, nextHint)
						node.unlockedHints.push(hint)
						return true
					}
					return hintUnlockMovement(hint)
				})
			}

			hintUnlockMovement(card)

			return nextState
		}

		case SET_CURRENT_CARD_BY_INDEX: {
			return {
				...state,
				indicators: {
					...state.indicators,
					currentCardIndex: action.cardIndex
				}
			}
		}
		case INCREMENT_CURRENT_CARD_INDEX: {
			return {
				...state,
				indicators: {
					...state.indicators,
					currentCardIndex: state.indicators.currentCardIndex + 1
				}
			}
		}

		case SET_LAST_CARD_UNLOCKED_INDEX_BY_ID: {
			return {
				...state,
				indicators: {
					...state.indicators,
					lastCardUnlockedIndex: action.cardIndex
				}
			}
		}
		case INCREMENT_LAST_CARD_UNLOCKED_INDEX: {
			return {
				...state,
				indicators: {
					...state.indicators,
					lastCardUnlockedIndex: state.indicators.lastCardUnlockedIndex + 1
				}
			}
		}

		case INCREMENT_CURRENT_HINT_STEP: {
			return {
				...state,
				indicators: {
					...state.indicators,
					currentHintStep: state.indicators.currentHintStep + 1
				}
			}
		}
		case RESET_BUTTON_STATE_AND_HINT_STEP: {
			return {
				...state,
				indicators: {
					...state.indicators,
					currentButtonState: STATE_CARD,
					currentHintStep: 0
				}
			}
		}

		default:
			return state
	}
}

export default reducer

/** HELPERS */

const hintStatusSeparation = node => {
	if (!node.hints) return

	node.unlockedHints = node.hints.filter(hint => {
		return hint.isUnlocked
	})

	node.lockedHints = node.hints.filter(hint => {
		hintStatusSeparation(hint)
		return !hint.isUnlocked
	})
}
