import React from 'react'

import ProgressHero from './DashboardHero'
import Journey from './Journey/Journey'
import OldJourney from './Journey/unused/Journey'

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
