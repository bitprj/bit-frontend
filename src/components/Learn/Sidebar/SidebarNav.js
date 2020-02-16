import React, { useState, useRef, useMemo } from 'react'
import { scroller } from 'react-scroll'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { get } from 'lodash'

import ImgAndContent from '../../shared/gadgets/ImgAndContent'
import ClampedText from '../../shared/utils/ClampedText'
import HeaderShadow from '../../shared/utils/HeaderShadow'

import { setCurrentCardByIndex } from '../../../redux/actions/learnData'

const Container = styled.div`
	overflow-y: auto;
`

const ActiveWrapper = styled.div`
	&.active {
		background-color: #fcfcfc;
	}
`

const NavItem = styled(ImgAndContent)`
	margin: 0;
	padding: 0.5em 2em 0.5em 0;
	${props => props.hasSubitems && `border-bottom: 0.5px #e9e9e9 solid;`}
	${props =>
		props.locked &&
		`color: #aaa;
    cursor: default;`}
`

const NavSubWrapper = styled.div`
	padding: 0.75em;
	padding-left: ${props => 1.2 * props.nestLevel}em;
	display: flex;
	align-items: center;
	cursor: pointer;
`

const NavSubitem = styled(ClampedText)`
	font-size: 80%;
	font-style: italic;
`

const NavSubitemImg = styled.div`
	width: 4.8em;
	text-align: center;
	font-style: normal;
	color: ${props => props.theme.accent};
	flex-shrink: 0;
`

const SidebarNav = ({
	cards,
	unlockedHints,
	currentCardIndex,
	lastCardUnlockedIndex,
	onSetCurrentCardByIndex
}) => {
	const containerRef = useRef(null)

	// basically, if hints are unlocked for current card
	const [hasSubitems, setHasSubitems] = useState(false)

	let mapHintIndex = 0

	const renderedHintsRecursive = (unlockedHints, nestLevel = 0) => {
		if (!unlockedHints) return

		return unlockedHints.map(hint => {
			const { id, name } = hint
			const index = mapHintIndex++
			if (!hasSubitems) setHasSubitems(true)
			return (
				<React.Fragment key={`sidebar-hint-${id}`}>
					<NavSubWrapper
						className="hover-lift transition-short"
						nestLevel={nestLevel}
						onClick={() => {
							scroller.scrollTo(`unlocked-hint-${index}`, {
								duration: 500,
								smooth: true,
								containerId: 'content',
								offset:
									-document.getElementById('content-header').clientHeight + 1
							})
						}}
					>
						<NavSubitemImg>&bull;</NavSubitemImg>
						<NavSubitem clamp={1}>
							<ReactMarkdown className="markdown-header" source={name} />
						</NavSubitem>
					</NavSubWrapper>
					{renderedHintsRecursive(hint.unlockedHints, nestLevel + 1)}
				</React.Fragment>
			)
		})
	}

	// prettier-ignore
	const renderedHints = useMemo(
    () => renderedHintsRecursive(unlockedHints), [
		unlockedHints
	])

	const renderedCards =
		cards &&
		cards.map((card, index) => {
			const isCurrentCard = currentCardIndex === index
			const className = isCurrentCard
				? 'active lift transition-medium'
				: 'transition-medium'
			return (
				<ActiveWrapper
					key={`learn-nav-${index}`}
					className={className}
					onClick={() =>
						index <= lastCardUnlockedIndex && onSetCurrentCardByIndex(index)
					}
				>
					<NavItem
						hover
						imgWidthEms="3"
						imgText={index + 1}
						title={card && card.name}
						gap="0"
						time={'15 min'}
						hasSubitems={isCurrentCard && hasSubitems}
						locked={index > lastCardUnlockedIndex}
					/>
					{isCurrentCard && renderedHints}
				</ActiveWrapper>
			)
		})

	return (
		<Container ref={containerRef} className="low-profile-scrollbar only-hover">
			<HeaderShadow containerRef={containerRef} />
			{renderedCards}
			<HeaderShadow containerRef={containerRef} reverse type="arrow" />
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: { cards, currentCardIndex, lastCardUnlockedIndex }
	} = state

	const unlockedHints = cards && get(cards[currentCardIndex], 'unlockedHints')

	return {
		cards,
		unlockedHints,
		currentCardIndex,
		lastCardUnlockedIndex
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetCurrentCardByIndex: cardIndex =>
			dispatch(setCurrentCardByIndex(cardIndex))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav)
