import React from 'react'
import styled from 'styled-components'

import DynamicModal, { Container } from './DynamicModal'

const CustomContainer = styled(Container)`
	display: flex;
`
const LeftPanel = styled.div`
	flex: ${props => props.ratio};
	position: relative;

	@media screen and (orientation: landscape) and (max-height: 500px) {
		overflow-y: auto;
	}
`
const RightPanel = styled.div`
	flex: ${props => 1 - props.ratio};
	overflow-y: auto;
`

const TwoPanelModal = ({
	className,
	children,
	open,
	closed,
	scaleX = 1,
	scaleY = 1,
	leftPanel,
	rightPanel,
	ratio = 0.5
}) => {
	return (
		<DynamicModal
			className={`low-profile-scrollbar fat`}
			custom
			open={open}
			closed={closed}
		>
			<CustomContainer
				className={`${className || ''}`}
				scaleX={scaleX}
				scaleY={scaleY}
			>
				<LeftPanel className="low-profile-scrollbar only-hover" ratio={ratio}>
					{leftPanel}
				</LeftPanel>
				<RightPanel className="low-profile-scrollbar" ratio={ratio}>
					{rightPanel}
				</RightPanel>
				{children}
			</CustomContainer>
		</DynamicModal>
	)
}

export default TwoPanelModal
