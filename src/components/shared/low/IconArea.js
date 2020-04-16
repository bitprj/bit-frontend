import React from 'react'
import styled from 'styled-components'

const VerticalAlign = styled.div`
	display: flex;
	align-items: center;
	${props => (props.reverse ? 'flex-direction: column-reverse;' : '')}
`

const IconWrapper = styled.div`
	${props =>
		!props.reverse
			? `margin-right: ${props.gap};`
			: `margin-left: ${props.gap};`}
`

const IconArea = ({
	className,
	children,
	icon,
	gap = '0.5em',
	reverse,
	onClick
}) => {
	return (
		<VerticalAlign className={className} reverse={reverse} onClick={onClick}>
			<IconWrapper gap={gap} reverse={reverse}>
				{icon}
			</IconWrapper>
			{children}
		</VerticalAlign>
	)
}

export default IconArea
