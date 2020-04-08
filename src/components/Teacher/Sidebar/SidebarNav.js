import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import NavItem from './NavItem'
import ActiveList from '../../shared/containers/ActiveList'
import ClampedDiv from '../../shared/utils/ClampedDiv'

import { setCurrentSubmissionByIndex } from '../../../redux/actions/teacherData'

const StyledActiveList = styled(ActiveList)`
	font-size: 85%;
	flex-grow: 1;
`

const SidebarNav = ({
	submissions,
	currentSubmissionIndex,
	onSetCurrentSubmissionByIndex
}) => {
	return (
		<StyledActiveList
			className="teacher-i-sidebar"
			identifier="teacher"
			itemList={submissions}
			selectCallback={(_, index) => {
				if (index !== currentSubmissionIndex)
					onSetCurrentSubmissionByIndex(index)
			}}
		>
			{(submission, index) => (
				<NavItem
					className={currentSubmissionIndex === index ? `active` : ''}
					activityId={submission.activity.id}
					studentId={submission.studentId}
				/>
			)}
		</StyledActiveList>
	)
}

const mapStateToProps = state => {
	const {
		teacherData: {
			submissions,
			indicators: { currentSubmissionIndex }
		}
	} = state

	return {
		submissions,
		currentSubmissionIndex
	}
}

const mapDispatchToProps = dispatch => ({
	onSetCurrentSubmissionByIndex: submissionIndex =>
		dispatch(setCurrentSubmissionByIndex(submissionIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav)
