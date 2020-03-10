import styled from 'styled-components'

const MuiIconBox = styled.div`
	margin: 0 auto;
	padding: calc(${props => props.width} / 10);
	width: ${props => props.width};
	height: ${props => props.width};
  ${props =>
		props.circle
			? 'border-radius: 50%;'
			: `border-radius: calc(${props.width} / 7.5);`}
	
	background-color: ${props => props.theme.accent};
	color: ${props => props.theme.fontInvert};

	> svg {
		width: 100%;
		height: 100%;
	}
`

export default MuiIconBox
