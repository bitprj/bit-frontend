import React from 'react'
import { Stack } from '@chakra-ui/core'
import { connect } from 'react-redux'

import Floating from './Floating'
import Progress, { TYPE_JOURNEY } from './Progress'

const Journey = ({ inprogressModules }) => {
	console.log(inprogressModules)

	return (
		<Stack isInline spacing="6em" justify="center" align="center" m="3em">
			<Floating />
			<Progress /*variant={TYPE_JOURNEY}*/ id={inprogressModules?.[0]?.id} />
		</Stack>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { inprogressModules }
	} = state

	return { inprogressModules }
}

export default connect(mapStateToProps)(Journey)
