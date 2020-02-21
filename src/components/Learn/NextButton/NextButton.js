import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { SafeStack } from '../../../utils/DataStructures'

import Central from './Central/Central'
import Checkpoint from '../Checkpoint/Checkpoint'
import Concept from '../Concept/Concept'

import {
	broadcastButtonState,
	resetButtonStateSchedule
} from '../../../redux/actions/learnData'

export const STATE_HINT = 'STATE_HINT'
export const STATE_CHECKPOINT = 'STATE_CHECKPOINT'
export const STATE_CONCEPT = 'STATE_CONCEPT'
export const STATE_CARD = 'STATE_CARD'

const Container = styled.div`
	position: fixed;
	right: 5.2em;
	bottom: 4em;
	opacity: 0.3;

	&:hover {
		transform: translateY(-0.3em);
	}
`

const NextButtonManager = ({
	className,
	buttonStateScheduleQueue,
	onBroadcastButtonState,
	onResetButtonStateSchedule
}) => {
	const buttonStateStack = useRef(new SafeStack([STATE_CARD, STATE_CHECKPOINT]))
	const buttonFinishedTask = useRef([])

	const [openConcept, setOpenConcept] = useState(false)
	const [openCheckpoint, setOpenCheckpoint] = useState(false)

	const onRemoveAndBroadcastButtonState = buttonState => {
		buttonStateStack.current.pop(buttonState)
		onBroadcastButtonState(buttonStateStack.current.peek())
	}

	/**
	 * Update currentButtonState with all states from the schedule queue
	 */
	useEffect(() => {
		if (!buttonStateScheduleQueue.isEmpty()) {
			let i = 0 // infinite recursion? uwu
			while (i++ < 10 && !buttonStateScheduleQueue.isEmpty()) {
				const scheduledButtonState = buttonStateScheduleQueue.front()
				buttonStateStack.current.push(scheduledButtonState)
				buttonStateScheduleQueue.dequeue(scheduledButtonState)
				if (i === 9) console.log('[NextButton] Houston, we may have a problem')
			}
			const nextButtonState = buttonStateStack.current.peek()
			onBroadcastButtonState(nextButtonState)
			onResetButtonStateSchedule(nextButtonState)
		}
	}, [buttonStateScheduleQueue])

	return (
		<Container className={`${className} transition-medium`}>
			<Central
				onRemoveAndBroadcastButtonState={onRemoveAndBroadcastButtonState}
				setOpenConcept={setOpenConcept}
				setOpenCheckpoint={setOpenCheckpoint}
			/>
			<Concept render={false} open={openConcept} setOpen={setOpenConcept} />
			<Checkpoint
				render={false}
				open={openCheckpoint}
				setOpen={setOpenCheckpoint}
			/>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			indicators: { buttonStateStack, buttonStateScheduleQueue }
		}
	} = state

	return {
		buttonStateStack,
		buttonStateScheduleQueue
	}
}

const mapDispatchToProps = dispatch => ({
	onBroadcastButtonState: buttonState =>
		dispatch(broadcastButtonState(buttonState)),
	onResetButtonStateSchedule: buttonState =>
		dispatch(resetButtonStateSchedule(buttonState))
})

export default connect(mapStateToProps, mapDispatchToProps)(NextButtonManager)
