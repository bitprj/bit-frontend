import React, { useState } from 'react'
import styled from 'styled-components'

import ActivityModal from './ActivityModal'
import MuiIconBox from '../../shared/external/MuiIconBox'
import withApiCache, { CACHE_ACTIVITY } from '../../HOC/WithApiCache'

const Activity = styled.div`
	padding: 1.5em 0;
	padding-right: 1.5em;
	display: flex;
	align-items: center;

	cursor: pointer;

	&:hover {
		background-color: white;
	}
`
const ProgressWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5em;
	flex-shrink: 0;
`
const CircleWrapper = styled.div`
	background-color: #fff;
	width: 3em;
	height: 3em;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Circle = styled(MuiIconBox)`
	background-color: ${props => props.theme.accent};
`
const ActivityContent = styled.div`
	flex: 7;
`

const ActivityItem = withApiCache([CACHE_ACTIVITY])(
	({
		id,
		wac_data: [activity],

		setOpenActivity,
		setSelectedActivity
	}) => {
		const { name, description, summary, isProject, image, cards: cardIds } =
			activity ?? {}

		return (
			<Activity
				className="hover-lift transition-short"
				key={`module-activity-${id}`}
				onClick={() => {
					setOpenActivity(true)
					setSelectedActivity(activity)
				}}
			>
				<ProgressWrapper>
					<CircleWrapper>
						<Circle circle width={'1em'} />
					</CircleWrapper>
				</ProgressWrapper>

				<ActivityContent>
					<h3 style={{ margin: 0 }}>{name}</h3>
					<p style={{ margin: 0 }}>{description}</p>
				</ActivityContent>
			</Activity>
		)
	}
)

const List = styled.div`
	display: grid;
	grid-row-gap: 1em;
`

const ActivityList = ({ activityIds }) => {
	const [openActivity, setOpenActivity] = useState(false)
	const [selectedActivity, setSelectedActivity] = useState(null)

	return (
		<>
			<List>
				{activityIds?.map(activity => {
					return (
						<ActivityItem
							key={`module-activityitem-${activity.id}`}
							id={activity.id}
							setOpenActivity={setOpenActivity}
							setSelectedActivity={setSelectedActivity}
						/>
					)
				})}
			</List>
			<ActivityModal
				open={openActivity}
				closed={() => setOpenActivity(false)}
				id={selectedActivity?.id}
				name={selectedActivity?.name}
				description={selectedActivity?.description}
				learningObjectives={selectedActivity?.summary}
			/>
		</>
	)
}

export default ActivityList
