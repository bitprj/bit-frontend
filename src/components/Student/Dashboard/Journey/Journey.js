import React from 'react'
import { Stack } from '@chakra-ui/core'
import { connect } from 'react-redux'

import Floating from './Floating'
import Progress, { TYPE_JOURNEY } from './Progress'

const Journey = ({ hasProgress, inprogressModules }) => {
	return (
		hasProgress && (
			<Stack isInline spacing="6em" justify="center" align="center" p="3em">
				<Floating id={inprogressModules?.[0]?.id} />
				<Progress variant={TYPE_JOURNEY} id={inprogressModules?.[0]?.id} />
			</Stack>
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
