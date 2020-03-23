import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'
import axios from 'axios'

import ContentHeader from './ContentHeader'
import UnlockedHintSection from '../Hint/UnlockedHintSection'
import LockedHintSection from '../Hint/LockedHintSection'
import NextButton from '../NextButton/NextButton'
import MarkdownContent from '../../shared/MarkdownContent'
import ReactMarkdown from 'react-markdown'

import withApiCacheData, { WARD_CARD } from '../../HOC/WithApiCacheData'

import { STATE_CHECKPOINT, STATE_CONCEPT } from '../NextButton/NextButton'

import { fadeIn } from '../../../styles/GlobalAnime'

import {
	initUnlockCard,
	scheduleButtonState
} from '../../../redux/actions/learnData'
import { incrementGemsBy } from '../../../redux/actions/studentData'

const Container = styled.div`
	position: relative;
	flex: 0.75;
	background-color: #fff;
	overflow-y: auto;
`

const ContentArea = styled.div`
	padding: 8em 2em 3em;
	font-size: 84%;
	opacity: 0;

	@media screen and (orientation: landscape) {
		padding-left: 3.5em;
		padding-right: 3.5em;
	}
`

const Content = ({
	isReady,
	activityId,
	id,

	currentCardIndex,
	lastCardUnlockedIndex,

	card,

	// contentfulId,
	// content,
	// concepts,
	// checkpoint,
	// gems,
	// name,

	onInitUnlockCard,
	onScheduleButtonState,
	onIncrementGemsBy
}) => {
	const containerRef = useRef(null)
	const headerRef = useRef(null)

	const currentScrollTop = useRef(0)
	const cardsScrollTop = useRef([])

	useEffect(() => {
		containerRef.current.addEventListener('scroll', handleScroll)
		return () =>
			containerRef.current.removeEventListener('scroll', handleScroll)
	}, [])

	/**
	 * Keep track of scroll in scrollTopRef
	 */
	const handleScroll = () => {
		const scrollTop = containerRef.current.scrollTop
		currentScrollTop.current = scrollTop
		handleHeaderSize(scrollTop)
	}

	/**
	 * Control header size when scrolling over content
	 */
	const handleHeaderSize = scrollTop => {
		const header = headerRef.current
		if (scrollTop === 0) {
			header && headerRef.current.classList.remove('content-minimized')
		} else {
			header && headerRef.current.classList.add('content-minimized')
		}
	}

	/**
	 * scroll to top each card change so that unlocking a new
	 * card won't leave you at the bottom of the page
	 */
	useEffect(() => {
		if (currentCardIndex) {
			setTimeout(() => {
				containerRef.current &&
					containerRef.current.scrollTo(
						0,
						cardsScrollTop.current[currentCardIndex]
					)
			}, 0) // needed to scroll
			return () => {
				cardsScrollTop.current[currentCardIndex] = currentScrollTop.current
			}
		}
	}, [currentCardIndex])

	/**
	 * animation loading
	 */
	useEffect(() => {
		fadeIn('.learn-i-nextbutton', { opacity: [0.3, 1] })
		fadeIn('.learn-i-contentheader, .learn-i-contentarea')
	}, [isReady])

	/**
	 * determine if card was just unlocked
	 *  - without this there's no way of telling if render
	 *    occurred because card was unlocked
	 */
	const isCardUnlocked = useIsCardUnlocked(lastCardUnlockedIndex)

	/**
	 * unlock card whenever this card is just unlocked
	 * can't just use lastCardUnlocked because init will trigger
	 */
	useEffect(() => {
		if (currentCardIndex === 0 || (isCardUnlocked && activityId)) {
			// if (isCardUnlocked) onInitUnlockCard(activityId, id, contentfulId)

			if (card?.checkpoint) {
				onScheduleButtonState(STATE_CHECKPOINT)
			}

			if (card?.concepts?.length) {
				onScheduleButtonState(STATE_CONCEPT)
			}
		}
	}, [lastCardUnlockedIndex])

	/**
	 * add gems to student's total
	 * - Gem only gets changed during initialization of each card
	 * - ref used to detect if new card was changed.
	 */
	const lastCardUnlockedIndexRef = useRef(undefined)
	useEffect(() => {
		if (isCardUnlocked && card?.gems) {
			if (lastCardUnlockedIndex !== lastCardUnlockedIndexRef.current) {
				onIncrementGemsBy(card?.gems)
				lastCardUnlockedIndexRef.current = lastCardUnlockedIndex
			}
		}
	}, [card?.gems])

	return (
		<Container
			id="learn-content"
			ref={containerRef}
			className="low-profile-scrollbar fat"
		>
			{card?.githubRawData && (
				<>
					<ContentHeader
						ref={headerRef}
						containerRef={containerRef}
						name={card?.name}
					/>

					<ContentArea className="learn-i-contentarea">
						<MarkdownContent source={card?.content} />

						<UnlockedHintSection />
						<LockedHintSection />
					</ContentArea>

					<NextButton className="learn-i-nextbutton" />
				</>
			)}
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		cache: { selectedActivityId, cachedActivities, cachedCards },
		learnData: {
			indicators: { currentCardIndex, lastCardUnlockedIndex }
		}
	} = state

	const cardId =
		cachedActivities[selectedActivityId]?.cards[currentCardIndex]?.id

	const card = cachedCards[cardId]

	return {
		isReady: !!card?.githubRawData,
		activityId: selectedActivityId,
		id: cardId,

		currentCardIndex,
		lastCardUnlockedIndex,
		card,

		contentfulId: card?.contentfulId,
		name: card?.name,
		content: card?.content,
		concepts: card?.concepts,
		checkpoint: card?.checkpoint,
		gems: card?.gems
	}
}

const mapDispatchToProps = dispatch => ({
	onInitUnlockCard: (activityId, id, contentfulId) =>
		dispatch(initUnlockCard(activityId, id, contentfulId)),
	onScheduleButtonState: buttonState =>
		dispatch(scheduleButtonState(buttonState)),
	onIncrementGemsBy: gemAmount => dispatch(incrementGemsBy(gemAmount))
})

const enhancer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withApiCacheData(WARD_CARD)
)

export default enhancer(Content)

export const useIsCardUnlocked = lastCardUnlockedIndex => {
	const isCardUnlocked = useRef()
	useEffect(() => {
		if (
			isCardUnlocked.current === undefined &&
			lastCardUnlockedIndex !== undefined
		) {
			isCardUnlocked.current = false
		} else if (
			isCardUnlocked.current === false &&
			lastCardUnlockedIndex !== undefined
		) {
			isCardUnlocked.current = true
		}
	})
	return isCardUnlocked.current
}
