import React, { useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import ImgAndContent from '../../shared/gadgets/ImgAndContent'
import ClampedText from '../../shared/utils/ClampedText'

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

const Nav = ({
	containerRef,
	cards,
	unlockedHints,
	currentCardIndex,
	lastCardUnlockedIndex,
	onSetCurrentCardByIndex
}) => {
	const handleSelectCard = index => {
		if (index <= lastCardUnlockedIndex) onSetCurrentCardByIndex(index)
	}

	const renderedHintsRecursive = (unlockedHints, nestLevel = 0) => {
		if (!unlockedHints) return

		return unlockedHints.map(hint => {
			const { id, name } = hint
			return (
				<React.Fragment key={`sidebar-hint-${id}`}>
					<NavSubWrapper
						className="hover-lift transition-short"
						nestLevel={nestLevel}
					>
						<NavSubitemImg>&bull;</NavSubitemImg>
						<NavSubitem type={'other'} clamp={1}>
							{name}
						</NavSubitem>
					</NavSubWrapper>
					{renderedHintsRecursive(hint.unlockedHints, nestLevel + 1)}
				</React.Fragment>
			)
		})
	}

	// prettier-ignore
	const renderedHints = useMemo(
		() => renderedHintsRecursive(unlockedHints),
		[unlockedHints]
	)

	const renderedCards =
		cards &&
		cards.map((card, index) => {
			const className =
				currentCardIndex === index
					? 'active lift transition-medium'
					: 'transition-medium'
			return (
				<ActiveWrapper
					key={`learn-nav-${index}`}
					className={className}
					onClick={() => handleSelectCard(index)}
				>
					<NavItem
						hover
						imgWidthEms="3"
						imgText={index + 1}
						title={card && card.name}
						gap="0"
						time={'15 min'}
						locked={index > lastCardUnlockedIndex}
					/>
					{currentCardIndex === index ? renderedHints : null}
				</ActiveWrapper>
			)
		})

	return (
		<Container ref={containerRef} className="no-scrollbar">
			{renderedCards}
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
		onSetCurrentCardByIndex: cardIndex => {
			dispatch(setCurrentCardByIndex(cardIndex))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
