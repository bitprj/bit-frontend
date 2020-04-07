import React, { useState } from 'react'
import styled from 'styled-components'

import ActivityModal from './ActivityModal'
import ActivityList from './ActivityList'
import ChooseProject from './ChooseProject'

import Hero from '../../shared/gadgets/Hero'
import GoBack from '../../shared/external/GoBack'
import ProgressCircle from '../../shared/gadgets/ProgressCircle'

import media from '../../../styles/media'
import withApiCache, {
	CACHE_MODULE,
	CACHE_MODULE_PROGRESS
} from '../../HOC/WithApiCache'

const Content = styled.div`
	padding-bottom: 6em;
	display: flex;
	flex-flow: row wrap;

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
		width: 0.1em;
		height: 70%;
		position: absolute;
		left: 4.43em;
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

const Module = ({ id, wac_data: [modu1e, moduleProgress] }) => {
	const { name, description, gemsNeeded, activities: activityIds } =
		modu1e ?? {}
	const {
		incompleteActivities,
		inprogressActivities,
		completedActivities,
		chosenProject
	} = moduleProgress ?? {}

	const isModuleProgressReady = !!moduleProgress

	const [openActivity, setOpenActivity] = useState(false)
	const [selectedActivity, setSelectedActivity] = useState(null)

	/**
	 * n^2 time
	 */
	const hasId = (id, activities) => activities?.find(a => id === a.id)
	const getActivityIdsWithProgress = () =>
		activityIds?.map(activity => {
			const id = activity.id

			if (hasId(id, completedActivities)) {
				return { ...activity, status: 'completed' }
			}
			if (hasId(id, inprogressActivities)) {
				return { ...activity, status: 'inprogress' }
			}
			return { ...activity, status: 'incomplete' }
		})

	const getProjectIds = () => activityIds?.filter(a => a.isProject)
	const getProjectIdsWithProgress = () =>
		getActivityIdsWithProgress()?.filter(a => a.isProject)

	const getTrueActivityIds = () => activityIds?.filter(a => !a.isProject)
	const getTrueActivityIdsWithProgress = () =>
		getActivityIdsWithProgress()?.filter(a => !a.isProject)

	const calculateProgressPercent = statusType => {
		const trueActIds = getTrueActivityIdsWithProgress()
		const progress =
			trueActIds?.reduce((acc, activity) => {
				return activity.status === statusType ? acc + 1 : acc
			}, 0) / trueActIds?.length
		return progress * 100
	}

	return (
		<>
			<Background />
			<StyledHero
				above={modu1e && <GoBack hardcodedUrl={'/dashboard/'} />}
				title={name}
				description={description}
			/>

			<Content>
				<Container>
					<Title>
						<ProgressWrapper>
							<ProgressCircle
								size={'4em'}
								midValue={
									calculateProgressPercent('inprogress') +
										calculateProgressPercent('completed') || 0
								}
								value={calculateProgressPercent('completed') || 0}
							/>
						</ProgressWrapper>
						<ActivityContent>
							<h2 style={{ marginLeft: '1em' }}>Activities</h2>
						</ActivityContent>
					</Title>

					<ActivityList
						activityIds={
							isModuleProgressReady
								? getTrueActivityIdsWithProgress()
								: getTrueActivityIds()
						}
						selectedActivityId={selectedActivity?.id}
						setOpenActivity={setOpenActivity}
						setSelectedActivity={setSelectedActivity}
					/>
				</Container>

				<ChooseProject
					projectIds={
						isModuleProgressReady
							? getProjectIdsWithProgress()
							: getProjectIds()
					}
					moduleId={id}
					moduleName={name}
					chosenProject={chosenProject}
					setOpenActivity={setOpenActivity}
					selectedActivityId={selectedActivity?.id}
					setSelectedActivity={setSelectedActivity}
				/>

				<ActivityModal
					isModuleProgressReady={isModuleProgressReady}
					open={openActivity}
					closed={() => setOpenActivity(false)}
					id={selectedActivity?.id}
					moduleId={id}
					name={selectedActivity?.name}
					description={selectedActivity?.description}
					learningObjectives={selectedActivity?.summary}
					prerequisiteActivities={selectedActivity?.prerequisiteActivities}
					status={selectedActivity?.status}
				/>
			</Content>
		</>
	)
}

export default withApiCache([CACHE_MODULE, CACHE_MODULE_PROGRESS], {
	fromUrl: true
})(Module)
