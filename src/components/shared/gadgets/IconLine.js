import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
	line-height: 1em;
`

const IconWrapper = styled.div`
	${props =>
		props.reverse
			? `
      margin-left: ${props.marginRight || '0.2em'};`
			: `
      margin-right: ${props.marginRight || '0.2em'};`}

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

const IconLine = ({ className, children, icon, marginRight, reverse }) => {
	return (
		<Container className={className}>
			{reverse ? (
				<>
					{children}
					<IconWrapper reverse={reverse} marginRight={marginRight}>
						{icon}
					</IconWrapper>
				</>
			) : (
				<>
					<IconWrapper reverse={reverse} marginRight={marginRight}>
						{icon}
					</IconWrapper>
					{children}
				</>
			)}
		</Container>
	)
}

export default IconLine
