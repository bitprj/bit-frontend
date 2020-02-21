import React from 'react'
import styled from 'styled-components'
import RightArrow from '@material-ui/icons/KeyboardArrowRightRounded'
import Flag from '@material-ui/icons/EmojiFlagsRounded'

import {
	STATE_CARD,
	STATE_CONCEPT,
	STATE_CHECKPOINT,
	STATE_HINT
} from '../../NextButton'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
`

export default function CentralContent({ currentButtonState }) {
	const centralContent = () => {
		switch (currentButtonState) {
			case STATE_CHECKPOINT:
				return <Flag style={{ marginBottom: '0.1em' }} />
			case STATE_HINT:
			case STATE_CARD:
				return <RightArrow />
			default:
				if (currentButtonState !== undefined)
					console.log('[CentralContent] error... missing state check?')
				return null
		}
	}

	return <Container className="learn-r-nextarrow">{centralContent()}</Container>
}
