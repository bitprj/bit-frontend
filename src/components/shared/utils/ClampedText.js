import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${props => props.clamp || 2};
	overflow: hidden;
`

const ClampedText = ({ children, className, clamp }) => {
	return (
		<Container className={className} clamp={clamp}>
			{children}
		</Container>
	)
}

export default ClampedText
