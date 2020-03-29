import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ProgressCard from './ProgressCard'
import Hero from '../../shared/gadgets/Hero'
import GoBack from '../../shared/external/GoBack'
import { setSelectedActivity } from '../../../redux/actions/learnData'

const ProgressBar = styled.div`
	margin-top: 2em;
	width: 90%;
	height: 0.5em;
	background-color: ${props =>
		props.theme.fontInvert.length === 4
			? props.theme.fontInvert + 'c'
			: props.theme.fontInvert + 'cc'};
	position: relative;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: ${props => props.progress};
		background-color: ${props => props.theme.accent};
	}
`

const StudentHero = ({
	id,
	contentUrl,

	firstName,
	onSetSelectedActivity
}) => {
	const history = useHistory()

	const handleResume = () => {
		onSetSelectedActivity({ id, contentUrl })
		history.push('/learn/')
	}

	return (
		<Hero
			title={`Welcome back ${firstName || ''}!`}
			description={
				'Coding Best Practices are a set of informal rules that the software development community has learned over time which can  help improve the quality of software'
			}
			rightPanel={
				<ProgressCard
					image={'brickwall'}
					id={id}
					contentUrl={contentUrl}
					onClickButton={handleResume}
				/>
			}
		/>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { firstName, suggestedActivity }
	} = state

	const { id, contentUrl } = suggestedActivity

	return {
		id,
		contentUrl,
		firstName
	}
}

const mapDispatchToProps = dispatch => ({
	onSetSelectedActivity: ({ id, contentUrl }) =>
		dispatch(setSelectedActivity({ id, contentUrl }))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentHero)
