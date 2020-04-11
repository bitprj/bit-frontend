import React from 'react'
import styled from 'styled-components'

import TwoPanel from '../containers/TwoPanel'

const StyledTwoPanel = styled(TwoPanel)`
	background-color: ${props => props.theme.bgVariant};
`

const LeftPanel = styled.div`
	color: white;
	font-size: 85%;
`

const Hero = ({
	className,
	leftStyle,

	above,
	title,
	description,
	below,

	ratio,
	children
}) => (
	<StyledTwoPanel
		className={className}
		fullSizeAxis
		ratio={ratio}
		first={
			<LeftPanel style={leftStyle}>
				{above}
				<h1 style={{ margin: 0 }}>{title}</h1>
				<p style={{ lineHeight: 1.6 }}>{description}</p>
				{below}
			</LeftPanel>
		}
		firstCenterBoth
		// firstStyle={{ overflow: 'visible' }}
		second={children}
		secondCenterX
	/>
)

export default Hero
