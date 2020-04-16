import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import SettingsIcon from '@material-ui/icons/Settings'

import QuickAction from '../../shared/high/QuickAction'
import Button from '../../shared/low/Button'

import { deleteActivityProgress } from '../../../services/LearnService'

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const IconWrapper = styled.div`
	font-size: 200%;
	color: white;
	height: 1em;
	line-height: 1em;
`

const StyledButton = styled(Button)`
	text-align: right;
`

const Settings = ({ activityId }) => {
	const action = () =>
		deleteActivityProgress(activityId).then(res => {
			const success =
				!res.response?.status &&
				(!res.message?.includes('Error') || !res.msg?.includes('Error'))
			if (success) {
				window.location.replace('/learn/')
			}
		})

	return process.env.NODE_ENV === 'development' ? (
		<QuickAction
			action={action}
			title={'Reset Progress'}
			field={<p>Reset your progress for this activity?</p>}
		>
			<IconWrapper>
				<SettingsIcon htmlColor="#fff" />
			</IconWrapper>
		</QuickAction>
	) : null
}

const mapStateToProps = state => {
	const {
		learnData: {
			selectedActivity: { id: activityId }
		}
	} = state
	return { activityId }
}

export default connect(mapStateToProps)(Settings)
