import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { fetch } from '../../services/ContentService'
import { saveToCache } from '../../redux/actions/cache'

export const WARD_TOPIC = 'cachedTopics'
export const WARD_MODULE = 'cachedModules'
export const WARD_ACTIVITY = 'cachedActivities'
export const WARD_CARD = 'cachedCards'
export const WARD_CHECKPOINT = 'cachedCheckpoints'
export const WARD_CONCEPT = 'cachedConcepts'
export const WARD_HINT = 'cachedHints'

export const WARD_ACTIVITY_PROGRESS = 'cachedActivitiesProgress'

export const isDataReady = data => data.every(elem => elem !== undefined)

const withApiCacheData = (...cacheTypes) => WrappedComponent => {
	const _ = ({ ward_cache, ward_onSaveToCache, ...props }) => {
		const { id } = props

		const getInitialData = () =>
			cacheTypes.map(type => {
				return ward_cache[type][id]
			})

		const [data, setData] = useState(getInitialData())

		useEffect(() => {
			if (id) {
				Promise.all(
					cacheTypes.map(type => {
						return fetch(id, type)
					})
				).then(async apiData => {
					const finalData = await Promise.all(
						apiData.map(async (ad, i) => {
							ward_onSaveToCache(cacheTypes[i], { [id]: ad })
						})
					)

					setData(finalData)
				})
			}
		}, [id])

		return <WrappedComponent ward_data={data} {...props} />
	}

	return connect(mapStateToProps, mapDispatchToProps)(_)
}

const mapStateToProps = state => ({
	ward_cache: state.cache
})

const mapDispatchToProps = dispatch => ({
	ward_onSaveToCache: (cacheType, newLoads) =>
		dispatch(saveToCache(cacheType, newLoads))
})

export default withApiCacheData

/**
 *
 *
 *
 */

const fetchAllDeepGithub = async ad => {
	const url = Object.values(ad).find(e => isValidMdUrl(e))
	if (url) {
		const processUrl = () => {
			if (url.includes('github.com')) return convertToRawGithubUrl(url)
			return url
		}

		const response = await axios.get(processUrl())
		ad.content = response.data

		return ad
	}
}

const isValidMdUrl = str => {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|)' + // domain name
			'.+.md$', // check for md
		'i'
	)
	return !!pattern.test(str)
}

const convertToRawGithubUrl = url =>
	url.replace('github.com', 'raw.githubusercontent.com').replace('/raw/', '/')
