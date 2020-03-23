import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import WithPageSpinner from '../HOC/WithPageSpinner'
import { init, resetToInitialState } from '../../redux/actions/learnData'

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
	selectedActivityId,
	isReady,
	activityId,
	onInit,
	onResetToInitialState
}) => {
	useEffect(() => {
		if (selectedActivityId !== activityId) {
			if (activityId) onResetToInitialState()
			onInit(selectedActivityId)
		}
	}, [selectedActivityId]) // eslint-disable-line react-hooks/exhaustive-deps

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
		ram: { selectedActivityId },
		learnData: { id: activityId, cards }
	} = state

	const isReady = !!get(cards, '[0].content')
	return {
		selectedActivityId,
		isReady,
		activityId
	}
}

const mapDispatchToProps = dispatch => ({
	onInit: activityId => dispatch(init(activityId)),
	onResetToInitialState: () => dispatch(resetToInitialState())
})

export default connect(mapStateToProps, mapDispatchToProps)(Learn)
