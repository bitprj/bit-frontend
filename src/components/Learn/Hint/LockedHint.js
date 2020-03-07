import React, { useState } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'

import LeftArrow from '@material-ui/icons/KeyboardArrowLeftRounded'

import DynamicModal from '../../shared/containers/DynamicModal'
import ClampedText from '../../shared/utils/ClampedText'
import ConfirmCancel from '../../shared/gadgets/ConfirmCancel'
import Icon from '../../shared/gadgets/Icon'
import IconLine from '../../shared/gadgets/IconLine'

import { initUnlockHint } from '../../../redux/actions/learnData'
import { incrementGemsBy } from '../../../redux/actions/studentData'

const Container = styled.div`
	margin: 1em 0.5em;
	padding: 1em;
	cursor: pointer;
	position: relative;
	border-radius: 0.8em;
`

const Name = styled(ClampedText)`
	margin: 0.5em;
	font-weight: bold;
`

const TopRight = styled.div`
	position: absolute;
	top: 1em;
	right: 1.5em;
`

const RenderedModal = styled.div`
	padding: 3em 2.5em 2em;
	width: 100%;
	text-align: center;
`

const ModalIcon = styled(Icon)`
	margin: 0 auto;
	width: 9.2em;
	height: 10em;
`

const ButtonArea = styled(ConfirmCancel)`
	margin-top: 2em;
	font-size: 85%;
`

const LockedHint = ({
	activityId,
	id,
	contentfulId,
	name,
	difficulty,
	gems,
	studentGems,
	onInitUnlockHint,
	onIncrementGemsBy
}) => {
	let clickOnce = false
	const [openConfirmHint, setOpenConfirmHint] = useState(false)

	const unlockHint = () => {
		setOpenConfirmHint(false)

		if (!clickOnce) {
			if (studentGems < gems) return alert('Not enough gems')

			onInitUnlockHint(activityId, id, contentfulId)
			onIncrementGemsBy(-gems)
			clickOnce = true
		}
	}

	const unlockHintModal = (
		<DynamicModal
			open={openConfirmHint}
			closed={() => setOpenConfirmHint(false)}
			scaleX={0.5}
			scaleY={0.5}
			heightAuto
		>
			<RenderedModal>
				<h2 style={{ margin: 0 }}>Unlock Hint</h2>
				<ModalIcon src={require('../../../assets/icons/locked-hint.svg')} />
				<ReactMarkdown
					className="markdown-header"
					source={`Unlock *${name}* ?`}
				/>
				<ButtonArea
          cancelText={
            <IconLine className="sans" icon={<LeftArrow />}>Cancel</IconLine>
          }
					confirmText={
						<span style={{ lineHeight: '1em' }}>
							💎 <h3 style={{ display: 'inline' }}>{gems}</h3>
						</span>
					}
					cancelOnClick={() => setOpenConfirmHint(false)}
					confirmOnClick={unlockHint}
				/>
			</RenderedModal>
		</DynamicModal>
	)

	return (
		<>
			<Container
				className="hover-raise transition-medium"
				onClick={() => {
					clickOnce = false
					setOpenConfirmHint(true)
				}}
			>
				<span>💎 {gems}</span>
				<TopRight>{difficulty}</TopRight>
				<Name clamp={1}>
					<ReactMarkdown className="markdown-header" source={name} />
				</Name>
			</Container>
			{unlockHintModal}
		</>
	)
}

const mapStateToProps = state => ({
	studentGems: state.studentData.gems
})

const mapDispatchToProps = dispatch => {
	return {
		onInitUnlockHint: (activityId, id, contentId) =>
			dispatch(initUnlockHint(activityId, id, contentId)),
		onIncrementGemsBy: gemAmount => dispatch(incrementGemsBy(gemAmount))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LockedHint)
