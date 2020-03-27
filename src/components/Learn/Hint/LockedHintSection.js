import React, { useRef, useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Icon from '../../shared/gadgets/Icon'
import IconLine from '../../shared/gadgets/IconLine'
import HeaderShadow from '../../shared/gadgets/HeaderShadow'

import LockedHint from './LockedHint'
import { objectArrayToObject } from '../../../utils/objUtils'

const Container = styled.div`
	margin: 0 -1.5em;
	display: flex;
	align-items: center;
	line-height: initial;
`

const LockedHintsContainer = styled.div`
	margin-right: 1em;
	position: relative;
	width: 60%;

	@media screen and (orientation: landscape) {
		margin-right: 2.5em;
	}
`
const LockedHints = styled.div`
	padding: 0 1em;
	padding-bottom: 0.75em;
	height: 24em;
	overflow-y: auto;
`

const HelpInfo = styled.div`
	margin: 1em;
	margin-left: 0;
	width: 40%;
	color: #00498c;
`

const AnimatingIconLine = styled(IconLine)`
	cursor: pointer;

	:hover img,
	:hover svg {
		transform: translateX(0.2em);
	}
`

const LockedHintSection = ({
	isReady,
	activityId,
	hintMetasTree,
	scopedCachedHintsProgress
}) => {
	const containerRef = useRef(null)

	let isAllUnlocked = true
	const renderedLockedHintsRecursive = hints => {
		if (!hints) return

		return hints.map(hint => {
			const { id, contentUrl } = hint
			const { isUnlocked } = scopedCachedHintsProgress[id] ?? {}
			if (!isUnlocked) {
				isAllUnlocked = false

				return (
					<LockedHint
						key={`hint-${id}`}
						activityId={activityId}
						id={id}
						// contentUrl={contentUrl}
					/>
				)
			}
			return renderedLockedHintsRecursive(hint.hints)
		})
	}

	const renderedLockedHints = useMemo(
		() => renderedLockedHintsRecursive(hintMetasTree),
		[scopedCachedHintsProgress]
	)

	return (
		<Container className="learn-r-lockedhints-hintslidedown">
			{!isAllUnlocked && (
				<>
					<LockedHintsContainer>
						<HeaderShadow containerRef={containerRef} />
						<LockedHints
							className="low-profile-scrollbar only-hover"
							ref={containerRef}
						>
							{renderedLockedHints}
						</LockedHints>
						<HeaderShadow reverse containerRef={containerRef} />
					</LockedHintsContainer>

					<HelpInfo>
						<Icon src={require('../../../assets/icons/admin-mentoring.svg')} />
						<h1 style={{ margin: 0 }}>Are You Stuck?</h1>
						<p>
							We all get stuck sometimes and need help. These are the most
							commonly asked questions from the community.
						</p>
						<p>
							However, like the real world, hints don't come free. You can spend
							Gems that you earn for completing each card on unlocking valuable
							hints.
						</p>
						<h3>
							<AnimatingIconLine
								reverse
								icon={<ArrowForwardIcon fontSize="inherit" />}
							>
								How it works
							</AnimatingIconLine>
						</h3>
					</HelpInfo>
				</>
			)}
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		cache: { cachedActivities, cachedCards, cachedHintsProgress },
		learnData: {
			selectedActivity: { id: activityId },
			indicators: { currentCardIndex }
		}
	} = state

	const cardId = cachedActivities[activityId]?.cards[currentCardIndex]?.id

	const hintMetasTree = cachedCards[cardId]?.hints

	const flatHintMetas = hintMetasTree.flatMap(hint => [
		{ id: hint.id },
		...hint.hints.map(hint => ({ id: hint.id, contentUrl: hint.contentUrl }))
	])
	const scopedCachedHintsProgressArray = flatHintMetas.map(hint => ({
		[hint.id]: cachedHintsProgress[hint.id] ?? null
	}))
	const scopedCachedHintsProgress = objectArrayToObject(
		scopedCachedHintsProgressArray
	)

	const isReady = cachedHintsProgress[hintMetasTree[0]?.id]?.isUnlocked

	return {
		isReady,
		activityId,
		hintMetasTree,
		scopedCachedHintsProgress
	}
}

export default connect(mapStateToProps)(LockedHintSection)
