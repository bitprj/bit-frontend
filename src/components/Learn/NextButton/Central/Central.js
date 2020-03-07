import React, { useEffect } from 'react'
import styled from 'styled-components'
import { scroller } from 'react-scroll'
import { connect } from 'react-redux'

import CentralAnimes from '../SelectState/CentralAnimes'
import CentralContent from '../SelectState/CentralContent'
import CentralStyles from '../SelectState/CentralStyles'

import {
	STATE_CARD,
	STATE_CHECKPOINT,
	STATE_HINT,
	STATE_CONCEPT
} from '../NextButton'

import {
	incrementCurrentCardIndex,
	incrementLastCardUnlockedIndex
} from '../../../../redux/actions/learnData'

const Container = styled(CentralStyles)`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 4em;
	height: 4em;
	padding: 1em;
	border-radius: 50%;
	cursor: pointer;

	&:hover {
		transform: translateY(-0.3em);
	}
`

export const CentralTemplate = ({ className, currentButtonState, onClick }) => (
	<Container
		className={`transition-medium ${className || ''}`}
		onClick={onClick}
		currentButtonState={currentButtonState}
	>
		<CentralContent
			className="learn-r-nextarrow"
			currentButtonState={currentButtonState}
		/>
	</Container>
)

const Central = ({
	setOpenConcepts,
	setOpenCheckpoint,

	currentButtonState,
	isLast,
	currentCardIndex,
	lastCardUnlockedIndex,
	lastHintUnlockedId,
	onIncrementCurrentCardIndex,
	onIncrementLastCardUnlockedIndex,
	removeAndBroadcastButtonState
}) => {
	/**
	 * Determine if STATE_HINT is necessary using IntersectionObserver
	 * and detecting if hint is in viewpoint
	 */
	useEffect(() => {
		if (lastHintUnlockedId) {
			const handleIntersect = entries => {
				if (entries[0].isIntersecting) removeAndBroadcastButtonState(STATE_HINT)
			}
			let observer = new IntersectionObserver(handleIntersect, {
				root: document.getElementById('learn-content'),
				rootMargin: '-10% 0px 0px 0px',
				threshold: 1
			})
			let target = document.getElementsByName(
				`unlocked-hint-${lastHintUnlockedId}`
			)[0]
			observer.observe(target)
			return () => {
				observer.unobserve(target)
			}
		}
	}, [lastHintUnlockedId])
	/**
	 * Reflect animation changes based on the button state here
	 */
	useEffect(() => {
		CentralAnimes(currentButtonState)
	}, [currentButtonState])

	/**
	 * Take care of actions for currentButtonState
	 */
	const handleClickNext = () => {
		switch (currentButtonState) {
			case STATE_HINT: {
				scroller.scrollTo(`unlocked-hint-${lastHintUnlockedId}`, {
					duration: 500,
					smooth: true,
					containerId: 'learn-content',
					offset:
						-document.getElementById('learn-content-header').clientHeight + 1
				})
				removeAndBroadcastButtonState(STATE_HINT)
				break
			}
			case STATE_CHECKPOINT: {
				setOpenCheckpoint(true)
				break
			}
			case STATE_CONCEPT: {
				setOpenConcepts(true)
				break
			}
			case STATE_CARD: {
				if (!isLast) {
					onIncrementCurrentCardIndex()
					if (currentCardIndex === lastCardUnlockedIndex) {
						onIncrementLastCardUnlockedIndex()
					}
				}
				break
			}

			default:
				if (currentButtonState !== undefined)
					console.log('[Central] error... missing state check?')
				break
		}
	}

	return (
		<CentralTemplate
			className={`learn-r-nextbutton`}
			onClick={handleClickNext}
			currentButtonState={currentButtonState}
		/>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			cards,
			indicators: {
				currentCardIndex,
				lastCardUnlockedIndex,
				currentButtonState,
				lastHintUnlockedId
			}
		}
	} = state

	return {
		isLast: cards && currentCardIndex === cards.length - 1,
		currentButtonState,
		currentCardIndex,
		lastCardUnlockedIndex,
		lastHintUnlockedId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIncrementCurrentCardIndex: () => dispatch(incrementCurrentCardIndex()),
		onIncrementLastCardUnlockedIndex: () =>
			dispatch(incrementLastCardUnlockedIndex())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Central)
