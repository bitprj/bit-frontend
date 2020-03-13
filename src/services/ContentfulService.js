import { createClient } from 'contentful'
import camelCase from 'camelcase-keys-deep'
import { normalizeContentful } from '../utils/objUtils'

const client = createClient({
	space: process.env.REACT_APP_CONTENTFUL_SPACE,
	accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
})

const fetch = (id, query) => {
	return client.getEntry(id, query)
	.then(response => normalizeContentful(camelCase(response)))
}

/**
 * Generic Fetch
 * @param {*} objectId
 */
export const genFetch = (objectId, depth) => {
	if (!objectId) return undefined

	if (!depth === 0 && !depth) {
		depth = 1
	}
	return fetch(objectId, { include: depth }).then(response => response.fields)
}

export const genFetchDetails = objectId => {
	return fetch(objectId)
}

// @unused
export const getConcept = conceptId => {
	return fetch(conceptId).then(response => {
		return getAllSteps(response.fields.steps).then(slides => slides)
	})
}

export const getHint = async hintId => {
	const hint = await genFetch(hintId)
	const steps = await getAllSteps(hint.steps)
	return {
		title: hint.name,
		steps
	}
}

/**
 * HELPERS
 */

// @unused
export const getCard = cardID => {
	return fetch(cardID).then(response => response.fields)
}

const getAllSteps = steps => {
	const slides = Promise.all(
		steps.map((stepInfo, index) => {
			const stepID = stepInfo.sys.id
			const slide = getEachStep(stepID).then(step => ({
				id: stepID,
				heading: step.heading,
				content: step.content,
				image: step.image,
				snippet: step.snippet
			}))
			slide.isShown = !index ? true : false
			// console.log('contentful-service', slide.isShown, index)
			return slide
		})
	)
	return slides
}

const getEachStep = stepID => {
	return fetch(stepID).then(response => response.fields)
}
