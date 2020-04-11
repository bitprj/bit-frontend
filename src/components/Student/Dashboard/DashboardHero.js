import React from 'react'
import styled from 'styled-components'
import { Box } from '@chakra-ui/core'
import Avatar from 'react-avatar'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Suggested from './Suggested'
import Hero from '../../shared/low/Hero'
import MuiIconBox from '../../shared/high/MuiIconBox'
import CheckIcon from '@material-ui/icons/CheckRounded'
import { setSelectedActivity } from '../../../redux/actions/learnData'

const StyledHero = styled(Hero)`
	height: 20em;
`

const VerifiedWrapper = styled(MuiIconBox)`
	position: absolute;
	right: -0.5em;
	bottom: -0.5em;
	border-radius: 50%;
	border: solid 0.2em ${props => props.theme.bgVariant};
`

const StudentHero = ({
	id,
	moduleId,

	name,
	firstName,
	image,
	onSetSelectedActivity
}) => {
	const history = useHistory()

	const handleResume = () => {
		onSetSelectedActivity({ id, moduleId })
		history.push('/learn/')
	}

	return (
		<StyledHero
			ratio={8 / 17}
			leftStyle={{ padding: '0 4em' }}
			above={
				<Box pos="relative" d="inline-block" mb="1em">
					<Avatar
						size="4.5em"
						name={name}
						src={image}
						round
						textSizeRatio={2.5}
					/>
					<VerifiedWrapper circle width="2em">
						<CheckIcon fontSize="inherit" />
					</VerifiedWrapper>
				</Box>
			}
			title={'Hi ' + (name ? `${firstName},` : '')}
			description={
				'You are on your way to becoming a master of Lorem Ipsum. You are on your way to becoming a master of Lorem Ipsum.'
			}
		>
			<Suggested loading={!name} id={id} onClickButton={handleResume} />
		</StyledHero>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { firstName, name, image, suggestedActivity }
	} = state

	const { id, moduleId } = suggestedActivity ?? {}

	return {
		id,
		moduleId,
		name,
		firstName,
		image
	}
}

const mapDispatchToProps = dispatch => ({
	onSetSelectedActivity: ({ id, moduleId }) =>
		dispatch(setSelectedActivity({ id, moduleId }))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentHero)
