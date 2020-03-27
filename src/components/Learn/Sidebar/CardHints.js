import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { connect } from 'react-redux'
import { scroller } from 'react-scroll'
import ReactMarkdown from 'react-markdown'

import ClampedText from '../../shared/utils/ClampedText'

import { objectArrayToObject } from '../../../utils/objUtils'
import withApiCache, { CACHE_HINT } from '../../HOC/WithApiCache'

const NavSubWrapper = styled.div`
	padding: 0.75em;
	padding-left: ${props => 1.2 * props.nestLevel}em;
	display: flex;
	align-items: center;
	cursor: pointer;
`

const NavSubitem = styled(ClampedText)`
	font-size: 80%;
	font-style: italic;
`

const NavSubitemImg = styled.div`
	width: 4.8em;
	text-align: center;
	font-style: normal;
	color: ${props => props.theme.accent};
	flex-shrink: 0;
`

const StyledReactMarkdown = styled(ReactMarkdown)`
	word-break: break-all;
`

const NavItem = ({ id, nestLevel, wac_data: [hint] }) => {
	const { name } = hint ?? {}

	const handleScrollTo = hintId => {
		scroller.scrollTo(`unlocked-hint-${hintId}`, {
			duration: 500,
			smooth: true,
			containerId: 'learn-content',
			offset: -document.getElementById('learn-content-header').clientHeight + 1
		})
	}

	return (
		<NavSubWrapper
			className={`invisible hover-lift transition-short learn-i-hintheader-${id}`}
			nestLevel={nestLevel}
			onClick={() => handleScrollTo(id)}
		>
			<NavSubitemImg>&bull;</NavSubitemImg>
			<NavSubitem clamp={1}>
				<StyledReactMarkdown className="markdown-header" source={name} />
			</NavSubitem>
		</NavSubWrapper>
	)
}

const WacNavItem = withApiCache(CACHE_HINT)(NavItem)

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

const HintsNavigation = ({
	setHasSubitems,
	hintIdsTree,
	lastHintUnlockedId,
	scopedCachedHintsProgress
}) => {
	useEffect(() => {
		if (lastHintUnlockedId) {
			anime({
				targets: '.learn-r-nav-hintslidedown',
				translateY: ['-2em', 0],
				easing: 'easeOutQuad',
				duration: 750
			})
		}
	}, [lastHintUnlockedId])

	const renderedHintsRecursive = (hints, nestLevel = 0) => {
		if (!hints) return

		return hints.map(hint => {
			const { id } = hint
			const { isUnlocked } = scopedCachedHintsProgress[id] ?? {}

			setHasSubitems(true)
			return (
				<React.Fragment key={`sidebar-hint-${id}`}>
					{isUnlocked && <WacNavItem id={id} nestLevel={nestLevel} />}
					{renderedHintsRecursive(hint.hints, nestLevel + 1)}
				</React.Fragment>
			)
		})
	}

	// prettier-ignore
	const renderedHints = useMemo(
    () => renderedHintsRecursive(hintIdsTree), 
    [scopedCachedHintsProgress]
  )

	return <Container>{renderedHints}</Container>
}

const mapStateToProps = state => {
	const {
		cache: { cachedActivities, cachedCards, cachedHintsProgress },
		learnData: {
			selectedActivity: { id: activityId },
			indicators: { currentCardIndex, lastHintUnlockedId }
		}
	} = state

	const cardId = cachedActivities[activityId]?.cards[currentCardIndex]?.id

	const hintIdsTree = cachedCards[cardId]?.hints

	const flatHintIds = hintIdsTree.flatMap(hint => [
		{ id: hint.id },
		...hint.hints.map(hint => ({ id: hint.id }))
	])
	const scopedCachedHintsProgressArray = flatHintIds.map(hint => ({
		[hint.id]: cachedHintsProgress[hint.id] ?? null
	}))
	const scopedCachedHintsProgress = objectArrayToObject(
		scopedCachedHintsProgressArray
	)

	return {
		hintIdsTree,
		lastHintUnlockedId,
		scopedCachedHintsProgress
	}
}

export default connect(mapStateToProps)(HintsNavigation)
