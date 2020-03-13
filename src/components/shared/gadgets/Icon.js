import React from 'react'
import styled from 'styled-components'

const Icon = styled.img`
  ${props => (props.center ? 'margin: 0 auto;' : '')}
	width: ${props => props.width || '5em'};
  ${props => {
		if (props.height) return `height: ${props.height}`
		else if (!props.width && !props.height) return 'height: 5em;'
	}}
  
	${props => {
		if (props.sharp) {
			return 'border-radius: 0;'
		} else if (props.circle) {
			return 'border-radius: 50%;'
		} else {
			return 'border-radius: 1em;'
		}
	}}

	${props => (props.src ? '' : `background-color: ${props.theme.accentVariant};`)}
`

export default Icon
