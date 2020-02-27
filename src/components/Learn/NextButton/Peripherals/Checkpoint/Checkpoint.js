import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { UploadLeftPanel, UploadRightPanel } from './Upload'
import TwoPanelModal from '../../../../shared/containers/TwoPanelModal'

const Checkpoint = ({ render, open, setOpen, name, instruction, type }) => {
	let leftPanel
	let rightPanel

	/**
	 * Autograder
	 */
	const [isResults, setIsResults] = useState(false)
	const [files, setFiles] = useState([])
	if (type === 'Autograder') {
		leftPanel = (
			<UploadLeftPanel
				setOpen={setOpen}
				name={name}
				instruction={instruction}
			/>
		)
		rightPanel = (
			<UploadRightPanel open={open} files={files} setFiles={setFiles} />
		)
	}

	/**
	 * Multiple Choice
	 */
	// ...

	return (
		<TwoPanelModal
			open={open}
			closed={() => setOpen(false)}
			leftPanel={leftPanel}
			rightPanel={rightPanel}
			scaleX={0.8}
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
		id: get(card, 'checkpoint.id'),
		name: get(card, 'checkpoint.name'),
		instruction: get(card, 'checkpoint.instruction'),
		type: get(card, 'checkpoint.checkpointType')
	}
}

export default connect(mapStateToProps)(Checkpoint)
