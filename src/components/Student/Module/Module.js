import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'

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

const StyledHero = styled(Hero)`
	height: 22.5em;
`

const Module = ({ wac_data: [mod] }) => {
	const { name, description, gemsNeeded, activities: activityIds } = mod ?? {}

	return (
		<>
			<StyledHero goBack title={name} description={description} />

			<Content>
				<ActivityList activityIds={activityIds} />
				<PickProject />
			</Content>
		</>
	)
}

export default withApiCache([CACHE_MODULE], { fromUrl: true })(Module)
