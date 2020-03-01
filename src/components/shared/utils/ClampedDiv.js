import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  ${props => (props.inline ? 'display: inline-block;' : '')} 
	width: ${props => props.width || 'fit-to-content'};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const ClampedDiv = ({ children, className, width, inline }) => {
	return (
		<Container className={className} width={width} inline={inline}>
			{children}
		</Container>
	)
}

export default ClampedDiv
