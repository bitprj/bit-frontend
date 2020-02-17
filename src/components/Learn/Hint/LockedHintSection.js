import React, { useRef, useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Icon from '../../shared/gadgets/Icon'
import IconLine from '../../shared/gadgets/IconLine'
import HeaderShadow from '../../shared/utils/HeaderShadow'

import LockedHint from './LockedHint'

const Container = styled.div`
	margin: 0 -1.5em;
	display: flex;
	align-items: center;
`

const LockedHintsContainer = styled.div`
	margin-right: 1em;
	position: relative;
	width: 60%;

	@media screen and (orientation: landscape) {
		margin-right: 2.5em;
	}
`
const LockedHints = styled.div`
	padding: 0 1em;
	padding-bottom: 0.75em;
	height: 24em;
	overflow-y: auto;
`

const HelpInfo = styled.div`
	margin: 1em;
	margin-left: 0;
	width: 40%;
	color: #00498c;
`

const AnimatingIconLine = styled(IconLine)`
	cursor: pointer;

	:hover img,
	:hover svg {
		transform: translateX(0.2em);
	}
`

const LockedHintSection = ({ activityId, hints }) => {
	const containerRef = useRef(null)
	let hintIndexCounter = 0

	const renderedLockedHintsRecursive = hints => {
		if (!hints) return

		return hints.map(hint => {
			hintIndexCounter++
			if (hint.isUnlocked) {
				return renderedLockedHintsRecursive(hint.hints)
			} else {
				const { id, contentfulId, name, difficulty, gems } = hint
				return (
					<LockedHint
						key={`hint-${id}`}
						activityId={activityId}
						id={id}
						contentfulId={contentfulId}
						name={name}
						difficulty={difficulty}
						gems={gems}
					/>
				)
			}
		})
	}

	const renderedLockedHints = useMemo(
		() => renderedLockedHintsRecursive(hints),
		[hints]
	)

	return (
		<Container>
			{hintIndexCounter !== 0 && (
				<>
					<LockedHintsContainer>
						<HeaderShadow containerRef={containerRef} />
						<LockedHints
							className="low-profile-scrollbar only-hover"
							ref={containerRef}
						>
							{renderedLockedHints}
						</LockedHints>
						<HeaderShadow reverse containerRef={containerRef} />
					</LockedHintsContainer>

					<HelpInfo>
						<Icon src={require('../../../assets/icons/admin-mentoring.svg')} />
						<h1 style={{ margin: 0 }}>Are You Stuck?</h1>
						<p>
							We all get stuck sometimes and need help. These are the most
							commonly asked questions from the community.
						</p>
						<p>
							However, like the real world, hints don't come free. You can spend
							Gems that you earn for completing each card on unlocking valuable
							hints.
						</p>
						<h3>
							<AnimatingIconLine
								reverse
								icon={<ArrowForwardIcon fontSize="inherit" />}
							>
								How it works
							</AnimatingIconLine>
						</h3>
					</HelpInfo>
				</>
			)}
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		learnData: {
			id: activityId,
			cards,
			indicators: { currentCardIndex }
		}
	} = state

	return {
		activityId,
		hints: cards && get(cards[currentCardIndex], 'hints')
	}
}

export default connect(mapStateToProps)(LockedHintSection)
