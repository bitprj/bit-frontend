import React, { useEffect, useMemo, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import Transition from 'react-transition-group/Transition'
import Spinner from 'react-spinkit'

import Toolbar from '../components/Learn/Toolbar/Toolbar'
import Sidebar from '../components/Learn/Sidebar/Sidebar'
import Content from '../components/Learn/Content/Content'

import { fadeIn, statusFadeOut } from '../assets/styles/GlobalAnime'
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
	opacity: 0;

	background-color: ${props => props.theme.bgPage}33;
	pointer-events: none;

	div {
		width: 10em;
		height: 10em;
	}
`

const Learn = ({ isReady, onInit }) => {
	const themeContext = useContext(ThemeContext)

	useEffect(() => {
		fadeIn('.learn-i-spin')
		onInit(12)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const spinner = useMemo(() => {
		return (
			<SpinnerWrapper className="learn-i-spin">
				<Spinner
					className="learn-i-spin"
					name="circle"
					fadeIn="none"
					color={`${themeContext.accent}77`}
				/>
			</SpinnerWrapper>
		)
	}, [])

	return (
		<Container>
			<Toolbar />
			<Sidebar />
			<Content />
			<Transition in={!isReady} timeout={1000} mountOnEnter unmountOnExit>
				{status => {
					statusFadeOut(status, '.learn-i-spin', 1000)
					return spinner
				}}
			</Transition>
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

const mapDispatchToProps = dispatch => {
	return {
		onInit: activityId => dispatch(init(activityId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn)
