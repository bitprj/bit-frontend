import React, { useEffect } from 'react'
import { Box, Stack, Text } from '@chakra-ui/core'
import { css } from '@emotion/core'

import Interactive from '../../../shared/low/Interactive'

import withApiCache, {
	CACHE_ACTIVITY,
	CACHE_ACTIVITY_PROGRESS
} from '../../../HOC/WithApiCache'

import DotIcon from '@material-ui/icons/FiberManualRecord'
import DoneIcon from '@material-ui/icons/Done'

const ActivityItem = withApiCache([CACHE_ACTIVITY])(
	({
		id,
		wac_data: [activity],

		status,
		selectedActivityId,
		setOpenActivity,
		setSelectedActivity,

		...props
	}) => {
		const { name, description, summary, isProject, image, cards: cardIds } =
			activity ?? {}

		useEffect(() => {
			if (id === selectedActivityId) {
				handleSetSelectedActivity()
			}
		}, [status, selectedActivityId])

		const handleSetSelectedActivity = () => {
			setOpenActivity(true)
			setSelectedActivity({
				...activity,
				status
			})
		}

		const showStatusIcon = () => {
			switch (status) {
				case 'completed':
					return (
						<Box
							as={DoneIcon}
							size="1.25em"
							color="white"
							bg="theme.accentVariant"
							borderRadius="50%"
							p="0.15em"
						/>
					)
				case 'inprogress':
					return (
						<Box
							as={DotIcon}
							size="1.25em"
							color="white"
							bg="theme.accentVariant"
							borderRadius="50%"
							p="0.15em"
						/>
					)
				case 'incomplete':
					return (
						<Box
							size="1.25em"
							bg="white"
							border="0.05em solid"
							borderColor="theme.accentVariant"
							borderRadius="50%"
							p="0.15em"
						/>
					)
				default:
					return (
						<Box
							size="1.25em"
							bg="white"
							border="0.05em solid"
							borderColor="theme.accentVariant"
							borderRadius="50%"
							p="0.15em"
						/>
					)
			}
		}

		return (
			<Interactive
				className="hover-strong-lift transition-short"
				onClick={handleSetSelectedActivity}
				justifyContent="center"
				borderRadius="0.25em"
				p="0.8em 1.2em"
				_hover={css`
					background-color: white;
				`}
				{...props}
			>
				<Stack isInline spacing="1em">
					{showStatusIcon()}
					<Text m="0" fontSize="0.8em">
						{name}
					</Text>
				</Stack>
			</Interactive>
		)
	}
)

const ActivityList = ({
	reverse,
	activityIds,
	selectedActivityId,
	setOpenActivity,
	setSelectedActivity
}) => {
	return (
		<Stack spacing="0.5em" direction={!reverse ? 'column' : 'column-reverse'}>
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
		</Stack>
	)
}

export default ActivityList
