import React, { useEffect } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { Element as ScrollElement } from 'react-scroll'

import CodeBlock from '../../shared/CodeBlock'
import ParsedContent from '../../shared/ParsedContent'

import { STATE_HINT } from '../NextButton/NextButton'

const UnlockedHint = ({
	className,
	id,
	steps,
	name,
	lastHintUnlockedId,
	currentButtonState
}) => {
	/**
	 * In order to ensure a smooth slide-in without additional traces,
	 * these selected elements are initially invisible. This effect ensures that
	 * if these hints are already loaded, then they are visible, overriding
	 * the above effect.
	 */
	useEffect(() => {
		if (id !== lastHintUnlockedId) {
			document
				.querySelectorAll(`.learn-i-hintheader-${id}, .learn-i-hintsteps-${id}`)
				.forEach(hint => {
					hint.classList.remove('invisible')
				})
		}
	}, [])

	/**
	 * FadeIn + SlideIn animations upon hint unlock
	 */
	useEffect(() => {
		if (currentButtonState === STATE_HINT) {
			const options = {
				translateX: ['-0.5em', 0],
				opacity: [0, 1],
				easing: 'easeOutQuad',
				duration: 500
			}
			anime({
				targets: `.learn-i-hintheader-${lastHintUnlockedId}`,
				...options
			})
			anime({
				targets: `.learn-i-hintsteps-${lastHintUnlockedId}`,
				delay: 125,
				...options
			})
		}
	}, [currentButtonState])

	/**
	 * Render all steps
	 */
	const renderedSteps = () => {
		return steps.map((step, i) => {
			return (
				<React.Fragment key={`hint-step-${id}-${i}`}>
					{steps.length === 1 && name.trim() !== step.heading.trim() && (
						<h3>
							<ReactMarkdown
								className="markdown-header"
								source={step.heading}
							/>
						</h3>
					)}
					<ParsedContent document={step.content} />
					{step.snippet && (
						<ReactMarkdown
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
					)}
				</React.Fragment>
			)
		})
	}

	return (
		<ScrollElement
			className={className}
			name={`unlocked-hint-${id}`}
			style={{ paddingTop: '1em' }}
		>
			<h2 className={`invisible learn-i-hintheader-${id}`}>
				<ReactMarkdown className="markdown-header" source={name} />
			</h2>
			<div className={`invisible learn-i-hintsteps-${id}`}>
				{renderedSteps()}
			</div>
		</ScrollElement>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			indicators: { lastHintUnlockedId, currentButtonState }
		}
	} = state

	return {
		lastHintUnlockedId,
		currentButtonState
	}
}

export default connect(mapStateToProps)(UnlockedHint)
