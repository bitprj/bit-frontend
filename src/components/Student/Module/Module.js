import React from 'react'
import styled from 'styled-components'

import ActivityList from './ActivityList'
import PickProject from './PickProject'

import Hero from '../../shared/gadgets/Hero'
import GoBack from '../../shared/external/GoBack'
import ProgressCircle from '../../shared/gadgets/ProgressCircle'

import media from '../../../styles/media'
import withApiCache, { CACHE_MODULE } from '../../HOC/WithApiCache'

const Content = styled.div`
	padding-bottom: 6em;
	display: flex;
	flex-flow: row wrap;
	align-items: start;
	font-size: 90%;
	margin: 0 6em;
	position: relative;

	${media.thone`
    flex-direction: column;
  `}

	${media.desktop`
    margin: 0 2em;
  `}
`

const Background = styled.div`
	background-color: ${props => props.theme.bg};
	position: absolute;
	left: 0;
	right: 0;
	height: 40em;
	clip-path: ellipse(110% 70% at 63% 25%);
`

const StyledHero = styled(Hero)`
	height: 22.5em;
	padding-left: 4em;
`

const Container = styled.div`
	flex: 1;
	margin: 1em;
	margin-right: 3em;
	padding: 0 2em 4em;
	border-radius: 0.5em;
	background-color: white;
	position: relative;
	z-index: 1;

	box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);

	&:before {
		content: '';
		display: block;
		width: 0.2em;
		height: 55%;
		position: absolute;
		left: 4.4em;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ebebeb;
		z-index: -1;
	}

	${media.thone`
    margin: 1em auto;
  `}

	${media.desktop`
    margin-right: 1em;
  `}
`
const Title = styled.div`
	margin: 3.5em 0 1.5em;
	display: flex;
	align-items: center;

	background-color: #fff;
`
const ActivityContent = styled.div`
	flex: 7;
`
const ProgressWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5em;
	flex-shrink: 0;
`

const Module = ({ wac_data: [modu1e] }) => {
	const { name, description, gemsNeeded, activities: activityIds } =
		modu1e ?? {}

	return (
		<>
			<Background />
			<StyledHero
				above={modu1e && <GoBack />}
				title={name}
				description={description}
			/>

			<Content>
				<Container>
					<Title>
						<ProgressWrapper>
							<ProgressCircle size={'4em'} value={60} />
						</ProgressWrapper>
						<ActivityContent>
							<h2 style={{ marginLeft: '1em' }}>Activities</h2>
						</ActivityContent>
					</Title>
					<ActivityList activityIds={activityIds} />
				</Container>
				<PickProject />
			</Content>
		</>
	)
}

export default withApiCache([CACHE_MODULE], { fromUrl: true })(Module)
