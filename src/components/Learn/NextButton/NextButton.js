import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { SafeStack } from '../../../utils/DataStructures'

import Central from './Central/Central'
import Checkpoint from './Peripherals/Checkpoint/Checkpoint'
import Concept from './Peripherals/Concept/Concept'

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
	concepts,
	checkpoint,
	currentCardIndex,
	lastCardUnlockedIndex,
	buttonStateScheduleQueue,
	onBroadcastButtonState,
	onResetButtonStateSchedule
}) => {
	const buttonStateStack = useRef(new SafeStack([STATE_CARD]))
	const buttonFinishedTask = useRef([])

	const [openConcept, setOpenConcept] = useState(false)
	const [openCheckpoint, setOpenCheckpoint] = useState(false)

	const removeAndBroadcastButtonState = buttonState => {
		buttonStateStack.current.pop(buttonState)
		buttonFinishedTask.current.push(buttonState)
		onBroadcastButtonState(buttonStateStack.current.peek())
	}

	const resetAndBroadcastButtonState = () => {
		buttonStateStack.current = new SafeStack([STATE_CARD])
		onBroadcastButtonState(buttonStateStack.current.peek())
	}

	useEffect(() => {
		onBroadcastButtonState(buttonStateStack.current.peek())
	}, [])

	useEffect(() => {
		// if (checkpoint) {
		// buttonFinishedTask.current.push(STATE_CHECKPOINT)
		// }
		if (concepts && concepts.length) {
			buttonFinishedTask.current.push(STATE_CONCEPT)
		}
		return () => {
			resetAndBroadcastButtonState()
			buttonFinishedTask.current = []
		}
	}, [currentCardIndex])

	useEffect(() => {
		console.log(buttonFinishedTask.current)
	}, [currentCardIndex])

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
				if (i === 10) console.log('[NextButton] Houston, we may have a problem')
			}
			const nextButtonState = buttonStateStack.current.peek()
			onBroadcastButtonState(nextButtonState)
			onResetButtonStateSchedule(nextButtonState)

			if (nextButtonState === STATE_CONCEPT) {
				setOpenConcept(true)
			}
		}
	}, [buttonStateScheduleQueue])

	return (
		<Container className={`${className} transition-medium`}>
			<Central
				removeAndBroadcastButtonState={removeAndBroadcastButtonState}
				setOpenConcept={setOpenConcept}
				setOpenCheckpoint={setOpenCheckpoint}
			/>
			<Concept
				render={false}
				open={openConcept}
				setOpen={setOpenConcept}
				removeAndBroadcastButtonState={removeAndBroadcastButtonState}
			/>
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
			indicators: {
				lastCardUnlockedIndex,
				currentCardIndex,
				buttonStateScheduleQueue
			},
			cards
		}
	} = state

	const card = cards && cards[currentCardIndex]

	return {
		currentCardIndex,
		lastCardUnlockedIndex,
		buttonStateScheduleQueue,
		concepts: get(card, 'concepts'),
		checkpoint: get(card, 'checkpoint')
	}
}

const mapDispatchToProps = dispatch => ({
	onBroadcastButtonState: buttonState =>
		dispatch(broadcastButtonState(buttonState)),
	onResetButtonStateSchedule: buttonState =>
		dispatch(resetButtonStateSchedule(buttonState))
})

export default connect(mapStateToProps, mapDispatchToProps)(NextButtonManager)
