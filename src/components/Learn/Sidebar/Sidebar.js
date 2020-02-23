import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import SidebarHeader from './SidebarHeader'
import SidebarNav from './SidebarNav'

import { useDidUpdateEffect } from '../../../utils/customHooks'
import { slideIn, fadeIn } from '../../../styles/GlobalAnime'

const Container = styled.div`
	flex: 1;
	background: #fafafa;
	display: flex;
	flex-direction: column;

	@media screen and (orientation: landscape) {
		flex: 0.55;
		font-size: 85%;
	}
`

const Sidebar = ({ isReady }) => {
	useDidUpdateEffect(() => {
		fadeIn('.learn-i-sidebar')
		slideIn('.learn-i-sidebar')
	}, [isReady])

	return (
		<Container className="learn-i-sidebar">
			{isReady && (
				<>
					<SidebarHeader />
					<SidebarNav />
				</>
			)}
		</Container>
	)
}

const mapStateToProps = state => ({
	isReady: !!state.learnData.name
})

export default connect(mapStateToProps)(Sidebar)
