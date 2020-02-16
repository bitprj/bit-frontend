import React from 'react'
import styled from 'styled-components'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import { sizes } from '../../../assets/styles/media'

const Container = styled.div.attrs(props => ({
	scale: props.scale || 1
}))`
	margin: 0 2em;
	border-radius: 5px;
	flex: 1;
	outline: 0;
	overflow-y: auto;
	font-size: 125%;

	${props => props.type === 'PANELS' && 'display: flex'};
	${props => props.type === 'POST' && 'flex-direction: column; display: flex'};
	background-color: #fff;

	@media screen and (orientation: landscape) {
		overflow-y: auto;
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
		overflow-y: auto;
		${props => props.type === 'PANELS' && 'flex-direction: column'};
		height: calc((100% - 10em) * ${props => props.scale});
		${props => props.heightAuto && 'height: auto;'}
	}

	${props =>
		props.heightAuto &&
		`height: auto;
  `}
`

/**
 * PANELS
 * - left panel, right panel
 */
const LeftPanel = styled.div`
	flex: 3;
	position: relative;

	@media screen and (orientation: landscape) and (max-height: 500px) {
		overflow-y: auto;
	}
`
const RightPanel = styled.div`
	font-size: 80%;
	flex: 4;
	overflow-y: auto;
`

/**
 * POST
 * - header, content, optional submit
 */
const Header = styled.div`
	flex: 1;
	background-color: black;
	color: white;
`
const Content = styled.div`
	flex: ${props => props.flex || 2};
`

const DynamicModal = ({
	className,
	children,
	open,
	closed,

	type,
	scale,
	heightAuto,
	width,
	height,

	leftPanel,
	rightPanel,

	header,
	contentRatio,
	content
}) => {
	const contentType = () => {
		switch (type) {
			case 'PANELS':
				return (
					<>
						<LeftPanel>{leftPanel}</LeftPanel>
						<RightPanel>{rightPanel}</RightPanel>
					</>
				)

			case 'POST':
				return (
					<>
						<Header>{header}</Header>
						<Content flex={contentRatio}>{content}</Content>
						{children}
					</>
				)

			default:
				return children
		}
	}

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
				<Container
					className={`${className} low-profile-scrollbar fat`}
					type={type}
					scale={scale}
					heightAuto={heightAuto}
					width={width}
					height={height}
				>
					{contentType()}
				</Container>
			</Fade>
		</Modal>
	)
}

export default DynamicModal
