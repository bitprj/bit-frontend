import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from '../redux/actions/account'

import AuthService from '../services/AuthService'

class Logout extends Component {
	constructor() {
		super()

		this.service = new AuthService()
	}

	componentDidMount() {
		// this.service.logout();
		this.props.logout()
	}

	render() {
		return <Redirect to="/" />
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout())
	}
}

export default connect(null, mapDispatchToProps)(Logout)
