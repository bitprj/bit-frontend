import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { Divider } from '@chakra-ui/core'
import GradeStatus from '../../shared/gadgets/GradeStatus'
import ProfPic from '../../shared/gadgets/ProfPic'
import ClampedDiv from '../../shared/utils/ClampedDiv'
import Dot from '@material-ui/icons/FiberManualRecord'

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

const DetailsHeader = ({ activityName, studentName }) => {
	return (
		<Container>
			<GradeStatus status="warning">PARTIALLY GRADED</GradeStatus>
			<AssignmentName>{activityName}</AssignmentName>
			<ProfPic
				src={
					'http://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg'
				}
				iconSize={'2em'}
			>
				{studentName}
			</ProfPic>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		cache: { cachedActivities, cachedStudents },
		teacherData: {
			submissions,
			indicators: { currentSubmissionIndex }
		}
	} = state

	const { activityId, studentId } =
		submissions.submissions?.[currentSubmissionIndex] ?? {}

	const activityName = cachedActivities[activityId]?.name

	const studentName = cachedStudents[studentId]?.name

	return {
		activityName,
		studentName
	}
}

export default connect(mapStateToProps)(DetailsHeader)
