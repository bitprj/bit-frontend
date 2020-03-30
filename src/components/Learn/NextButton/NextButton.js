import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import Central from './Central/Central'
import Checkpoint from '../Checkpoint/Checkpoint'
import Concept from '../Concept/Concept'

import { SafeStack } from '../../../utils/DataStructures'
import { usePrevious } from '../../../utils/customHooks'
import { useIsCardUnlocked } from '../Content/Content'

import {
	broadcastButtonState,
	resetButtonStateSchedule
} from '../../../redux/actions/learnData'

export const STATE_NEXT = 'STATE_NEXT'
export const STATE_FINISH = 'STATE_FINISH'
export const STATE_CONCEPT = 'STATE_CONCEPT'
export const STATE_CHECKPOINT = 'STATE_CHECKPOINT'
export const STATE_HINT = 'STATE_HINT'

const Container = styled.div`
	position: fixed;
	right: 5.2em;
	bottom: 4em;
	opacity: 0.3; // before animation
`

const NextButtonManager = ({
	className,
	cardsLength,
	hasConcepts,
	hasCheckpoint,
	checkpointFinished,
	currentCardIndex,
	lastCardUnlockedIndex,
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
	const buttonStateStack = useRef(new SafeStack([STATE_NEXT]))
	const [finishedButtonStates, setFinishedButtonStates] = useState([])

	/**
	 * Modals for Concepts and Checkpoint
	 */
	const [openConcepts, setOpenConcepts] = useState(false)

	const [openCheckpoint, setOpenCheckpoint] = useState(false)
	const [checkpointView, setCheckpointView] = useState(['HOME'])
	const [submissionIndex, setSubmissionIndex] = useState(0)

	useEffect(() => {
		if (buttonStateStack.current.peek() === STATE_NEXT)
			onBroadcastButtonState(STATE_NEXT)
	}, [])

	const prevCurrentCardIndex = usePrevious(currentCardIndex)
	useEffect(() => {
		if (
			prevCurrentCardIndex !== undefined &&
			prevCurrentCardIndex !== currentCardIndex
		) {
			removeFromFinishedButtonStates(STATE_CHECKPOINT)
			removeFromFinishedButtonStates(STATE_CONCEPT)
			resetAndBroadcastButtonState()
		}
	})

	useEffect(() => {
		if (currentCardIndex !== undefined)
			if (currentCardIndex === cardsLength - 1) {
				addAndBroadcastButtonState(STATE_FINISH)
			}
	})

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

	/**
	 * This handles when a user clicks the next button
	 * to unlock the next card. should be first.
	 */
	const isCardUnlocked = useIsCardUnlocked(lastCardUnlockedIndex)
	useEffect(() => {
		if (hasCheckpoint && isCardUnlocked) {
			addAndBroadcastButtonState(STATE_CHECKPOINT)
		}

		if (hasConcepts && (lastCardUnlockedIndex === 0 || isCardUnlocked)) {
			addAndBroadcastButtonState(STATE_CONCEPT)
		}
	}, [lastCardUnlockedIndex])

	/**
	 * Properly adding/removing buttonStates to finishedButtonStates
	 * during card changes
	 */
	useEffect(() => {
		if (buttonStateStack.current.peek() === STATE_CONCEPT) {
			setOpenConcepts(true)
		}

		if (hasConcepts) {
			const conceptsFinished = !buttonStateStack.current.has(STATE_CONCEPT)
			if (conceptsFinished) {
				pushToFinishedButtonStates(STATE_CONCEPT)
			}
		}

		if (hasCheckpoint) {
			if (checkpointFinished) {
				removeAndBroadcastButtonState(STATE_CHECKPOINT)
			} else {
				addAndBroadcastButtonState(STATE_CHECKPOINT) // on revisit
			}
		}
	})

	/** Helper Methods */

	const pushToButtonStateStack = buttonState => {
		buttonStateStack.current.push(buttonState)
	}
	const popFromButtonStateStack = buttonState => {
		buttonStateStack.current.pop(buttonState)
	}
	const addAndBroadcastButtonState = buttonState => {
		if (buttonStateStack.current.has(buttonState)) return
		pushToButtonStateStack(buttonState)
		onBroadcastButtonState(buttonStateStack.current.peek())
	}
	const removeAndBroadcastButtonState = buttonState => {
		popFromButtonStateStack(buttonState)
		pushToFinishedButtonStates(buttonState)
		onBroadcastButtonState(buttonStateStack.current.peek())
	}
	const resetAndBroadcastButtonState = () => {
		buttonStateStack.current = new SafeStack([STATE_NEXT])
		onBroadcastButtonState(buttonStateStack.current.peek())
	}

	const pushToFinishedButtonStates = buttonState => {
		if (finishedButtonStates.includes(buttonState)) return
		setFinishedButtonStates(state => state.concat([buttonState]))
	}
	const removeFromFinishedButtonStates = buttonState => {
		if (!finishedButtonStates.includes(buttonState)) return
		setFinishedButtonStates(state => state.filter(bs => bs !== buttonState))
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
		cache: {
			cachedActivities,
			cachedCards,
			cachedCheckpoints,
			cachedCheckpointsProgress
		},
		learnData: {
			selectedActivity: { id: activityId },
			indicators: {
				currentCardIndex,
				lastCardUnlockedIndex,
				buttonStateScheduleQueue
			}
		}
	} = state

	const cards = cachedActivities[activityId]?.cards
	const cardId = cards[currentCardIndex]?.id
	const { checkpoint, concepts } = cachedCards[cardId] ?? {}

	/**
	 * Checkpoint Finished calculation
	 */
	const getCheckpointFinished = () => {
		const checkpointId = checkpoint?.id
		const { checkpointType } = cachedCheckpoints[checkpointId] ?? {}
		if (!checkpointType) return

		const { content } = cachedCheckpointsProgress?.[checkpointId] ?? {}
		if (checkpointType === 'Autograder') {
			const { numPass, numFail } = content?.submissions[0]?.results ?? {}
			return numPass >= numFail
		}
		return !isEmpty(content)
	}
	const checkpointFinished = getCheckpointFinished()

	return {
		cardsLength: cards.length,
		currentCardIndex,
		lastCardUnlockedIndex,
		buttonStateScheduleQueue,
		hasConcepts: !!concepts?.length,
		hasCheckpoint: !!checkpoint,
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
