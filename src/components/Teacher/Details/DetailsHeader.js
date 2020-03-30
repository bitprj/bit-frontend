import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import IconLine from '../../shared/gadgets/IconLine'
import ProfPic from '../../shared/gadgets/ProfPic'
import ClampedDiv from '../../shared/utils/ClampedDiv'
import Dot from '@material-ui/icons/FiberManualRecord'

const Container = styled.div`
	padding: 1em 2em;
	flex-shrink: 0;
	position: fixed;
	bottom: 0;
	width: 100%;

	background-color: ${props => props.theme.bg};
	color: ${props => props.theme.offFont};
`

const AssignmentName = styled(ClampedDiv)`
	margin-top: 0;
	margin-bottom: 0.5em;
	font-weight: bold;
	font-size: 120%;
	width: 12em;
`

const GradeStatus = styled(IconLine)`
	margin-top: 0;
	font-weight: bold;
	font-size: 80%;
	line-height: 2em;
	color: ${props => props.theme.warning};
`

const DetailsHeader = ({ activityName, studentName }) => {
	return (
		<Container>
			<GradeStatus className="sans" icon={<Dot />} gap={'0.5em'}>
				PARTIALLY GRADED
			</GradeStatus>
			<AssignmentName>{`${activityName}`}</AssignmentName>
			<ProfPic
				src={
					'http://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg'
				}
				iconSize={'2em'}
			>
				{`${studentName}`}
			</ProfPic>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		teacherData: {
			submissions,
			indicators: { currentSubmissionIndex }
		}
	} = state

	const submission = submissions && submissions[currentSubmissionIndex]

	return {
		activityName: get(submission, 'activity.name'),
		studentName: get(submission, 'student.name')
	}
}

export default connect(mapStateToProps)(DetailsHeader)
