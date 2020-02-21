import React from 'react'
import styled from 'styled-components'

import DynamicModal, { Container } from './DynamicModal'

const CustomContainer = styled(Container)`
	display: flex;
`
const LeftPanel = styled.div`
	flex: ${props => props.ratio || 1};
	position: relative;

	@media screen and (orientation: landscape) and (max-height: 500px) {
		overflow-y: auto;
	}
`
const RightPanel = styled.div`
	flex: ${props => 1 - props.ratio || 1};
	overflow-y: auto;
`

const TwoPanelModal = ({
	open,
	closed,
	scale,
	leftPanel,
	rightPanel,
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
			<LeftPanel className="low-profile-scrollbar only-hover" ratio={ratio}>
				{leftPanel}
			</LeftPanel>
			<RightPanel className="low-profile-scrollbar" ratio={ratio}>
				{rightPanel}
			</RightPanel>
		</CustomContainer>
	</DynamicModal>
)

export default TwoPanelModal
