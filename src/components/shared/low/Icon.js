import styled from 'styled-components'

const Icon = styled.img`
  ${props => {
		if (!props.sizeAuto) {
			return `width: ${props.width || '5em'};
        ${
					props.height
						? `height: ${props.height}`
						: !props.width && !props.height
						? 'height: 5em;'
						: ''
				}`
		}
	}}  


  ${props => (props.center ? 'margin: 0 auto;' : '')}

	${props => {
		if (props.sharp) {
			return 'border-radius: 0;'
		} else if (props.circle) {
			return 'border-radius: 50%;'
		} else {
			return 'border-radius: 1em;'
		}
	}}

	${props =>
		props.noDefault || props.src
			? ''
			: `background-color: ${props.theme.accentVariant};`}
`

export default Icon
