import React from 'react'
import styled from 'styled-components'

import ProgressCircle from '../low/ProgressCircle'

const defaultIcon = require('../../../assets/icons/cards.svg')

const Container = styled.div`
	width: ${props => props.size};
	height: ${props => props.size};
	position: relative;
	border-radius: 50%;
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
	padding: 0.35em;
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
			</FullAbsolute>
			<Icon src={iconUrl} size={size} />
		</Container>
	)
}

export default IconWithProgress
