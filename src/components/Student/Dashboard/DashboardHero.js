import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Box } from '@chakra-ui/core'
import Avatar from 'react-avatar'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import QuickAction from '../../shared/high/QuickAction'
import Button from '../../shared/low/Button'

import { joinClassroom } from '../../../services/StudentService'
import Suggested from './Suggested'
import Hero from '../../shared/low/Hero'
import MuiIconFormatter from '../../shared/high/MuiIconFormatter'
import CheckIcon from '@material-ui/icons/CheckRounded'
import { setSelectedActivity } from '../../../redux/actions/learnData'

const StyledHero = styled(Hero)`
	height: 20em;
`

const VerifiedWrapper = styled(MuiIconFormatter)`
	position: absolute;
	right: -0.5em;
	bottom: -0.5em;
	border-radius: 50%;
	border: solid 0.2em ${props => props.theme.bgVariant};
`

const StyledButton = styled(Button)`
	position: absolute;
	top: 2em;
	right: 2em;
	font-size: 80%;
`

const StudentHero = ({
	id,
	moduleId,

	name,
	image,
	onSetSelectedActivity
}) => {
	const history = useHistory()

	const [classCode, setClassCode] = useState()

	const handleResume = () => {
		onSetSelectedActivity({ id, moduleId })
		history.push('/learn/')
	}

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
		<StyledHero
			ratio={8 / 17}
			leftStyle={{ padding: '0 4em' }}
			above={
				<Box pos="relative" d="inline-block" mb="1em" borderRadius="50%" bg={image && "theme.accentVariant"}>
					<Avatar
						size="4.5em"
						name={name}
						src={image}
						round
						textSizeRatio={2.5}
					/>
					<VerifiedWrapper circle width="2em">
						<CheckIcon />
					</VerifiedWrapper>
				</Box>
			}
			title={'Hi ' + (name ? `${name?.replace(/ .*/, '')},` : '')}
			description={
				'You are on your way to becoming a master of Lorem Ipsum. You are on your way to becoming a master of Lorem Ipsum.'
			}
			below={join}
		>
			<Suggested loading={!name} id={id} onClickButton={handleResume} />
		</StyledHero>
	)
}

const mapStateToProps = state => {
	const {
		account: { user },
		studentData: { suggestedActivity }
	} = state

	const { name, image } = user ?? {}
	const { id, moduleId } = suggestedActivity ?? {}

	return {
		id,
		moduleId,
		name,
		image
	}
}

const mapDispatchToProps = dispatch => ({
	onSetSelectedActivity: ({ id, moduleId }) =>
		dispatch(setSelectedActivity({ id, moduleId }))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentHero)
