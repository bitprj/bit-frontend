import React from 'react'
import styled from 'styled-components'

import IconArea from '../../shared/gadgets/IconArea'

const Wrapper = styled.div`
	background-color: ${props => props.theme.bgVariant};
`

const Container = styled.div`
	padding: 2em;
  flex-shrink: 0;
  opacity: 0;

	background-color: ${props => props.theme.bgVariant};
	color: ${props => props.theme.offFont};
`

const SidebarHeader = ({}) => {
	return (
		<Wrapper>
			<Container className="teacher-i-sidebar">
				<h3 style={{ marginTop: '0', marginBottom: '0.5em' }}>
					Intro to API Development
				</h3>
				<IconArea
					src={require('../../../assets/icons/prof-pic.png')}
					iconSize={'2em'}
				>
					Potato
				</IconArea>
			</Container>
		</Wrapper>
	)
}

export default SidebarHeader
