import React, { useEffect } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { connect } from 'react-redux'
import { Element as ScrollElement } from 'react-scroll'
import ReactMarkdown from 'react-markdown'

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
	 * Render all hints, including nested children hints
	 *  - recursive
	 */
	const renderSteps = () => {
		return steps.map((step, i) => {
			return (
				<React.Fragment key={`step-${id}-${i}`}>
					{steps.length === 1 && name !== step.heading && (
						<h3>
							<ReactMarkdown
								className="markdown-header"
								source={step.heading}
							/>
						</h3>
					)}
					<ParsedContent document={step.content} />
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
			<div className={`invisible learn-i-hintsteps-${id}`}>{renderSteps()}</div>
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
