import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import RightArrow from '@material-ui/icons/KeyboardArrowRightRounded'

import {
	incrementCurrentCardIndex,
	incrementLastCardUnlockedIndex,
	incrementCurrentHintStep
} from '../../../redux/actions/learnData'

export const STATE_CARD = 'STATE_CARD'
export const STATE_HINT = 'STATE_HINT'

const Container = styled.div.attrs(props => ({
	width: props.width || '4em'
}))`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${props => props.width};
	height: ${props => props.width};
	padding: 1em;

	border-radius: 50%;
	background-color: ${props =>
		props.currentState === STATE_HINT ? '#000' : props.theme.accent};
	box-shadow: 0 4px 14px 0 ${props => props.theme.accent}77;
	cursor: pointer;
`

const NextButton = ({
	className,
	width,
	currentState,
	isLast,
	currentCardIndex,
	lastCardUnlockedIndex,
	onIncrementCurrentCardIndex,
	onIncrementLastCardUnlockedIndex,
	onIncrementCurrentHintStep
}) => {
	useEffect(() => {
		console.log(currentState)
	}, [currentState])

	const handleClickNext = () => {
		switch (currentState) {
			case STATE_CARD: {
				if (!isLast) {
					onIncrementCurrentCardIndex()
					if (currentCardIndex === lastCardUnlockedIndex) {
						onIncrementLastCardUnlockedIndex()
					}
				}
				break
			}

			case STATE_HINT: {
				onIncrementCurrentHintStep()
				break
			}

			default:
				console.log('error...')
				break
		}
	}

	return (
		<Container
			className={className}
			width={width}
			onClick={handleClickNext}
			currentState={currentState}
		>
			<RightArrow style={{ fontSize: '1.6em' }} htmlColor="#fff" />
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
				currentButtonState
			}
		}
	} = state
	return {
		isLast: cards && currentCardIndex === cards.length - 1,
		currentState: currentButtonState,
		currentCardIndex,
		lastCardUnlockedIndex
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIncrementCurrentCardIndex: () => dispatch(incrementCurrentCardIndex()),
		onIncrementLastCardUnlockedIndex: () =>
			dispatch(incrementLastCardUnlockedIndex()),
		onIncrementCurrentHintStep: () => dispatch(incrementCurrentHintStep())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NextButton)
