import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'
import ReactMarkdown from 'react-markdown'
import { updateFeedbacks } from '../../../redux/actions/teacherData'

import MediaLightbox, {
	TYPE_IMAGE,
	TYPE_VIDEO
} from '../../shared/gadgets/MediaLightbox'
import Dot from '@material-ui/icons/FiberManualRecord'
import Autograder from '../../Learn/Checkpoint/Autograder/Result'

import MarkdownArea from '../../shared/external/MarkdownArea'
import ThreeCheckbox from '../../shared/gadgets/ThreeCheckbox'
import IconLine from '../../shared/gadgets/IconLine'
import withApiCache, { CACHE_CHECKPOINT } from '../../HOC/WithApiCache'

const selectTypeColor = props => {
	const mode = props.theme.muted
	switch (props.type) {
		case 'Image':
			return mode.red
		case 'Video':
			return mode.yellow
		case 'Autograder':
			return mode.magenta
		case 'Short Answer':
			return mode.cyan
		case 'Multiple Choice':
			return mode.orange
		default:
			break
	}
}

const Container = styled.section`
	margin: 3em 5em 3em 2.5em;
	display: flex;
	font-size: 75%;
`

const CheckArea = styled.div`
	padding: 1.8em 1.2em 0 0;
	flex-shrink: 0;
`

const ContentContainer = styled.div`
	width: 100%;
	min-width: 0; // fixes text-expansion
`

const Type = styled(IconLine)`
	font-weight: bold;
	font-size: 100%;
	line-height: 2em;
	color: ${props => selectTypeColor(props)};
`

const Instruction = styled.div`
	font-size: 115%;
`

const Content = styled.div`
	margin: 1.5em 0 2em;
	font-style: italic;
`

const NormalizedReactMarkdown = styled(ReactMarkdown)`
	* {
		margin: 0;
	}
`

const Checkpoint = ({
	id,
	studentId,
	wac_data: [checkpoint],

	content,
	studentComment,
	feedback,

	onUpdateFeedbacks
}) => {
	const { name, instruction, checkpointType: type } = checkpoint ?? {}
	const isReady = !!name

	const updateFeedback = changes => {
		onUpdateFeedbacks(studentId, id, changes)
	}

	useEffect(() => {
		updateFeedback({ checkpointId: id })
	}, [id])

	const selectContent = () => {
		switch (type) {
			case 'Image':
				return (
					<MediaLightbox
						className="strong-lift"
						type={TYPE_IMAGE}
						src={content}
						ratio={16 / 9}
					/>
				)

			case 'Video':
				return (
					<MediaLightbox
						className="strong-lift"
						type={TYPE_VIDEO}
						src={content}
						ratio={16 / 9}
					/>
				)

			case 'Autograder':
				const { submissions } = content ?? {}
				if (submissions === undefined) return null
				return <Autograder results={submissions[0].results} />

			case 'Short Answer':
				return <p>{content}</p>

			case 'Multiple Choice':

			default:
				break
		}
	}

	return (
		isReady && (
			<Container>
				<CheckArea>
					<ThreeCheckbox
						initialState={feedback?.isPassed}
						onChange={state => {
							updateFeedback({
								isPassed: state
							})
						}}
					/>
				</CheckArea>
				<ContentContainer>
					<Type className="sans" icon={<Dot />} gap={'0.5em'} type={type}>
						{type?.toUpperCase()}
					</Type>
					<NormalizedReactMarkdown source={`# ${name || ''}`} />
					<Instruction>
						<ReactMarkdown source={instruction} />
					</Instruction>
					<Content>{selectContent()}</Content>
					<MarkdownArea
						initialValue={feedback?.comment}
						onChange={contents => updateFeedback({ comment: contents })}
					/>
				</ContentContainer>
			</Container>
		)
	)
}

const mapStateToProps = (state, ownProps) => {
	const {
		teacherData: {
			ram: { feedbacks }
		}
	} = state

	const { id, studentId } = ownProps

	return {
		studentId,
		feedback: feedbacks[`student${studentId}_checkpoint${id}`]
	}
}

const mapDispatchToProps = dispatch => ({
	onUpdateFeedbacks: (studentId, checkpointId, feedbackChanges) =>
		dispatch(updateFeedbacks(studentId, checkpointId, feedbackChanges))
})

const enhancer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withApiCache([CACHE_CHECKPOINT])
)

export default enhancer(Checkpoint)
