import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { get } from 'lodash'

import ProgressCard from './ProgressCard'
import GoBack from '../../shared/external/GoBack'

const HeroBackground = styled.div`
	background-color: ${props => props.theme.bg};
	position: absolute;
	left: 0;
	right: 0;
	height: 40em;
	clip-path: ellipse(110% 70% at 63% 25%);
`

const HeroContainer = styled.div`
	padding: 2.5em;
	padding-bottom: 2em;
	display: flex;
	flex-flow: row wrap;
	color: white;
	position: relative;
`

const DescriptionWrapper = styled.div`
	flex: 5;
	font-size: 85%;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Description = styled.div`
	margin-top: -4em;
	padding: 0 6em;

	@media screen and (max-width: 1000px) {
		padding: 0 1em;
	}
`

const CardWrapper = styled.div`
	flex: 4;
	display: flex;
	justify-content: center;
`

const ProgressBar = styled.div`
	margin-top: 2em;
	width: 90%;
	height: 0.5em;
	background-color: ${props =>
		props.theme.fontInvert.length === 4
			? props.theme.fontInvert + 'c'
			: props.theme.fontInvert + 'cc'};
	position: relative;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: ${props => props.progress};
		background-color: ${props => props.theme.accent};
	}
`

const StudentHero = ({
	use,
	title,
	description = 'Coding Best Practices are a set of informal rules that the software development community has learned over time which can  help improve the quality of software',
	suggestedActivity
}) => {
	const history = useHistory()

	const handleResume = () => {
		history.push('/learn/')
	}

	return (
		<>
			<HeroBackground />
			<HeroContainer>
				<DescriptionWrapper>
					<Description>
						{use === 'MODULE' && <GoBack />}

						<h1 style={{ margin: 0, whiteSpace: 'nowrap' }}>{title}</h1>
						<p style={{ lineHeight: 1.6 }}>{description}</p>

						{use === 'MODULE' && <ProgressBar progress={'69%'} />}
					</Description>
				</DescriptionWrapper>
				<CardWrapper>
					<ProgressCard
						image={'brickwall'}
						name={get(suggestedActivity, 'name')}
						summary={get(suggestedActivity, 'summary')}
						onClickButton={handleResume}
					/>
				</CardWrapper>
			</HeroContainer>
		</>
	)
}

export default StudentHero
