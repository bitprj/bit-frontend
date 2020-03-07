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
	opacity: 0.3; // before animation
`

const NextButtonManager = ({
	className,
	concepts,
	checkpoint,
	currentCardIndex,
	buttonStateScheduleQueue,
	onBroadcastButtonState,
	onResetButtonStateSchedule
}) => {
	/**
	 * Stack-based system to determine current button state
	 *
	 *  - Had to be ref because setState was async
	 *    ...essentially, the effect with resetAndBroadcastButtonState
	 *    didn't work because the removal wasn't immediate
	 */
	const buttonStateStack = useRef(new SafeStack([STATE_CARD]))
	const [finishedButtonStates, setFinishedButtonStates] = useState([])

	/**
	 * Modals for Concepts and Checkpoint
	 */
	const [openConcepts, setOpenConcepts] = useState(false)
	const [openCheckpoint, setOpenCheckpoint] = useState(false)

	/**
	 * Update currentButtonState with all states from the schedule queue FIRST
	 */
	useEffect(() => {
		if (!buttonStateScheduleQueue.isEmpty()) {
			let i = 0 // infinite recursion? uwu
			while (i++ < 10 && !buttonStateScheduleQueue.isEmpty()) {
				const scheduledButtonState = buttonStateScheduleQueue.front()
				pushToButtonStateStack(scheduledButtonState)
				buttonStateScheduleQueue.dequeue(scheduledButtonState)
				if (i === 10) console.log('[NextButton] Houston, we may have a problem')
			}
			const nextButtonState = buttonStateStack.current.peek()
			onBroadcastButtonState(nextButtonState)
			onResetButtonStateSchedule()
		}
	}, [buttonStateScheduleQueue])

	useEffect(() => {
		if (checkpoint /* TODO && checkpointFinished */) {
			// pushToFinishedButtonStates(STATE_CHECKPOINT)
			addAndBroadcastButtonState(STATE_CHECKPOINT)
		}

		if (
			concepts &&
			concepts.length &&
			!buttonStateStack.current.has(STATE_CONCEPT)
		) {
			pushToFinishedButtonStates(STATE_CONCEPT)
		}

		if (buttonStateStack.current.peek() === STATE_CARD)
			onBroadcastButtonState(STATE_CARD)

		return () => {
			resetAndBroadcastButtonState()
			setFinishedButtonStates([])
		}
	}, [currentCardIndex])

	useEffect(() => {
		if (buttonStateStack.current.peek() === STATE_CONCEPT) {
			setOpenConcepts(true)
		}
	}, [buttonStateStack.current])

	// useEffect(() => {
	// console.log(finishedButtonStates)
	// }, [finishedButtonStates])

	/** Helper Methods */

	const pushToButtonStateStack = buttonState => {
		buttonStateStack.current.push(buttonState)
	}
	const popFromButtonStateStack = buttonState => {
		buttonStateStack.current.pop(buttonState)
	}
	const addAndBroadcastButtonState = buttonState => {
		pushToButtonStateStack(buttonState)
		onBroadcastButtonState(buttonStateStack.current.peek())
	}
	const removeAndBroadcastButtonState = buttonState => {
		popFromButtonStateStack(buttonState)
		pushToFinishedButtonStates(buttonState)
		onBroadcastButtonState(buttonStateStack.current.peek())
	}
	const resetAndBroadcastButtonState = () => {
		buttonStateStack.current = new SafeStack([STATE_CARD])
		onBroadcastButtonState(buttonStateStack.current.peek())
	}

	const pushToFinishedButtonStates = buttonState => {
		finishedButtonStates.push(buttonState)
		setFinishedButtonStates([...finishedButtonStates])
	}

	return (
		<Container className={`${className} transition-medium`}>
			<Concept
				STATE_CONCEPT={STATE_CONCEPT}
				render={finishedButtonStates.includes(STATE_CONCEPT)}
				open={openConcepts}
				setOpen={setOpenConcepts}
				removeAndBroadcastButtonState={removeAndBroadcastButtonState}
			/>
			<Checkpoint
				STATE_CHECKPOINT={STATE_CHECKPOINT}
				render={finishedButtonStates.includes(STATE_CHECKPOINT)}
				open={openCheckpoint}
				setOpen={setOpenCheckpoint}
			/>
			<Central
				removeAndBroadcastButtonState={removeAndBroadcastButtonState}
				setOpenConcepts={setOpenConcepts}
				setOpenCheckpoint={setOpenCheckpoint}
			/>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			indicators: { currentCardIndex, buttonStateScheduleQueue },
			cards
		}
	} = state

	const card = cards && cards[currentCardIndex]

	return {
		currentCardIndex,
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
