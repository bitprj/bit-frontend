import React, { useRef, useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { setCurrentCardUnnestedUnlockedHintRefs } from '../../../redux/actions/learnData'

import UnlockedHint from './UnlockedHint'

const Container = styled.div`
	padding: 1em 0;
`

const UnlockedHintSection = ({
	unlockedHints,
	onSetCurrentCardUnnestedUnlockedHintRefs
}) => {
	const hintsScrollRefs = useRef([])
	let doneCounter = 0

	const renderedUnlockedHintsRecursive = unlockedHints => {
		if (!unlockedHints) return

		return unlockedHints.map(hint => {
			const { id, name, steps } = hint

			return (
				<React.Fragment key={`hint-${id}`}>
					<UnlockedHint
						ref={hintRef => {
							if (hintRef && unlockedHints.length) {
								hintsScrollRefs.current.push(hintRef)
								if (++doneCounter === 0) {
									console.log('dispatching set')
									onSetCurrentCardUnnestedUnlockedHintRefs(
										hintsScrollRefs.current
									)
									hintsScrollRefs.current = []
								}
							}
						}}
						id={id}
						name={name}
						steps={steps}
					/>
					{renderedUnlockedHintsRecursive(hint.unlockedHints)}
					{doneCounter-- ? null : null}
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
		learnData: { cards, currentCardIndex }
	} = state

	return {
		unlockedHints: cards && get(cards[currentCardIndex], 'unlockedHints'),
		currentCardIndex
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetCurrentCardUnnestedUnlockedHintRefs: array =>
			dispatch(setCurrentCardUnnestedUnlockedHintRefs(array))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockedHintSection)
