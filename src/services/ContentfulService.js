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

export const getHint = async hintID => {
	const hint = await genFetch(hintID)
	const steps = await getAllSteps(hint.steps)
	return {
		title: hint.name,
		steps
	}
}

// export const getHint2 = hintID => {
// 	return genFetch(hintID).then(hint => {
// 		return getAllSteps(hint.steps).then(steps => {
// 			return {
// 				title: hint.name,
// 				steps
// 			}
// 		})
// 	})
// }

// async fetchTrack(trackID) {
//     return client.getEntry(trackID).then(response => response.fields)
// }

/**
 * HELPERS
 */

// @unused
export const getCard = cardID => {
	return client.getEntry(cardID).then(response => response.fields)
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
	return client.getEntry(stepID).then(response => response.fields)
}
