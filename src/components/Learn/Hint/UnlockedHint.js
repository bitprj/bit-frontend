import React, { useEffect, forwardRef } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import ParsedContent from '../../shared/ParsedContent'

import { fadeIn, slideIn } from '../../../assets/styles/GlobalAnime'
import { STATE_HINT } from '../Content/NextButton'
import { resetButtonStateAndHintStep } from '../../../redux/actions/learnData'

const UnlockedHint = forwardRef(
	(
		{
			id,
			steps,
			name,
			lastHintUnlockedId,
			currentButtonState,
			currentHintStep,
			onResetButtonStateAndHintStep
		},
		ref
	) => {
		useEffect(() => {
			if (currentButtonState === STATE_HINT) {
				const options = { delay: 250 }
				fadeIn(`.learn-i-hintheader-${lastHintUnlockedId}`)
				slideIn(`.learn-i-hintheader-${lastHintUnlockedId}`)
				fadeIn(
					`.learn-i-hintstep-${lastHintUnlockedId}-${currentHintStep}`,
					options
				)
				slideIn(
					`.learn-i-hintstep-${lastHintUnlockedId}-${currentHintStep}`,
					options
				)
			}
		}, [lastHintUnlockedId])

		useEffect(() => {
			if (currentButtonState === STATE_HINT && currentHintStep !== 0) {
				fadeIn(`.learn-i-hintstep-${lastHintUnlockedId}-${currentHintStep}`)
				slideIn(`.learn-i-hintstep-${lastHintUnlockedId}-${currentHintStep}`)
			}
		}, [currentHintStep])

		const renderSteps = () => {
			const stepsLen = steps.length // necessary bc steps ref
			let moddedSteps = steps

			if (currentButtonState === STATE_HINT && id === lastHintUnlockedId) {
				moddedSteps = steps.filter((step, i) => {
					return i <= currentHintStep
				})
				if (currentHintStep >= stepsLen - 1) {
					onResetButtonStateAndHintStep()
				}
			}
			return moddedSteps.map((step, i) => {
				return (
					<div
						className={`learn-i-hintstep-${id}-${i}`}
						key={`step-${id}-${i}`}
					>
						{steps.length === 1 && name !== step.heading && (
							<h3>
								<ReactMarkdown
									className="markdown-header"
									source={step.heading}
								/>
							</h3>
						)}
						<ParsedContent document={step.content} />
					</div>
				)
			})
		}
		return (
			<div ref={ref}>
				<h2
					className={`learn-i-hintheader-${id}`}
					style={{ paddingTop: '1em' }}
				>
					<ReactMarkdown className="markdown-header" source={name} />
				</h2>
				{renderSteps()}
			</div>
		)
	}
)

const mapStateToProps = state => {
	const {
		learnData: {
			indicators: { lastHintUnlockedId, currentButtonState, currentHintStep }
		}
	} = state

	return { lastHintUnlockedId, currentButtonState, currentHintStep }
}

const mapDispatchToProps = dispatch => {
	return {
		onResetButtonStateAndHintStep: () => dispatch(resetButtonStateAndHintStep())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockedHint)
