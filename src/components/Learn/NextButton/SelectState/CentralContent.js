import React from 'react'
import styled from 'styled-components'
import RightArrow from '@material-ui/icons/KeyboardArrowRightRounded'
import Clipboard from '@material-ui/icons/AssignmentRounded'
import Flag from '@material-ui/icons/EmojiFlagsRounded'
import Finish from '@material-ui/icons/DoneRounded'

import {
	STATE_NEXT,
	STATE_FINISH,
	STATE_CONCEPT,
	STATE_CHECKPOINT,
	STATE_HINT
} from '../NextButton'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 200%;
`

export default function CentralContent({ className, currentButtonState }) {
	const centralContent = () => {
		switch (currentButtonState) {
			case STATE_CHECKPOINT:
				return <Flag fontSize="inherit" style={{ marginBottom: '0.1em' }} />

			case STATE_CONCEPT:
				return <Clipboard fontSize="inherit" />

			case STATE_HINT:
			case STATE_NEXT:
				return <RightArrow fontSize="inherit" />

			case STATE_FINISH:
				return <Finish fontSize="inherit" />

			default:
				if (currentButtonState !== undefined)
					console.log('[CentralContent] error... missing state check?')
				return null
		}
	}

	return <Container className={className}>{centralContent()}</Container>
}
