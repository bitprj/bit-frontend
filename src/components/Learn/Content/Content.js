import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import UnlockedHintSection from '../Hint/UnlockedHintSection'
import LockedHintSection from '../Hint/LockedHintSection'
import NextButton from '../NextButton/NextButton'
import HeaderShadow from '../../shared/utils/HeaderShadow'
import ImgAndContent from '../../shared/gadgets/ImgAndContent'
import ParsedContent from '../../shared/ParsedContent'

import { fadeIn } from '../../../styles/GlobalAnime'
import { initUnlockCard } from '../../../redux/actions/learnData'
import { incrementGemsBy } from '../../../redux/actions/studentData'

const Container = styled.div`
	flex: 0.75; // 2
	background-color: #fff;
	overflow-y: auto;
`

const HeaderWrapper = styled.div`
	position: fixed;
  top: 0;
  width: 75%
	z-index: 99;
	opacity: 0;
`

const Header = styled(ImgAndContent)`
	margin: 0;
	padding: 2em 1em 1.5em;
	padding-left: 3em;
	cursor: auto;
	background-color: #fff;

	transition: 0.2s ease padding;

	&.content-minimized {
		padding-top: 1em;
		padding-bottom: 1em;
	}
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
	contentfulId,
	content,
	gems,
	name,
	currentCardIndex,
	lastCardUnlockedIndex,
	onInitUnlockCard,
	onIncrementGemsBy
}) => {
	const containerRef = useRef(null)
	const headerRef = useRef(null)

	const isCardUnlocked = useRef(undefined)
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
	 *  - TODO keep track of all current scroll for each page
	 */
	useEffect(() => {
		if (currentCardIndex) {
			setTimeout(() => {
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
	}, [lastCardUnlockedIndex])

	/**
	 * unlock card whenever this card is just unlocked
	 */
	useEffect(() => {
		if (isCardUnlocked.current && activityId) {
			onInitUnlockCard(activityId, id, contentfulId)
		}
	}, [lastCardUnlockedIndex])

	/**
	 * add gems to student's total
	 * - Gem only gets changed during initialization of each card
	 * - ref used to detect if new card was changed.
	 */
	const lastCardUnlockedIndexRef = useRef(undefined)
	useEffect(() => {
		if (isCardUnlocked.current && gems) {
			if (lastCardUnlockedIndex !== lastCardUnlockedIndexRef.current) {
				onIncrementGemsBy(gems)
				lastCardUnlockedIndexRef.current = lastCardUnlockedIndex
			}
		}
	}, [gems])

	return (
		<Container
			id="learn-content"
			ref={containerRef}
			className="low-profile-scrollbar fat"
		>
			{content && (
				<>
					<HeaderWrapper id="content-header" className="learn-i-contentheader">
						<Header
							ref={headerRef}
							imgURL={require('../../../assets/icons/document.svg')}
							imgWidthEms="4"
							gap="2em"
							reverse
							contentSize={'150%'}
							title={name}
						>
							<code style={{ fontSize: '50%', backgroundColor: 'transparent' }}>
								INTRODUCTION TO GITHUB
							</code>
						</Header>
						<HeaderShadow containerRef={containerRef} />
					</HeaderWrapper>

					<ContentArea className="learn-i-contentarea">
						<ParsedContent id="learn-content" document={content} />

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
		learnData: {
			id: activityId,
			cards,
			indicators: { currentCardIndex, lastCardUnlockedIndex }
		}
	} = state

	const card = cards && cards[currentCardIndex]
	return {
		isReady: !!get(card, 'content'),
		activityId,
		id: get(card, 'id'),
		contentfulId: get(card, 'contentfulId'),
		name: get(card, 'name'),
		content: get(card, 'content'),
		gems: get(card, 'gems'),
		currentCardIndex,
		lastCardUnlockedIndex
	}
}

const mapDispatchToProps = dispatch => ({
	onInitUnlockCard: (activityId, id, contentfulId) =>
		dispatch(initUnlockCard(activityId, id, contentfulId)),
	onIncrementGemsBy: gemAmount => dispatch(incrementGemsBy(gemAmount))
})

export default connect(mapStateToProps, mapDispatchToProps)(Content)
