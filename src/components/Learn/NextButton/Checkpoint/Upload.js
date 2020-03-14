import React, { useState, useEffect, useRef, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import anime from 'animejs'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'

import Icon from '../../../shared/gadgets/Icon'
import IconArea from '../../../shared/gadgets/IconArea'

import { initSubmitCheckpointProgress } from '../../../../redux/actions/learnData'

import { LOADING } from './Checkpoint'

const uploadCardsSvg = require('../../../../assets/icons/upload-cards.svg')

const selectColor = props => {
	if (props.isDragAccept) {
		return props.theme.accent
	}
	if (props.isDragReject) {
		return props.theme.pastel.red
	}
	if (props.isDragActive) {
		return '#2196f3'
	}
	return '#eeeeee'
}

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background-color: #fafafa;
	outline: none;

	box-shadow: inset 0 0 20em 5em ${props => selectColor(props)}55;

	transition: box-shadow 0.24s ease-in-out;
`

const Error = styled.p`
	margin: 0;
	color: ${props => props.theme.pastel.red};
`

const Upload = ({
	pushView,

	activityId,
	checkpointId,
	type,
	onInitSubmitCheckpointProgress
}) => {
	const themeContext = useContext(ThemeContext)

	const {
		acceptedFiles,
		rejectedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject
	} = useDropzone({
		accept:
			'zip,application/zip,application/x-zip,application/x-zip-compressed',
		multiple: false
	})

	const containerRef = useRef(null)

	const [error, setError] = useState(false)

	useEffect(() => {
		if (acceptedFiles.length) {
			if (acceptedFiles[0].name === 'src.zip') {
				setError(false)
				onInitSubmitCheckpointProgress(
					activityId,
					checkpointId,
					type,
					acceptedFiles[0]
				)
				pushView(LOADING)
			} else {
				setError(true)
				anime({
					targets: containerRef,
					boxShadow: [
						'inset 0 0 20em 5em #0000',
						`inset 0 0 20em 5em ${themeContext.pastel.red}55`
					],
					duration: 1000,
					direction: 'alternate'
				})
			}
		}
	}, [acceptedFiles])

	useEffect(() => {
		if (rejectedFiles.length) {
			setError(true)
		}
	}, [rejectedFiles])

	return (
		<Container
			ref={containerRef}
			{...getRootProps({ isDragActive, isDragAccept, isDragReject })}
		>
			<input {...getInputProps()} />
			<IconArea icon={<Icon src={uploadCardsSvg} />} gap="0.75em">
				<div>
					<h3 style={{ margin: 0 }}>Upload or Drag File</h3>
					<p style={{ margin: 0 }}>
						Drag your <code>src.zip</code> to the browser
					</p>
					{error && (
						<Error>
							Make sure you upload a <code>src.zip</code> file
						</Error>
					)}
				</div>
			</IconArea>
		</Container>
	)
}

const mapDispatchToProps = dispatch => ({
	onInitSubmitCheckpointProgress: (activityId, checkpointId, type, content) =>
		dispatch(
			initSubmitCheckpointProgress(activityId, checkpointId, type, content)
		)
})

export default connect(null, mapDispatchToProps)(Upload)
