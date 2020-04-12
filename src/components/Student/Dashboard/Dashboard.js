import React, { useState } from 'react'
import styled from 'styled-components'

import ProgressHero from './DashboardHero'
import Journey from './Journey/Journey'
import OldJourney from './Journey/unused/Journey'

import TextField from '@material-ui/core/TextField'
import QuickAction from '../../shared/containers/QuickAction'
import Button from '../../shared/low/Button'

import { joinClassroom } from '../../../services/StudentService'

const StyledButton = styled(Button)`
	position: absolute;
	top: 1em;
	right: 1em;
	font-size: 70%;
`

const Progress = ({}) => {
	const [classCode, setClassCode] = useState()

	const action = () =>
		joinClassroom(classCode).then(res => {
			const success =
				!res.response?.status &&
				(!res.message?.includes('Error') || !res.msg?.includes('Error'))
			if (success) {
				window.location.replace('/')
			}
		})

	const join = (
		<QuickAction
			action={action}
			title={'Join Classroom'}
			field={
				<div style={{ marginBottom: '1em' }}>
					<TextField
						variant="outlined"
						type="text"
						label="Class Code"
						onChange={e => {
							setClassCode(e.target.value)
						}}
					/>
				</div>
			}
			buttonText="Join"
		>
			<StyledButton dark="#ff7f50">Join Classroom</StyledButton>
		</QuickAction>
	)

	return (
		<>
			<ProgressHero />
			{join}
			<Journey />
			<OldJourney />
		</>
	)
}

export default Progress
