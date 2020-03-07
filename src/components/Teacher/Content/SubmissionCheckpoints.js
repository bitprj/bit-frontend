import React from 'react'
import styled from 'styled-components'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import Dot from '@material-ui/icons/FiberManualRecord'

import ThreeCheckbox from './ThreeCheckbox'
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
`

const Image = styled.img`
	margin: 0 auto;
	max-width: 100%;
	max-height: 100%;
`

const Video = styled.video`
	margin: 0 auto;
	max-width: 100%;
	max-height: 100%;
`

const Comments = styled(ReactQuill)`
	border-radius: 0.5em;
	overflow-y: auto;
	width: 100%;
`

const Checkpoints = ({
	type,
	name,
	question = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
	content
}) => {
	const selectContent = () => {
		switch (type) {
			case 'IMAGE': {
				return (
					<a data-src={content} data-fancybox>
						<Image className="strong-lift" src={content} />
					</a>
				)
			}

			case 'VIDEO': {
				return (
					<Video className="strong-lift" controls>
						<source src={content} type="video/mp4" />
					</Video>
				)
			}

			case 'GRADER': {
			}

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
				<Comments
					className="strong-lift"
					theme="bubble"
					placeholder="Comments..."
					preserveWhitespace
					onChange={(content, delta, source, editor) => {
						// console.log(content, delta, source, editor)
						console.log(content, editor.getContents().ops[0])
					}}
				/>
			</Content>
		</Container>
	)
}

export default Checkpoints
