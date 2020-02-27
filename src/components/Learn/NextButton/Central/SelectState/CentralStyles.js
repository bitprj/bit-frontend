import styled from 'styled-components'
import {
	STATE_CARD,
	STATE_CHECKPOINT,
	STATE_CONCEPT,
	STATE_HINT
} from '../../NextButton'

const CentralStyles = styled.div`
	${props => {
		switch (props.currentButtonState) {
			case STATE_HINT:
				return `
          background-color: #b19cd9;
          box-shadow: 0 4px 14px 0 #b19cd988;
        `
			case STATE_CONCEPT:
				return `
          background-color: #ffd100;
          box-shadow: 0 4px 14px 0 #ffd10088;
        `
			case STATE_CHECKPOINT:
				return `
          background-color: #7FC588;
          box-shadow: 0 4px 14px 0 #7FC58888;
        `
			case STATE_CARD:
				return `
          background-color: ${props.theme.accent};
          box-shadow: 0 4px 14px 0 ${props.theme.accent}88;
        `
			default:
				if (props.currentButtonState !== undefined)
					console.log('[CentralStyles] error... missing state check?')
				return `
          background-color: #fff;
          box-shadow: 0 4px 14px 0 #00000088;
          .learn-r-nextarrow {
            color: #aaa;
          }
        `
		}
	}}
`

export default CentralStyles
