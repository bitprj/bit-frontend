import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Visitor from './Visitor/Visitor'

const Home = ({ userType }) => {
	const selectHome = () => {
		switch (userType) {
			case 'VISITOR':
				return <Visitor />
			case 'STUDENT':
				return <Redirect to="/dashboard/" />
			case 'TEACHER':
				return null
			default:
				console.log(
					"[HOME] we shouldn't be here... missing userType?",
					userType
				)
				return null
		}
	}
	return <>{selectHome()}</>
}

const mapStateToProps = state => ({
	userType: state.account.userType
})

export default connect(mapStateToProps)(Home)
