import { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchMetaData } from '../../services/AccountService'
import { authenticate, deauthenticate } from '../../redux/actions/account'

const WithAuthentication = ({
	children,
	isVisitor,
	onAuthenticate,
	onDeauthenticate
}) => {
	useEffect(() => {
		const storedMeta = localStorage.getItem('meta')
		if (storedMeta) return
		;(async () => {
			try {
				const meta = await fetchMetaData()
				onAuthenticate(meta)
			} catch (error) {
				if (!isVisitor) onDeauthenticate()
				console.log('[WithAuthentication] deauthenticated')
				// history.push('/') axios instance does it
			}
		})()
	}, [])

	return children
}

const mapStateToProps = state => ({
	isVisitor: !state.account.meta
})

const mapDispatchToProps = dispatch => ({
	onAuthenticate: meta => dispatch(authenticate(meta)),
	onDeauthenticate: () => dispatch(deauthenticate())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication)
