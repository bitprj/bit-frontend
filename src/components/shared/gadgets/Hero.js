import React from 'react'
import styled from 'styled-components'

import GoBack from '../external/GoBack'
import TwoPanel from '../containers/TwoPanel'

const StyledTwoPanel = styled(TwoPanel)`
	// padding: 2.5em;
	// padding-bottom: 2em;
`

const Description = styled.div`
	margin-top: -4em;
	padding: 0 em;
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
)

export default Hero
