import React, { useEffect } from 'react'
import { Stack, Text } from '@chakra-ui/core'
import styled from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'

import Interactive from '../../../shared/low/Interactive'
import ProgressCircle from '../../../shared/low/ProgressCircle'

import DoneIcon from '@material-ui/icons/Done'
import MuiIconFormatter from '../../../shared/high/MuiIconFormatter'
import IconWithProgress from '../../../shared/high/IconWithProgress'

import withApiCache, {
	CACHE_ACTIVITY,
	CACHE_ACTIVITY_PROGRESS
} from '../../../HOC/WithApiCache'

export const ProgressGroup = ({
	children,

	reverse,
	spacing = '0.5em',

	className,
	...props
}) => {
	return (
		<Stack
			className={className || ''}
			spacing={spacing}
			direction={!reverse ? 'column' : 'column-reverse'}
			{...props}
		>
			{children}
		</Stack>
	)
}

const IconSpacer = styled.div`
	margin-right: 1em;
`

const DoneIconWrapper = styled(MuiIconFormatter)`
	margin: 0;
	padding: 0.2em;
	width: ${props => props.size ?? '1.5em'};
	height: ${props => props.size ?? '1.5em'};
	font-size: 80%;
`

const IncompleteIcon = styled.div`
	padding: 0.15em;

	width: ${props => props.size ?? '1.25em'};
	height: ${props => props.size ?? '1.25em'};
	background-color: #fff;
	border: 0.05em solid ${props => props.theme.accentVariant};
	border-radius: 50%;
`

const RenderedItem = styled(Interactive)`
	padding: 0.8em 1.2em;
	display: flex;
	align-items: center;
	border-radius: 0.25em;

	:hover {
		background-color: white;
		z-index: 101; // to go over progressbar
	}
`

export const Item = ({ className, title, icon, ...props }) => {
	return (
		<RenderedItem className={`hover-strong-lift ${className || ''}`} {...props}>
			<IconSpacer>{icon}</IconSpacer>
			<Text m="0" fontSize="0.8em">
				{title}
			</Text>
		</RenderedItem>
	)
}

const ProgressItem = withApiCache([CACHE_ACTIVITY])(
	({
		id,
		wac_data: [activity],

		icon,
		status,
		selectedActivityId,
		setOpenActivity,
		setSelectedActivity,

		className,
		...props
	}) => {
		const { name } = activity ?? {}

		useEffect(() => {
			if (id && id === selectedActivityId) {
				setSelectedActivity({
					...activity,
					status
				})
			}
		}, [status, selectedActivityId])

		const handleSetSelectedActivity = () => {
			setOpenActivity(true)
			setSelectedActivity({
				...activity,
				status
			})
		}

		return (
			<Item
				icon={icon}
				title={name}
				onClick={handleSetSelectedActivity}
				{...props}
			/>
		)
	}
)

export default ProgressItem

export const ActivityProgressItem = ({ status, ...props }) => {
	const icon = (() => {
		switch (status) {
			case 'completed':
				return (
					<DoneIconWrapper size="1.5em" circle>
						<DoneIcon />
					</DoneIconWrapper>
				)
			case 'inprogress':
				return (
					<ProgressCircle
						size="1.25em"
						color="white"
						thickness={22}
						midValue={100}
						value={69}
					/>
				)
			case 'incomplete':
				return <IncompleteIcon size="1.25em" />
			default:
				return (
					<Skeleton
						variant="circle"
						width="1.25em"
						height="1.25em"
						animation="wave"
					/>
				)
		}
	})()

	return <ProgressItem icon={icon} status={status} {...props} />
}

export const ProjectProgressItem = ({
	isChooseProject,
	iconUrl,
	status,
	...props
}) => {
	const icon = (() => {
		if (iconUrl) {
			return (
				<IconWithProgress
					iconUrl={iconUrl}
					size="1.75em"
					midValue={100}
					value={69}
				/>
			)
		}
	})()

	return <ProgressItem icon={icon} status={status} {...props} />
}
