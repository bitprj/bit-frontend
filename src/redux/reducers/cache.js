import { cloneDeep, merge as mergeDeep } from 'lodash'
import { SAVE_TO_CACHE } from '../actionTypes'
import * as cacheTypes from '../../components/HOC/WithApiCache'

const initialState = {
	[cacheTypes.CACHE_TOPIC]: {},
	[cacheTypes.CACHE_MODULE]: {},
	[cacheTypes.CACHE_ACTIVITY]: {},
	[cacheTypes.CACHE_CARD]: {},
	[cacheTypes.CACHE_CHECKPOINT]: {},
	[cacheTypes.CACHE_CONCEPT]: {},
	[cacheTypes.CACHE_HINT]: {},

	[cacheTypes.CACHE_STUDENT]: {},
	[cacheTypes.CACHE_MODULE_PROGRESS]: {},
	[cacheTypes.CACHE_ACTIVITY_PROGRESS]: {},
	[cacheTypes.CACHE_HINT_PROGRESS]: {},
	[cacheTypes.CACHE_CHECKPOINTS_PROGRESS]: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_TO_CACHE: {
			const { merge } = action.options

			return {
				...state,
				[action.cacheType]: merge
					? mergeDeep(
							cloneDeep(state[action.cacheType]),
							cloneDeep(action.newLoads)
					  )
					: {
							...action.newLoads,
							...state[action.cacheType]
					  }
			}
		}

		case 'UPDATE_MODULE_ACTIVITY_PROGRESS': {
			const modu1e = state[cacheTypes.CACHE_MODULE_PROGRESS][action.moduleId]
			if (!modu1e) return state

			const {
				incompleteActivities,
				inprogressActivities,
				completedActivities
			} = modu1e

			let final = modu1e
			if (action.actionType === 'inprogress') {
				final = {
					...final,
					incompleteActivities: incompleteActivities?.filter(
						i => i.id !== action.id
					),
					inprogressActivities: (inprogressActivities ?? []).concat([
						{ id: action.id }
					])
				}
			} else if (action.actionType === 'completed') {
				final = {
					...final,
					inprogressActivities: inprogressActivities.filter(
						i => i.id !== action.id
					),
					completedActivities: (completedActivities ?? []).concat([
						{ id: action.id }
					])
				}
			}

			return {
				...state,
				[cacheTypes.CACHE_MODULE_PROGRESS]: {
					...state[cacheTypes.CACHE_MODULE_PROGRESS],
					[action.moduleId]: final
				}
			}
		}

		default:
			return state
	}
}

export default reducer
