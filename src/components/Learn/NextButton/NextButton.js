import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'
import { SafeStack } from '../../../utils/DataStructures'

import Central from './Central/Central'
import Checkpoint from './Checkpoint/Checkpoint'
import Concept from './Concept/Concept'

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
	checkpointFinished,
	currentCardIndex,
	buttonStateScheduleQueue,
	onBroadcastButtonState,
	onResetButtonStateSchedule
}) => {
	console.log('rerender start!')
	useEffect(() => {
		console.log('currentCardIndex changed!')
	}, [currentCardIndex])
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
	const [checkpointView, setCheckpointView] = useState(['HOME'])
	const [submissionIndex, setSubmissionIndex] = useState(0)

	useEffect(() => {
		if (buttonStateStack.current.peek() === STATE_CARD)
			onBroadcastButtonState(STATE_CARD)
	}, [])

	useEffect(() => {
		return () => {
			console.log('cleaning up...')
			resetAndBroadcastButtonState()
			if (finishedButtonStates.includes(STATE_CHECKPOINT)) {
				removeFromFinishedButtonStates(STATE_CHECKPOINT)
				console.log('removing checkpoint...', finishedButtonStates)
			}
			if (finishedButtonStates.includes(STATE_CONCEPT)) {
				removeFromFinishedButtonStates(STATE_CONCEPT)
				console.log('removing concept...', finishedButtonStates)
			}
		}
	}, [currentCardIndex])

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
			if (!finishedButtonStates.includes(nextButtonState))
				onBroadcastButtonState(nextButtonState)
			onResetButtonStateSchedule()
		}
	}, [buttonStateScheduleQueue])

	useEffect(() => {
		if (checkpoint) {
			if (checkpointFinished) {
				console.log('adding checkpoint...', finishedButtonStates)
				removeAndBroadcastButtonState(STATE_CHECKPOINT)
			} else {
				addAndBroadcastButtonState(STATE_CHECKPOINT) // on revisit
			}
		}
		return () => {
			// if (finishedButtonStates.includes(STATE_CHECKPOINT)) {
			// 	removeFromFinishedButtonStates(STATE_CHECKPOINT)
			// }
		}
	}, [currentCardIndex, checkpointFinished])

	const conceptsFinished = !buttonStateStack.current.has(STATE_CONCEPT)
	useEffect(() => {
		if (concepts && concepts.length) {
			if (conceptsFinished) {
				console.log('adding concepts...', finishedButtonStates)
				pushToFinishedButtonStates(STATE_CONCEPT)
			}
		} else {
		}
		return () => {
			// if (finishedButtonStates.includes(STATE_CONCEPT)) {
			// 	removeFromFinishedButtonStates(STATE_CONCEPT)
			// }
		}
	}, [currentCardIndex, conceptsFinished])

	useEffect(() => {
		if (buttonStateStack.current.peek() === STATE_CONCEPT) {
			setOpenConcepts(true)
		}
	}, [buttonStateStack.current])

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
	const removeFromFinishedButtonStates = buttonState => {
		setFinishedButtonStates(
			finishedButtonStates.filter(bs => bs !== buttonState)
		)
	}

	return (
		<Container className={`${className || ''} transition-medium`}>
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
				view={checkpointView}
				setView={setCheckpointView}
				submissionIndex={submissionIndex}
				setSubmissionIndex={setSubmissionIndex}
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
			progress: { checkpointsProgress },
			cards
		}
	} = state

	const card = cards && cards[currentCardIndex]
	const checkpoint = get(card, 'checkpoint')

	/**
	 * Checkpoint Finished calculation
	 */
	let checkpointFinished = false
	const checkpointId = get(checkpoint, 'id')
	const recentCheckpoint =
		checkpointsProgress && get(checkpointsProgress[checkpointId], '[0]', {})

	const checkpointType = get(checkpoint, 'checkpointType')
	if (checkpointType === 'Autograder') {
		const { numPass, numFail } = recentCheckpoint
		checkpointFinished = numPass > numFail
	} else {
		if (!isEmpty(recentCheckpoint)) {
			checkpointFinished = true
		}
	}

	return {
		currentCardIndex,
		buttonStateScheduleQueue,
		concepts: get(card, 'concepts'),
		checkpoint,
		checkpointFinished
	}
}

const mapDispatchToProps = dispatch => ({
	onBroadcastButtonState: buttonState =>
		dispatch(broadcastButtonState(buttonState)),
	onResetButtonStateSchedule: buttonState =>
		dispatch(resetButtonStateSchedule(buttonState))
})

export default connect(mapStateToProps, mapDispatchToProps)(NextButtonManager)
