import React, { useState, useRef } from 'react'
import { animateScroll } from 'react-scroll'
import styled from 'styled-components'
import { connect } from 'react-redux'

import CardHints from './CardHints'
import ImgAndContent from '../../shared/gadgets/ImgAndContent'
import HeaderShadow from '../../shared/utils/HeaderShadow'

import { setCurrentCardByIndex } from '../../../redux/actions/learnData'

const Container = styled.div`
	overflow-y: auto;
	flex-grow: 1;
`

const ActiveWrapper = styled.div`
	&.active {
		background-color: #fcfcfc;
	}
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
	const containerRef = useRef(null)

	// basically, if hints are unlocked for current card
	const [hasSubitems, setHasSubitems] = useState(false)

	const scrollOptions = container => ({
		duration: 500,
		smooth: true,
		containerId: container
	})
	const handleScrollToTop = container =>
		animateScroll.scrollToTop(scrollOptions(container))
	const handleScrollToBottom = container =>
		animateScroll.scrollToBottom(scrollOptions(container))

	const renderedCards =
		cards &&
		cards.map((card, index) => {
			const isCurrentCard = currentCardIndex === index
			return (
				<React.Fragment key={`learn-nav-${index}`}>
					<ActiveWrapper
						id={`learn-nav-${index}`}
						className={`${isCurrentCard ? 'strong-lift' : ''} ${
							index > currentCardIndex ? 'learn-r-nav-hintslidedown' : ''
						} `}
						onClick={() => {
							if (index <= lastCardUnlockedIndex && index !== currentCardIndex)
								onSetCurrentCardByIndex(index)
						}}
					>
						<NavItem
							imgWidthEms="3"
							strongHover
							imgText={index + 1}
							title={card && card.name}
							gap="0"
							// time={'15 min'}
							hasSubitems={isCurrentCard && hasSubitems}
							unlocked={index <= lastCardUnlockedIndex}
							onClick={() =>
								isCurrentCard &&
								hasSubitems &&
								handleScrollToTop('learn-content')
							}
						/>
						{isCurrentCard && <CardHints setHasSubitems={setHasSubitems} />}
					</ActiveWrapper>
				</React.Fragment>
			)
		})

	return (
		<Container
			id="sidebar-nav"
			ref={containerRef}
			className="low-profile-scrollbar only-hover"
		>
			<HeaderShadow containerRef={containerRef} />
			{renderedCards}
			<HeaderShadow
				containerRef={containerRef}
				reverse
				type="arrow"
				innerOnClick={() => handleScrollToBottom('sidebar-nav')}
			/>
		</Container>
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
