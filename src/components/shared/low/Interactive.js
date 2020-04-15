import React from 'react'
import { PseudoBox } from '@chakra-ui/core'
import styled from 'styled-components'

const Rendered = styled(PseudoBox)`
	transition: 250ms all;
	cursor: pointer;
	outline: 0;

	&.interactive:focus {
    box-shadow: 0 0 0 3px ${props => props.theme.accentVariant};
    z-index: 999;
	}
`

const Interactive = ({ className, onKeyDown, onClick, ...props }) => {
	return (
		<Rendered
			className={`interactive ${className ?? ''}`}
			tabIndex="0"
			onKeyDown={e => {
				switch (e.key) {
					case ' ':
					case 'Enter':
						e.preventDefault()
						onClick()
					default:
						break
				}
			}}
			onClick={onClick}
			{...props}
		/>
	)
}

export default Interactive
