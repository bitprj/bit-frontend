import React from 'react'
import { Stack } from '@chakra-ui/core'
import { connect } from 'react-redux'

import Floating from './Floating'
import Progress from './Progress'

const Journey = ({ inprogressModules }) => {
	console.log(inprogressModules)

	return (
		<Stack isInline m="3em 8em">
			<Floating />
			<Progress />
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
