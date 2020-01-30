import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ImgAndContent from '../shared/gadgets/ImgAndContent'

import { setViewLearn } from '../../redux/actions/viewManager'

const Container = styled.div`
	overflow-y: auto;
`

const ActiveWrapper = styled.div`
	&.active {
		background-color: #fcfcfc;
	}
`

const Nav = props => {
	const renderedSteps =
		props.cards &&
		props.cards.map((step, index) => {
			step = step.fields

			const className =
				props.currentViewLearn === index
					? 'active lift transition-medium'
					: 'transition-medium'
			return (
				<ActiveWrapper
					key={`learn-nav-${index}`}
					className={className}
					onClick={() => props.onSetViewLearn(index)}
				>
					<ImgAndContent
						margin="0"
						padding="0.5em 2em 0.5em 0"
						imgWidthEms="3"
						imgText={index + 1}
						title={step.name}
						time={'15 min'}
					/>
				</ActiveWrapper>
			)
		})

	return <Container ref={props.containerRef} className="no-scrollbar">{renderedSteps}</Container>
}

const mapStateToProps = state => {
	const {
		viewManager: { current_view_learn },
		learnData: { cards }
	} = state

	return {
		cards,
		currentViewLearn: current_view_learn
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetViewLearn: viewIndex => {
			dispatch(setViewLearn(viewIndex))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
