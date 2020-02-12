import React from 'react'
import styled from 'styled-components'

const P = styled.p`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${props => props.clamp || 2};
	overflow: hidden;
`

const Other = styled.div`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${props => props.clamp || 2};
	overflow: hidden;
`

const ClampedText = ({ children, className, type, clamp }) => {
	return (
		<>
			{type === 'p' ? (
				<P className={className} clamp={clamp}>
					{children}
				</P>
			) : (
				<Other className={className} clamp={clamp}>
					{children}
				</Other>
			)}
		</>
	)
}

export default ClampedText
