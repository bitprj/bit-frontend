import React, { useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Hint from './Hint'

import ParsedContent from '../../shared/ParsedContent'

const Container = styled.div`
	display: block;
`

const HintSection = ({ activityId, hints, unlockedHints }) => {
	const renderedUnlockedHintsRecursive = unlockedHints => {
		if (!unlockedHints) return

		return unlockedHints.map(hint => {
			const { id, name, steps } = hint

			const renderSteps = steps.map((step, i) => {
				return (
					<div key={`step-${id}-${i}`}>
						<h3>{step.heading}</h3>
						<ParsedContent id="learn-content" document={step.content} />
					</div>
				)
			})

			return (
				<div key={`hint-${id}`}>
					<h2>{name}</h2>
					{renderSteps}
					{renderedUnlockedHintsRecursive(hint.unlockedHints)}
				</div>
			)
		})
	}

	const renderedLockedHintsRecursive = hints => {
		if (!hints) return

		return hints.map(hint => {
			if (hint.isUnlocked) {
				return renderedLockedHintsRecursive(hint.hints)
			} else {
				const { id, contentfulId, name, difficulty, gems } = hint
				return (
					<Hint
						key={`hint-${id}`}
						activityId={activityId}
						id={id}
						contentfulId={contentfulId}
						name={name}
						difficulty={difficulty}
						gems={gems}
					/>
				)
			}
		})
	}

	const renderedUnlockedHints = useMemo(
		() => renderedUnlockedHintsRecursive(unlockedHints),
		[unlockedHints]
	)
	const renderedLockedHints = useMemo(
		() => renderedLockedHintsRecursive(hints),
		[hints]
	)

	return (
		<Container>
			<>{renderedUnlockedHints}</>
			<>{renderedLockedHints}</>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: { id: activityId, cards, currentCardIndex }
	} = state

	const hints = cards && get(cards[currentCardIndex], 'hints')
	const unlockedHints = cards && get(cards[currentCardIndex], 'unlockedHints')

	return {
		activityId,
		hints,
		unlockedHints
	}
}

export default connect(mapStateToProps)(HintSection)
