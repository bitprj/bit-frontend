import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'

import DotRating from '../../shared/gadgets/DotRating'
import { setCurrentCardByIndex } from '../../../redux/actions/learnData'

import withApiCache, { CACHE_MODULE } from '../../HOC/WithApiCache'

const Container = styled.div`
	padding: 2em;
`

const SidebarHeader = ({
	wac_data: [modu1e],

	name,
	cardsLength,
	currentCardIndex,
	lastCardUnlockedIndex,
	onSetCurrentCardByIndex
}) => {
	return (
		<Container>
			<code style={{ backgroundColor: 'transparent', fontSize: '85%' }}>
				{modu1e?.name.toUpperCase()}
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
			selectedActivity: { id: activityId, moduleId },
			indicators: { currentCardIndex, lastCardUnlockedIndex }
		}
	} = state

	const activity = cachedActivities[activityId]

	return {
		id: moduleId,
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

const enhancer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withApiCache([CACHE_MODULE])
)

export default enhancer(SidebarHeader)
