import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DetailsHeader from './DetailsHeader'

const Container = styled.div`
	position: relative;
	background: #fafafa;
	flex: 0.2;
	display: flex;
	flex-direction: column;
	z-index: 1;
	border-left: 1px solid ${props => props.theme.offFont};
`

const Details = ({}) => {
	return (
		<Container>
			<DetailsHeader />
		</Container>
	)
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Details)
