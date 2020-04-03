import React, { useEffect } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { compose } from 'redux'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { Element as ScrollElement } from 'react-scroll'

import Icon from '../../shared/gadgets/Icon'
import CodeBlock from '../../shared/CodeBlock'

import withApiCache, {
	CACHE_HINT,
	CACHE_HINT_PROGRESS
} from '../../HOC/WithApiCache'

const UnlockedHint = ({
	className,
	id,

	wac_data: [hint, hintProgress],

	// steps,
	// name,

	lastHintUnlockedId
}) => {
	const { name, steps } = hint ?? {}

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
		if (lastHintUnlockedId) {
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
	}, [lastHintUnlockedId])

	/**
	 * Render all steps
	 */
	const renderedSteps = () => {
		return steps?.map((step, i) => {
			const { name: stepName, content, codeSnippet, image } = step
			return (
				<React.Fragment key={`hint-step-${id}-${i}`}>
					{steps.length === 1 && name.trim() !== stepName.trim() && (
						<h3>
							<ReactMarkdown className="markdown-header" source={stepName} />
						</h3>
					)}
					<ReactMarkdown source={content} />
					{image && <img src={image} />}
					{codeSnippet && (
						<ReactMarkdown
							className="low-profile-scrollbar only-hover light"
							source={codeSnippet}
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
			indicators: { lastHintUnlockedId }
		}
	} = state

	return {
		lastHintUnlockedId
	}
}

const enhancer = compose(
	connect(mapStateToProps),
	withApiCache([CACHE_HINT, CACHE_HINT_PROGRESS])
)

export default enhancer(UnlockedHint)
