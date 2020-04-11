import React from 'react'
import styled from 'styled-components'

import Button from './Button'

const Container = styled.div`
	margin: 0 auto;
`

const CancelButton = styled(Button)`
	border: 0;
	padding: 0.5em 1em 0.5em 0.5em;
`

const ConfirmButton = styled(Button)`
	padding: 0.5em 2em;
`

const ConfirmCancel = ({
	className,
	cancelText = 'Cancel',
	confirmText = 'Confirm',
	cancelProps,
	confirmProps,
	cancelOnClick,
	confirmOnClick
}) => {
	return (
		<Container className={className}>
			<CancelButton noOutline {...cancelProps} onClick={cancelOnClick}>
				{cancelText}
			</CancelButton>
			<ConfirmButton invert {...confirmProps} onClick={confirmOnClick}>
				{confirmText}
			</ConfirmButton>
		</Container>
	)
}

export default ConfirmCancel
