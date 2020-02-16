import React from 'react'
import { Transition } from 'react-transition-group'

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0
}

const defaultTransitionStyles = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 }
}

const Fade = ({
	in: inProp,
	transitionStyles: transitionStyles || defaultTransitionStyles,
	duration
}) => (
	<Transition in={inProp} timeout={duration} mountOnEnter unmountOnExit>
		{status => (
			<div
				style={{
					...defaultStyle,
					...transitionStyles[status]
				}}
			>
				I'm a fade Transition!
			</div>
		)}
	</Transition>
)
