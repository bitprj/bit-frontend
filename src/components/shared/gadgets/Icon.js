import React from 'react'
import styled from 'styled-components'

const RenderedIcon = styled.img.attrs(props => ({
	width: props.width || '5em'
}))`
	width: ${props => props.width};
	height: ${props => props.height || ''};
	${props =>
		(props.borderRadius && `border-radius: ${props.borderRadius};`) ||
		props.sharp ||
		'border-radius: 1em;'}
	${props =>
		props.src ? '' : `background-color: ${props.theme.accentVariant};`}
`

const Icon = ({
	className,
	src,
	width,
	height,
	sharp,
	borderRadius,
	shadow
}) => {
	return (
		<RenderedIcon
			// alt="Icon"
			className={`${className} ${shadow && 'lift transition-medium'}`}
			width={width}
			height={height}
			sharp={sharp}
			borderRadius={borderRadius}
			src={src}
		/>
	)
}

export default Icon
