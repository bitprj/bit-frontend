import React from 'react'
import styled from 'styled-components'

import DynamicModal, { Container } from './DynamicModal'

const CustomContainer = styled(Container)`
	display: flex;
	flex-direction: column;
`
const Header = styled.div`
	flex: ${props => props.ratio || 1};
	background-color: black;
	color: white;
`
const Content = styled.div`
	flex: ${props => 1 - props.ratio || 1};
`

const TwoPanelModal = ({
	open,
	closed,
	scale,
	header,
	content,
	children,
	ratio
}) => (
	<DynamicModal
		className="low-profile-scrollbar fat"
		custom
		open={open}
		closed={closed}
		scale={scale}
	>
		<CustomContainer>
			<Header className="low-profile-scrollbar" ratio={ratio}>
				{header}
			</Header>
			<Content className="low-profile-scrollbar" ratio={ratio}>
				{content}
			</Content>
			{children}
		</CustomContainer>
	</DynamicModal>
)

export default TwoPanelModal
