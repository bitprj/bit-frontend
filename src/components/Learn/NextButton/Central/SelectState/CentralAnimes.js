import anime from 'animejs'
import {
	STATE_CARD,
	STATE_CONCEPT,
	STATE_CHECKPOINT,
	STATE_HINT
} from '../../NextButton'

export default function CentralAnimes(currentButtonState) {
	// reset
	const targets = '.learn-r-nextbutton, .learn-r-nextarrow'
	anime.remove(targets)
	document.querySelectorAll(targets).forEach(target => {
		target.classList.remove('transition-none')
		target.style.transform = '' // remove transform style
	})

	switch (currentButtonState) {
		case STATE_HINT: {
			document
				.querySelectorAll('.learn-r-nextbutton, .learn-r-nextarrow')
				.forEach(target => target.classList.add('transition-none'))

			const options = {
				duration: 500,
				direction: 'alternate',
				loop: true
			}
			// bounce
			anime({
				targets: '.learn-r-nextbutton',
				translateY: '-1em',
				translateZ: 0,
				easing: 'easeOutQuad',
				...options
			})
			// rotate
			anime({
				targets: '.learn-r-nextarrow',
				rotate: '-90deg',
				easing: 'easeOutQuad',
				duration: 400
			})
			// scale
			// anime({
			// 	targets: '.learn-r-nextbutton, .learn-r-nextarrow',
			// 	scale: 1.5,
			// 	duration: 1000,
			// 	easing: 'easeOutQuad'
			// })

			break
		}

		case STATE_CHECKPOINT: {
			break
		}

		case STATE_CONCEPT: {
			break
		}

		case STATE_CARD: {
			break
		}

		default:
			if (currentButtonState !== undefined)
				console.log(
					'[CentralAnimes] error... missing state check?',
					currentButtonState
				)
			break
	}
}
