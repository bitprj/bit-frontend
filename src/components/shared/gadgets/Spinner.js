import React, { useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Transition from 'react-transition-group/Transition'
import Spinkit from 'react-spinkit'

import { fadeIn, statusFadeOut } from '../../../styles/GlobalAnime'

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

const Spinner = ({ render }) => {
	const themeContext = useContext(ThemeContext)

	useEffect(() => {
		fadeIn('.learn-i-spin')
	}, [])

	return (
		<Transition in={render} timeout={1000} mountOnEnter unmountOnExit>
			{status => {
				statusFadeOut(status, '.learn-i-spin', 1000)
				return (
					<SpinnerWrapper className="learn-i-spin">
						<Spinkit
							className="learn-i-spin"
							name="circle"
							fadeIn="none"
							color={`${themeContext.accent}77`}
						/>
					</SpinnerWrapper>
				)
			}}
		</Transition>
	)
}

export default Spinner
