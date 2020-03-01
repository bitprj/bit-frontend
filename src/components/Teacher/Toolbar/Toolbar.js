import React, { useEffect } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Icon from '../../shared/gadgets/Icon'

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	flex: 0.08;

	background-color: ${props => props.theme.bg};
	text-align: center;

	@media screen and (orientation: landscape) {
		flex: 0.04;
	}
`

const Elem = styled(Link)`
	padding: 10%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	@media screen and (orientation: landscape) {
		padding: 12%;
	}
`

const Toolbar = ({}) => {
	useEffect(() => {}, [])

	return (
		<Container>
			<Elem to="/">
				<Icon src={require('../../../assets/logo/logo.svg')} width={'100%'} />
			</Elem>
		</Container>
	)
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Toolbar)
