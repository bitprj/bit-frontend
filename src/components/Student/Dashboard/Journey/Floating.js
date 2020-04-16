import React from 'react'
import { Box, Flex, Stack, Heading, Text, Grid, Divider } from '@chakra-ui/core'

import Avatar from 'react-avatar'
import GitHubIcon from '@material-ui/icons/GitHub'

import AvatarGroup from '../../../shared/high/AvatarGroup'
import ProgressBar from '../../../shared/low/ProgressBar'
import withApiCache, {
	CACHE_MODULE,
	CACHE_MODULE_PROGRESS
} from '../../../HOC/WithApiCache'

const defaultIcon = require('../../../../assets/icons/split-cards.svg')

const Floating = ({ id, wac_data: [modu1e, moduleProgress], ...props }) => {
	const { name, description, gemsNeeded, activities: activityIds } =
		modu1e ?? {}
	const { incompleteActivities, inprogressActivities, completedActivities } =
		moduleProgress ?? {}

	const calculateProgressPercent = statusType => {
		const total =
			incompleteActivities?.length +
			inprogressActivities?.length +
			completedActivities?.length
		switch (statusType) {
			case 'completed':
				return completedActivities?.length / total
			case 'inprogress':
				return (
					(inprogressActivities?.length + completedActivities?.length) / total
				)
		}
	}

	return (
		<Box fontSize="70%" w="30em" bg="white" {...props}>
			<Box pt="2.5em" pb="1.5em" px="3em">
				<Box w="80%">
					<HeadingArea name={name} />
					<Description description={description} />
					<ProgressIndicator
						value={calculateProgressPercent('completed') * 100}
					/>
				</Box>

				<Divider borderColor="gray.300" />

				<ExpertsArea />

				<Divider borderColor="gray.300" />

				<Tags />
			</Box>
		</Box>
	)
}

export default withApiCache([CACHE_MODULE, CACHE_MODULE_PROGRESS])(Floating)

const HeadingArea = ({ name, ...props }) => {
	return (
		<Stack isInline spacing="2em" align="center" mb="2em" {...props}>
			<Box
				as="img"
				src={defaultIcon}
				size="3em"
				p="0.5em"
				shadow="0 0 1.1em #9acfff"
				borderRadius="0.5em"
			/>
			<Heading as="h1" m="0" fontSize="1.3em">
				{name}
			</Heading>
		</Stack>
	)
}

const Description = ({ description, ...props }) => {
	return (
		<Text fontSize="0.75em" {...props}>
			{description}
		</Text>
	)
}

const ProgressIndicator = ({ value, ...props }) => {
	return (
		<Box m="2em 0" {...props}>
			<ProgressBar value={value} h="0.5em" color="theme.mild" />
			<Stack isInline align="center" mt="0.4em" ml={3}>
				<Box size={2} rounded="50%" bg="theme.mild" />
				<Text m="0" fontSize="0.6em" color="theme.mild">
					IN PROGRESS
				</Text>
			</Stack>
		</Box>
	)
}

const ExpertsArea = React.memo(({ ...props }) => {
	return (
		<Box m="1em 0" {...props}>
			<Heading as="h3" m="0" mb="0.5em" fontSize="0.8em">
				Experts
			</Heading>

			{/* Avatars */}
			<AvatarGroup size="2.4em">
				<Avatar name="Steven Long" />
				<Avatar name="Kevin Vuong" />
				<Avatar name="Beaver Bong" />
			</AvatarGroup>
		</Box>
	)
})

const Tags = ({ ...props }) => {
	return (
		<Box m="1em 0" mb="1.5em" {...props}>
			<Heading as="h3" m="0" mb="0.5em" fontSize="0.8em">
				Tags
			</Heading>

			{/* Topics */}
			<Grid m="0" mt="1em" templateColumns="1fr 1fr" gap="1em">
				<Stack isInline spacing="0.4em" align="center">
					<Box as={GitHubIcon} size="1.2em" color="theme.accent" />
					<Text m="0" fontSize="0.8em">
						GitHub
					</Text>
				</Stack>

				<Stack isInline spacing="0.4em" align="center">
					<Box as={GitHubIcon} size="1.2em" color="theme.accent" />
					<Text m="0" fontSize="0.8em">
						GitHub
					</Text>
				</Stack>

				<Stack isInline spacing="0.4em" align="center">
					<Box as={GitHubIcon} size="1.2em" color="theme.accent" />
					<Text m="0" fontSize="0.8em">
						GitHub
					</Text>
				</Stack>

				<Stack isInline spacing="0.4em" align="center">
					<Box as={GitHubIcon} size="1.2em" color="theme.accent" />
					<Text m="0" fontSize="0.8em">
						GitHub
					</Text>
				</Stack>
			</Grid>
		</Box>
	)
}
