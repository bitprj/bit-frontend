import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import HeaderShadow from '../../shared/utils/HeaderShadow'
import DotRating from '../../shared/gadgets/DotRating'
import SidebarNav from './SidebarNav'

const Container = styled.div`
	flex: 1;
	background: #fafafa;
	display: flex;
	flex-direction: column;
	position: relative;

	@media screen and (orientation: landscape) {
		flex: 0.55;
		font-size: 85%;
	}
`

const Header = styled.div`
	padding: 2em;
`

const Sidebar = ({ name, hintsScrollRefsState, hintsScrollRefs }) => {
	const header = name && (
		<div style={{ position: 'relative' }}>
			<Header>
				<code style={{ backgroundColor: 'transparent', fontSize: '85%' }}>
					INTRODUCTION TO GITHUB
				</code>
				<h2 style={{ marginTop: '0.1em', marginBottom: '0.5em' }}>{name}</h2>
				<DotRating
					style={{ fontSize: '150%' }}
					type="RECT"
					rating={3}
					outOf={8}
				/>
			</Header>
		</div>
	)

	return (
		<Container>
			{header}
			<SidebarNav
				hintsScrollRefs={hintsScrollRefs}
			/>
		</Container>
	)
}

const mapStateToProps = state => {
	const { name } = state.learnData
	return { name }
}

export default connect(mapStateToProps)(Sidebar)
