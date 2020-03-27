import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { autoFetch } from '../../services/ContentService'
import { saveToCache } from '../../redux/actions/cache'

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

const withApiCache = (...cacheTypes) => WrappedComponent => {
	const _ = ({ wac_cache, wac_onSaveToCache, ...props }) => {
		const { id } = props

		const getInitialData = () =>
			cacheTypes.map(type => {
				return wac_cache[type][id]
			})

		const [data, setData] = useState(getInitialData())

		useEffect(() => {
			if (id && !isDataReady(data)) {
				console.log(cacheTypes)
				Promise.all(
					cacheTypes.map(type => {
						return autoFetch(id, type)
					})
				).then(async apiData => {
					const finalData = await Promise.all(
						apiData.map(ad => fetchContentUrls(ad))
					)

					finalData.forEach((fd, i) => {
						wac_onSaveToCache(cacheTypes[i], { [id]: fd })
					})

					setData(finalData)
				})
			}
		}, [id])

		return <WrappedComponent wac_data={data} {...props} />
	}

	return connect(mapStateToProps, mapDispatchToProps)(_)
}

const mapStateToProps = state => ({
	wac_cache: state.cache
})

const mapDispatchToProps = dispatch => ({
	wac_onSaveToCache: (cacheType, newLoads) =>
		dispatch(saveToCache(cacheType, newLoads))
})

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
export const fetchContentUrls = async apiData => {
	const isValidMdUrl = str => {
		const pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|)' + // domain name
				'.+.(md|json)$', // check for md
			'i'
		)
		return !!pattern.test(str)
	}
	const processUrl = () => {
		if (url.includes('github.com')) return convertToRawGithubUrl(url)
		return url
	}
	const convertToRawGithubUrl = url =>
		url.replace('github.com', 'raw.githubusercontent.com').replace('/raw/', '/')

	/**
	 * Function Start
	 */
	const url = Object.values(apiData).find(e => isValidMdUrl(e))
	if (!url) {
		return apiData
	}
	const response = await axios.get(processUrl())
	return { ...apiData, content: response.data }
}
