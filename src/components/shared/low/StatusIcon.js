import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from 'styled-components'

import CheckIcon from '@material-ui/icons/CheckRounded'
import ThreeDotsIcon from '@material-ui/icons/MoreHoriz'
import LockIcon from '@material-ui/icons/LockRounded'

import MuiIconFormatter from '../high/MuiIconFormatter'

const selectColor = props => {
	switch (props.type) {
		case 'complete':
			return props.theme.pastel.green
		case 'incomplete':
			return props.theme.pastel.yellow
		case 'locked':
			return props.theme.pastel.red

		default:
			return null
	}
}

const Container = styled(MuiIconFormatter)`
	background-color: ${props => selectColor(props)};
`

/**
 * Helper Class to choose Status Icon appropriately
 * @param {status} props
 */
const StatusIcon = ({ type, width = '2.25em' }) => {
	const themeContext = useContext(ThemeContext)

	const selectIcon = () => {
		switch (type) {
			case 'complete':
				return <CheckIcon fontSize={'inherit'} />
			case 'incomplete':
				return <ThreeDotsIcon fontSize={'inherit'} />
			case 'locked':
				return <LockIcon fontSize={'inherit'} />

			default:
				return null
		}
	}

	return (
		<Container circle width={width} type={type}>
			{selectIcon()}
		</Container>
	)
}

export default StatusIcon
