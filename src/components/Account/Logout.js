import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { deauthenticate } from '../../redux/actions/account'

import { logout } from '../../services/AccountService'

/**
 * Declarative logout
 */
const Logout = ({ onDeauthenticate }) => {
	useEffect(() => {
		const _logout = async () => {
			try {
				const response = await logout()
				if (response.logout) {
					onDeauthenticate()
				}
			} catch (error) {
				console.log(error)
			}
		}
		_logout()
	}, [])

	return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
	return {
		onDeauthenticate: () => dispatch(deauthenticate())
	}
}

export default connect(null, mapDispatchToProps)(Logout)
