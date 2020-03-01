import React, { useState } from 'react'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll'
import { connect } from 'react-redux'

import ActiveList from '../../shared/containers/ActiveList'
import CardHints from './CardHints'
import ImgAndContent from '../../shared/gadgets/ImgAndContent'

import { setCurrentCardByIndex } from '../../../redux/actions/learnData'

const StyledActiveList = styled(ActiveList)`
	font-size: 85%;
	flex-grow: 1;
`

const NavItem = styled(ImgAndContent)`
	margin: 0;
	padding: 0.5em 2em 0.5em 0;
	color: #bbb;
	cursor: default;
	${props =>
		props.hasSubitems
			? `border-bottom: 0.5px #e9e9e9 solid;`
			: `border-bottom: 0.5px transparent;`}
	${props => (props.unlocked ? `color: #000; cursor: pointer;` : '')}
`

const SidebarNav = ({
	cards,
	currentCardIndex,
	lastCardUnlockedIndex,
	onSetCurrentCardByIndex
}) => {
	// basically, if hints are unlocked for current card
	const [hasSubitems, setHasSubitems] = useState(false)

	const scrollOptions = container => ({
		duration: 500,
		smooth: true,
		containerId: container
	})
	const handleScrollToTop = container =>
		animateScroll.scrollToTop(scrollOptions(container))
	return (
		<StyledActiveList
			identifier="learn"
			itemList={cards}
			selectCallback={(_, index) => {
				if (index <= lastCardUnlockedIndex && index !== currentCardIndex)
					onSetCurrentCardByIndex(index)
			}}
			activeClassName={(_, index) =>
				`${currentCardIndex === index ? 'strong-lift' : ''} ${
					index > currentCardIndex ? 'learn-r-nav-hintslidedown' : ''
				}`
			}
		>
			{(card, index) => (
				<>
					<NavItem
						imgWidthEms="3"
						strongHover
						imgText={index + 1}
						title={card && card.name}
						gap="0"
						// time={'15 min'}
						hasSubitems={currentCardIndex === index && hasSubitems}
						unlocked={index <= lastCardUnlockedIndex}
						onClick={() =>
							currentCardIndex === index &&
							hasSubitems &&
							handleScrollToTop('learn-content')
						}
					/>
					{currentCardIndex === index && (
						<CardHints setHasSubitems={setHasSubitems} />
					)}
				</>
			)}
		</StyledActiveList>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			cards,
			indicators: { currentCardIndex, lastCardUnlockedIndex }
		}
	} = state

	// TODO fix unnecessary rerenders: split cards into cards up to layer 1 and currentCard

	return {
		cards,
		currentCardIndex,
		lastCardUnlockedIndex
	}
}

const mapDispatchToProps = dispatch => ({
	onSetCurrentCardByIndex: cardIndex =>
		dispatch(setCurrentCardByIndex(cardIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav)
