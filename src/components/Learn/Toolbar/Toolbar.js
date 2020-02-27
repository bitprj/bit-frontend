import React, { useEffect } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Icon from '../../shared/gadgets/Icon'

const Container = styled.div`
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

const Toolbar = ({ gems }) => {
	useEffect(() => {
		anime({
			targets: '.learn-r-gems',
			innerText: gems,
			easing: 'easeOutQuad',
			round: 1
		})
	}, [gems])

	return (
		<Container>
			<Elem to="/">
				<Icon src={require('../../../assets/logo/logo.svg')} width={'100%'} />
			</Elem>
			<div className="learn-r-gems" style={{ color: '#fff' }}></div>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { gems }
	} = state
	return { gems }
}

export default connect(mapStateToProps)(Toolbar)
