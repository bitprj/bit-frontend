import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Floating from './Floating'
import Progress, { TYPE_JOURNEY } from './Progress'

import Scrollable from '../../../shared/containers/Scrollable'

const Container = styled.div`
	padding: 3em;
	display: flex;
	justify-content: center;
	align-items: center;

	> *:first-child {
		margin-right: 4em;
	}
`

const ScrollableWrapper = styled.div`
	position: relative;
`

const StyledScrollable = styled(Scrollable)`
	padding: 2.5em 2em;

	section:not(:last-of-type) {
		margin-bottom: 4em;
	}
`

const Journey = ({ hasProgress, inprogressModules }) => {
	console.log(inprogressModules)
	return (
		hasProgress && (
			<Container>
				<Floating id={inprogressModules?.[inprogressModules.length - 1]?.id} />

				<ScrollableWrapper>
					<StyledScrollable height="24em">
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
					</StyledScrollable>
				</ScrollableWrapper>
			</Container>
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
