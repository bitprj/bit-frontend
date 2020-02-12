import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { initUnlockHint } from '../../../redux/actions/learnData'

const Container = styled.div`
	margin: 1em;
	padding: 1em;
	cursor: pointer;
`

const Hint = ({
	activityId,
	id,
	contentfulId,
	name,
	difficulty,
	gems,
	onInitUnlockHint
}) => {
	const unlockHint = () => {
		onInitUnlockHint(activityId, id, contentfulId)
	}

	return (
		<Container className="hover-raise transition-medium" onClick={unlockHint}>
			<span>💎 {gems}</span>
			<h3>{name}</h3>
			<p>{difficulty}</p>
		</Container>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		onInitUnlockHint: (activityId, id, contentId) =>
			dispatch(initUnlockHint(activityId, id, contentId))
	}
}

export default connect(null, mapDispatchToProps)(Hint)
