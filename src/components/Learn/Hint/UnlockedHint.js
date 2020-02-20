import React, { useEffect, forwardRef } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import ParsedContent from '../../shared/ParsedContent'

import { fadeIn, slideIn } from '../../../assets/styles/GlobalAnime'
import { STATE_HINT } from '../Content/NextButton'

const UnlockedHint = forwardRef(
	({ id, steps, name, lastHintUnlockedId, currentButtonState }, ref) => {
		useEffect(() => {
			if (currentButtonState === STATE_HINT) {
				console.log('i was here', lastHintUnlockedId)
				const options = { delay: 250 }
				fadeIn(`.learn-i-hintheader-${lastHintUnlockedId}`)
				slideIn(`.learn-i-hintheader-${lastHintUnlockedId}`)
				fadeIn(`.learn-i-hintsteps-${lastHintUnlockedId}`, options)
				slideIn(`.learn-i-hintsteps-${lastHintUnlockedId}`, options)
			}
		}, [lastHintUnlockedId])

		const renderSteps = () => {
			return steps.map((step, i) => {
				return (
					<div className={`learn-i-hintsteps-${id}`} key={`step-${id}-${i}`}>
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
			indicators: { lastHintUnlockedId, buttonStateStack }
		}
	} = state

	return { lastHintUnlockedId, currentButtonState: buttonStateStack.peek() }
}

export default connect(mapStateToProps)(UnlockedHint)
