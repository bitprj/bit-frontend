import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ProgressHero from './DashboardHero'
import Journey from './Journey/Journey'
import Details from './Journey/Details'
import { sizes } from '../../../styles/media'

const Container = styled.div`
	margin: 0 2em;
	display: flex;

	@media screen and (min-width: ${sizes.desktop}px) {
		margin: 0 4em;
	}
`

const Progress = ({ firstName, suggestedActivity }) => {
	return (
		<>
			<ProgressHero />
			<Container>
				<Journey />
				<Details />
			</Container>
		</>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { firstName, suggestedActivity }
	} = state

	return {
		firstName,
		suggestedActivity
	}
}

export default connect(mapStateToProps)(Progress)
