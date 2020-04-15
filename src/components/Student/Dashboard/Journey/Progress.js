import React, { useState } from 'react'
import { Box, Flex, Stack, Heading } from '@chakra-ui/core'
import styled from 'styled-components'

import GitHubIcon from '@material-ui/icons/GitHub'
import IconWithProgress from '../../../shared/high/IconWithProgress'

import ActivityModal from '../../Module/ActivityModal'
import ProjectModal from '../../Module/ProjectModal'

import {
	ProgressGroup,
	Item,
	ActivityProgressItem,
	ProjectProgressItem
} from './ProgressItem'

import ProgressBar from '../../../shared/low/ProgressBar'

import withApiCache, {
	CACHE_MODULE,
	CACHE_MODULE_PROGRESS
} from '../../../HOC/WithApiCache'

export const TYPE_PREVIEW = 0
export const TYPE_JOURNEY = 1

const ProjectProgressGroup = styled(ProgressGroup)`
  margin: -0.9em -0.55em;
  margin-right: 0;
`

const Progress = ({
	id,
	wac_data: [modu1e, moduleProgress],

	className,
	variant = TYPE_PREVIEW
}) => {
	const reverse = variant === TYPE_JOURNEY

	const { name, description, gemsNeeded, activities: activityIds } =
		modu1e ?? {}
	const {
		incompleteActivities,
		inprogressActivities,
		completedActivities,
		chosenProjects: chosenProjectIds
	} = moduleProgress ?? {}

	const isModuleProgressReady = !!moduleProgress

	const [openActivity, setOpenActivity] = useState(false)
	const [openProjectSelection, setOpenProjectSelection] = useState(false)
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

	const getChosenProjectsWithProgress = () => {
		const projectIdsWithProgress = getProjectIdsWithProgress()
		return chosenProjectIds?.map(chosen => {
			for (const project of projectIdsWithProgress) {
				if (chosen.id === project.id) return project
			}
		})
	}

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
			<Flex
				className={className ?? ''}
				direction={!reverse ? 'column' : 'column-reverse'}
				maxW="20em"
			>
				<TitleArea title={name} />

				{/* Activity Area */}
				<Stack isInline spacing="1.6em" py="2em" pos="relative">
					<VerticalProgress
						reverse={reverse}
						calculateProgressPercent={calculateProgressPercent}
					/>

					<ProgressGroup reverse={reverse}>
						{(isModuleProgressReady
							? getTrueActivityIdsWithProgress()
							: getTrueActivityIds()
						)?.map(activity => {
							const { id, status } = activity ?? {}
							return (
								<ActivityProgressItem
									key={`module-activityitem-${id}`}
									id={id}
									status={status}
									selectedActivityId={selectedActivity?.id}
									setOpenActivity={setOpenActivity}
									setSelectedActivity={setSelectedActivity}
								/>
							)
						})}
					</ProgressGroup>
				</Stack>

				<ProjectProgressGroup reverse={reverse} spacing="1em">
					{getChosenProjectsWithProgress()?.map((activity, i) => {
						const { id, status } = activity ?? {}
						return (
							<ProjectProgressItem
								key={`module-projectitem-${id}`}
								iconUrl={require('../../../../assets/icons/split-cards.svg')}
								id={id}
								status={status}
								selectedActivityId={selectedActivity?.id}
								setOpenActivity={setOpenActivity}
								setSelectedActivity={setSelectedActivity}
							/>
						)
					})}

					{/* Pick A Project */}
					<Item
						title="Pick a Project"
						icon={
							<IconWithProgress
								iconUrl={require('../../../../assets/icons/cards.svg')}
								size="1.75em"
								midValue={100}
								value={69}
							/>
						}
						onClick={() => setOpenProjectSelection(true)}
					/>
				</ProjectProgressGroup>
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

			<ProjectModal
				open={openProjectSelection}
				closed={() => setOpenProjectSelection(false)}
				moduleId={id}
				projectIds={
					isModuleProgressReady ? getProjectIdsWithProgress() : getProjectIds()
				}
				chosenProjectIds={chosenProjectIds}
			/>
		</>
	)
}

export default withApiCache([CACHE_MODULE, CACHE_MODULE_PROGRESS])(Progress)

const TitleArea = ({ title, subtitle, ...props }) => {
	return (
		<Stack isInline spacing="1.5em" align="center" {...props}>
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
					{title}
				</Heading>
				{/* <Text fontSize="0.8em" m="0">
					Focus in React.js
				</Text> */}
			</Box>
		</Stack>
	)
}

const VerticalProgress = ({ reverse, calculateProgressPercent, ...props }) => {
	return (
		<>
			{/* Middle ProgressBar */}
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

			{/* Upper Starting ProgressBar */}
			<ProgressBar
				orientation="vertical"
				reverse={reverse}
				value={100}
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
		</>
	)
}
