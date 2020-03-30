import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'


const Container = styled.div`
	padding-bottom: 6em;
	flex: 6;
	display: flex;
	flex-flow: row wrap;
	align-items: start;
	font-size: 90%;
	position: relative;
`

const Journey = ({ inprogressModules }) => {
	console.log(inprogressModules)

	return <Container></Container>
}

const mapStateToProps = state => {
	const {
		studentData: { inprogressModules }
	} = state

	return { inprogressModules }
}

export default connect(mapStateToProps)(Journey)
