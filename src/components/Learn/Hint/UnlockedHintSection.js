import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { connect } from 'react-redux'

import UnlockedHint from './UnlockedHint'

import { objectArrayToObject } from '../../../utils/objUtils'

const Container = styled.div`
	padding: 0 0 2em;
`

const UnlockedHintSection = ({
	hintMetasTree,
	scopedCachedHintsProgress,
	lastHintUnlockedId
}) => {
	useEffect(() => {
		if (lastHintUnlockedId) {
			// TODO allow users to boost animations
			let boostedAnimations = false
			if (boostedAnimations)
				anime({
					targets: '.learn-r-lockedhints-hintslidedown',
					translateY: ['-10em', 0], // static value that looks good
					easing: 'easeOutQuad',
					duration: 750
				})
		}
	}, [lastHintUnlockedId])

	// let hintIndexMapper = 0
	// let slideDownIndex = undefined
	const renderedUnlockedHintsRecursive = hints => {
		if (!hints) return

		return hints.map(hint => {
			const { id, contentUrl } = hint
			const { isUnlocked } = scopedCachedHintsProgress[id] ?? {}

			// const visualIndex = hintIndexMapper++
			// if (id === lastHintUnlockedId) slideDownIndex = visualIndex
			return (
				<React.Fragment key={`hint-${id}`}>
					{isUnlocked && (
						<UnlockedHint
							// className={
							// 	visualIndex > slideDownIndex
							// 		? 'learn-r-lockedhints-hintslidedown'
							// 		: null
							// }
							id={id}
							// contentUrl={contentUrl}
						/>
					)}
					{renderedUnlockedHintsRecursive(hint.hints)}
				</React.Fragment>
			)
		})
	}

	const renderedUnlockedHints = useMemo(
		() => renderedUnlockedHintsRecursive(hintMetasTree),
		[scopedCachedHintsProgress]
	)

	return <Container>{renderedUnlockedHints}</Container>
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

	return {
		hintMetasTree,
		lastHintUnlockedId,
		scopedCachedHintsProgress
	}
}

export default connect(mapStateToProps)(UnlockedHintSection)
