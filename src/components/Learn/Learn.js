import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import WithPageSpinner from '../HOC/WithPageSpinner'
import { init, indicateInitialLoadLearn } from '../../redux/actions/learnData'

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
	isReady,
	hasLoadedOnce,
	currentCardIndex,
	onInit,
	onIndicateInitialLoadLearn
}) => {
	useEffect(() => {
		if (!hasLoadedOnce) {
			onIndicateInitialLoadLearn()
			onInit(12, currentCardIndex)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

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
		learnData: {
			cards,
			indicators: { hasLoadedOnce, currentCardIndex }
		}
	} = state

	const isReady = !!get(cards, '[0].content')
	return {
		isReady,
		hasLoadedOnce,
		currentCardIndex
	}
}

const mapDispatchToProps = dispatch => ({
	onInit: (activityId, currentCardIndex) =>
		dispatch(init(activityId, currentCardIndex)),
	onIndicateInitialLoadLearn: () => dispatch(indicateInitialLoadLearn())
})

export default connect(mapStateToProps, mapDispatchToProps)(Learn)
