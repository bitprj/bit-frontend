import { getAllCards, genFetch } from '../../services/ContentfulService'
import { SET_ACTIVITY } from '../utils/actionTypes'

/**
 * Actions
 */
// export const setCardCurrentIndex = currentIndex => {
// 	return {
// 		// type: actionTypes.,
// 		currentIndex
// 	}
// }

// const setAllCards = allCards => {
// 	return {
// 		type: SET_ALL_CARDS,
// 		allCards
// 	}
// }

// export const initAllCards = cardArray => {
// 	return dispatch => {
// 		getAllCards(cardArray).then(data => {
// 			dispatch(setAllCards(data.content))
// 		})
// 	}
// }

const setActivity = activity => {
  return {
    type: SET_ACTIVITY,
    activity
  }
}

export const initActivity = activityID => {
  return dispatch => {
    genFetch(activityID).then(activity => {
      dispatch(setActivity(activity))
    })
  }
}
