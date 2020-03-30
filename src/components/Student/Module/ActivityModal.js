import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'

import PostModal from '../../shared/containers/PostModal'
import ProgressBar from '../../shared/gadgets/ProgressBar'
import Button from '../../shared/gadgets/Button'
import ClampedText from '../../shared/utils/ClampedText'

import { setSelectedActivity } from '../../../redux/actions/learnData'

const Header = styled.div`
	padding: 0 3em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 69%;
	height: 100%;
`

const Content = styled.div`
	height: 100%;
	margin: 0;
	padding: 0 3em;
	display: flex;
`

const LearningObjectives = styled.div`
	margin-right: 3em;
	padding: 1em;
	padding-left: 0;
	white-space: pre-line;
	flex: 2;
`

const Prerequisites = styled.div`
	padding: 1em;
	padding-right: 0;
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

const StyledButton = styled(Button)`
	margin: 0;
	border-radius: 0;
`

const ActivityModal = ({
	open,
	closed,
	id,
	contentUrl,
	name,
	description,
	learningObjectives = `Coding best practices are a set of informal rules that the software development community has learned over time which can help improve the quality of software.\n\nCoding best practices are a set of informal rules that the software development community has learned over time which can help improve the quality of software.`,
	onSetSelectedActivity
}) => {
	const history = useHistory()

	const handleResume = () => {
		onSetSelectedActivity({ id, contentUrl })
		setTimeout(() => history.push('/learn/'), 0)
	}

	const header = (
		<Header>
			<h2 style={{ margin: '0.5em 0' }}>{name}</h2>
			<SmallClampedText clamp="3">{description}</SmallClampedText>
			<ProgressBar
				style={{ marginTop: '1em', height: '0.4em' }}
				width={'69%'}
				progress={'44%'}
			/>
		</Header>
	)

	const content = (
		<Content>
			<LearningObjectives className="low-profile-scrollbar only-hover">
				<h3 style={{ marginTop: '0.5em' }}>Learning Objectives</h3>
				<pre>
					<SmallText>{learningObjectives}</SmallText>
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
			open={open}
			closed={closed}
			header={header}
			content={content}
			ratio={0.4}
		>
			<StyledButton invert onClick={handleResume}>
				Start
			</StyledButton>
		</PostModal>
	)
}

const mapDispatchToProps = dispatch => ({
	onSetSelectedActivity: ({ id, contentUrl }) =>
		dispatch(setSelectedActivity({ id, contentUrl }))
})

export default connect(null, mapDispatchToProps)(ActivityModal)
