import React from 'react'
import styled from 'styled-components'

import PostModal from '../../shared/containers/PostModal'
import ProgressBar from '../../shared/gadgets/ProgressBar'
import Button from '../../shared/gadgets/Button'
import ClampedText from '../../shared/utils/ClampedText'

const Header = styled.div`
	padding: 0 3em;
	display: flex;
	flex-direction: column;
	justify-content: center;
  width: 69%;
  height: 100%;
`

const Content = styled.div`
	margin: 0;
	padding: 0 3em;
	display: flex;
	align-items: center;
`

const LearningObjectives = styled.div`
	margin-right: 3em;
	padding: 1em 0;
	white-space: pre-line;
	flex: 2;
	overflow-y: auto;
`

const Prerequisites = styled.div`
	flex: 1.4;
`

const Card = styled.div`
	margin-bottom: 0.5em;
	padding: 1em 2em;
	box-shadow: 0px 4px 25px #0002;
	border-radius: 0.3em;
`

const SmallText = styled.p`
	font-size: 75%;
`
const SmallerText = styled.p`
	font-size: 60%;
`
const SmallClampedText = styled(ClampedText)`
	font-size: 75%;
`

const ActivityModal = props => {
	const header = (
		<Header>
			<h2 style={{ margin: '0.5em 0' }}>{props.name}</h2>
			<SmallClampedText clamp="3">{props.description}</SmallClampedText>
			<ProgressBar
				style={{ marginTop: '1em', height: '0.4em' }}
				width={'69%'}
				progress={'44%'}
			/>
		</Header>
	)

	const content = (
		<Content>
			<LearningObjectives>
				<h3 style={{ marginTop: '0.5em' }}>Learning Objectives</h3>
				<pre>
					<SmallText>{props.learningObjectives}</SmallText>
				</pre>
			</LearningObjectives>
			<Prerequisites>
				<h3 style={{ marginTop: '0.5em' }}>Prerequisites</h3>
				<Card>
					<SmallerText style={{ margin: 0 }}>Completion</SmallerText>
					<SmallText style={{ margin: 0 }}>Introduction to GitHub</SmallText>
				</Card>
				<Card>
					<SmallerText style={{ margin: 0 }}>Completion</SmallerText>
					<SmallText style={{ margin: 0 }}>Introduction to GitHub</SmallText>
				</Card>
			</Prerequisites>
		</Content>
	)

	return (
		<PostModal
			open={props.open}
			closed={props.closed}
			header={header}
			content={content}
			ratio={0.4}
		>
			<Button invert sharp margin="0">
				Continue
			</Button>
		</PostModal>
	)
}

export default ActivityModal
