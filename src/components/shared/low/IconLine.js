import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
	line-height: 1em;
`

const IconWrapper = styled.div`
	${props =>
		props.reverse
			? `
      margin-left: ${props.gap || '0.2em'};`
			: `
      margin-right: ${props.gap || '0.2em'};`}

	display: inline-flex;
	align-self: center;

	> svg,
	> img {
		width: 1em;
		height: 1em;
		top: 0.125em;
		position: relative;
		font-size: inherit;
		${props => (!props.noTransition ? 'transition: 0.1s ease all;' : '')}
	}
`

const IconLine = ({
	className,
	children,
	icon,
	gap = "0.5em",
	reverse,
	noTransition
}) => {
	return (
		<Container className={className}>
			{!reverse ? (
				<>
					<IconWrapper reverse={reverse} gap={gap} noTransition={noTransition}>
						{icon}
					</IconWrapper>
					{children}
				</>
			) : (
				<>
					{children}
					<IconWrapper reverse={reverse} gap={gap} noTransition={noTransition}>
						{icon}
					</IconWrapper>
				</>
			)}
		</Container>
	)
}

export default IconLine
