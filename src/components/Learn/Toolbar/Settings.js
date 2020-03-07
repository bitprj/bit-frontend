import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import SettingsIcon from '@material-ui/icons/Settings'

import DynamicModal from '../../shared/containers/DynamicModal'
import Icon from '../../shared/gadgets/Icon'
import Button from '../../shared/gadgets/Button'

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
	const [open, setOpen] = useState(false)
	const [waiting, setWaiting] = useState(false) // waiting for response

	const resetActivity = async () => {
		try {
			setWaiting(true)
			const response = await deleteActivityProgress(activityId)
			if (response.message) {
				window.location.replace('/learn')
			}
		} catch (e) {
			console.log(e)
		} finally {
			setWaiting(false)
		}
	}

	return (
		<>
			<IconWrapper onClick={() => setOpen(true)}>
				<SettingsIcon fontSize="inherit" htmlColor="#fff" />
			</IconWrapper>
			<DynamicModal
				open={open}
				closed={() => setOpen(false)}
				scaleX={0.6}
				scaleY={0.5}
			>
				<Container>
					<div style={{ textAlign: 'center' }}>
						<h2>Reset Progress</h2>
						<p>Reset your progress for this activity?</p>
						<StyledButton invert disabled={waiting} onClick={resetActivity}>
							Confirm
						</StyledButton>
					</div>
				</Container>
			</DynamicModal>
		</>
	)
}

const mapStateToProps = state => {
	const {
		learnData: { id: activityId }
	} = state
	return { activityId }
}

export default connect(mapStateToProps)(Settings)
