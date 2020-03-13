import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	${props => {
		if (props.orientation.toUpperCase() !== 'VERTICAL') {
			return `
        ${props.fullSizeAxis ? 'width: 100%;' : ''}
        ${props.fullSizeOffAxis ? 'height: 100%;' : ''}
      `
		}
		return `
    ${props.fullSizeAxis ? 'height: 100%;' : ''}
    ${props.fullSizeOffAxis ? 'width: 100%;' : ''}
    `
	}}
	display: flex;
	flex-direction: ${props =>
		props.orientation.toUpperCase() !== 'VERTICAL' ? 'row' : 'column'};
`

const centering = props => `
  ${
		props.centerX || props.centerY || props.centerBoth
			? `display: flex;
    flex-direction: column;`
			: ''
	}
  ${props.centerX || props.centerBoth ? 'align-items: center;' : ''}
  ${props.centerY || props.centerBoth ? 'justify-content: center;' : ''}
`

const LeftPanelWrapper = styled.div`
	flex: ${props => props.ratio || 0.5};
	${props => centering(props)}
	position: relative;
`

const RightPanelWrapper = styled.div`
	flex: ${props => 1 - props.ratio || 0.5};
	${props => centering(props)}
	position: relative;
`

const TwoPanel = ({
	className,

	ratio,
	orientation = 'horizontal',

	fullSizeAxis,
	fullSizeOffAxis,

	first,
	firstStyle,
	firstCenterX,
	firstCenterY,
	firstCenterBoth,

	second,
	secondStyle,
	secondCenterX,
	secondCenterY,
	secondCenterBoth,

	children
}) => (
	<Container
		className={className}
		orientation={orientation}
		fullSizeAxis={fullSizeAxis}
		fullSizeOffAxis={fullSizeOffAxis}
	>
		<LeftPanelWrapper
			style={firstStyle}
			className="low-profile-scrollbar only-hover"
			centerX={firstCenterX}
			centerY={firstCenterY}
			centerBoth={firstCenterBoth}
			ratio={ratio}
		>
			{first}
		</LeftPanelWrapper>
		<RightPanelWrapper
			style={secondStyle}
			className="low-profile-scrollbar fat"
			centerX={secondCenterX}
			centerY={secondCenterY}
			centerBoth={secondCenterBoth}
			ratio={ratio}
		>
			{second}
		</RightPanelWrapper>
		{children}
	</Container>
)

export default TwoPanel
