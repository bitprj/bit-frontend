import React, { useMemo } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { useDidUpdateEffect } from '../../../utils/customHooks'

import UnlockedHint from './UnlockedHint'

const Container = styled.div`
	padding: 0 0 2em;
`

const UnlockedHintSection = ({ unlockedHints, lastHintUnlockedId }) => {
	useDidUpdateEffect(() => {
		// TODO allow users to boost animations
		let boostedAnimations = false
		if (boostedAnimations)
			anime({
				targets: '.learn-r-lockedhints-hintslidedown',
				translateY: ['-10em', 0], // static value that looks good
				easing: 'easeOutQuad',
				duration: 750
			})
	}, [lastHintUnlockedId])

	let hintIndexMapper = 0
	let slideDownIndex = undefined
	const renderedUnlockedHintsRecursive = unlockedHints => {
		if (!unlockedHints) return

		return unlockedHints.map(hint => {
			const { id, name, steps } = hint

			const visualIndex = hintIndexMapper++
			if (id === lastHintUnlockedId) slideDownIndex = visualIndex
			return (
				<React.Fragment key={`hint-${id}`}>
					<UnlockedHint
						className={
							visualIndex > slideDownIndex
								? 'learn-r-lockedhints-hintslidedown'
								: null
						}
						id={id}
						name={name}
						steps={steps}
					/>
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
			indicators: { currentCardIndex, lastHintUnlockedId }
		}
	} = state

	return {
		unlockedHints: cards && get(cards[currentCardIndex], 'unlockedHints'),
		lastHintUnlockedId
	}
}

export default connect(mapStateToProps)(UnlockedHintSection)
