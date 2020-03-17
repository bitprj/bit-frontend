import React, { useEffect } from 'react'
import styled from 'styled-components'
import anime from 'animejs'

import CheckIcon from '@material-ui/icons/CheckRounded'
import CloseIcon from '@material-ui/icons/CloseRounded'

import Icon from '../../../../shared/gadgets/Icon'
import IconArea from '../../../../shared/gadgets/IconArea'
import MuiIconBox from '../../../../shared/external/MuiIconBox'
import TwoPanel from '../../../../shared/containers/TwoPanel'

import { CLI, UPLOAD, AUTOGRADER } from '../Checkpoint'

const cliSvg = require('../../../../../assets/icons/cli.svg')
const uploadCardsSvg = require('../../../../../assets/icons/upload-cards.svg')

const PassedLineIconArea = styled(IconArea)`
	width: fit-content;
	margin-bottom: 1em;
	padding-right: 2em;
	padding-left: 1.5em;
	cursor: pointer;
	transition: box-shadow 0.1s ease;

	:hover {
		position: relative;
		background-color: ${props => props.theme.fontInvert};
	}
`

const FilledGradientIconWrapper = styled(MuiIconBox)`
	position: relative;
	z-index: 1;
	background: linear-gradient(
		180deg,
		${props => props.theme.accent} 0%,
		#79b8ff 100%
	);
`
const UnfilledGradientIconWrapper = styled(MuiIconBox)`
	position: relative;
	z-index: 1;
	border: 0.1em solid ${props => props.theme.accent};
	background-color: ${props => props.theme.fontInvert};
	color: ${props => props.theme.accent};
`

const PassedLine = ({ className, score = '0/0', pass, onClick }) => (
	<PassedLineIconArea
		className={`hover-strong-lift ${className || ''}`}
		gap={'1.5em'}
		icon={
			pass ? (
				<FilledGradientIconWrapper circle width="2em">
					<CheckIcon fontSize="inherit" />
				</FilledGradientIconWrapper>
			) : (
				<UnfilledGradientIconWrapper circle width="2em">
					<CloseIcon fontSize="inherit" />
				</UnfilledGradientIconWrapper>
			)
		}
		onClick={onClick}
	>
		<h3>{score} PASSED</h3>
	</PassedLineIconArea>
)

const UnloadedCircle = styled(MuiIconBox)`
	position: relative;
	z-index: 1;
	border: 0.1em solid ${props => props.theme.offFont};
	background-color: ${props => props.theme.fontInvert};
`

const AnimatingLine = styled.div`
	width: 7.5em;
	height: 0.15em;
	background-color: ${props => props.theme.offFont};
`

const UnloadedIconArea = styled(PassedLineIconArea)`
	cursor: default;

	:hover {
		background: transparent;
	}
`

const UnloadedLineWrapper = styled.div`
	height: 3.6em;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`

const UnloadedLine = ({}) => {
	useEffect(() => {}, [])

	return (
		<UnloadedIconArea
			gap={'1.5em'}
			icon={<UnloadedCircle circle width="2em" />}
		>
			<UnloadedLineWrapper>
				<AnimatingLine />
				<AnimatingLine />
			</UnloadedLineWrapper>
		</UnloadedIconArea>
	)
}

const ProgressContainer = styled.div`
	padding: 1em 3em 0;
	height: 100%;
	position: relative;
`

const VerticalLine = styled.div`
	margin-top: 0.75em;
	width: 0.15em;
	position: absolute;
	top: 0;
	left: 5.43em;
	bottom: 0;

	${props =>
		!props.isReady
			? `background: linear-gradient(
        180deg,
        ${props.theme.offFont} 0%,
        ${props.theme.offFont} 0.01%,
        ${props.theme.offFont} 53.65%,
        ${props.theme.offFont} 100%
      );`
			: `background: linear-gradient(
        180deg,
        ${props.theme.accent} 0%,
        rgba(0, 123, 237, 0.4) 0.01%,
        ${props.theme.accent} 53.65%,
        rgba(0, 123, 237, 0) 100%
      );`}
`

const Progress = ({ pushView, progress, setSubmissionIndex }) => {
	const isReady = !!progress

	return (
		<ProgressContainer>
			<VerticalLine isReady={isReady} />
			{!isReady
				? [...Array(2)].map((_, i) => {
						return <UnloadedLine key={`learn-checkpointunloaded-${i}`} />
				  })
				: progress
						.filter((_, index) => index < 2)
						.map((result, index) => {
							const { numPass, numFail } = result
							return (
								<PassedLine
									key={`learn-checkpointresult-${index}`}
									className={
										index === 0 ? 'learn-i-checkpointresult-recent' : ''
									}
									pass={numPass > 1}
									score={`${numPass}/${numPass + numFail}`}
									isReady
									onClick={() => {
										pushView(AUTOGRADER)
										setSubmissionIndex(index)
									}}
								/>
							)
						})}
		</ProgressContainer>
	)
}

const CardContainer = styled.div`
	margin: 1.5em;
	padding: 1em;
	height: calc(100% - 3em);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	border-radius: 1em;
	cursor: pointer;
	transition: box-shadow 0.2s ease, transform 0.2s ease;
`

export const Card = ({ icon, title, description, onClick }) => (
	<CardContainer className="hover-raise" onClick={onClick}>
		<Icon src={icon} width="6.6em" height="6em" />
		<h2 style={{ margin: 0, fontSize: '1.14em' }}>{title}</h2>
		<p style={{ margin: '0.3em 0' }}>{description}</p>
	</CardContainer>
)

const TopAreaTwoPanel = styled(TwoPanel)`
	flex: 1;
	padding: 0 4em;
`

const NavigationTwoPanel = styled(TwoPanel)`
	flex: 1;
	padding: 0 2.5em;
`

const Home = ({
	pushView,
	instruction = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
	progress,
	setSubmissionIndex
}) => {
	return (
		<>
			<TopAreaTwoPanel
				first={<div style={{ paddingTop: '1em' }}>{instruction}</div>}
				second={
					<Progress
						progress={progress}
						pushView={pushView}
						setSubmissionIndex={setSubmissionIndex}
					/>
				}
				ratio={0.55}
			/>
			<NavigationTwoPanel
				first={
					<Card
						icon={cliSvg}
						title="Push via CLI"
						description="Upload Code using Terminal"
						onClick={() => pushView(CLI)}
					/>
				}
				second={
					<Card
						icon={uploadCardsSvg}
						title="Upload File"
						description="Upload Code using Browser"
						onClick={() => pushView(UPLOAD)}
					/>
				}
			/>
		</>
	)
}

export default Home
