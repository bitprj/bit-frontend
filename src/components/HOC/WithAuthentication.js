import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { checkLogin } from '../../services/AccountService'
import { authenticate, deauthenticate } from '../../redux/actions/account'

const WithAuthentication = ({
	children,
	isVisitor,
	onCheckLogin,
	onAuthenticate,
	onDeauthenticate
}) => {
	const history = useHistory()

	useEffect(() => {
		const _onCheckLogin = async () => {
			try {
				const response = await onCheckLogin()
				if (response.userType || response.message) {
					onAuthenticate(response.userType || 'STUDENT')
				} else {
					alert("[WithAuthentication] confirm message didn't match")
				}
			} catch (error) {
				if (!isVisitor) onDeauthenticate()
				history.push('/')
			}
		}
		_onCheckLogin()
	}, [])

	return <>{children}</>
}

const mapStateToProps = state => ({
	isVisitor: state.account.userType === 'VISITOR'
})

const mapDispatchToProps = dispatch => ({
	onCheckLogin: () => dispatch(checkLogin),
	onAuthenticate: userType => dispatch(authenticate(userType)),
	onDeauthenticate: userType => dispatch(deauthenticate(userType))
})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication)
