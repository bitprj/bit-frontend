import React from 'react'
import { connect } from 'react-redux'

import Visitor from './Visitor/Visitor'
import Student from './Student/Student'

const Home = ({ userType }) => {
	const selectHome = () => {
		switch (userType) {
			case 'VISITOR':
				return <Visitor />
			case 'STUDENT':
				return <Student />
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
