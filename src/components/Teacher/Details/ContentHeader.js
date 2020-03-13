import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import HeaderShadow from '../../shared/utils/HeaderShadow'
import IconLine from '../../shared/gadgets/IconLine'
import ProfPic from '../../shared/gadgets/ProfPic'
import Dot from '@material-ui/icons/FiberManualRecord'

const Container = styled.div`
	height: 8em;

	top: 0;
	width: 75%;
	z-index: 99;
`

const Header = styled.div`
	height: 100%;
	margin: 0;
	padding: 0 1em;
	padding-left: 3em;
	cursor: auto;
	opacity: 0;

	display: flex;
	flex-direction: column;
	justify-content: center;

	transition: 0.2s ease padding;
`

const ContentHeader = forwardRef(({ containerRef, name }, ref) => {
	return (
		<Container>
			<Header ref={ref} className="teacher-i-contentheader">
				<div>
					<AssignmentName>{name}</AssignmentName>
					<GradeStatus className="sans" icon={<Dot />} gap={'0.5em'}>
						PARTIALLY GRADED
					</GradeStatus>
				</div>
				<ProfPic
					src={require('../../../assets/icons/prof-pic.png')}
					iconSize={'2em'}
				>
					Potato
				</ProfPic>
			</Header>
			<HeaderShadow containerRef={containerRef} />
		</Container>
	)
})

const mapStateToProps = state => {
	const {
		teacherData: {
			submissions,
			indicators: { currentSubmissionIndex }
		}
	} = state

  const submission = submissions && submissions[currentSubmissionIndex]
  
	return {
		name: get(submission, 'activity.name')
	}
}

export default connect(mapStateToProps)(ContentHeader)
