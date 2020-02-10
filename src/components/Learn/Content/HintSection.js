import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Hint from './Hint'

const HintSection = ({ activityId, hints }) => {
	const renderedHints =
		hints &&
		hints.map((hint, index) => {
			const { id, contentfulId, name, difficulty, gems } = hint
			return (
				<Hint
					key={`hint-${index}`}
					activityId={activityId}
					id={id}
					contentfulId={contentfulId}
					name={name}
					difficulty={difficulty}
					gems={gems}
				/>
			)
		})

	return <>{renderedHints}</>
}

const mapStateToProps = state => {
	const {
		learnData: { id: activityId, cards, currentCardIndex }
	} = state

	const card = cards && cards[currentCardIndex]
	return {
		activityId,
		hints: get(card, 'hints')
	}
}

export default connect(mapStateToProps)(HintSection)
