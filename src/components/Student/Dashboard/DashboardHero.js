import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ProgressCard from './ProgressCard'
import Hero from '../../shared/gadgets/Hero'
import { setSelectedActivity } from '../../../redux/actions/learnData'

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
