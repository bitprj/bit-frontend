import React, { useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import HeaderShadow from '../shared/utils/HeaderShadow'
import DotRating from '../shared/gadgets/DotRating'
import Nav from './Nav'

const Container = styled.div`
	flex: 1;
	background: #fafafa;
	display: flex;
	flex-direction: column;

	@media screen and (orientation: landscape) {
		flex: 0.75;
		font-size: 85%;
	}
`

const Header = styled.div`
	padding: 2em;
`

const Sidebar = props => {
	const containerRef = useRef(null)

	const header = (
		<div style={{ position: 'relative' }}>
			<Header>
				<code>INTRODUCTION TO GITHUB</code>
				<h2>{props.name}</h2>
				<DotRating
					style={{ fontSize: '150%' }}
					type="RECT"
					rating={3}
					outOf={8}
				/>
			</Header>
			<HeaderShadow containerRef={containerRef} />
		</div>
	)

	return (
		<Container>
			{header}
			<Nav containerRef={containerRef} />
		</Container>
	)
}

const mapStateToProps = state => {
	const { name } = state.learnData
	return { name }
}

export default connect(mapStateToProps)(Sidebar)
