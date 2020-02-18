import {
	getStudentInfo,
	getTrack,
	getTopic,
	getActivity
} from '../../services/StudentService'

import {
	SET_STUDENT_DATA,
	SET_CURRENT_TRACK,
	SET_CURRENT_TOPIC,
	SET_SUGGESTED_ACTIVITY,
	INCREMENT_GEMS_BY
} from '../utils/actionTypes'

/* ===== INITIALIZATION */

export const initStudentData = () => {
	return dispatch => {
		getStudentInfo().then(fetchedStudentData => {
			const studentData = { ...fetchedStudentData }
			dispatch(setStudentData(studentData))
		})
	}
}

export const initCurrentTrack = currentTrackID => {
	return dispatch => {
		getTrack(currentTrackID).then(trackData => {
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
		getTopic(currentTopicID).then(topicData => {
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
		getActivity(suggestedActivityID).then(activityData => {
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
