import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { initUnlockHint } from '../../../redux/actions/learnData'
import ParsedContent from '../../shared/ParsedContent'
import ClampedText from '../../shared/utils/ClampedText'

const Container = styled.div`
	margin: 1em 0.5em;
	padding: 1em;
	cursor: pointer;
	position: relative;
	border-radius: 0.8em;
`

const Name = styled(ClampedText)`
	margin: 0.5em;
	font-weight: bold;
`

const TopRight = styled.div`
	position: absolute;
	top: 1em;
	right: 1.5em;
`

const LockedHint = ({
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
			<TopRight>{difficulty}</TopRight>
			<Name clamp={1}>{name}</Name>
		</Container>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		onInitUnlockHint: (activityId, id, contentId) =>
			dispatch(initUnlockHint(activityId, id, contentId))
	}
}

export default connect(null, mapDispatchToProps)(LockedHint)
