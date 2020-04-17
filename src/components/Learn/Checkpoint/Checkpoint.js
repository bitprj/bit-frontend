import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'

import LeftArrow from '@material-ui/icons/KeyboardArrowLeftRounded'

import AutograderHome from './Autograder/Home'
import AutograderCLI from './Autograder/CLI'
import AutograderResult from './Autograder/Result'

import MediaHome from './Media/Home'
import ShortAnswerHome from './ShortAnswer/Home'
import MultipleChoiceHome from './MultipleChoice/Home'

import Upload from './Upload'
import Loading from './Loading'

import Peripheral from '../NextButton/Peripheral'
import DynamicModal from '../../shared/containers/DynamicModal'
import GradeStatus from '../../shared/high/GradeStatus'
import MarkdownContent from '../../shared/MarkdownContent'
import Icon from '../../shared/low/Icon'
import IconLine from '../../shared/low/IconLine'
import Button from '../../shared/low/Button'

import withApiCache, {
	CACHE_CHECKPOINT,
	CACHE_CHECKPOINTS_PROGRESS
} from '../../HOC/WithApiCache'

const flagIcon = require('../../../assets/icons/flag.svg')

export const HOME = 'HOME'
export const UPLOAD = 'UPLOAD'
export const CLI = 'CLI'
export const AUTOGRADER = 'AUTOGRADER'
export const LOADING = 'LOADING'

const StyledDynamicModal = styled(DynamicModal)`
	position: relative;
`

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 65%;
`

const InfoContainer = styled.div`
	padding: 2em 4em 1em;
	display: flex;
	align-items: center;
	font-size: 90%;
`

const StyledIcon = styled(Icon)`
	margin-left: 2em;
	margin-right: 1em;
`

const TitleMarkdown = styled(MarkdownContent)`
	margin: 1em;
`

const StyledGradeStatus = styled(GradeStatus)`
	flex: 1;
	text-align: center;
`

const FillSpaceWrapper = styled.div`
	overflow: auto;
	flex: 1;
	display: flex;
	flex-direction: column;
`

const Back = styled(Button)`
	margin: 0;
	margin-left: 2em;
	margin-bottom: 1em;
	padding-left: 1em;
	align-self: start;
