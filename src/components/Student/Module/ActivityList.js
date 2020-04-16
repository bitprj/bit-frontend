import React, { useContext, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'

import MuiIconFormatter from '../../shared/high/MuiIconFormatter'
import withApiCache, {
	CACHE_ACTIVITY,
	CACHE_ACTIVITY_PROGRESS
} from '../../HOC/WithApiCache'

import DotIcon from '@material-ui/icons/FiberManualRecord'
import DoneIcon from '@material-ui/icons/Done'

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

const StatusWrapper = styled(MuiIconFormatter)`
	padding: 0.8em;
	background-color: #fff;
	font-size: 50%;
`

const ActivityContent = styled.div`
	flex: 7;
`

const ActivityItem = withApiCache([CACHE_ACTIVITY])(
	({
		id,
		wac_data: [activity],

		status,
		selectedActivityId,
		setOpenActivity,
		setSelectedActivity
	}) => {
		const themeContext = useContext(ThemeContext)

		const { name, description, summary, isProject, image, cards: cardIds } =
			activity ?? {}

		useEffect(() => {
			if (id === selectedActivityId) {
				handleSetSelectedActivity()
			}
		}, [status, selectedActivityId])

		const handleSetSelectedActivity = () => {
			setSelectedActivity({
				...activity,
				status
			})
		}

		const showStatusIcon = () => {
			switch (status) {
				case 'completed':
					return <DoneIcon htmlColor={themeContext.accent} />
				case 'inprogress':
					return (
						<DotIcon
							htmlColor={themeContext.accentVariant}
							
						/>
					)
				case 'incomplete':
				default:
					return <DotIcon htmlColor="#ebebeb" />
			}
		}

		return (
			<Activity
				className="hover-lift transition-short"
				key={`module-activity-${id}`}
				onClick={() => {
					setOpenActivity(true)
					handleSetSelectedActivity()
				}}
			>
				<ProgressWrapper>
					<StatusWrapper width="4em">{showStatusIcon()}</StatusWrapper>
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

const ActivityList = ({
	activityIds,
	selectedActivityId,
	setOpenActivity,
	setSelectedActivity
}) => {
	return (
		<List>
			{activityIds?.map(activity => {
				const { id, status } = activity
				return (
					<ActivityItem
						key={`module-activityitem-${id}`}
						id={id}
						status={status}
						selectedActivityId={selectedActivityId}
						setOpenActivity={setOpenActivity}
						setSelectedActivity={setSelectedActivity}
					/>
				)
			})}
		</List>
	)
}

export default ActivityList
