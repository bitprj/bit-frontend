import React from 'react'
import styled from 'styled-components'

import ProgressCircle from '../low/ProgressCircle'

const defaultIcon = require('../../../assets/icons/cards.svg')

const Container = styled.div`
	width: ${props => props.size};
	height: ${props => props.size};
	position: relative;
	border-radius: 50%;
	flex-shrink: 0;
`

const FullAbsolute = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Icon = styled.img`
	padding: calc(${props => props.size} / 5);
`

const IconWithProgress = ({
	iconUrl = defaultIcon,
	size,
	thickness = 3,
	midValue,
	value,
	color,

	...props
}) => {
	return (
		<Container size={size} {...props}>
			<FullAbsolute>
				<ProgressCircle
					size={size}
					thickness={thickness}
					midValue={midValue}
					value={value}
				/>
				<Icon src={iconUrl} size={size} />
			</FullAbsolute>
		</Container>
	)
}

export default IconWithProgress
