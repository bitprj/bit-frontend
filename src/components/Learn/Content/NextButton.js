import React from 'react'
import styled from 'styled-components'

import RightArrow from '@material-ui/icons/KeyboardArrowRightRounded'

const Container = styled.div.attrs(props => ({
	width: props.width || '4em'
}))`
  display: flex;
  justify-content: center;
  align-items: center;

	width: ${props => props.width};
	height: ${props => props.width};
  padding: 1em;
  
  border-radius: 50%;
  background-color: ${props => props.theme.accent}
  box-shadow: 0 4px 14px 0 ${props => props.theme.accent}77;
  cursor: pointer;
`

const NextButton = ({ className, width, clicked }) => {
	return (
		<Container className={className} width={width} onClick={clicked}>
			<RightArrow style={{ fontSize: '1.6em' }} htmlColor="#fff" />
		</Container>
	)
}

export default NextButton
