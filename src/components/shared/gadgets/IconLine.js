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
		transition: 0.1s ease all;
	}
`

const IconLine = ({ className, children, icon, gap, reverse }) => {
	return (
		<Container className={className}>
			{reverse ? (
				<>
					{children}
					<IconWrapper reverse={reverse} gap={gap}>
						{icon}
					</IconWrapper>
				</>
			) : (
				<>
					<IconWrapper reverse={reverse} gap={gap}>
						{icon}
					</IconWrapper>
					{children}
				</>
			)}
		</Container>
	)
}

export default IconLine
