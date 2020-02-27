import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { SlideLeftPanel, SlideRightPanel } from './Slide'
import { STATE_CONCEPT } from '../../NextButton'
import TwoPanelModal from '../../../../shared/containers/TwoPanelModal'

const Concept = ({
	className,
	render,
	open,
	setOpen,
	concepts,
	currentSlide = 0,
	removeAndBroadcastButtonState
}) => {
	const currentConcept = concepts[currentSlide]

	return (
		<TwoPanelModal
			open={open}
			closed={() => {
				setOpen(false)
				removeAndBroadcastButtonState(STATE_CONCEPT)
			}}
			leftPanel={
				<SlideLeftPanel
					name={currentConcept.name}
					steps={currentConcept.steps}
				/>
			}
			rightPanel={<SlideRightPanel />}
			scaleX={0.9}
			scaleY={0.8}
			ratio={0.55}
		/>
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
