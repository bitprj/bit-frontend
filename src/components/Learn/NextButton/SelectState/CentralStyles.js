import styled from 'styled-components'
import {
	STATE_NEXT,
	STATE_FINISH,
	STATE_CHECKPOINT,
	STATE_CONCEPT,
	STATE_HINT
} from '../NextButton'

export const createColorTemplate = color => `
  background-color: ${color};
  box-shadow: 0 4px 14px 0 ${color}88;
`

const CentralStyles = styled.div`
	${props => {
		switch (props.currentButtonState) {
			case STATE_HINT:
				return createColorTemplate(props.theme.pastel.magenta)

			case STATE_CONCEPT:
				return createColorTemplate(props.theme.pastel.yellow)

			case STATE_CHECKPOINT:
				return createColorTemplate(props.theme.pastel.green)

			case STATE_FINISH:
			case STATE_NEXT:
				return createColorTemplate(props.theme.accent)

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
