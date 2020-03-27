import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DotRating from '../../shared/gadgets/DotRating'
import { setCurrentCardByIndex } from '../../../redux/actions/learnData'

const Container = styled.div`
	padding: 2em;
`

const SidebarHeader = ({
	name,
	cardsLength,
	currentCardIndex,
	lastCardUnlockedIndex,
	onSetCurrentCardByIndex
}) => {
	return (
		<Container>
			<code style={{ backgroundColor: 'transparent', fontSize: '85%' }}>
				INTRODUCTION TO GITHUB
			</code>
			<h2 style={{ marginTop: '0.1em', marginBottom: '0.5em' }}>{name}</h2>
			<DotRating
				style={{ fontSize: '150%' }}
				fullWidth
				type="SQUARE"
				rating={currentCardIndex + 1}
				offRating={lastCardUnlockedIndex + 1}
				outOf={cardsLength}
				callback={index => {
					if (index <= lastCardUnlockedIndex && index !== currentCardIndex)
						onSetCurrentCardByIndex(index)
				}}
			/>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		cache: { cachedActivities },
		learnData: {
			selectedActivity: { id: activityId },
			indicators: { currentCardIndex, lastCardUnlockedIndex }
		}
	} = state

	const activity = cachedActivities[activityId]

	return {
		name: activity?.name,
		cardsLength: activity?.cards.length,
		currentCardIndex,
		lastCardUnlockedIndex
	}
}

const mapDispatchToProps = dispatch => ({
	onSetCurrentCardByIndex: cardIndex =>
		dispatch(setCurrentCardByIndex(cardIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader)
