import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import StudentHero from '../Hero/StudentHero'
import ActivityList from './ActivityList'
import PickProject from './PickProject'

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
			<StudentHero
				use={'MODULE'}
				title={get(mod.current, 'name')}
				description={get(mod.current, 'description')}
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
