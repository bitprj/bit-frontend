import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { validate } from 'validate.js'

import TextField from '@material-ui/core/TextField'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowRight from '@material-ui/icons/ArrowForwardRounded'
import LockOpenIcon from '@material-ui/icons/LockOpenRounded'

import Button from '../../components/shared/gadgets/Button'
import Icon from '../../components/shared/gadgets/Icon'
import TwoPanelModal from '../shared/containers/TwoPanelModal'

import { login } from '../../services/AccountService'
import { authenticate } from '../../redux/actions/account'

const LeftPanel = styled.div`
	height: 100%;
	background-color: ${props => props.theme.bgVariant};
`

const RightPanel = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const LoginForm = styled.form`
	width: 100%;
	text-align: center;
`

const Logo = styled(Icon)`
	margin: 0 auto;
	margin-bottom: 2em;
`

const Field = styled.div`
	margin: 0.8em auto;
	display: flex;
	justify-content: center;
	// align-items: flex-end;
	& :nth-child(1) {
		margin-right: 0.3em;
	}
`

const LoginButton = styled(Button)`
	margin: 0 auto;
	margin-top: 1em;
	width: 1.5em;
	height: 1.5em;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	border-radius: 50%;
	font-size: 2.4em;
`

const iconStyle = { fontSize: '1.8em', marginTop: '16px' }

const Login = ({ open, setOpen, onAuthenticate }) => {
	const history = useHistory()

	const [userCombo, setUserCombo] = useState({ user: null, pass: null })
	const [isWaiting, setIsWaiting] = useState(false)

	const changeInput = e => {
		setUserCombo({
			...userCombo,
			[e.target.name]: e.target.value
		})
	}

	const handleLogin = async e => {
		e.preventDefault()

		try {
			const response = await login(userCombo.user, userCombo.pass)
			onAuthenticate(response.userType.toUpperCase())
			setOpen(false)
			history.push('.')
		} catch (err) {
			setIsWaiting(false)
		}
	}

	const leftPanel = <LeftPanel></LeftPanel>

	// const [userError, setUserError] = useState(false)
	// const [passError, setPassError] = useState(false)

	const rightPanel = (
		<RightPanel>
			<LoginForm onSubmit={handleLogin}>
				<Logo src={require('../../assets/logo/logo.svg')} />
				<Field>
					<AccountCircleIcon style={iconStyle} />
					<TextField
						name="user"
						type="text"
						label="Email"
						// error
						// helperText="no"
						onChange={changeInput}
						// onBlur={}
					/>
				</Field>
				<Field>
					<LockOpenIcon style={iconStyle} />
					<TextField
						name="pass"
						type="password"
						label="Password"
						onChange={changeInput}
					/>
				</Field>
				<LoginButton
					invert
					disabled={isWaiting}
					type="submit"
					onClick={() => setTimeout(() => setIsWaiting(true), 0)}
				>
					<ArrowRight fontSize="inherit" />
				</LoginButton>
			</LoginForm>
		</RightPanel>
	)

	return (
		<TwoPanelModal
			open={open}
			closed={() => setOpen(false)}
			leftPanel={leftPanel}
			rightPanel={rightPanel}
			scaleX={0.9}
		/>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		onAuthenticate: userType => dispatch(authenticate(userType))
	}
}

export default connect(null, mapDispatchToProps)(Login)
