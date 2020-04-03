import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { connect } from 'react-redux'
import validator from 'validator'

import TextField from '@material-ui/core/TextField'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowRight from '@material-ui/icons/ArrowForwardRounded'
import LockOpenIcon from '@material-ui/icons/LockOpenRounded'

import Button from '../../components/shared/gadgets/Button'
import Icon from '../../components/shared/gadgets/Icon'

import { login } from '../../services/AccountService'
import { authenticate } from '../../redux/actions/account'

const SubmitButton = styled(Button)`
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
	border: 0;
`

export const Submit = ({ disabled, error, onClick }) => {
	const themeContext = useContext(ThemeContext)
	return (
		<SubmitButton
			invert
			type="submit"
			disabled={disabled}
			dark={error ? themeContext.muted.red : undefined}
			onClick={onClick}
		>
			<ArrowRight fontSize="inherit" />
		</SubmitButton>
	)
}

export const Form = styled.form`
	width: 100%;
	text-align: center;
`

export const Logo = styled(Icon)`
	margin: 0 auto;
	margin-bottom: 2em;
`

export const Field = styled.div`
	margin: 0.8em auto;
	display: flex;
	justify-content: center;
	> :nth-child(1) {
		margin-right: 0.3em;
	}
`

export const iconStyle = { fontSize: '1.8em', marginTop: '16px' }

const UnconnectedRightPanel = ({ onClose, onAuthenticate }) => {
	const history = useHistory()

	const [userCombo, setUserCombo] = useState({ username: null, password: null })
	const [isWaiting, setIsWaiting] = useState(false)
	const [error, setError] = useState(false)

	const changeInput = e => {
		setUserCombo({
			...userCombo,
			[e.target.name]: e.target.value
		})
	}

	const handleLogin = async e => {
		e.preventDefault()
		setIsWaiting(true)

		try {
			if (
				userCombo.username === null ||
				userCombo.password === null ||
				!validator.isEmail(userCombo.username)
			) {
				throw new Error()
			}

			const response = await login(userCombo)
			localStorage.setItem('csrf-token', response.csrfToken)
			localStorage.setItem('jwt-token', response.jwtToken)
			onAuthenticate(response.userType.toUpperCase())

			onClose()
			history.push('/')
		} catch (err) {
			setError(true)
		} finally {
			setIsWaiting(false)
		}
	}

	// const [userError, setUserError] = useState(false)
	// const [passError, setPassError] = useState(false)

	return (
		<Form onSubmit={handleLogin}>
			<Logo src={require('../../assets/logo/logo.svg')} />
			<Field>
				<AccountCircleIcon style={iconStyle} />
				<TextField
					name="username"
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
					name="password"
					type="password"
					label="Password"
					onChange={changeInput}
				/>
			</Field>
			<Submit error={error} disabled={isWaiting} />
		</Form>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		onAuthenticate: userType => dispatch(authenticate(userType))
	}
}

export const RightPanel = connect(
	null,
	mapDispatchToProps
)(UnconnectedRightPanel)
