import React, { useState, useEffect, useRef } from 'react'
import { useCallbackRef } from 'use-callback-ref'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Toolbar from '../components/Learn/Toolbar/Toolbar'
import Sidebar from '../components/Learn/Sidebar/Sidebar'
import Content from '../components/Learn/Content/Content'

import { init } from '../redux/actions/learnData'

const Container = styled.div`
	display: flex;
	position: relative;

	> :nth-child(1),
	> :nth-child(2),
	> :nth-child(3) {
		height: 100vh;
	}

	@media only screen and (orientation: landscape) {
		font-size: 80%;
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
