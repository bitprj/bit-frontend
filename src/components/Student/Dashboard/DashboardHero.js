import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Suggested from './Suggested'
import Hero from '../../shared/gadgets/Hero'
import MuiIconBox from '../../shared/external/MuiIconBox'
import CheckIcon from '@material-ui/icons/CheckRounded'
import { setSelectedActivity } from '../../../redux/actions/learnData'

const StyledHero = styled(Hero)`
	height: 20em;
`

const PicWrapper = styled.div`
	margin-bottom: 1em;
	width: 4.5em;
	height: 4.5em;
	position: relative;
`

const Picture = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
`

const VerifiedWrapper = styled(MuiIconBox)`
	position: absolute;
	right: 0;
	bottom: 0;
`

const StudentHero = ({
	id,
	contentUrl,

	firstName,
	image,
	onSetSelectedActivity
}) => {
	const history = useHistory()

	const handleResume = () => {
		onSetSelectedActivity({ id, contentUrl })
		history.push('/learn/')
	}

	return (
		<StyledHero
			ratio={8 / 17}
			leftStyle={{ padding: '0 4em' }}
			above={
				image && (
					<PicWrapper>
						<Picture src={image} />
						<VerifiedWrapper circle width="1.5em">
							<CheckIcon fontSize="inherit" />
						</VerifiedWrapper>
					</PicWrapper>
				)
			}
			title={'Hi ' + (firstName ? `${firstName},` : '')}
			description={
				'You are on your way to becoming a master of Lorem Ipsum. You are on your way to becoming a master of Lorem Ipsum.'
			}
		>
			<Suggested
				loading={!firstName}
				id={id}
				contentUrl={contentUrl}
				onClickButton={handleResume}
			/>
		</StyledHero>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { firstName, image, suggestedActivity }
	} = state

	const { id, contentUrl } = suggestedActivity ?? {}

	return {
		id,
		contentUrl,
		firstName,
		image
	}
}

const mapDispatchToProps = dispatch => ({
	onSetSelectedActivity: ({ id, contentUrl }) =>
		dispatch(setSelectedActivity({ id, contentUrl }))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentHero)
