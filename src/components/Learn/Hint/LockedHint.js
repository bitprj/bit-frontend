import React, { useState } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { scroller } from 'react-scroll'

import DynamicModal from '../../shared/containers/DynamicModal'
import ClampedText from '../../shared/utils/ClampedText'
import Button from '../../shared/gadgets/Button'
import Icon from '../../shared/gadgets/Icon'

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
	text-align: center;
`

const ModalIcon = styled(Icon)`
	margin: 0 auto;
	width: 10em;
	height: 10em;
`

const ButtonArea = styled.div`
	margin-top: 2em;
	text-align: right;
	font-size: 80%;
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

	// const handleScrollTo = hintId => {
	// 	scroller.scrollTo(`unlocked-hint-${hintId}`, {
	// 		duration: 500,
	// 		smooth: true,
	// 		containerId: 'content',
	// 		offset: -document.getElementById('content-header').clientHeight + 1
	// 	})
	// }
	// handleScrollTo(id)

	const unlockHint = () => {
		setOpenConfirmHint(false)

		if (!clickOnce) {
			if (studentGems < gems) return alert('Not enough gems')

			onInitUnlockHint(activityId, id, contentfulId)
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
				scale={0.5}
				heightAuto
			>
				<RenderedModal>
					<ModalIcon src="https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/f/fb/Cielaph.png/302px-Cielaph.png?version=11c2e049da27d8f6e1c0a758077857c3" />
					<br />
					<ReactMarkdown
						className="markdown-header"
						source={`Unlock *${name}* ?`}
					/>
					<ButtonArea>
						<Button invert rounder clicked={unlockHint}>
							<span style={{ lineHeight: '1em' }}>
								💎 <h3 style={{ display: 'inline' }}>50</h3>
							</span>
						</Button>
						<Button rounder clicked={() => setOpenConfirmHint(false)}>
							Cancel
						</Button>
					</ButtonArea>
				</RenderedModal>
			</DynamicModal>
		</>
	)
}

const mapStateToProps = state => ({ studentGems: state.studentData.gems })

const mapDispatchToProps = dispatch => {
	return {
		onInitUnlockHint: (activityId, id, contentId) =>
			dispatch(initUnlockHint(activityId, id, contentId)),
		onIncrementGemsBy: gemAmount => dispatch(incrementGemsBy(gemAmount))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LockedHint)
