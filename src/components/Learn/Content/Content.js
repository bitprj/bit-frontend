import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'

import ContentHeader from './ContentHeader'
import UnlockedHintSection from '../Hint/UnlockedHintSection'
import LockedHintSection from '../Hint/LockedHintSection'
import NextButton from '../NextButton/NextButton'
import MarkdownContent from '../../shared/MarkdownContent'

import { fadeIn } from '../../../styles/GlobalAnime'
import { usePrevious } from '../../../utils/customHooks'
import withApiCache, { CACHE_CARD } from '../../HOC/WithApiCache'
import { initUnlockCard } from '../../../redux/actions/learnData'
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
	line-height: 2;

	@media screen and (orientation: landscape) {
		padding-left: 3.5em;
		padding-right: 3.5em;
	}
`

const MarkdownContentStyling = styled.div`
	/**
   * Header Styling
   */
	h1,
	h2 {
		padding-bottom: 0.25em;
		border-bottom: 0.5px solid #ddd;
	}

	h1 + h1,
	h2 + h2 {
		padding: 0;
		border: 0;
	}

	/**
   * Image Styling
   */
	img {
		margin: 0 auto;
		max-width: 90%;
	}

	/**
   * Table Styling
   */
	table {
		margin: 0 auto;
		width: 80%;
		border-collapse: separate;
		border-spacing: 0;
	}
	th,
	td {
		padding: 1em;
		border: 0;
		border-bottom: 1px solid ${props => props.theme.offFont};
	}
	tr:hover {
		background-color: #f5f5f5;
	}
`

const Content = ({
	isReady,
	activityId,
	id,

	currentCardIndex,
	lastCardUnlockedIndex,

	name,
	content,
	gems,

	onInitUnlockCard,
	onIncrementGemsBy
}) => {
	const containerRef = useRef(null)
	const headerRef = useRef(null)

	const currentScrollTop = useRef(0)
	const cardsScrollTop = useRef([])

	/**
	 * determine if card was just unlocked
	 *  - without this there's no way of telling if render
	 *    occurred because card was unlocked
	 */
	const isCardUnlocked = useIsCardUnlocked(lastCardUnlockedIndex)

	useEffect(() => {
		/**
		 * Keep track of scroll in scrollTopRef
		 */
		const handleScroll = () => {
			const handleHeaderSize = scrollTop => {
				const header = headerRef.current
				if (scrollTop === 0) {
					header && headerRef.current.classList.remove('content-minimized')
				} else {
					header && headerRef.current.classList.add('content-minimized')
				}
			}

			const scrollTop = containerRef.current.scrollTop
			currentScrollTop.current = scrollTop
			handleHeaderSize(scrollTop)
		}

		containerRef.current.addEventListener('scroll', handleScroll)
		return () =>
			containerRef.current.removeEventListener('scroll', handleScroll)
	}, [])

	/**
	 * animation loading
	 */
	useEffect(() => {
		fadeIn('.learn-i-nextbutton', { opacity: [0.3, 1] })
		fadeIn('.learn-i-contentheader, .learn-i-contentarea')
	}, [isReady])

	/**
	 * add gems to student's total
	 * - Gem only gets changed during initialization of each card
	 * - ref used to detect if new card was changed.
	 */
	useEffect(() => {
		if (isCardUnlocked) {
			onInitUnlockCard(activityId, id)
			onIncrementGemsBy(gems)
		}
	}, [lastCardUnlockedIndex])

	/**
	 * scroll to top each card change so that unlocking a new
	 * card won't leave you at the bottom of the page
	 */
	useEffect(() => {
		if (currentCardIndex !== undefined) {
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

	return (
		<Container
			id="learn-content"
			ref={containerRef}
			className="low-profile-scrollbar fat"
		>
			{content && (
				<>
					<ContentHeader
						ref={headerRef}
						containerRef={containerRef}
						name={name}
					/>

					<ContentArea className="learn-i-contentarea">
						<MarkdownContentStyling>
							<MarkdownContent source={content} />
						</MarkdownContentStyling>

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
		cache: { cachedActivities, cachedCards },
		learnData: {
			selectedActivity: { id: activityId },
			indicators: { currentCardIndex, lastCardUnlockedIndex }
		}
	} = state

	const cardId = cachedActivities[activityId]?.cards[currentCardIndex]?.id

	const card = cachedCards[cardId]

	return {
		isReady: !!card?.content,
		activityId,
		id: cardId,

		currentCardIndex,
		lastCardUnlockedIndex,

		name: card?.name,
		content: card?.content,
		gems: card?.gems
	}
}

const mapDispatchToProps = dispatch => ({
	onInitUnlockCard: (activityId, id) =>
		dispatch(initUnlockCard(activityId, id)),
	onIncrementGemsBy: gemAmount => dispatch(incrementGemsBy(gemAmount))
})

const enhancer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withApiCache([CACHE_CARD])
)

export default enhancer(Content)

export const useIsCardUnlocked = lastCardUnlockedIndex => {
	const isCardUnlocked = useRef(false)
	const prevLastCardUnlockedIndex = usePrevious(lastCardUnlockedIndex)

	isCardUnlocked.current =
		prevLastCardUnlockedIndex !== undefined &&
		prevLastCardUnlockedIndex !== lastCardUnlockedIndex

	return isCardUnlocked.current
}
