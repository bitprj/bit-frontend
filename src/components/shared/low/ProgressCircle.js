import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress'

const Container = styled.div`
	width: ${props => props.size};
	height: ${props => props.size};
`

const Back = styled.div`
	position: absolute;
	z-index: 97;
`

const Mid = styled.div`
	position: absolute;
	z-index: 98;
`

const Front = styled.div`
	position: absolute;
	z-index: 99;
`

const ProgressCircle = ({
	className,
	size = '1em',
	value = 32,
	midValue = 69,
	thickness = 5,
	...props
}) => {
	const themeContext = useContext(ThemeContext)
	const parsedThickness = thickness === '100%' ? 22 : thickness

	return (
		<Container className={className || ''} size={size} {...props}>
			<Back>
				<CircularProgress
					variant="static"
					thickness={parsedThickness}
					style={{ color: themeContext.offFont }}
					size={size}
					value={100}
				/>
			</Back>

			<Mid>
				<CircularProgress
					variant="static"
					thickness={parsedThickness}
					style={{ color: themeContext.accentVariant }}
					size={size}
					value={midValue}
				/>
			</Mid>

			<Front>
				<CircularProgress
					variant="static"
					thickness={parsedThickness}
					style={{ color: themeContext.accent }}
					size={size}
					value={value}
				/>
			</Front>
		</Container>
	)
}

export default ProgressCircle
