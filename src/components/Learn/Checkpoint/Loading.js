import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Icon from '../../shared/gadgets/Icon'
import { AUTOGRADER } from './Checkpoint'

import { resetSubmittedCheckpointSuccessful } from '../../../redux/actions/learnData'

const autograderLoading = require('../../../assets/icons/autograder-loading.svg')

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const StyledIcon = styled(Icon)`
	margin-right: -2em;
`

const Title = styled.h1`
	margin: 0;
	margin-top: 1em;
	${props => (props.error ? `color: ${props.theme.pastel.red}` : '')}
`

const Caption = styled.p`
	margin: 0;
	${props => (props.error ? `color: ${props.theme.pastel.red}` : '')}
`

const Loading = ({
	type,
	pushViewAndRemoveIntermediaries,
	previousViewAndRemoveIntermediaries,
	submittedCheckpointSuccessful,
	onResetSubmittedCheckpointSuccessful
}) => {
	const [error, setError] = useState(false)

	useEffect(() => {
		if (submittedCheckpointSuccessful !== undefined) {
			if (submittedCheckpointSuccessful) {
				if (type === 'Autograder') {
					pushViewAndRemoveIntermediaries(AUTOGRADER)
				} else {
					previousViewAndRemoveIntermediaries()
				}
				onResetSubmittedCheckpointSuccessful()
			} else if (!submittedCheckpointSuccessful) {
				setError(true)
			}
		}
	}, [submittedCheckpointSuccessful])

	return (
		<Container>
			<StyledIcon width="24em" height="18em" src={autograderLoading} />
			<Title error={error}>
				{!error ? 'Give us a sec' : 'An error occurred'}
			</Title>
			<Caption error={error}>
				{!error ? 'Swapping space and time' : 'Please try again in a bit'}
			</Caption>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			indicators: { submittedCheckpointSuccessful }
		}
	} = state

	return { submittedCheckpointSuccessful }
}

const mapDispatchToProps = dispatch => ({
	onResetSubmittedCheckpointSuccessful: () =>
		dispatch(resetSubmittedCheckpointSuccessful())
})

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
