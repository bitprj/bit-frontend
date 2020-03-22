import React from 'react'
import styled from 'styled-components'

import MediaLightbox, {
	TYPE_IMAGE,
	TYPE_VIDEO
} from '../../shared/gadgets/MediaLightbox'
import Dot from '@material-ui/icons/FiberManualRecord'

import MarkdownArea from '../../shared/external/MarkdownArea'
import ThreeCheckbox from '../../shared/gadgets/ThreeCheckbox'
import IconLine from '../../shared/gadgets/IconLine'

const selectTypeColor = props => {
	const mode = props.theme.muted
	switch (props.type) {
		case 'IMAGE':
			return mode.red
		case 'VIDEO':
			return mode.yellow
		case 'GRADER':
			return mode.magenta
		case 'SHORT ANSWER':
			return mode.cyan
		default:
			break
	}
}

const Container = styled.section`
	margin: 3em 5em 3em 2em;
	display: flex;
	font-size: 75%;
`

const CheckArea = styled.div`
	padding: 1.8em 1.2em 0 0;
	flex-shrink: 0;
`

const Content = styled.div`
	min-width: 0; // fixes text-expansion
`

const Type = styled(IconLine)`
	font-weight: bold;
	font-size: 100%;
	line-height: 2em;
	color: ${props => selectTypeColor(props)};
`

const Name = styled.h1`
	margin: 0;
	margin-bottom: 0.3em;
`

const Question = styled.div`
	font-size: 115%;
`

const MediaContainer = styled.div`
	margin: 2em 0;
	height: 18em;
	display: flex;
	justify-content: center;
`

const Checkpoints = ({
	type,
	name,
	question = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
	content
}) => {
	const selectContent = () => {
		switch (type) {
			case 'IMAGE':
				return <MediaLightbox type={TYPE_IMAGE} src={content} />

			case 'VIDEO':
				return <MediaLightbox type={TYPE_VIDEO} src={content} />

			case 'GRADER':

			default:
				break
		}
	}

	return (
		<Container>
			<CheckArea>
				<ThreeCheckbox />
			</CheckArea>
			<Content>
				<Type className="sans" icon={<Dot />} gap={'0.5em'} type={type}>
					{type.toUpperCase()}
				</Type>
				<Name>{name}</Name>
				<Question>{question}</Question>
				<MediaContainer>{selectContent()}</MediaContainer>
				<MarkdownArea onChange={contents => console.log(contents)} />
			</Content>
		</Container>
	)
}

export default Checkpoints
