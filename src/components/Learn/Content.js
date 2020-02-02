import React, { useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import HintSection from './HintSection'
import NextButton from './NextButton'

import HeaderShadow from '../shared/utils/HeaderShadow'
import ImgAndContent from '../shared/gadgets/ImgAndContent'
import ParsedContent from '../shared/ParsedContent'

import {
	incrementCurrentCardIndex,
	incrementLastCardCompletedIndex
} from '../../redux/actions/learnData'

const Container = styled.div`
	flex: 2;
	position: relative;
	background-color: #fff;
	overflow-y: auto;
`

const HeaderWrapper = styled.div`
	position: sticky;
	top: 0;
`

const Header = styled(ImgAndContent)`
	margin: 0;
	margin-left: 1em;
	cursor: auto;
	background-color: #fff;
`

const ContentArea = styled.div`
	padding: 1em 2em 3em;
	font-size: 84%;
`

const StyledNextButton = styled(NextButton)`
	position: fixed;
	right: 4em;
	bottom: 3em;

	&:hover {
		transform: translateY(-0.3em);
	}
`

const Content = ({
	name,
	content,
	hints,
	cardsLength,
	currentCardIndex,
	lastCardCompletedIndex,
	onIncrementCurrentCardIndex,
	onIncrementLastCardCompletedIndex
}) => {
	const containerRef = useRef(null)

	const handleClickNext = () => {
		if (currentCardIndex < cardsLength - 1) {
			onIncrementCurrentCardIndex()
			if (currentCardIndex === lastCardCompletedIndex)
				onIncrementLastCardCompletedIndex()
		}
	}

	return (
		<Container ref={containerRef}>
			<HeaderWrapper>
				<Header
					imgURL="../../assets/icons/logo.png"
					imgWidthEms="5"
					gap="1em"
					noShadow
					reverse
					title={name}
				>
					<code>INTRODUCTION TO GITHUB</code>
				</Header>
				<HeaderShadow containerRef={containerRef} />
			</HeaderWrapper>

			<ContentArea>
				<ParsedContent id="learn-content" document={content} />
			</ContentArea>

			<HintSection hints={hints} />

			<StyledNextButton
				className="transition-medium"
				clicked={handleClickNext}
			/>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: { name, cards, currentCardIndex, lastCardCompletedIndex }
	} = state

	return {
		name,
		content: cards && cards[currentCardIndex].fields.content,
		hints: cards && cards[currentCardIndex].fields.hints,
		cardsLength: cards && cards.length,
		currentCardIndex,
		lastCardCompletedIndex
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIncrementCurrentCardIndex: () => dispatch(incrementCurrentCardIndex()),
		onIncrementLastCardCompletedIndex: () =>
			dispatch(incrementLastCardCompletedIndex())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
