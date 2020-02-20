import React, { useEffect } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { scroller } from 'react-scroll'
import { connect } from 'react-redux'

import CentralStyles from './SelectState/CentralStyles'

import RightArrow from '@material-ui/icons/KeyboardArrowRightRounded'
import Flag from '@material-ui/icons/EmojiFlagsRounded'

import {
	incrementCurrentCardIndex,
	incrementLastCardUnlockedIndex,
	removeButtonState
} from '../../../../redux/actions/learnData'

export const STATE_CARD = 'STATE_CARD'
export const STATE_CONCEPT = 'STATE_CONCEPT'
export const STATE_CHECKPOINT = 'STATE_CHECKPOINT'
export const STATE_HINT = 'STATE_HINT'

const Container = styled(CentralStyles).attrs(props => ({
	width: props.width || '4em'
}))`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${props => props.width};
	height: ${props => props.width};
	padding: 1em;

	border-radius: 50%;
	cursor: pointer;

	&:hover {
		transform: translateY(-0.3em);
	}
`

const NextButton = ({
	className,
	width,
	currentButtonState,
	isLast,
	currentCardIndex,
	lastCardUnlockedIndex,
	lastHintUnlockedId,
	onIncrementCurrentCardIndex,
	onIncrementLastCardUnlockedIndex,
	onRemoveButtonState
}) => {
	/**
	 * Removes hint state when student changes card
	 *  - If a student changes the card, the scrolling feature
	 *    is no longer applicable to that new page. A future
	 *    feature could be to save the scroll for the current card
	 */
	useEffect(() => {
		onRemoveButtonState(STATE_HINT)
	}, [currentCardIndex])

	/**
	 * Reflect changes to the button state here
	 */
	useEffect(() => {
		// reset
		const targets = '.learn-r-nextbutton, .learn-r-nextarrow'
		anime.remove(targets)
		document.querySelectorAll(targets).forEach(target => {
			target.classList.remove('transition-none')
			target.style.transform = '' // remove transform style
		})

		switch (currentButtonState) {
			case STATE_CHECKPOINT: {
				break
			}

			case STATE_HINT: {
				document
					.querySelectorAll('.learn-r-nextbutton, .learn-r-nextarrow')
					.forEach(target => target.classList.add('transition-none'))

				const options = {
					duration: 500,
					direction: 'alternate',
					loop: true
				}
				// bounce
				anime({
					targets: '.learn-r-nextbutton',
					translateY: '-1em',
					translateZ: 0,
					easing: 'easeOutQuad',
					...options
				})
				// rotate
				anime({
					targets: '.learn-r-nextarrow',
					rotate: '90deg',
					easing: 'easeOutElastic()',
					...options
				})
				// scale
				anime({
					targets: '.learn-r-nextbutton, .learn-r-nextarrow',
					scale: 1.5,
					duration: 1000,
					easing: 'easeOutQuad'
				})

				break
			}

			case STATE_CARD: {
				break
			}

			default:
				break
		}
	}, [currentButtonState])

	const handleClickNext = () => {
		switch (currentButtonState) {
			case STATE_HINT: {
				scroller.scrollTo(`unlocked-hint-${lastHintUnlockedId}`, {
					duration: 500,
					smooth: true,
					containerId: 'content',
					offset: -document.getElementById('content-header').clientHeight + 1
				})
				onRemoveButtonState(STATE_HINT)
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
				console.log("error... we shouldn't be here")
				break
		}
	}

	return (
		<Container
			className={`${className} learn-r-nextbutton`}
			width={width}
			onClick={handleClickNext}
			currentButtonState={currentButtonState}
		>
			<RightArrow
				className="learn-r-nextarrow"
				style={{ fontSize: '1.6em' }}
				htmlColor="#fff"
			/>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			cards,
			indicators: {
				currentCardIndex,
				lastCardUnlockedIndex,
				buttonStateStack,
				lastHintUnlockedId
			}
		}
	} = state

	return {
		isLast: cards && currentCardIndex === cards.length - 1,
		currentButtonState: buttonStateStack.peek(),
		currentCardIndex,
		lastCardUnlockedIndex,
		lastHintUnlockedId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIncrementCurrentCardIndex: () => dispatch(incrementCurrentCardIndex()),
		onIncrementLastCardUnlockedIndex: () =>
			dispatch(incrementLastCardUnlockedIndex()),
		onRemoveButtonState: buttonState => dispatch(removeButtonState(buttonState))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NextButton)
