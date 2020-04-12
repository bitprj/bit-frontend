import React, { useState } from 'react'
import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/core'

import GitHubIcon from '@material-ui/icons/GitHub'
import CheckIcon from '@material-ui/icons/CheckRounded'
import DotIcon from '@material-ui/icons/FiberManualRecord'

import ActivityModal from '../../Module/ActivityModal'
import ActivityList from './ActivityList'
import ProgressBar from '../../../shared/low/ProgressBar'

import withApiCache, {
	CACHE_MODULE,
	CACHE_MODULE_PROGRESS
} from '../../../HOC/WithApiCache'

export const TYPE_PREVIEW = 0
export const TYPE_JOURNEY = 1

const ProgressItem = ({ status = '' }) => {
	return (
		<Stack isInline>
			<Box as={CheckIcon}></Box>
			<Text>Recursion and Stack</Text>
		</Stack>
	)
}

const Progress = ({
	id,
	wac_data: [modu1e, moduleProgress],

	type = TYPE_PREVIEW,
	reverse
}) => {
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
		if (!trueActIds) return

		let progress = trueActIds.reduce((acc, activity) => {
			return activity.status === statusType ? acc + 1 : acc
		}, 0)

		return (progress / (trueActIds.length - 1)) * 100
	}

	return (
		<>
			<Flex direction={!reverse ? 'column' : 'column-reverse'} maxW="20em">
				{/* Title Area */}
				<Stack isInline spacing="1.5em" align="center">
					<Box
						as={GitHubIcon}
						size="3em"
						color="white"
						bg="theme.accentVariant"
						borderRadius="50%"
						p="0.3em"
					/>
					<Box>
						<Heading as="h2" fontSize="1em" m="0">
							{name}
						</Heading>
						<Text fontSize="0.8em" m="0">
							Focus in React.js
						</Text>
					</Box>
				</Stack>

				<Stack isInline spacing="1.6em" py="2em" pos="relative">
					{/* Vertical ProgressBar */}
					<ProgressBar
						orientation="vertical"
						reverse={reverse}
						value={calculateProgressPercent('completed')}
						midValue={
							calculateProgressPercent('inprogress') +
							calculateProgressPercent('completed')
						}
						w="0.2em"
						m="1.4em"
					/>

					{/* List of Activities */}
					<Stack>
						<ActivityList
							reverse={reverse}
							activityIds={
								isModuleProgressReady
									? getTrueActivityIdsWithProgress()
									: getTrueActivityIds()
							}
							selectedActivityId={selectedActivity?.id}
							setOpenActivity={setOpenActivity}
							setSelectedActivity={setSelectedActivity}
						/>
					</Stack>

					{/* Upper Starting ProgressBar */}
					<ProgressBar
						orientation="vertical"
						reverse={reverse}
						value={isModuleProgressReady && 100}
						w="0.2em"
						h="3.5em"
						m="0 1.4em"
						pos="absolute"
						top={!reverse && 0}
						bottom={reverse && 0}
					/>

					{/* Lower Finalizing ProgressBar */}
					<ProgressBar
						orientation="vertical"
						reverse={reverse}
						value={calculateProgressPercent('completed') > 100 && 100}
						midValue={
							calculateProgressPercent('inprogress') +
								calculateProgressPercent('completed') >
								100 && 100
						}
						w="0.2em"
						h="3.5em"
						m="0 1.4em"
						pos="absolute"
						top={reverse && 0}
						bottom={!reverse && 0}
					/>
				</Stack>
			</Flex>

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
		</>
	)
}

export default withApiCache([CACHE_MODULE, CACHE_MODULE_PROGRESS])(Progress)
