import { createClient } from 'contentful'

const client = createClient({
	space: process.env.REACT_APP_CONTENTFUL_SPACE,
	accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
})

/**
 * Generic Fetch
 * @param {*} objectID
 */
export const genFetch = objectID => {
	return client.getEntry(objectID).then(response => response.fields)
}

export const genFetchDetails = objectID => {
	return client.getEntry(objectID)
}

// @unused
export const getAllCards = cardArray => {
	return cardArray.map(card => {
		return getCard(card.cardID)
	})
}

export const getConcept = conceptID => {
	return client.getEntry(conceptID).then(response => {
		return getAllSteps(response.fields.steps).then(slides => slides)
	})
}

export const getHint = hintID => {
	return client.getEntry(hintID).then(response => {
		return getAllSteps(response.fields.steps).then(steps => {
			return {
				title: response.fields.name,
				steps: steps
			}
		})
	})
}

// async fetchTrack(trackID) {
//     return client.getEntry(trackID).then(response => response.fields)
// }

/**
 * HELPERS
 */
export const getCard = cardID => {
	return client.getEntry(cardID).then(response => response.fields)
}

const getAllSteps = steps => {
	const slides = Promise.all(
		steps.map(async (stepInfo, index) => {
			const stepID = stepInfo.sys.id
			const slide = getEachStep(stepID).then(step => ({
				id: stepID,
				heading: step.heading,
				content: step.content,
				image: step.image,
				snippet: step.snippet
			}))
			slide.isShown = !index ? true : false
			return slide
		})
	)
	return slides
}

const getEachStep = stepID => {
	return client.getEntry(stepID).then(response => response.fields)
}
