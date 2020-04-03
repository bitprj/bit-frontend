import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import MarkdownArea from '../../../shared/external/MarkdownArea'
import Button from '../../../shared/gadgets/Button'

import { initSubmitCheckpointProgress } from '../../../../redux/actions/learnData'

import { LOADING } from '../Checkpoint'

const Container = styled.div`
	height: calc(100% - 3em);
	padding: 0 4em;
	display: flex;
	flex-direction: column;
`

const InstructionWrapper = styled.div`
	margin-bottom: 2em;
	min-height: 6em;
	display: flex;
	align-items: center;
`

const StyledMarkdownArea = styled(MarkdownArea)`
	flex: 1;
`

const Submit = styled(Button)`
	position: absolute;
	right: 2em;
	bottom: 1em;
`

const Home = ({
	activityId,
	id,

	type,
	instruction,
	content,
	pushView,

	onInitSubmitCheckpointProgress
}) => {
	const [answer, setAnswer] = useState()

	const handleSubmit = () => {
		onInitSubmitCheckpointProgress(activityId, id, type, answer)
		pushView(LOADING)
	}

	return (
		<Container>
			<InstructionWrapper>
				<div>{instruction}</div>
			</InstructionWrapper>
			<StyledMarkdownArea
				placeholder={'Your answer here...'}
        initialValue={content}
				onChange={contents => setAnswer(contents)}
			/>
			<Submit invert onClick={handleSubmit}>
				Submit
			</Submit>
		</Container>
	)
}

const mapDispatchToProps = dispatch => ({
	onInitSubmitCheckpointProgress: (activityId, id, type, content) =>
		dispatch(initSubmitCheckpointProgress(activityId, id, type, content))
})

export default connect(null, mapDispatchToProps)(Home)
