import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import ParsedContent from '../../shared/OldParsedContent'
import CodeBlock from '../../shared/CodeBlock'
import Icon from '../../shared/gadgets/Icon'
import IconLine from '../../shared/gadgets/IconLine'
import ConfirmCancel from '../../shared/gadgets/ConfirmCancel'
import DotRating from '../../shared/gadgets/DotRating'

import LeftArrow from '@material-ui/icons/KeyboardArrowLeftRounded'
import RightArrow from '@material-ui/icons/KeyboardArrowRightRounded'

import withApiCache, { CACHE_CONCEPT } from '../../HOC/WithApiCache'

const profPic = require('../../../assets/icons/prof-pic.png')

const Container = styled.div`
	display: flex;
`

const LeftPanel = styled.div`
	padding: 2em 0 8em;
	height: 100%;
	display: flex;
	align-items: center;
	position: relative;
	flex: 0.55;
`

const Name = styled.div`
	position: absolute;
	top: 1em;
	left: 1em;
`

const Content = styled.div`
	padding: 0 4em;
	font-size: 85%;
`

const Indicators = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 2em;
`

const Buttons = styled(ConfirmCancel)`
	display: flex;
	justify-content: center;
`

const Dots = styled(DotRating)`
	margin-top: 1em;
	display: flex;
	justify-content: center;
`

const RightPanel = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => props.theme.accentVariant}44;
	flex: 0.45;
	font-size: 90%;
`

const CodeArea = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	background-color: #2b2b2b;
	// temp^. only works with current codeblock colors
`

const StyledReactMarkdown = styled(ReactMarkdown)`
	width: 100%;
	align-items: center;
`

const Slide = ({
	id,
	/*name, steps,*/
	wac_data: [slide],

	slideIndex,
	slidesLength,
	setOpen
}) => {
	const { name, steps } = slide

	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	const step = steps?.[currentStepIndex]

	useEffect(() => {
		const codeBlock = document.querySelector('.learn-concept-codeblock')
		if (!codeBlock) return

		if (codeBlock.scrollHeight <= codeBlock.clientHeight)
			codeBlock.style.display = 'flex'
	}, [currentStepIndex])

	const buttons = (
		<Buttons
			cancelText={
				<IconLine className="sans" noTransition icon={<LeftArrow />}>
					Back
				</IconLine>
			}
			confirmText={
				<IconLine className="sans" reverse noTransition icon={<RightArrow />}>
					{slideIndex !== slidesLength - 1 ||
					currentStepIndex !== steps.length - 1
						? 'Next'
						: 'Finish'}
				</IconLine>
			}
			cancelProps={{ disabled: currentStepIndex === 0 && slideIndex === 0 }}
			cancelOnClick={() => {
				if (currentStepIndex > 0) {
					setCurrentStepIndex(currentStepIndex - 1)
				} else if (slideIndex > 0) {
					document
						.querySelector('.carousel .control-prev.control-arrow')
						.click()
				}
			}}
			confirmOnClick={() => {
				if (currentStepIndex < steps.length - 1) {
					setCurrentStepIndex(currentStepIndex + 1)
				} else if (slideIndex < slidesLength - 1) {
					document
						.querySelector('.carousel .control-next.control-arrow')
						.click()
				} else {
					setOpen(false)
				}
			}}
		/>
	)

	return (
		<Container>
			<LeftPanel>
				{/* <Name>{name}</Name> */}
				<Content>
					<h2>
						<ReactMarkdown className="markdown-header" source={step.heading} />
					</h2>
					<ParsedContent document={step.content} />
				</Content>
				{steps.length !== 1 && (
					<Indicators>
						{buttons}
						<Dots
							dotSize="0.4em"
							gap="1.2em"
							upTo={false}
							rating={currentStepIndex + 1}
							offRating={steps.length}
							outOf={steps.length}
							callback={index => setCurrentStepIndex(index)}
						/>
					</Indicators>
				)}
			</LeftPanel>

			<RightPanel>
				{step && step.snippet ? (
					<CodeArea>
						<StyledReactMarkdown
							className="low-profile-scrollbar only-hover light learn-concept-codeblock"
							source={step.snippet}
							renderers={{
								code: props =>
									CodeBlock({
										...props,
										style: {
											width: '100%'
										}
									})
							}}
						/>
					</CodeArea>
				) : (
					<Icon width="69%" src={profPic} />
				)}
			</RightPanel>
		</Container>
	)
}

export default withApiCache(CACHE_CONCEPT)(Slide)
