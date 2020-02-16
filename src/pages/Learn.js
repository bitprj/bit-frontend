import React, { useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import Spinner from 'react-spinkit'

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

const SpinnerWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 999;

  background-color: ${props => props.theme.bgPage}33;
  pointer-events: none;

	.page-spinner {
		width: 10em;
		height: 10em;
	}
`

const Learn = ({ isReady, onInit }) => {
	const themeContext = useContext(ThemeContext)

	useEffect(() => {
		onInit(12)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container>
			<Toolbar />
			<Sidebar />
			<Content />

			{!isReady && (
				<SpinnerWrapper>
					<Spinner
						name="circle"
						className="page-spinner"
						fadeIn="quarter"
						color={`${themeContext.accent}77`}
					/>
				</SpinnerWrapper>
			)}
		</Container>
	)
}

const mapStateToProps = state => {
	return {
		isReady: get(state, 'learnData.cards[0]')
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInit: activityId => dispatch(init(activityId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn)
