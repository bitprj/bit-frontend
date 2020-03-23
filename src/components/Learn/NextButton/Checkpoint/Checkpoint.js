import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'

import LeftArrow from '@material-ui/icons/KeyboardArrowLeftRounded'

import AutograderHome from './Autograder/Home'
import AutograderCLI from './Autograder/CLI'
import AutograderResult from './Autograder/Result'

import AutograderLoading from './Autograder/Loading'

import MediaHome from './Media/Home'

import Upload from './Upload'

import Peripheral from '../Peripheral'
import Icon from '../../../shared/gadgets/Icon'
import IconLine from '../../../shared/gadgets/IconLine'
import DynamicModal from '../../../shared/containers/DynamicModal'
import GradeStatus from '../../../shared/gadgets/GradeStatus'
import Button from '../../../shared/gadgets/Button'

const flagIcon = require('../../../../assets/icons/flag.svg')

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
	padding: 2em;
	padding-right: 4em;
	padding-bottom: 0em;
	display: flex;
	align-items: center;
	font-size: 90%;
`

const StyledIcon = styled(Icon)`
	margin-left: 2em;
	margin-right: 1em;
`

const Title = styled.h1`
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
	STATE_CHECKPOINT,

	render,
	open,
	setOpen,
	view,
	setView,
	submissionIndex,
	setSubmissionIndex,

	activityId,
	checkpointId,
	name,
	instruction,
	type,
	progress
}) => {
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
								instruction={instruction}
								progress={progress}
								setSubmissionIndex={setSubmissionIndex}
							/>
						)

					case 'Image':
					case 'Video':
						return (
							<MediaHome
								pushView={pushView}
								type={type}
								instruction={instruction}
								progress={progress}
							/>
						)

					default:
						return null
				}

			case AUTOGRADER:
				const getSubmission = () => {
					console.log(progress)
					const unprocessed = progress.submissions[submissionIndex] ?? {}
					if (unprocessed.error) return unprocessed

					const results = { ...unprocessed.results }
					const { passCases, failCase } = results
					results.allCases = [...passCases].reverse()
					if (!isEmpty(failCase)) {
						results.allCases.unshift(failCase)
					}
					return results
				}
				return <AutograderResult results={getSubmission()} />

			case CLI:
				return <AutograderCLI />

			case UPLOAD:
				return (
					<Upload
						pushView={pushView}
						previousView={previousView}
						activityId={activityId}
						checkpointId={checkpointId}
						type={type}
					/>
				)

			case LOADING:
				return (
					<AutograderLoading
						pushViewAndRemoveIntermediaries={newView => {
							view.push(newView)
							setView(view.filter(v => v !== LOADING && v !== UPLOAD))
						}}
					/>
				)

			default:
				return null
		}
	}

	const getRecentSubmissionContent = () => {
		return progress?.content ?? progress?.submissions?.[0]
	}

	const mostRecentGradeStatus = () => {
		let status = 'NONE'
		let message = 'LOADING'

		const calculateGradeStatus = () => {
			if (!progress) return

			const recent = getRecentSubmissionContent()

			if (!recent) {
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
				const results = recent.results
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
							<Title>{name}</Title>
							{peekView(view) === HOME ? mostRecentGradeStatus() : null}
						</InfoContainer>
					) : null}

					<FillSpaceWrapper>{selectView()}</FillSpaceWrapper>

					<Back
						noOutline
						onClick={() => {
							if (peekView(view) === HOME) setOpen(false)
							else {
								view.pop()
								setView([...view])
							}
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
		learnData: {
			id: activityId,
			cards,
			indicators: { currentCardIndex },
			progress: { checkpointsProgress }
		}
	} = state

	const card = cards?.[currentCardIndex]
	const checkpointId = card?.checkpoint.id

	return {
		activityId,
		checkpointId,
		name: card?.checkpoint.name,
		instruction: card?.checkpoint.instruction,
		type: card?.checkpoint.checkpointType,
		progress: checkpointsProgress?.[checkpointId]
	}
}

export default connect(mapStateToProps)(Checkpoint)
