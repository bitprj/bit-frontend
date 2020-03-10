import React from 'react'
import styled from 'styled-components'

const RenderedIcon = styled.img`
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

const Icon = ({
	alt,
	className,
	src,
	width,
	height,
	sharp,
	circle,
	shadow
}) => {
	return (
		<RenderedIcon
			alt={alt || ''}
			className={`${className || ''} ${shadow ? 'lift transition-medium' : ''}`}
			width={width}
			height={height}
			sharp={sharp}
			circle={circle}
			src={src}
		/>
	)
}

export default Icon
