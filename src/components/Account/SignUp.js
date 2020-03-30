import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import validator from 'validator'

import TextField from '@material-ui/core/TextField'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/MailOutlineRounded'
import LockOpenIcon from '@material-ui/icons/LockOpenRounded'
import LockIcon from '@material-ui/icons/LockRounded'
import ClassroomIcon from '@material-ui/icons/MeetingRoomRounded'

import { Form, Field, Submit, iconStyle } from './Login'

import { signUp } from '../../services/AccountService'
import { authenticate } from '../../redux/actions/account'

const UnconnectedRightPanel = ({ onClose, onAuthenticate }) => {
	const history = useHistory()

	const [userCombo, setUserCombo] = useState({
		name: null,
		username: null,
		password: null
	})
	const [isWaiting, setIsWaiting] = useState(false)
	const [error, setError] = useState(false)

	const changeInput = e => {
		setUserCombo({
			...userCombo,
			[e.target.name]: e.target.value
		})
	}

	const handleSignUp = async e => {
		e.preventDefault()
		setIsWaiting(true)

		const { rePassword, ...processedUserCombo } = userCombo

		try {
			if (
				userCombo.name === null ||
				userCombo.username === null ||
				userCombo.password === null ||
				userCombo.password !== rePassword ||
				!validator.isEmail(userCombo.username)
			) {
				throw new Error()
			}

			const response = await signUp(processedUserCombo)
			localStorage.setItem('csrf-token', response.csrfToken)
			onAuthenticate('STUDENT')

			onClose()
			history.push('/')
		} catch (err) {
			console.log(err)
			setError(true)
			setIsWaiting(false)
		}
	}

	// const [userError, setUserError] = useState(false)
	// const [passError, setPassError] = useState(false)

	return (
		<Form onSubmit={handleSignUp}>
			<Field>
				<AccountCircleIcon style={iconStyle} />
				<TextField
					name="name"
					type="text"
					label="Full Name"
					onChange={changeInput}
				/>
			</Field>
			<Field>
				<EmailIcon style={iconStyle} />
				<TextField
					name="username"
					type="text"
					label="Email"
					onChange={changeInput}
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
			<Field>
				<LockIcon style={iconStyle} />
				<TextField
					name="rePassword"
					type="password"
					label="Re-enter Password"
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
