import { SAVE_TO_CACHE } from '../actionTypes'

/**
 *
 * @param {string} cacheType
 * @param {object} newLoads { [id1]: {...}, [id2]: {...} }
 * @param {object} options { overwrite: bool, ... }
 */
export const saveToCache = (cacheType, newLoads, options) => {
	const initialOptions = {
		merge: false // if false, newLoads will not overwrite prexisting ones
	}

	return {
		type: SAVE_TO_CACHE,
		cacheType,
		newLoads,
		options: options ?? initialOptions
	}
}
