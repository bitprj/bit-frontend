import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import Card from './McCard'

import Scrollable from '../../../shared/containers/Scrollable'
import Button from '../../../shared/low/Button'

import { initSubmitCheckpointProgress } from '../../../../redux/actions/learnData'

const Container = styled.div`
	height: calc(100% - 3em);
	padding: 0 4em;
	display: flex;
	flex-direction: column;
`

const ContentWrapper = styled.div`
	height: 100%;
	position: relative;
`

const InstructionWrapper = styled(Scrollable)`
	min-height: 6em;
	display: flex;
	align-items: safe center;
	margin-bottom: 1em;
`

const ChoiceContainer = styled.div`
	margin-bottom: 2em;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1em;
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
	choices,
	correctChoice,

	onInitSubmitCheckpointProgress
}) => {
  
  const [hasSelectedChoice, setHasSelectedChoice] = useState(false)
	const [currentChoiceIndex, setCurrentChoiceIndex] = useState()
  
  const submittedChoice = content
	const isNotAnswered = !submittedChoice

	const handleSubmit = () => {
		onInitSubmitCheckpointProgress(
			activityId,
			id,
			type,
			choices[currentChoiceIndex].content
		)
	}

	return (
		<Container>
			<ContentWrapper>
				<InstructionWrapper>
					<div style={{ height: '100%' }}>{instruction}</div>
				</InstructionWrapper>
				<ChoiceContainer>
					{choices.map((choice, i) => (
						<Card
							key={`learn-card${id}-checkpointmc-${i}`}
							className={`${
								isNotAnswered && currentChoiceIndex === i && 'active'
							} ${submittedChoice === choice.content && 'wrong'} ${
								!isNotAnswered &&
								correctChoice.content === choice.content &&
								'correct'
							}`}
							onClick={() => {
								setHasSelectedChoice(true)
								setCurrentChoiceIndex(i)
							}}
						>
							<ReactMarkdown source={choice.content} />
						</Card>
					))}
				</ChoiceContainer>
			</ContentWrapper>
			{isNotAnswered && hasSelectedChoice && (
				<Submit invert onClick={handleSubmit}>
					Submit
				</Submit>
			)}
		</Container>
	)
}

const mapDispatchToProps = dispatch => ({
	onInitSubmitCheckpointProgress: (activityId, id, type, content) =>
		dispatch(initSubmitCheckpointProgress(activityId, id, type, content))
})

export default connect(null, mapDispatchToProps)(Home)
