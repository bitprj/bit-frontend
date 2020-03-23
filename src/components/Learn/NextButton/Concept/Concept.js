import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import Slide from './Slide'
import Peripheral from '../Peripheral'
import DynamicModal from '../../../shared/containers/DynamicModal'

const StyledCarousel = styled(Carousel)`
	width: 100%;

	.carousel,
	.slider-wrapper,
	.slider,
	.slide,
	.slide > div {
		height: 100%;
	}

	.carousel .slide {
		text-align: left;
		background: transparent;
	}

	.carousel.carousel-slider .control-arrow {
		background: ${props => props.theme.accent};
		top: 50%;
		bottom: auto;
		transform: translateY(-50%);
		opacity: 1;
		width: 2.2em;
		height: 2.2em;
		box-shadow: 0 4px 14px 0 ${props => props.theme.accent}88;

		transition: box-shadow 0.2s ease, background-color 0.2s ease;
	}

	.carousel .control-prev.control-arrow {
		padding: 0;
		border-radius: 50%;
		left: -1.1em;
	}
	.carousel .control-prev.control-arrow:before {
		margin-left: 0.88em;
		border-right: 8px solid ${props => props.theme.accentVariant};
	}

	.carousel .control-next.control-arrow {
		padding: 0;
		border-radius: 50%;
		right: -1.1em;
	}
	.carousel .control-next.control-arrow:before {
		margin-right: 0.88em;
		border-left: 8px solid ${props => props.theme.accentVariant};
	}

	.carousel.carousel-slider .control-arrow:hover {
		background: ${props => props.theme.accent}dd;
		box-shadow: 0 4px 14px 0 ${props => props.theme.accent}55;
	}
`

const Concept = ({
	STATE_CONCEPT,

	render,
	open,
	setOpen,

	concepts,
	removeAndBroadcastButtonState
}) => {
	/**
	 * Persistent memory of current concept even if user closes concept modal
	 * # TODO doesn't work rn because carousel onchange is messed
	 */
	const [slideIndex, setSlideIndex] = useState(0)

	const slides =
		concepts &&
		concepts.length &&
		concepts.map((concept, index) => (
			<Slide
				key={`learn-concept-${concept.id}-${index}`}
				name={concept.name}
				steps={concept.steps}
				slideIndex={slideIndex}
				slidesLength={concepts && concepts.length}
				setOpen={setOpen}
			/>
		))

	return (
		<>
			{render && (
				<Peripheral
					currentButtonState={STATE_CONCEPT}
					onClick={() => setOpen(true)}
					top="65%"
					left="65%"
				/>
			)}
			<DynamicModal
				open={open}
				closed={() => {
					setOpen(false)
					console.log('i closed')
					removeAndBroadcastButtonState(STATE_CONCEPT)
				}}
				scaleX={0.9}
				scaleY={0.9}
			>
				<StyledCarousel
					showThumbs={false}
					showStatus={false}
					showIndicators={false}
					useKeyboardArrows
					onChange={slideIndex => setSlideIndex(slideIndex)}
					width="100%"
				>
					{slides}
				</StyledCarousel>
			</DynamicModal>
		</>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			cards,
			indicators: { currentCardIndex }
		}
	} = state

	const card = cards && cards[currentCardIndex]
	return {
		concepts: get(card, 'concepts')
	}
}

export default connect(mapStateToProps)(Concept)
