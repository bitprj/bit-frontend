import {
	fetchStudentInfo,
	fetchTrack,
	fetchTopic,
	fetchActivity
} from '../../services/StudentService'

import {
	SET_STUDENT_DATA,
	SET_CURRENT_TRACK,
	SET_CURRENT_TOPIC,
	SET_SUGGESTED_ACTIVITY,
	INCREMENT_GEMS_BY
} from '../actionTypes'

import { setSelectedActivityId, pushToLoadedModules } from './ram'

/* ===== INITIALIZATION */

export const init = () => async dispatch => {
	let studentData = await fetchStudentInfo()
	const [firstName] = studentData.name.split(' ')
	studentData = {
		...studentData,
		firstName,
		suggestedActivity: {
			id: 12,
			name: 'Minesweeper',
			summary:
				'Build Minesweeper in Python! Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
		},
		inprogressModules: [
			{
				id: 1,
				contentfulId: '2D0D9BUFgdxng7tm55jB1s',
				name: 'Object Oriented Programming ',
				activities: [
					{
						id: 12,
						contentfulId: '6UNTOJxE21Rmwr2WaQjSkT',
						name: 'Minesweeper'
					},
					{
						id: 15,
						contentfulId: '7hkJzYweQvjgL0auG9rcua',
						name: 'Creating Postman Collections'
					}
				]
			},
			{
				id: 11,
				contentfulId: '10wA6h562VVW2U4lNaHMwN',
				name: 'Postman (placeholder)',
				activities: [
					{
						id: 15,
						contentfulId: '7hkJzYweQvjgL0auG9rcua',
						name: 'Creating Postman Collections'
					},
					{
						id: 18,
						contentfulId: '2lGlBDEvjBT9kPhq5tzfmc',
						name: 'Creating and Testing with BitBloxs'
					},
					{
						id: 22,
						contentfulId: '47xvUqavST2bCjEUD1Bi2R',
						name: 'Documentation in Postman'
					},
					{
						id: 19,
						contentfulId: 'iV9cYS9X6fmmj7mH6s8Ck',
						name: 'Collection Runners in Postman'
					},
					{
						id: 20,
						contentfulId: '4VewqVEUKrdgEXpJBbP6XK',
						name: 'Mock Servers'
					},
					{
						id: 21,
						contentfulId: '4cTVtcYChJL5tZxjXGg6Tc',
						name: 'APIs for Front End Developers'
					}
				]
			}
		]
	}
	dispatch(setStudentData(studentData))

	// external
	dispatch(setSelectedActivityId(studentData.suggestedActivity.id))
}

export const initCurrentTrack = currentTrackID => {
	return dispatch => {
		fetchTrack(currentTrackID).then(trackData => {
			const currentTrack = { ...trackData }
			// contentfulService.fetch(trackData.contentfulID).then(cTrackData => {
			//   console.log("backend_fetchTrack", trackData)
			//   console.log("contentful_fetchTrack", cTrackData); // used for more info about each topic
			// });
			dispatch(setCurrentTrack(currentTrack))
		})
	}
}

export const initCurrentTopic = currentTopicID => {
	return dispatch => {
		fetchTopic(currentTopicID).then(topicData => {
			const currentTopic = { ...topicData }
			dispatch(setCurrentTopic(currentTopic))
			// return topicData;
		})
		// .then(() => {
		//   contentfulService.fetch("6E5Pfi5Le18r1yJ481oGiB").then(response => {
		//     console.log("response: ", response); // used for more info about each topic
		//     // currentTopic.modules = { ...cTopicData.modules };

		//     dispatch(setCurrentTopic(currentTopic));
		//   });
		// });
	}
}

export const initSuggestedActivity = suggestedActivityID => {
	return dispatch => {
		let suggestedActivity = {}
		fetchActivity(suggestedActivityID).then(activityData => {
			suggestedActivity = { ...activityData }
			dispatch(setSuggestedActivity(suggestedActivity))
		})
	}
}

const setStudentData = studentData => {
	return {
		type: SET_STUDENT_DATA,
		studentData
	}
}

const setCurrentTrack = currentTrack => {
	return {
		type: SET_CURRENT_TRACK,
		currentTrack
	}
}

const setCurrentTopic = currentTopic => {
	return {
		type: SET_CURRENT_TOPIC,
		currentTopic
	}
}

const setSuggestedActivity = suggestedActivity => {
	return {
		type: SET_SUGGESTED_ACTIVITY,
		suggestedActivity
	}
}

// ===== RUNTIME

export const incrementGemsBy = gemAmount => {
	return {
		type: INCREMENT_GEMS_BY,
		gemAmount
	}
}
