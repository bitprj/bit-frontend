import anime from 'animejs'

export const fadeIn = (targets, options) => {
	return anime({
		targets,
		opacity: [0, 1],
		easing: 'easeOutQuad',
		duration: 500,
		...options
	})
}

export const slideIn = (targets, options) => {
	return anime({
		targets,
		translateX: ['-1em', 0],
		easing: 'easeOutQuad',
		duration: 750,
		...options
	})
}

/**
 * STATUS-BASED ANIMATIONS
 * - works closely with react-transitio-group
 */

export const statusFadeOut = (status, targets, duration = 750) => {
	return anime({
		targets,
		opacity: () => status === 'exiting' && '0',
		easing: 'easeInQuad',
		duration
	})
}
