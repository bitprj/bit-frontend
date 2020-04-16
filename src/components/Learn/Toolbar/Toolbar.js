import React, { useEffect } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Settings from './Settings'
import Icon from '../../shared/low/Icon'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	// justify-content: space-around;
	// align-items: center;
	flex: 0.08;

	background-color: ${props => props.theme.bg};
	text-align: center;

	@media screen and (orientation: landscape) {
		flex: 0.04;
	}
`

const TopSection = styled.div``
const BottomSection = styled.div``

const MiddleSection = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const Elem = styled.div`
	margin: 1em 0;
	padding: 10%;
	display: flex;
	justify-content: center;
	align-items: center;

	&.pointer {
		cursor: pointer;
	}

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
			<TopSection>
				<Link to="/">
					<Elem className="pointer">
						<Icon
							src={require('../../../assets/logo/logo.svg')}
							width={'100%'}
						/>
					</Elem>
				</Link>
			</TopSection>
			<MiddleSection></MiddleSection>
			<BottomSection>
				<div style={{ fontSize: '125%' }}>💎</div>
				<div
					className="learn-r-gems"
					style={{ color: '#fff', fontSize: '85%' }}
				></div>
				<Elem className="pointer">
					<Settings />
				</Elem>
			</BottomSection>
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
