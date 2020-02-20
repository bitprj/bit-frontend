import styled from 'styled-components'

import { STATE_CHECKPOINT, STATE_HINT, STATE_CARD } from '../Central'

const CentralStyles = styled.div`
	${props => {
		switch (props.currentButtonState) {
			case STATE_CHECKPOINT:
				return `
        background-color: #7FC588;
        box-shadow: 0 4px 14px 0 #7FC58877;
      `
			case STATE_HINT:
				return `
        background-color: #b19cd9;
        box-shadow: 0 4px 14px 0 #b19cd977;
      `
			case STATE_CARD:
				return `
        background-color: ${props.theme.accent};
        box-shadow: 0 4px 14px 0 ${props.theme.accent}77;
      `
			default:
				return `
        background-color: #fff;
        box-shadow: 0 4px 14px 0 #00000077;
        .learn-r-nextarrow {
          color: #aaa;
        }
      `
		}
	}}
`

export default CentralStyles
