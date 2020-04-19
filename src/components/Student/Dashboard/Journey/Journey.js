import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Floating from './Floating'
import Progress, { TYPE_JOURNEY } from './Progress'

import Scrollable from '../../../shared/containers/Scrollable'
import TwoPanel from '../../../shared/containers/TwoPanel'

const Container = styled.div``

const ModulesContainer = styled.div`
	padding: 2.5em 2em;

	section:not(:last-of-type) {
		margin-bottom: 4em;
	}
`

const Journey = ({ hasProgress, inprogressModules }) => {
	console.log(inprogressModules)
	return (
		hasProgress && (
			<TwoPanel
				ratio={0.55}
				firstCenterX
				firstStyle={{ overflow: 'visible' }}
				first={
					<Floating
						id={inprogressModules?.[inprogressModules.length - 1]?.id}
					/>
				}
				second={
					<ModulesContainer>
						{inprogressModules
							?.slice()
							.reverse()
							.map(im => {
								return (
									<Progress
										key={`student-module-inprogress-${im.id}`}
										className="journey-module"
										variant={TYPE_JOURNEY}
										id={im.id}
									/>
								)
							})}
					</ModulesContainer>
				}
			/>
		)
	)
}

const mapStateToProps = state => {
	const {
		studentData: { inprogressModules, completedModules, incompleteModules }
	} = state

	const hasProgress =
		!!inprogressModules?.length ||
		!!completedModules?.length ||
		!!incompleteModules?.length

	return { hasProgress, inprogressModules }
}

export default connect(mapStateToProps)(Journey)
