import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'

import LeftArrow from '@material-ui/icons/KeyboardArrowLeftRounded'

import AutograderHome from './Autograder/Home'
import AutograderCLI from './Autograder/CLI'
import AutograderResult from './Autograder/Result'
import AutograderLoading from './Autograder/Loading'
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
	autograderResultIndex,
	setAutograderResultIndex,

	activityId,
	checkpointId,
	name,
	instruction,
	type,
	progress
}) => {
	const autograderResult = useMemo(() => {
		const unprocessed =
			progress && get(progress[autograderResultIndex], 'results')

		if (!unprocessed) return {}

		/**
		 * Process
		 */
		const results = { ...unprocessed }
		const { passCases, failCase } = results
		results.allCases = [...passCases].reverse()
		if (!isEmpty(failCase)) {
			results.allCases.unshift(failCase)
		}

		return results
	}, [progress])

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
								setAutograderResultIndex={setAutograderResultIndex}
								instruction={instruction}
								progress={progress}
							/>
						)
					default:
						return null
				}
			case AUTOGRADER:
				return <AutograderResult result={autograderResult} />
			case CLI:
				return <AutograderCLI />
			case UPLOAD:
				return (
					<Upload
						pushView={pushView}
						activityId={activityId}
						checkpointId={checkpointId}
						type={type}
					/>
				)
			case LOADING:
				return (
					<AutograderLoading
						pushViewAndRemovingLoading={newView => {
							view.push(newView)
							setView(view.filter(v => v !== LOADING))
						}}
					/>
				)

			default:
				return null
		}
	}

	const mostRecentGradeStatus = () => {
		const recent = get(progress, '[0].results', {})

		let status = ''
		let message = 'NO DATA'
		if (recent.numPass === 0) {
			status = 'FATAL'
			message = 'NONE PASSING'
		} else if (recent.numPass > 0 && recent.numFail > 0) {
			status = 'WARNING'
			message = 'PARTIALLY PASSING'
		} else if (recent.numFail === 0) {
			status = 'SUCCESS'
			message = 'ALL PASSING'
		}
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

	const card = cards && cards[currentCardIndex]
	const checkpointId = get(card, 'checkpoint.id')
	const progress = checkpointsProgress && checkpointsProgress[checkpointId]

	return {
		activityId,
		checkpointId,
		name: get(card, 'checkpoint.name'),
		instruction: get(card, 'checkpoint.instruction'),
		type: get(card, 'checkpoint.checkpointType'),
		progress
	}
}

export default connect(mapStateToProps)(Checkpoint)
