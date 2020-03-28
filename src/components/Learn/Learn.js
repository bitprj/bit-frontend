import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import WithPageSpinner from '../HOC/WithPageSpinner'

import withApiCache, {
	isDataReady,
	CACHE_ACTIVITY,
	CACHE_ACTIVITY_PROGRESS
} from '../HOC/WithApiCache'
import { init } from '../../redux/actions/learnData'

const Container = styled.div`
	display: flex;
	position: relative;
	background: #fafafa;

	> :nth-child(1),
	> :nth-child(2),
	> :nth-child(3) {
		height: 100vh;
	}

	> :nth-child(1) {
		position: relative;
		z-index: 3;
	}
	> :nth-child(2) {
		position: relative;
		z-index: 2;
	}
	> :nth-child(3) {
		position: relative;
		z-index: 1;
	}

	@media only screen and (orientation: landscape) {
		font-size: 80%;
	}
`

const Learn = ({ wac_data, id, isReady, onInit }) => {
	useEffect(() => {
		if (id && isDataReady(wac_data)) {
			onInit(...wac_data)
		}
	}, [id, wac_data]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<WithPageSpinner show={!isReady}>
			<Container>
				<Toolbar />
				<Sidebar />
				<Content />
			</Container>
		</WithPageSpinner>
	)
}

const mapStateToProps = state => {
	const {
		cache: { cachedActivities, cachedCards },
		learnData: {
			selectedActivity: { id, contentUrl }
		}
	} = state

	const cardId = cachedActivities[id]?.cards[0]?.id
	const card = cachedCards[cardId]

	const isReady = !!card?.content
	return {
		isReady,
		id
		// contentUrl
	}
}

const mapDispatchToProps = dispatch => ({
	onInit: (activity, activityProgress) =>
		dispatch(init(activity, activityProgress))
	// onResetToInitialState: () => dispatch(resetToInitialState())
})

const enhancer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withApiCache([CACHE_ACTIVITY, CACHE_ACTIVITY_PROGRESS])
)

export default enhancer(Learn)
