import React, { useState } from 'react'
import styled from 'styled-components'

import ActionsIcon from '@material-ui/icons/RedoRounded'

import DynamicModal from './DynamicModal'
import Button from '../low/Button'

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const IconWrapper = styled.div`
	font-size: 200%;
	color: white;
	height: 1em;
	line-height: 1em;
`

const StyledButton = styled(Button)`
	font-size: 90%;
	padding: 0.6em 2em;
`

const QuickAction = ({
	action,
	title = 'Action',
	field = <p>Would you like to perform this action?</p>,
	buttonText = 'Confirm',
	children
}) => {
	const [open, setOpen] = useState(false)
	const [waiting, setWaiting] = useState(false) // waiting for response

	const triggerAction = async () => {
		try {
			setWaiting(true)
			await action()
		} catch (e) {
			console.log(e)
		} finally {
			setWaiting(false)
		}
	}

	return (
		<>
			<div style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
				{children || (
					<IconWrapper>
						<ActionsIcon fontSize="inherit" htmlColor="#000" />
					</IconWrapper>
				)}
			</div>
			<DynamicModal
				open={open}
				closed={() => setOpen(false)}
				scaleX={0.6}
				scaleY={0.5}
			>
				<Container>
					<div style={{ textAlign: 'center' }}>
						<h2>{title}</h2>
						{field}
						<StyledButton invert disabled={waiting} onClick={triggerAction}>
							{buttonText}
						</StyledButton>
					</div>
				</Container>
			</DynamicModal>
		</>
	)
}

export default QuickAction
