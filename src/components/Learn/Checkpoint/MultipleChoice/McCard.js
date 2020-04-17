import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 1em;

	cursor: pointer;

	&.active {
		background-color: ${props => props.theme.accent};
		color: ${props => props.theme.fontInvert};
	}

	&.wrong {
		background-color: ${props => props.theme.pastel.red};
		color: ${props => props.theme.fontInvert};
	}

	&.correct {
		background-color: ${props => props.theme.pastel.green};
		color: ${props => props.theme.fontInvert};
	}

	:hover {
		background-color: ${props => props.theme.accent};
		color: ${props => props.theme.fontInvert};
	}
`

const McCard = ({ className, children, ...props }) => {
	return (
		<Container
			className={`strong-lift transition-medium ${className || ''}`}
			{...props}
		>
			{children}
		</Container>
	)
}

export default McCard
