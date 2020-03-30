import React from 'react'
import styled from 'styled-components'

import ActivityList from './ActivityList'
import PickProject from './PickProject'
import Hero from '../../shared/gadgets/Hero'

import media from '../../../styles/media'
import withApiCache, { CACHE_MODULE } from '../../HOC/WithApiCache'

const Content = styled.div`
	padding-bottom: 6em;
	display: flex;
	flex-flow: row wrap;
	align-items: start;
	font-size: 90%;
	margin: 0 8em;
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
`

const Module = ({ wac_data: [mod] }) => {
	const { name, description, gemsNeeded, activities: activityIds } = mod ?? {}

	return (
		<>
			<Background />
			<StyledHero goBack title={name} description={description} />

			<Content>
				<ActivityList activityIds={activityIds} />
				<PickProject />
			</Content>
		</>
	)
}

export default withApiCache([CACHE_MODULE], { fromUrl: true })(Module)
