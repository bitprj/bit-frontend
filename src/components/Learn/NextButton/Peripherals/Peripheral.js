import React from 'react'
import styled from 'styled-components'

import { CentralTemplate } from '../Central/Central'

const Container = styled(CentralTemplate)`
	position: absolute;
	top: ${props => props.top};
	left: ${props => props.left};
	font-size: 50%;
	z-index: 1;
`

const Peripheral = ({ top = 0, left = 0, currentButtonState, onClick }) => {
	return (
		<Container
			top={top}
			left={left}
			onClick={onClick}
			currentButtonState={currentButtonState}
		/>
	)
}

export default Peripheral
