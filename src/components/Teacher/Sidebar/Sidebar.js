import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import SidebarHeader from './SidebarHeader'
import SidebarNav from './SidebarNav'

import { fadeIn } from '../../../styles/GlobalAnime'

const Container = styled.div`
	position: relative;
	background: #fafafa;
	display: flex;
	flex-direction: column;
	z-index: 1;
	box-shadow: 0 0 1.5em rgba(0, 0, 0, 0.1);

	@media screen and (orientation: landscape) {
		flex: 0.21;
	}
`

const Sidebar = ({ isReady }) => {
	useEffect(() => {
		if (isReady) {
			fadeIn('.teacher-i-sidebar')
		}
	}, [isReady])

	return (
		<Container>
			<SidebarHeader />
			<SidebarNav />
		</Container>
	)
}

const mapStateToProps = state => ({
	isReady: !!get(state, 'teacherData.submissions.length')
})

export default connect(mapStateToProps)(Sidebar)
