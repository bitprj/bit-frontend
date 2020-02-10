import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ImgAndContent from '../../shared/gadgets/ImgAndContent'

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
    cursor: auto;`}
`

const Nav = ({
	containerRef,
	cards,
	currentCardIndex,
	lastCardUnlockedIndex,
	onSetCurrentCardByIndex
}) => {
	const handleSelectCard = index => {
		if (index <= lastCardUnlockedIndex) onSetCurrentCardByIndex(index)
	}

  const renderedSteps =
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
				</ActiveWrapper>
			)
		})

	return (
		<Container ref={containerRef} className="no-scrollbar">
			{renderedSteps}
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: { cards, currentCardIndex, lastCardUnlockedIndex }
  } = state
  
	return {
		cards,
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
