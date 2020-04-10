import React from 'react'
import styled from 'styled-components'

import ProfPic from '../../shared/gadgets/ProfPic'

const Wrapper = styled.div`
	background-color: black;
`

const Container = styled.div`
	padding: 2em;
	flex-shrink: 0;
	opacity: 0;

	background-color: black;
	color: ${props => props.theme.offFont};
`

const SidebarHeader = ({}) => {
	return (
		<Wrapper>
			<Container className="teacher-i-sidebar">
				<h3 style={{ marginTop: '0', marginBottom: '0.5em' }}>Grading View</h3>
				<ProfPic
					src={
						null // user.image
					}
					name={
						null ?? 'Expert' // user.name
					}
				/>
			</Container>
		</Wrapper>
	)
}

export default SidebarHeader
