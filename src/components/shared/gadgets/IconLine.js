import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
	line-height: 1em;
`

const IconWrapper = styled.div`
	${props =>
		props.reverse
			? `
      margin-right: ${props.marginRight || '0.2em'};`
			: `
      margin-left: ${props.marginRight || '0.2em'};`}

	display: inline-flex;
	align-self: center;

	> svg,
	> img {
		width: 1em;
		height: 1em;
		top: 0.125em;
		position: relative;
    font-size: inherit;
    transition: 0.2s ease all;
	}
`

const IconLine = ({ className, children, icon, marginRight, reverse }) => {
	return (
		<Container className={className}>
			{reverse ? (
				<>
					<IconWrapper marginRight={marginRight}>{icon}</IconWrapper>
					<span>{children}</span>
				</>
			) : (
				<>
					<span>{children}</span>
					<IconWrapper marginRight={marginRight}>{icon}</IconWrapper>
				</>
			)}
		</Container>
	)
}

export default IconLine
