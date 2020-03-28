import React, { useState, useEffect, useRef, useMemo } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PCancelable from 'p-cancelable'

import { autoFetch } from '../../services/ContentService'
import { saveToCache } from '../../redux/actions/cache'
import { useTraceUpdate } from '../../utils/customHooks'

export const CACHE_TOPIC = 'cachedTopics'
export const CACHE_MODULE = 'cachedModules'
export const CACHE_ACTIVITY = 'cachedActivities'
export const CACHE_CARD = 'cachedCards'
export const CACHE_CHECKPOINT = 'cachedCheckpoints'
export const CACHE_CONCEPT = 'cachedConcepts'
export const CACHE_HINT = 'cachedHints'

export const CACHE_ACTIVITY_PROGRESS = 'cachedActivitiesProgress'
export const CACHE_HINT_PROGRESS = 'cachedHintsProgress'
export const CACHE_CHECKPOINTS_PROGRESS = 'cachedCheckpointsProgress'

const initialConfig = {
	allowFetch: true
}

const withApiCache = (cacheTypes, config) => WrappedComponent => {
	const { allowFetch } = { ...initialConfig, ...config }

	let isMounted = true
	let apiCall

	const _ = ({ wac_cache, wac_onSaveToCache, ...props }) => {
		const { id } = props

		const initialData = useMemo(
			() => cacheTypes.map(type => wac_cache[type][id]),
			[id]
		)

		useEffect(() => {
			return () => {
				isMounted = false
				if (apiCall) {
					apiCall.cancel()
					console.log(apiCall.isCanceled)
				}
			}
		}, [])

		const getApiData = PCancelable.fn(onCancel => {
			onCancel.shouldReject = false
			onCancel(() => {
				console.log('[REJECTED]', cacheTypes)
			})
			return Promise.all(
				cacheTypes.map(async (type, i) => {
					if (data[i]) return data[i]

					const apiData = await autoFetch(id, type)
					return fetchContentUrl(apiData)
				})
			)
		})

		const [data, setData] = useState(initialData)

		useEffect(() => {
			if (allowFetch && id && !isDataReady(initialData)) {
				console.log(cacheTypes)
				;(async () => {
					console.log('[req data]', isMounted)
					apiCall = getApiData()

					console.log('[set/send data]', isMounted)
					if (isMounted)
						apiCall.then(data => {
							data.forEach((fd, i) => {
								wac_onSaveToCache(cacheTypes[i], { [id]: fd })
							})
							setData(data)
						})
				})()
			}
		}, [id])

		return <WrappedComponent wac_data={data} {...props} />
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
