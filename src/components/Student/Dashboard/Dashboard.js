import React from 'react'
import styled from 'styled-components'

import ProgressHero from './DashboardHero'
import Journey from './Journey/Journey'
import OldJourney from './Journey/unused/Journey'
import { sizes } from '../../../styles/media'

const Container = styled.div`
	margin: 0 2em;
	display: flex;

	@media screen and (min-width: ${sizes.desktop}px) {
		margin: 0 4em;
	}
`

const Progress = ({}) => {
	return (
		<>
			<ProgressHero />
			<Journey />
			<OldJourney />
		</>
	)
}

export default Progress
