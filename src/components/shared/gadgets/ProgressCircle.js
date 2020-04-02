import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress'

const Load = styled.div`
	position: absolute;
	z-index: 99;
`
const Mid = styled.div`
	position: absolute;
	z-index: 98;
`
const Back = styled.div`
	position: absolute;
	z-index: 97;
`

const ProgressCircle = ({ size, value, midValue }) => {
	const themeContext = useContext(ThemeContext)
	return (
		<>
			<Back>
				<CircularProgress
					variant="static"
					thickness={5}
					style={{ color: themeContext.offFont }}
					size={size}
					value={100}
				/>
			</Back>

			<Mid>
				<CircularProgress
					variant="static"
					thickness={5}
					style={{ color: themeContext.accentVariant }}
					size={size}
					value={midValue}
				/>
			</Mid>

			<Load>
				<CircularProgress
					variant="static"
					thickness={5}
					style={{ color: themeContext.accent }}
					size={size}
					value={value}
				/>
			</Load>
		</>
	)
}

export default ProgressCircle
