import React from 'react'
import styled from 'styled-components'

import { Card } from '../Autograder/Home'
import MediaLightbox, {
	TYPE_IMAGE,
	TYPE_VIDEO
} from '../../../../shared/gadgets/MediaLightbox'
import TwoPanel from '../../../../shared/containers/TwoPanel'
import Button from '../../../../shared/gadgets/Button'

import { UPLOAD } from '../Checkpoint'

const uploadCardsSvg = require('../../../../../assets/icons/upload-cards.svg')

const Instruction = styled.div`
	padding-top: 1em;
	padding-right: 1em;
`

const StyledTwoPanel = styled(TwoPanel)`
	padding: 0 4em 2em;
	padding-right: 2em;
`

const Resubmit = styled(Button)`
	position: absolute;
	right: 2em;
	bottom: 1em;
`

const Home = ({
	pushView,
	type: checkpointType,
	instruction = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
	progress
}) => {
	return (
		<StyledTwoPanel
			fullSizeOffAxis
			first={<Instruction>{instruction}</Instruction>}
			second={
				progress?.content ? (
					<MediaLightbox
						type={checkpointType === 'Video' ? TYPE_VIDEO : TYPE_IMAGE}
						src={progress.content}
					/>
				) : (
					<Card
						icon={uploadCardsSvg}
						title="Upload or Drag File"
						description="Drag your files to the Browser"
						onClick={() => pushView(UPLOAD)}
					/>
				)
			}
		>
			{progress?.content && (
				<Resubmit invert onClick={() => pushView(UPLOAD)}>
					Resubmit
				</Resubmit>
			)}
		</StyledTwoPanel>
	)
}

export default Home
