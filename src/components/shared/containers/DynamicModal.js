import React from 'react'
import styled from 'styled-components'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import { sizes } from '../../../styles/media'

export const Container = styled.div`
	margin: 0 2em;
	border-radius: 5px;
	flex: 1;
	outline: 0;
	overflow-y: auto;
	font-size: 125%;

	display: flex;
	background-color: #fff;

	@media screen and (orientation: landscape) {
		font-size: 100%;
	}

	// SIZING

	max-width: calc(45em * ${props => props.scaleX});
	height: calc(36em * ${props => props.scaleY}); // ipad vertical

	@media screen and (orientation: landscape) and (max-height: ${sizes.tablet}px) {
		height: calc((100% - 4em) * ${props => props.scaleY});
		${props => props.heightAuto && 'height: auto;'}
	}

	// target vertical phone
	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		height: calc((100% - 10em) * ${props => props.scaleY});
		${props => props.heightAuto && 'height: auto;'}
	}

	${props =>
		props.heightAuto &&
		`height: auto;
  `}
`

const DynamicModal = ({
	className,
	children,

	open,
	closed,
	custom,
	scaleX = 1,
	scaleY = 1,
	heightAuto
}) => {
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={closed}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Fade in={open}>
				{!custom ? (
					<Container
						className={`${className || ''} low-profile-scrollbar fat`}
						scaleX={scaleX}
						scaleY={scaleY}
						heightAuto={heightAuto}
					>
						{children}
					</Container>
				) : (
					children
				)}
			</Fade>
		</Modal>
	)
}

export default DynamicModal
