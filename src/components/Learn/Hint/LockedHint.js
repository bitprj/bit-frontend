import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'
import ReactMarkdown from 'react-markdown'

import LeftArrow from '@material-ui/icons/KeyboardArrowLeftRounded'

import DynamicModal from '../../shared/containers/DynamicModal'
import ClampedText from '../../shared/utils/ClampedText'
import ConfirmCancel from '../../shared/gadgets/ConfirmCancel'
import Icon from '../../shared/gadgets/Icon'
import IconLine from '../../shared/gadgets/IconLine'

import withApiCache, {
	CACHE_HINT,
	CACHE_HINT_PROGRESS
} from '../../HOC/WithApiCache'
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
	hints,

	wac_data: [hint, hintProgress],

	studentGems,

	onInitUnlockHint,
	onIncrementGemsBy
}) => {
	const { name, difficulty, gems } = hint ?? {}

	const { isUnlocked } = hintProgress ?? {}
	// console.log(hint)
	// console.log(isUnlocked)

	let clickOnce = false
	const [openConfirmHint, setOpenConfirmHint] = useState(false)

	/**
	 * TODO change from this approach to
	 * https://stackoverflow.com/questions/41824730/redux-how-to-handle-errors-in-reducer
	 * basically, global error catcher, notify user (or not) and move on
	 */
	const unlockHint = () => {
		setOpenConfirmHint(false)

		if (!clickOnce) {
			if (studentGems < gems) return alert('Not enough gems')

			onInitUnlockHint(activityId, id)
			onIncrementGemsBy(-gems)
			clickOnce = true
		}
	}

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
							<IconLine className="sans" icon={<LeftArrow />}>
								Cancel
							</IconLine>
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
		</>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { gems }
	} = state
	return {
		studentGems: gems
	}
}

const mapDispatchToProps = dispatch => ({
	onInitUnlockHint: (activityId, id) =>
		dispatch(initUnlockHint(activityId, id)),
	onIncrementGemsBy: gemAmount => dispatch(incrementGemsBy(gemAmount))
})

const enhancer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withApiCache([CACHE_HINT, CACHE_HINT_PROGRESS])
)

export default enhancer(LockedHint)
