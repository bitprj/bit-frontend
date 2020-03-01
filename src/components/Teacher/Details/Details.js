import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import DetailsHeader from './DetailsHeader'

const Container = styled.div`
	position: relative;
	background: #fafafa;
	flex: 0.2;
	display: flex;
	flex-direction: column;
	z-index: 1;

	box-shadow: 0 0 1.5em rgba(0, 0, 0, 0.1);
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
