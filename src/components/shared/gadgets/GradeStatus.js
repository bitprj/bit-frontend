import React from 'react'
import styled from 'styled-components'
import Dot from '@material-ui/icons/FiberManualRecord'

import IconLine from './IconLine'

const selectColor = props => {
	switch (props.status.toUpperCase()) {
		case 'SUCCESS':
			return props.theme.pastel.green
		case 'FATAL':
			return props.theme.pastel.red
		case 'WARNING':
			return props.theme.pastel.yellow
		case 'NONE':
			return '#aaaaaa'
		default:
			return props.theme.accent
	}
}

const Container = styled(IconLine)`
	margin-top: 0;
	font-weight: bold;
	color: ${props => selectColor(props)};
`

const GradeStatus = ({ className, status = '', children }) => {
	return (
		<Container
			className={className}
			icon={<Dot />}
			gap={'0.5em'}
			status={status}
		>
			{children}
		</Container>
	)
}

export default GradeStatus
