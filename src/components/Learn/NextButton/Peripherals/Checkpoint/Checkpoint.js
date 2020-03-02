import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { DescriptionLeftPanel, FilesRightPanel } from './Upload'
import { ResultLeftPanel } from './Result'

import Button from '../../../../shared/gadgets/Button'
import IconLine from '../../../../shared/gadgets/IconLine'
import LeftArrow from '@material-ui/icons/KeyboardArrowLeftRounded'
import RightArrow from '@material-ui/icons/KeyboardArrowRightRounded'

import TwoPanelModal from '../../../../shared/containers/TwoPanelModal'

const StyledTwoPanelModal = styled(TwoPanelModal)`
	position: relative;
`

const ToggleView = styled(Button)`
	${props => (!props.reverse ? 'padding-right: 1em;' : 'padding-left: 1em;')}
	position: absolute;
	top: 1em;
	left: 1em;
	border: 0;
`

const Checkpoint = ({ render, open, setOpen, id, name, instruction, type }) => {
	let leftPanelUpload
	let rightPanelUpload
	let leftPanelResult
	let rightPanelResult

	const [resultView, setResultView] = useState(false)
	const [modalRatio, setModalRatio] = useState(0.5)

	/**
	 * Autograder | Image | Video
	 */
	const [files, setFiles] = useState([])
	if (type === 'Autograder' || type === 'Image' || type === 'Video') {
		if (!resultView) {
			if (modalRatio !== 0.5) setModalRatio(0.5)
			leftPanelUpload = (
				<DescriptionLeftPanel name={name} instruction={instruction} />
			)
			rightPanelUpload = (
				<FilesRightPanel
					id={id}
					type={type}
					open={open}
					files={files}
					setFiles={setFiles}
				/>
			)
		} else {
			if (modalRatio !== 1) setModalRatio(1)
			leftPanelResult = (
				<DescriptionLeftPanel name={name} instruction={instruction} />
			)
			rightPanelResult = null
		}
	}

	/**
	 * Multiple Choice
	 */
	// ...

	return (
		<StyledTwoPanelModal
			open={open}
			closed={() => setOpen(false)}
			leftPanel={!resultView ? leftPanelUpload : leftPanelResult}
			rightPanel={!resultView ? rightPanelUpload : rightPanelResult}
			ratio={modalRatio}
			scaleX={0.8}
		>
			<ToggleView
				reverse={resultView}
				onClick={() => setResultView(!resultView)}
			>
				{!resultView ? (
					<IconLine className="sans" icon={<RightArrow />} reverse>
						See Results
					</IconLine>
				) : (
					<IconLine className="sans" icon={<LeftArrow />}>
						Back
					</IconLine>
				)}
			</ToggleView>
		</StyledTwoPanelModal>
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
		id: get(card, 'checkpoint.id'),
		name: get(card, 'checkpoint.name'),
		instruction: get(card, 'checkpoint.instruction'),
		type: get(card, 'checkpoint.checkpointType')
	}
}

export default connect(mapStateToProps)(Checkpoint)