`

const Checkpoint = ({
	id,
	activityId,
	STATE_CHECKPOINT,

	render,
	open,
	setOpen,
	view,
	setView,
	submissionIndex,
	setSubmissionIndex,

	name,
	instruction,
	type,
	checkpointHelpers,

	progress
}) => {
	const { content } = progress ?? {}

	const parsedInstruction = <MarkdownContent source={instruction} />

	const previousView = () => {
		view.pop()
		setView([...view])
	}
	const pushView = newView => {
		view.push(newView)
		setView([...view])
	}

	const peekView = view => {
		return view[view.length - 1]
	}

	const selectView = () => {
		switch (view[view.length - 1]) {
			case HOME:
				switch (type) {
					case 'Autograder':
						return (
							<AutograderHome
								pushView={pushView}
								type={type}
								instruction={parsedInstruction}
								content={content}
								setSubmissionIndex={setSubmissionIndex}
							/>
						)

					case 'Image':
					case 'Video':
						return (
							<MediaHome
								pushView={pushView}
								type={type}
								instruction={parsedInstruction}
								content={content}
							/>
						)

					case 'Short Answer':
						return (
							<ShortAnswerHome
								activityId={activityId}
								id={id}
								pushView={pushView}
								type={type}
								instruction={parsedInstruction}
								content={content}
							/>
						)

					case 'Multiple Choice':
						return (
							<MultipleChoiceHome
								activityId={activityId}
								id={id}
								type={type}
								instruction={parsedInstruction}
								content={content}
								choices={checkpointHelpers?.choices}
								correctChoice={checkpointHelpers?.correctChoice}
							/>
						)

					default:
						return null
				}

			case AUTOGRADER:
				const getSubmission = () => {
					const submission = content?.submissions[submissionIndex] ?? {}
					if (submission.error) return submission

					return submission.results
				}
				return <AutograderResult results={getSubmission()} />

			case CLI:
				return <AutograderCLI />

			case UPLOAD:
				return (
					<Upload
						activityId={activityId}
						id={id}
						type={type}
						submissions={content?.submissions}
						pushView={pushView}
					/>
				)

			case LOADING:
				return (
					<Loading
						type={type}
						pushViewAndRemoveIntermediaries={newView => {
							view.push(newView)
							setView(view.filter(v => v !== LOADING && v !== UPLOAD))
						}}
						previousViewAndRemoveIntermediaries={() => {
							setView(view.filter(v => v !== LOADING && v !== UPLOAD))
						}}
					/>
				)

			default:
				return null
		}
	}

	const mostRecentGradeStatus = () => {
		let status = 'NONE'
		let message = 'LOADING'

		const calculateGradeStatus = () => {
			const recent = (() => {
				if (type === 'Autograder') {
					return content?.submissions?.[0]
				}
				return content
			})()

			if (recent == null) {
				status = ''
				message = 'NO SUBMISSIONS'
				return
			}

			/**
			 * ERROR
			 */
			if (recent.error) {
				status = 'FATAL'
				message = 'NOT PASSING'
				return
			}

			/**
			 * AUTOGRADING
			 */
			if (type === 'Autograder') {
				const { results } = recent ?? {}
				if (results.numPass === 0) {
					status = 'FATAL'
					message = 'NOT PASSING'
				} else if (results.numPass > 0 && results.numFail > 0) {
					status = 'WARNING'
					message = 'PARTIALLY PASSING'
				} else if (results.numFail === 0) {
					status = 'SUCCESS'
					message = 'ALL PASSING'
				}
				return
			}

			/**
			 * NOT AUTOGRADER
			 */
			if (type !== 'Autograder') {
				status = 'SUCCESS'
				message = 'SUBMITTED'
			}
		}
		calculateGradeStatus()

		return <StyledGradeStatus status={status}>{message}</StyledGradeStatus>
	}

	return (
		<>
			{render && (
				<Peripheral
					currentButtonState={STATE_CHECKPOINT}
					onClick={() => setOpen(true)}
					top="-15%"
					left="65%"
				/>
			)}
			<StyledDynamicModal
				open={open}
				closed={() => setOpen(false)}
				scaleX={0.84}
				scaleY={0.945}
			>
				<Container>
					{peekView(view) !== AUTOGRADER &&
					peekView(view) !== UPLOAD &&
					peekView(view) !== LOADING ? (
						<InfoContainer>
							<StyledIcon width="3em" src={flagIcon} />
							<TitleMarkdown source={`# ${name || ''}`} />
							{peekView(view) === HOME ? mostRecentGradeStatus() : null}
						</InfoContainer>
					) : null}

					<FillSpaceWrapper className="low-profile-scrollbar fat">
						{selectView()}
					</FillSpaceWrapper>

					<Back
						noOutline
						onClick={() => {
							if (peekView(view) === HOME) setOpen(false)
							else previousView()
						}}
					>
						<IconLine icon={<LeftArrow />}>
							{peekView(view) === HOME ? 'Cancel' : 'Back'}
						</IconLine>
					</Back>
				</Container>
			</StyledDynamicModal>
		</>
	)
}

const mapStateToProps = state => {
	const {
		cache: {
			cachedActivities,
			cachedCards,
			cachedCheckpoints,
			cachedCheckpointsProgress
		},
		learnData: {
			selectedActivity: { id: activityId },
			indicators: { currentCardIndex }
		}
	} = state

	const cardId = cachedActivities[activityId]?.cards[currentCardIndex]?.id

	const { id: checkpointId } = cachedCards[cardId].checkpoint ?? {}

	const { name, instruction, checkpointType, ...checkpointHelpers } =
		cachedCheckpoints[checkpointId] ?? {}

	const progress = cachedCheckpointsProgress[checkpointId]

	return {
		activityId,
		id: checkpointId,

		name,
		instruction,
		type: checkpointType,
		checkpointHelpers,

		progress
	}
}

const enhancer = compose(
	connect(mapStateToProps),
	withApiCache([CACHE_CHECKPOINT, CACHE_CHECKPOINTS_PROGRESS])
)

export default enhancer(Checkpoint)
