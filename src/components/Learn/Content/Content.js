import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { useConditionalDidUpdateEffect } from '../../../utils/customHooks'

import HintSection from '../Hint/HintSection'
import NextButton from './NextButton'
import HeaderShadow from '../../shared/utils/HeaderShadow'
import ImgAndContent from '../../shared/gadgets/ImgAndContent'
import ParsedContent from '../../shared/ParsedContent'

import { initUnlockCard } from '../../../redux/actions/learnData'

import {
	incrementCurrentCardIndex,
	incrementLastCardUnlockedIndex
} from '../../../redux/actions/learnData'

const Container = styled.div`
	flex: 2;
	position: relative;
	background-color: #fff;
	overflow-y: auto;
`

const HeaderWrapper = styled.div`
	position: sticky;
	top: 0;
	z-index: 99;
`

const Header = styled(ImgAndContent)`
	margin: 0;
	padding: 2em 1em 1.5em;
	padding-left: 3em;
	cursor: auto;
	background-color: #fff;

	&.minimized {
		padding-top: 1em;
		padding-bottom: 1em;
	}
`

const ContentArea = styled.div`
	padding: 0.2em 2em 3em;
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
	activityId,
	id,
	contentfulId,
	order,
	hints,
	content,
	cardName,
	isLast,
	currentCardIndex,
	lastCardUnlockedIndex,
	onInitUnlockCard,
	onIncrementCurrentCardIndex,
	onIncrementLastCardUnlockedIndex
}) => {
	const containerRef = useRef(null)
	const headerRef = useRef(null)

	useEffect(() => {
		// containerRef.current.addEventListener('scroll', handleHeaderSize)
	}, [])

	useEffect(() => {
		if (containerRef.current.scrollTop !== 0)
			containerRef.current.scrollTo(0, 0) // TODO keep track of all current scroll for each page
	}, [currentCardIndex])

	useConditionalDidUpdateEffect(
		activityId,
		() => onInitUnlockCard(activityId, id, contentfulId),
		[lastCardUnlockedIndex]
	)

	const handleClickNext = () => {
		if (!isLast) {
			onIncrementCurrentCardIndex()
			if (currentCardIndex === lastCardUnlockedIndex) {
				onIncrementLastCardUnlockedIndex()
			}
		}
	}

	let prevScrollTop = 0
	const handleHeaderSize = () => {
		let scrollTop = containerRef.current.scrollTop
		console.log(scrollTop, prevScrollTop)

		const isMinimized = headerRef.current.classList.contains('minimized')
		if (!isMinimized && scrollTop > prevScrollTop) {
			headerRef.current.classList.add('minimized')
			prevScrollTop = scrollTop + 21.1
		} else if (isMinimized && scrollTop <= prevScrollTop) {
			headerRef.current.classList.remove('minimized')
			prevScrollTop = scrollTop - 21.1
		} else {
			prevScrollTop = scrollTop
		}
	}

	return (
		<Container ref={containerRef}>
			<HeaderWrapper>
				<Header
					innerRef={headerRef}
					className="minimized transition-medium"
					imgURL={require('../../../assets/icons/document.svg')}
					imgWidthEms="4"
					gap="2em"
					noShadow
					reverse
					contentSize={'150%'}
					title={cardName}
				>
					<code style={{ fontSize: '50%' }}>INTRODUCTION TO GITHUB</code>
				</Header>
				<HeaderShadow containerRef={containerRef} />
			</HeaderWrapper>

			<ContentArea>
				<ParsedContent id="learn-content" document={content} />
			</ContentArea>

			<HintSection />

			<StyledNextButton
				className="transition-medium"
				clicked={handleClickNext}
			/>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			id: activityId,
			cards,
			currentCardIndex,
			lastCardUnlockedIndex
		}
	} = state

	const card = cards && cards[currentCardIndex]
	return {
		activityId,
		id: get(card, 'id'),
		contentfulId: get(card, 'contentfulId'),
		order: get(card, 'order'),
		cardName: get(card, 'name'),
		content: get(card, 'content'),
		hints: get(card, 'hints'),
		isLast: cards && currentCardIndex === cards.length - 1,
		currentCardIndex,
		lastCardUnlockedIndex
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitUnlockCard: (activityId, id, contentfulId) =>
			dispatch(initUnlockCard(activityId, id, contentfulId)),
		onIncrementCurrentCardIndex: () => dispatch(incrementCurrentCardIndex()),
		onIncrementLastCardUnlockedIndex: () =>
			dispatch(incrementLastCardUnlockedIndex())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
