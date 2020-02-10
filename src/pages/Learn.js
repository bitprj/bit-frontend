import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Toolbar from '../components/Learn/Toolbar/Toolbar'
import Sidebar from '../components/Learn/Sidebar/Sidebar'
import Content from '../components/Learn/Content/Content'

import { init } from '../redux/actions/learnData'

// import {} from '../services/LearnService'

const Container = styled.div`
	display: flex;
	position: relative;

	> :nth-child(1),
	> :nth-child(2),
	> :nth-child(3) {
		height: 100vh;
	}
`

const Learn = ({ onInit }) => {
	useEffect(() => {
		onInit(12)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container>
			<Toolbar />
			<Sidebar />
			<Content />
		</Container>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		onInit: activityId => dispatch(init(activityId))
	}
}

export default connect(null, mapDispatchToProps)(Learn)
