import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import WithPageSpinner from '../HOC/WithPageSpinner'

import withApiCacheData, {
	isDataReady,
	WARD_ACTIVITY,
	WARD_ACTIVITY_PROGRESS
} from '../HOC/WithApiCacheData'
import {
	initActivityProgress,
	preloadActivityCards
} from '../../redux/actions/learnData'

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

const Learn = ({
	ward_data,
	id,
	isReady,
	onInitActivityProgress,
	onPreloadActivityCards
}) => {
	useEffect(() => {
		if (id && isDataReady(ward_data)) {
			onInitActivityProgress(...ward_data)

			const activity = ward_data[0]
			onPreloadActivityCards(activity)
		}
	}, [id, ward_data]) // eslint-disable-line react-hooks/exhaustive-deps

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
		cache: { selectedActivityId: id, cachedActivities, cachedCards }
	} = state

	const cardId = cachedActivities[id]?.cards[0]?.id
	const card = cachedCards[cardId]

	const isReady = !!card?.content
	return {
		isReady,
		id
	}
}

const mapDispatchToProps = dispatch => ({
	onInitActivityProgress: (activity, activityProgress) =>
		dispatch(initActivityProgress(activity, activityProgress)),
	onPreloadActivityCards: activity => dispatch(preloadActivityCards(activity))
	// onResetToInitialState: () => dispatch(resetToInitialState())
})

const enhancer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withApiCacheData(WARD_ACTIVITY, WARD_ACTIVITY_PROGRESS)
)

export default enhancer(Learn)
