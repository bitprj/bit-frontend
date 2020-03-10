import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { deauthenticate } from '../../redux/actions/account'

import { logout } from '../../services/AccountService'

/**
 * Declarative logout
 */
const Logout = ({ onDeauthenticate }) => {
  const history = useHistory()

	useEffect(() => {
		const _logout = async () => {
			try {
				const response = await logout()
				if (response.logout) {
          onDeauthenticate()
          history.push('/')
				}
			} catch (error) {
				console.log(error)
			}
		}
		_logout()
	}, [])

	return null
}

const mapDispatchToProps = dispatch => {
	return {
		onDeauthenticate: () => dispatch(deauthenticate())
	}
}

export default connect(null, mapDispatchToProps)(Logout)
