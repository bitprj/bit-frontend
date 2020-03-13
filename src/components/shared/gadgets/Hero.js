import React from 'react'
import styled from 'styled-components'

import GoBack from '../external/GoBack'
import TwoPanel from '../containers/TwoPanel'

const Background = styled.div`
	background-color: ${props => props.theme.bg};
	position: absolute;
	left: 0;
	right: 0;
	height: 40em;
	clip-path: ellipse(110% 70% at 63% 25%);
`

const StyledTwoPanel = styled(TwoPanel)`
	padding: 2.5em;
	padding-bottom: 2em;
`

const Description = styled.div`
	margin-top: -4em;
	padding: 0 6em;
	color: white;
	font-size: 85%;

	@media screen and (max-width: 1000px) {
		padding: 0 1em;
	}
`

const Hero = ({
	className,

	goBack,
	title,
	description,
	children,

	rightPanel
}) => (
	<>
		<Background />
		<StyledTwoPanel
			className={className}
			ratio={5 / 9}
			first={
				<Description>
					{goBack && <GoBack />}
					<h1 style={{ margin: 0, whiteSpace: 'nowrap' }}>{title}</h1>
					<p style={{ lineHeight: 1.6 }}>{description}</p>
					{children}
				</Description>
			}
			firstStyle={{ overflow: 'visible' }}
			second={rightPanel}
			firstCenterBoth
			secondCenterX
		/>
	</>
)

export default Hero
