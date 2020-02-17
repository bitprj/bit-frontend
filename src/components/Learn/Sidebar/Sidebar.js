import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { useDidUpdateEffect } from '../../../utils/customHooks'
import DotRating from '../../shared/gadgets/DotRating'
import SidebarNav from './SidebarNav'
import { slideIn, fadeIn } from '../../../assets/styles/StatusAnime'

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

const Header = styled.div`
	padding: 2em;
`

const Sidebar = ({ name }) => {
	useDidUpdateEffect(() => {
		fadeIn('.learn-i-sidebar')
		slideIn('.learn-i-sidebar')
	}, [name])

	const header = (
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
		<Container className="learn-i-sidebar">
			{name && (
				<>
					{header}
					<SidebarNav />
				</>
			)}
		</Container>
	)
}

const mapStateToProps = state => {
	const { name } = state.learnData
	return { name }
}

export default connect(mapStateToProps)(Sidebar)
