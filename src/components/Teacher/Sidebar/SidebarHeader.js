import React from 'react'
import styled from 'styled-components'

import ProfPic from '../../shared/gadgets/ProfPic'

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
				<ProfPic
					src={
						'http://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg'
					}
					iconSize={'2em'}
				>
					Potato
				</ProfPic>
			</Container>
		</Wrapper>
	)
}

export default SidebarHeader
