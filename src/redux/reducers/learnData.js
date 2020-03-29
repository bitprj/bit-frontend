import { SafeQueue } from '../../utils/DataStructures'

import {
	SET_INDICATORS,
	SET_SELECTED_ACTIVITY,
	SET_CURRENT_CARD_BY_INDEX,
	INCREMENT_CURRENT_CARD_INDEX,
	SET_LAST_CARD_UNLOCKED_INDEX_BY_ID,
	INCREMENT_LAST_CARD_UNLOCKED_INDEX,
	BROADCAST_BUTTON_STATE,
	SCHEDULE_BUTTON_STATE,
	RESET_BUTTON_STATE_SCHEDULE
} from '../actionTypes'

const initialState = {
	selectedActivity: {
		id: undefined,
		contentUrl: undefined
	},
	// variables helpful for navigation, etc
	indicators: {
		currentCardIndex: undefined,
		lastCardUnlockedIndex: undefined, // must be undefined bc of isCardUnlocked
		currentButtonState: undefined,
		buttonStateScheduleQueue: new SafeQueue([]), // must be initialized

		lastHintUnlockedId: undefined,
		submittedCheckpointSuccessful: undefined
	},

	progress: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_ACTIVITY: {
			return {
				...state,
				selectedActivity: { ...action.selectedActivity }
			}
		}

		case SET_INDICATORS: {
			return {
				...state,
				indicators: { ...state.indicators, ...action.indicators }
			}
		}

		case SET_CURRENT_CARD_BY_INDEX: {
			return {
				...state,
				indicators: {
					...state.indicators,
					currentCardIndex: action.cardIndex,
					lastHintUnlockedId: undefined // smooth slidein for hints
				}
			}
		}

		case INCREMENT_CURRENT_CARD_INDEX: {
			return {
				...state,
				indicators: {
					...state.indicators,
					currentCardIndex: state.indicators.currentCardIndex + 1
				},
				progress: {
					...state.progress,
					unlockedHintIds: [],
					lockedHintIds: []
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
