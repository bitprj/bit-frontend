import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ImgAndContent from '../shared/gadgets/ImgAndContent'

import { setCurrentCardByIndex } from '../../redux/actions/learnData'

const Container = styled.div`
	overflow-y: auto;
`

const ActiveWrapper = styled.div`
	&.active {
		background-color: #fcfcfc;
	}
`

const Card = styled(ImgAndContent)`
	margin: 0;
	padding: 0.5em 2em 0.5em 0;
	${props => props.locked && 'color: #aaa;'}
`

const Nav = ({
	containerRef,
	cards,
	currentCardIndex,
	lastCardCompletedIndex,
	onSetCurrentCardByIndex
}) => {
	const handleSelectCard = index => {
		if (index <= lastCardCompletedIndex)
			onSetCurrentCardByIndex(index)
	}

	console.log(lastCardCompletedIndex)
	const renderedSteps =
		cards &&
		cards.map((step, index) => {
			step = step.fields

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
					<Card
						imgWidthEms="3"
						imgText={index + 1}
						title={step.name}
						time={'15 min'}
						locked={index > lastCardCompletedIndex}
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
		learnData: { cards, currentCardIndex, lastCardCompletedIndex }
	} = state

	return {
		cards,
		currentCardIndex,
		lastCardCompletedIndex
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
