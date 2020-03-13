import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import ActivityList from './ActivityList'
import PickProject from './PickProject'
import Hero from '../../shared/gadgets/Hero'

import { genFetch } from '../../../services/ContentfulService'
import media from '../../../styles/media'

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

const Module = ({ modules }) => {
	const { id: moduleId } = useParams()

	const mod = useRef(null)
	const [activities, setActivities] = useState(null)

	useEffect(() => {
		const _ = async () => {
			if (modules.length) {
				if (activities === null) {
					mod.current = modules.find(mod => mod.id == moduleId)
					setActivities(get(mod.current, 'activities'))
				}
				// fetch activites for the module
				setActivities(
					await Promise.all(
						mod.current.activities.map(async activity => {
							return { ...activity, ...(await genFetch(activity.contentfulId)) }
						})
					)
				)
			}
		}
		_()
	}, [modules.length])
	console.log(activities)

	return (
		<>
			<StyledHero
				goBack
				title={get(mod.current, 'name')}
				// description={get(mod.current, 'description')}
				description={
					'Coding Best Practices are a set of informal rules that the software development community has learned over time which can help improve the quality of software'
				}
			/>

			<Content>
				<ActivityList activities={activities} />
				<PickProject />
			</Content>
		</>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { inprogressModules }
	} = state

	const modules = inprogressModules

	return { modules }
}

export default connect(mapStateToProps)(Module)
