import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DotRating from '../shared/gadgets/DotRating'
import Nav from './Nav'

const Container = styled.div`
	flex: 1;
	background: #fafafa;
	display: flex;
	flex-direction: column;
`

const Header = styled.div`
	padding: 2em;
`

const Sidebar = props => {
	const header = (
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
	)

	return (
		<Container>
			{header}
			<Nav />
		</Container>
	)
}

const mapStateToProps = state => {
	const { name } = state.learnData
	return { name }
}

export default connect(mapStateToProps)(Sidebar)
