import styled from 'styled-components'

const MuiIconFormatter = styled.div.attrs(props => ({
	width: props.size ?? props.width
}))`
	margin: 0 auto;
	padding: calc(${props => props.width} / 7.5);
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

export default MuiIconFormatter
