import React from 'react'
import styled from 'styled-components'
import Dot from '@material-ui/icons/FiberManualRecord'

import IconLine from '../low/IconLine'

const selectColor = props => {
	switch (props.status) {
		case 'success':
			return props.theme.pastel.green
		case 'fatal':
			return props.theme.pastel.red
		case 'warning':
			return props.theme.muted.yellow
		case 'none':
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
			status={status.toLowerCase()}
		>
			{children}
		</Container>
	)
}

export default GradeStatus
