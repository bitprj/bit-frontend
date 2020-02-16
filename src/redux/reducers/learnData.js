import { cloneDeep, merge as mergeDeep, get } from 'lodash'
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
	INCREMENT_LAST_CARD_UNLOCKED_INDEX
} from '../utils/actionTypes'

const initialState = {
	currentCardIndex: 0,
	lastCardUnlockedIndex: 0,
	cards: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVITY: {
			return { ...state, ...action.activity }
		}

		case SET_ACTIVITY_PROGRESS: {
			return { ...state, ...action.activityProgress }
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
			const { cards, lastCardUnlockedIndex } = nextState
			hintStatusSeparation(action.card)
			mergeDeep(cards[lastCardUnlockedIndex], action.card)
			return nextState
		}

		case SET_HINT: {
			// use hints not lockedhints instead because lockedhints removes lower stuff
			const { contentId, hint: nextHint } = action
			const nextState = cloneDeep(state)
			const { cards, currentCardIndex } = nextState
			const card = cards[currentCardIndex]

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
				currentCardIndex: action.cardIndex
			}
		}
		case INCREMENT_CURRENT_CARD_INDEX: {
			return {
				...state,
				currentCardIndex: state.currentCardIndex + 1
			}
		}

		case SET_LAST_CARD_UNLOCKED_INDEX_BY_ID: {
			return {
				...state,
				lastCardUnlockedIndex: action.cardIndex
			}
		}
		case INCREMENT_LAST_CARD_UNLOCKED_INDEX: {
			return {
				...state,
				lastCardUnlockedIndex: state.lastCardUnlockedIndex + 1
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
