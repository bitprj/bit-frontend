import React from 'react'
import styled from 'styled-components'

import ProfPic from '../../shared/low/ProfPic'

import withApiCache, {
	CACHE_ACTIVITY,
	CACHE_USER
} from '../../HOC/WithApiCache'

const Activity = withApiCache([CACHE_ACTIVITY])(({ wac_data: [activity] }) => (
	<h3 style={{ margin: 0, marginBottom: '0.5em' }}>{activity?.name}</h3>
))

const Student = withApiCache([CACHE_USER])(({ wac_data: [user] }) => (
	<div>
		<ProfPic
			name={user?.name === 'None' ? user?.githubUsername : user?.name}
			src={user?.image}
		/>
		{/* <Stack isInline spacing={3} align="center" flex={1}>
			<span>{activity?.time}</span>
		</Stack> */}
	</div>
))

const Container = styled.div`
	margin: 0.5em;
	padding: 1em 1.5em;
	border-radius: 0.5em;
	color: white;

	cursor: pointer;
	transition: 0.2s ease background-color;

	&.active,
	:hover {
		background-color: ${props => props.theme.accent}44;
	}
`

const NavItem = ({ className, activityId, userId, studentId }) => {
	return (
		<Container className={className}>
			<Activity id={activityId} />
			<Student id={userId} />
		</Container>
	)
}

export default NavItem
