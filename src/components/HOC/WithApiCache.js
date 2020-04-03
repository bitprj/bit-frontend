import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import PCancelable from 'p-cancelable'

import { autoFetch } from '../../services/ContentService'
import { saveToCache } from '../../redux/actions/cache'

export const CACHE_TOPIC = 'cachedTopics'
export const CACHE_MODULE = 'cachedModules'
export const CACHE_ACTIVITY = 'cachedActivities'
export const CACHE_CARD = 'cachedCards'
export const CACHE_CHECKPOINT = 'cachedCheckpoints'
export const CACHE_CONCEPT = 'cachedConcepts'
export const CACHE_HINT = 'cachedHints'

export const CACHE_MODULE_PROGRESS = 'cachedModulesProgress'
export const CACHE_ACTIVITY_PROGRESS = 'cachedActivitiesProgress'
export const CACHE_HINT_PROGRESS = 'cachedHintsProgress'
export const CACHE_CHECKPOINTS_PROGRESS = 'cachedCheckpointsProgress'

const initialConfig = {
	allowFetch: true,
	fromUrl: false,
	debug: false
}

const withApiCache = (cacheTypes, config) => WrappedComponent => {
	const { allowFetch, fromUrl, debug } = { ...initialConfig, ...config }

	let isMounted
	let apiCall

	if (debug) {
		console.log('INITIATED:', `cacheTypes=${cacheTypes}`, WrappedComponent)
	}

	const _ = ({ wac_cache, wac_onSaveToCache, ...props }) => {
		const { id: urlId } = useParams()

		const id = (() => {
			if (fromUrl) {
				return parseInt(urlId)
			}
			return props.id
		})()

		const initialData = useMemo(
			() => cacheTypes.map(type => wac_cache[type][id]),
			[id]
		)

		const getApiData = PCancelable.fn(onCancel => {
			onCancel.shouldReject = false
			onCancel(() => console.log('REJECTED:', cacheTypes, apiCall))
			return Promise.all(
				cacheTypes.map(async (type, i) => {
					if (initialData[i]) return initialData[i]

					const apiData = await autoFetch(id, type)
					return apiData
				})
			)
		})

		/**
		 * Not safe to use because when unmounted,
		 * maintains reference to previous cache_type data
		 *  - use initialData instead for calculations
		 *  - can't update this state bc it's async and
		 *    need to use it immediately
		 */
		const [data, setData] = useState(initialData)

		useEffect(() => {
			if (debug) console.log('MOUNTED')
			isMounted = true
			return () => {
				if (apiCall) {
					if (debug) console.log('UNMOUNTED')
					isMounted = false
					apiCall.cancel()
				}
			}
		}, [])

		/**
		 * Temporary
		 */
		useEffect(() => {
			if (isMounted && wac_cache[cacheTypes[1]]?.[id] !== undefined) {
				console.log('changed!')
				setData(state => [state[0], wac_cache[cacheTypes[1]][id]])
			}
		}, [wac_cache[cacheTypes[1]]?.[id]])

		useEffect(() => {
			if (debug)
				console.log(
					'REQUIRED:',
					`id=${id}`,
					`isDataReady=${isDataReady(initialData)}`,
					`allowFetch=${allowFetch}`,
					'data=',
					{ initialData, data }
				)

			if (allowFetch && id) {
				if (!isDataReady(initialData)) {
					;(async () => {
						console.log('FETCHING:', `cacheTypes=${cacheTypes}`)
						apiCall = getApiData()

						apiCall.then(apiData => {
							if (debug) console.log('SETTING:', `apiData=`, apiData)
							apiData.forEach((fd, i) => {
								wac_onSaveToCache(cacheTypes[i], { [id]: fd })
							})
							if (isMounted) {
								setData(apiData)
							}
						})
					})()
				} else {
					setData(initialData)
				}
			}
		}, [id])

		return (
			<WrappedComponent
				id={id}
				wac_data={isDataReady(data) ? data : initialData}
				{...props}
			/>
		)
	}

	const mapStateToProps = state => {
		return {
			wac_cache: cacheTypes.reduce((acc, type) => {
				return { ...acc, [type]: state.cache[type] }
			}, {})
		}
	}
	const mapDispatchToProps = dispatch => ({
		wac_onSaveToCache: (cacheType, newLoads) =>
			dispatch(saveToCache(cacheType, newLoads))
	})

	return connect(mapStateToProps, mapDispatchToProps)(_)
}

export default withApiCache

/**
 *
 *
 *
 */

export const isDataReady = data => data.every(elem => elem !== undefined)

/**
 * make a recursive version
 * @param {object} apiData
 */
export const fetchContentUrl = apiData => {
	const { contentUrl } = apiData
	if (!contentUrl) {
		return apiData
	}

	return axios
		.get(contentUrl)
		.then(res => ({ ...apiData, ...res.data }))
		.catch(e => apiData)
}
