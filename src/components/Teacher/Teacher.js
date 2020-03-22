import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Toolbar from './Toolbar/Toolbar'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import Details from './Details/Details'

import WithPageSpinner from '../HOC/WithPageSpinner'
import { init } from '../../redux/actions/teacherData'

const Container = styled.div`
	display: flex;
	position: relative;
	background: #fafafa;

	> :nth-child(1),
	> :nth-child(2),
	> :nth-child(3),
	> :nth-child(4) {
		height: 100vh;
	}

	@media only screen and (orientation: landscape) {
		font-size: 80%;
	}
`

const Teacher = ({ isReady, onInit }) => {
	const containerRef = useRef(null)

	useEffect(() => {
		onInit()
	}, [])

	return (
		<WithPageSpinner show={!isReady}>
			<Container ref={containerRef}>
				<Toolbar />
				<Sidebar />
				<Content />
				<Details />
			</Container>
		</WithPageSpinner>
	)
}

const mapStateToProps = state => ({
	isReady: !!get(state, 'teacherData.submissions.length')
})

const mapDispatchToProps = dispatch => ({
	onInit: () => dispatch(init())
})

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)
