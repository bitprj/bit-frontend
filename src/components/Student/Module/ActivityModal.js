import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'

import PostModal from '../../shared/containers/PostModal'
import ProgressBar from '../../shared/low/ProgressBar'
import Button from '../../shared/low/Button'
import ClampedText from '../../shared/utils/ClampedText'

import { setSelectedActivity } from '../../../redux/actions/learnData'
import { updateModuleActivityProgress } from '../../../redux/actions/studentData'
import { setSuggestedActivity } from '../../../services/StudentService'

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
const SmallClampedText = styled(ClampedText)`
	font-size: 75%;
`

const StyledButton = styled(Button)`
	margin: 0;
	border-radius: 0;
`

const ProgressButton = ({ status, locked, handleResume }) => {
	const showButtonText = () => {
		if (locked) return 'Locked'
		switch (status) {
			case 'completed':
				return 'Completed'
			case 'inprogress':
				return 'Resume'
			case 'incomplete':
				return 'Start'
			default:
				return 'Loading...'
		}
	}

	return (
		<StyledButton
			invert
			disabled={locked}
			completed={status === 'completed'}
			onClick={handleResume}
		>
			{showButtonText()}
		</StyledButton>
	)
}

const ActivityModal = ({
	id,

	studentId,
	moduleId,
	isModuleProgressReady,
	open,
	closed,
	name,
	description,
	learningObjectives,
	prerequisiteActivities,
	status,

	onSetSelectedActivity,
	onUpdateModuleActivityProgress
}) => {
	const history = useHistory()

	const handleResume = () => {
		if (!isModuleProgressReady) return

		onSetSelectedActivity({ id, moduleId })
		setSuggestedActivity(studentId, id, moduleId).then(_ => {})

		if (status !== 'completed')
			onUpdateModuleActivityProgress(moduleId, id, 'inprogress')

		history.push('/learn/')
	}

	const header = (
		<Header>
			<h2 style={{ margin: '0.5em 0' }}>{name}</h2>
			<SmallClampedText clamp="3">{description}</SmallClampedText>
			{/* <ProgressBar
				style={{ marginTop: '1em', height: '0.4em' }}
				width={'69%'}
				progress={'44%'}
			/> */}
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
			{prerequisiteActivities?.length !== 0 && (
				<Prerequisites>
					<h3 style={{ marginTop: '0.5em' }}>Prerequisites</h3>
					{prerequisiteActivities?.map(pa => (
						<Card>
							<SmallText>Introduction to GitHub</SmallText>
						</Card>
					))}
				</Prerequisites>
			)}
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
			<ProgressButton status={status} handleResume={handleResume} />
		</PostModal>
	)
}

const mapStateToProps = state => {
	const {
		account: { meta }
	} = state
	const { studentId } = meta ?? {}
	return {
		studentId
	}
}

const mapDispatchToProps = dispatch => ({
	onSetSelectedActivity: ({ id, moduleId }) =>
		dispatch(setSelectedActivity({ id, moduleId })),
	onUpdateModuleActivityProgress: (moduleId, id, actionType) =>
		dispatch(updateModuleActivityProgress(moduleId, id, actionType))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal)
