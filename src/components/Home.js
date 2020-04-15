import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Visitor from './Visitor/Visitor'

const Home = ({ meta }) => {
	const selectHome = () => {
		if (!meta) {
			return <Visitor />
		}
		if (meta.studentId) {
			return <Redirect to="/dashboard/" />
		}
		if (meta.teacherId) {
			return null
		}

		console.log("[HOME] we shouldn't be here... missing meta?", meta)
		return null
	}
	return <>{selectHome()}</>
}

const mapStateToProps = state => ({
	meta: state.account.meta
})

export default connect(mapStateToProps)(Home)
