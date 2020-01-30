import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Toolbar from '../components/Learn/Toolbar'
import Sidebar from '../components/Learn/Sidebar'
import Content from '../components/Learn/Content'

import { initLearnData } from '../redux/actions/learnData'

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

const Learn = props => {
	useEffect(() => {
		props.onInitLearnData('18mFbdi3UGiMZJSUXU7dxI')
	}, [])

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
		onInitLearnData: activityID => dispatch(initLearnData(activityID)),
	}
}

export default connect(null, mapDispatchToProps)(Learn)
