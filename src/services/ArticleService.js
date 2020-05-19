import { backend } from './AxiosInstances'
/**
 * GET request for getting articleID data
 * @param {String} articleId
 */
export const fetchArticle = async articleId => {
	var response = await fetch(
		'https://e8cf77b9-33b9-46c4-b7e5-f79e62e478e8.mock.pstmn.io/articles/' +
			articleId
	)
	return await response.json()
}
export const fetchUser = async articleId => {
	var response1 = await fetch(
		'https://e8cf77b9-33b9-46c4-b7e5-f79e62e478e8.mock.pstmn.io/users/' +
			articleId
	)

	return await response1.json()
}
export const fetchUserArticles = async articleId => {
	var response2 = await fetch(
		'https://e8cf77b9-33b9-46c4-b7e5-f79e62e478e8.mock.pstmn.io/articles/' +
			articleId +
			'/articles'
	)
	return await response2.json()
}

export const unfollowUser = async user => {
	var response2 = await fetch(
		'https://e8cf77b9-33b9-46c4-b7e5-f79e62e478e8.mock.pstmn.io/followers/users/' +
			user,
		{ method: 'DELETE' }
	)
	return await response2.json()
}
export const followUser = async user => {
	var response2 = await fetch(
		'https://e8cf77b9-33b9-46c4-b7e5-f79e62e478e8.mock.pstmn.io/followers/users/' +
			user,
		{ method: 'PUT' }
	)
	return await response2.json()
}
export const fetchUserFollowers = async user => {
	var response2 = await fetch(
		'https://e8cf77b9-33b9-46c4-b7e5-f79e62e478e8.mock.pstmn.io/followers/users/'
	)
	return await response2.json()
}
