import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import Slide from './Slide'
import Peripheral from '../NextButton/Peripheral'
import DynamicModal from '../../shared/containers/DynamicModal'

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
		visibility: hidden;
	}
`

const Concept = ({
	STATE_CONCEPT,

	render,
	open,
	setOpen,

	conceptMetas,
	removeAndBroadcastButtonState
}) => {
	/**
	 * Persistent memory of current concept even if user closes concept modal
	 * # TODO doesn't work rn because carousel onchange is messed
	 */
	const [slideIndex, setSlideIndex] = useState(0)

	const handleClose = () => {
		setOpen(false)
		removeAndBroadcastButtonState(STATE_CONCEPT)
	}

	const slides = conceptMetas?.map((concept, index) => (
		<Slide
			key={`learn-concept-${concept.id}-${index}`}
			id={concept.id}
			slideIndex={slideIndex}
			slidesLength={conceptMetas?.length}
			onClose={handleClose}
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
			<DynamicModal open={open} closed={handleClose} scaleX={0.9} scaleY={0.9}>
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
		cache: { cachedActivities, cachedCards },
		learnData: {
			selectedActivity: { id: activityId },
			indicators: { currentCardIndex }
		}
	} = state

	const cardId = cachedActivities[activityId]?.cards[currentCardIndex]?.id

	const conceptMetas = cachedCards[cardId]?.concepts

	return {
		conceptMetas
	}
}

export default connect(mapStateToProps)(Concept)
