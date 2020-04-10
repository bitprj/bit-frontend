import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Divider } from '@chakra-ui/core'
import GradeStatus from '../../shared/gadgets/GradeStatus'
import ProfPic from '../../shared/gadgets/ProfPic'
import ClampedDiv from '../../shared/utils/ClampedDiv'

const Container = styled.div`
	padding: 1em 2em;
	flex-shrink: 0;
	width: 100%;
`

const AssignmentName = styled(ClampedDiv)`
	margin-top: 0;
	margin-bottom: 0.5em;
	font-weight: bold;
	font-size: 120%;
	width: 12em;
`

const DetailsHeader = ({ isReady, activity, student, feedbacksArray }) => {
	const isAllowedToSubmit = feedbacksArray?.every(
		feedback => feedback?.isPassed !== undefined && feedback?.comment
	)

	const hasNotStarted = feedbacksArray?.every(
		feedback => feedback?.isPassed === undefined && !feedback?.comment
	)

	return (
		isReady && (
			<Container>
				<div style={{ fontSize: '75%' }}>
					<GradeStatus
						status={(() => {
							if (isAllowedToSubmit) return 'success'
							if (hasNotStarted) return 'fatal'
							return 'warning'
						})()}
					>
						{(() => {
							if (isAllowedToSubmit) return 'READY TO SUBMIT'
							if (hasNotStarted) return 'NOT STARTED'
							return 'PARTIALLY GRADED'
						})()}
					</GradeStatus>
				</div>
				<AssignmentName>{activity?.name}</AssignmentName>
				<ProfPic name={student?.name} src={student?.image} />
			</Container>
		)
	)
}

const mapStateToProps = state => {
	const {
		cache: { cachedActivities, cachedStudents },
		teacherData: {
			submissions,
			indicators: { currentSubmissionIndex },
			ram: { feedbacks }
		}
	} = state

	const { studentId, student, activity, checkpoints } =
		submissions?.[currentSubmissionIndex] ?? {}

	const feedbacksArray = checkpoints?.map(checkpoint => {
		const { id: checkpointId } = checkpoint.checkpoint
		return feedbacks[`student${studentId}_checkpoint${checkpointId}`]
	})

	return {
		isReady: !!submissions.length,
		activity: cachedActivities[activity?.id],
		student: cachedStudents[studentId ?? student?.id],
		feedbacksArray
	}
}

export default connect(mapStateToProps)(DetailsHeader)
