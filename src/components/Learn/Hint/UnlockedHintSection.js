import React, { useEffect, useMemo } from 'react'
import { Element as ScrollElement } from 'react-scroll'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import UnlockedHint from './UnlockedHint'

const Container = styled.div`
	padding: 0 0 2em;
`

const UnlockedHintSection = ({ unlockedHints }) => {
	let hintIndexMapper = 0

	const renderedUnlockedHintsRecursive = unlockedHints => {
		if (!unlockedHints) return

		return unlockedHints.map(hint => {
			const { id, name, steps } = hint

			const index = hintIndexMapper++
			return (
				<React.Fragment key={`hint-${id}`}>
					<ScrollElement name={`unlocked-hint-${id}`}>
						<UnlockedHint id={id} name={name} steps={steps} />
					</ScrollElement>
					{renderedUnlockedHintsRecursive(hint.unlockedHints)}
				</React.Fragment>
			)
		})
	}

	const renderedUnlockedHints = useMemo(
		() => renderedUnlockedHintsRecursive(unlockedHints),
		[unlockedHints]
	)

	return <Container>{renderedUnlockedHints}</Container>
}

const mapStateToProps = state => {
	const {
		learnData: {
			cards,
			indicators: { currentCardIndex }
		}
	} = state

	return {
		unlockedHints: cards && get(cards[currentCardIndex], 'unlockedHints')
	}
}

export default connect(mapStateToProps)(UnlockedHintSection)
