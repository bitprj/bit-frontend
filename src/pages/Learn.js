import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Toolbar from '../components/Learn/Toolbar/Toolbar'
import Sidebar from '../components/Learn/Sidebar/Sidebar'
import Content from '../components/Learn/Content/Content'
import Spinner from '../components/shared/gadgets/Spinner'
import { init } from '../redux/actions/learnData'

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

const Learn = ({ isReady, onInit }) => {
	useEffect(() => {
		onInit(12)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container>
			<Toolbar />
			<Sidebar />
			<Content />
			<Spinner render={!isReady} />
		</Container>
	)
}

const mapStateToProps = state => {
	const isReady = !!get(state, 'learnData.cards[0].content')
	if (isReady)
		return {
			isReady
		}
	return {}
}

const mapDispatchToProps = dispatch => ({
	onInit: activityId => dispatch(init(activityId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Learn)
