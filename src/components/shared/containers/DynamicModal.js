import React from 'react'
import styled from 'styled-components'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import { sizes } from '../../../assets/styles/media'

export const Container = styled.div.attrs(props => ({
	scale: props.scale || 1
}))`
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

	max-width: calc(45em * ${props => props.scale});
	height: calc(36em * ${props => props.scale}); // ipad vertical

	@media screen and (orientation: landscape) and (max-height: ${sizes.tablet}px) {
		height: calc((100% - 4em) * ${props => props.scale});
		${props => props.heightAuto && 'height: auto;'}
	}

	// target vertical phone
	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		${props => props.type === 'PANELS' && 'flex-direction: column'};
		height: calc((100% - 10em) * ${props => props.scale});
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
	type,
	scale,
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
						className={`${className} low-profile-scrollbar fat`}
						type={type}
						scale={scale}
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
