import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ActiveList from '../../shared/containers/ActiveList'
import ImgAndContent from '../../shared/gadgets/ImgAndContent'
import ClampedDiv from '../../shared/utils/ClampedDiv'

import { setCurrentSubmissionByIndex } from '../../../redux/actions/teacherData'

const StyledActiveList = styled(ActiveList)`
	font-size: 85%;
	flex-grow: 1;
`

const NavItem = styled(ImgAndContent)`
	margin: 0;
	padding: 0.5em 2em 0.5em 0;
	cursor: default;
`

const Person = styled(ClampedDiv)`
	margin: 0;
	margin-top: 0.2em;
	color: darkgreen;
	font-size: 120%;
	font-weight: bold;
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
			activeClassName={(_, index) =>
				`${currentSubmissionIndex === index ? 'strong-lift' : ''}`
			}
		>
			{(submission, index) => (
				<NavItem
					imgWidthEms="3.3"
					strongHover
					imgText={index + 1}
					// title={submission.activity.name}
					gap="0"
				>
					<Person width={'8em'} inline>
						{/* {submission.student.name} */}
					</Person>
				</NavItem>
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
