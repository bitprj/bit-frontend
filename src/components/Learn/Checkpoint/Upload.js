import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import TwoPanelModal from '../../shared/containers/TwoPanelModal'

import Button from '../../shared/gadgets/Button'
import Icon from '../../shared/gadgets/Icon'
import IconLine from '../../shared/gadgets/IconLine'
import LeftArrow from '@material-ui/icons/KeyboardArrowLeftRounded'

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const LeftPanel = styled.div`
	padding: 2em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	text-align: center;
	position: relative;
`
const CheckpointIcon = styled(Icon)`
	width: 100%;
`

const CancelButton = styled(Button)`
	padding-left: 1em;
	position: absolute;
	left: 1em;
	bottom: 1em;
	border: 0;
`

const RightPanel = styled.div`
	padding: 2em;
	padding-left: 0;
	width: 100%;
	height: 100%;
	color: white;
	position: relative;

	.filepond--wrapper,
	.filepond--root {
		// .filepond--drop-label {
		height: 100%;
	}
	// upload
	.filepond--panel-root {
		border-radius: 1em;
		background-color: ${props => props.theme.bg};
		box-shadow: 0px 4px 1.5em rgba(0, 0, 0, 0.075);
	}
	// drag/drop area
	.filepond--drop-label {
		margin: 1em;
		border-radius: 1em;
		background-color: ${props => props.theme.accentVariant}26;
		color: #fff;
	}
	.filepond--drop-label > label {
		cursor: pointer;
	}
	// browse underline
	.filepond--label-action {
		text-decoration-color: #fff;
	}
	// upload list
	.filepond--list.filepond--list {
		margin-top: 1.5em;
	}
`

const UploadIconWrapper = styled.div`
	margin: 2em;
	margin-left: 0;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0.15;
	pointer-events: none;

	&.invisible {
		opacity: 0;
	}
`

const UploadButtonWrapper = styled.div`
	margin-right: 2em;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 2.75em;
	display: flex;
	justify-content: center;
`

const UploadButton = styled(Button)`
	border: 0;
`

const Upload = ({ open, setOpen }) => {
	const required = 4

	const filePondRef = useRef(undefined)
	const [files, setFiles] = useState([])
	// console.log(files)
	const upload = () => {}

	// console.log(open, filePondRef.current)
	// useEffect(() => {
	// 	console.log(filePondRef.current)
	// 	if (filePondRef.current && files.length) {
	// 		filePondRef.current.addFiles(files)
	// 		console.log('files added!')
  // 	}
  //  cleanup...
	// }, [open, filePondRef.current])

	useEffect(() => {
		const uploadIcon = document.getElementById('learn-r-uploadicon')
		uploadIcon && uploadIcon.classList.toggle('invisible')
	}, [!!files.length])

	const leftPanel = (
		<LeftPanel>
			<CheckpointIcon src={require('../../../assets/icons/checkpoint.svg')} />
			<div style={{ marginBottom: '5em' }}>
				<h1 style={{ margin: 0, fontSize: '1.6em' }}>Check Point</h1>
				<p style={{ marginTop: '0.5em', marginBottom: 0 }}>
					Upload solution.py to make sure that it satisfies all of the test
					cases mentioned before
				</p>
			</div>
			<CancelButton onClick={() => setOpen(false)}>
				<IconLine icon={<LeftArrow />}>Cancel</IconLine>
			</CancelButton>
		</LeftPanel>
	)

	const rightPanel = (
		<RightPanel>
			<FilePond
				ref={filePondRef}
				allowMultiple={true}
				maxFiles={required}
				onupdatefiles={files => setFiles(files)}
				styleItemPanelAspectRatio={1 / required}
			/>
			<UploadIconWrapper id="learn-r-uploadicon" className="transition-long">
				<Icon src={require('../../../assets/icons/upload.svg')} />
			</UploadIconWrapper>
			<UploadButtonWrapper>
				<UploadButton className="hover-raise" invert onClick={upload}>
					Submit
				</UploadButton>
			</UploadButtonWrapper>
		</RightPanel>
	)

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

export default Upload

export const UploadRightPanel = () => {
	useEffect(() => {
		// const filepondText = document.querySelector('.filepond--drop-label')
		// filepondText.insertBefore(
		// 	<Icon src={require('../../../assets/icons/checkpoint.svg')} />,
		// 	filepondText.childNodes[0]
		// )
	}, [])
}
