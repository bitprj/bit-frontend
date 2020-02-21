import { cloneDeep, merge as mergeDeep, get } from 'lodash'
import { SafeQueue } from '../../utils/DataStructures'

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
	BROADCAST_BUTTON_STATE,
	SCHEDULE_BUTTON_STATE,
	RESET_BUTTON_STATE_SCHEDULE
} from '../utils/actionTypes'

const initialState = {
	indicators: {
		currentCardIndex: undefined,
		lastCardUnlockedIndex: undefined, // must be undefined
		lastHintUnlockedId: undefined,

		currentButtonState: undefined,
		buttonStateScheduleQueue: new SafeQueue([]) // must be initialized
	},
	cards: [
		{
			id: undefined,
			contentfulId: undefined,
			name: undefined,
			order: undefined,
			hints: [],
			content: undefined,
			gems: undefined,
			unlockedHints: [],
			lockedHints: [],
			concepts: [],
			checkpoint: undefined
		}
		// ... and more cards
	]
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
			const nextState = {
				...state,
				indicators: {
					...state.indicators,
					lastHintUnlockedId: id
				},
				cards: cloneDeep(state.cards)
			}

			const card = nextState.cards[nextState.indicators.currentCardIndex]

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

		case BROADCAST_BUTTON_STATE: {
			return {
				...state,
				indicators: {
					...state.indicators,
					currentButtonState: action.buttonState
				}
			}
		}
		case SCHEDULE_BUTTON_STATE: {
			return {
				...state,
				indicators: {
					...state.indicators,
					buttonStateScheduleQueue: state.indicators.buttonStateScheduleQueue
						.enqueue(action.buttonState)
						.copy()
				}
			}
		}
		case RESET_BUTTON_STATE_SCHEDULE: {
			return {
				...state,
				indicators: {
					...state.indicators,
					buttonStateScheduleQueue: new SafeQueue([])
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
