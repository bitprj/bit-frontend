import anime from 'animejs'

export const fadeIn = (targets, options) =>
	anime({
		targets,
		opacity: [0, 1],
		easing: 'easeOutQuad',
		duration: 500,
		...options
	})

export const slideIn = (targets, options) =>
	anime({
		targets,
		translateX: ['-1em', 0],
		easing: 'easeOutQuad',
		duration: 750,
		...options
	})

/**
 * STATUS-BASED ANIMATIONS
 * - works closely with react-transition-group
 */

export const statusFadeOut = (status, targets, duration = 750) => {
	return anime({
		targets,
		opacity: () => {
			switch (status) {
				case 'exiting':
					return 0
				default:
					return 1
			}
		},
		easing: 'easeInQuad',
		duration
	})
}
