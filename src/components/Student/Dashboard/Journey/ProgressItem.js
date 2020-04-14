import React, { useEffect } from 'react'
import { Box, Stack, Text } from '@chakra-ui/core'
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

export const ProgressGroup = ({
	children,

	reverse,
	spacing = '0.5em',

	className,
	...props
}) => {
	return (
		<Stack
			className={className ?? ''}
			spacing={spacing}
			direction={!reverse ? 'column' : 'column-reverse'}
			{...props}
		>
			{children}
		</Stack>
	)
}

const ProgressItem = withApiCache([CACHE_ACTIVITY])(
	({
		id,
		wac_data: [activity],

		status,
		iconUrl,
		isPickAModule,
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

		const showIcon = () => {
			if (iconUrl) {
				return (
					<IconWithProgress
						iconUrl={iconUrl}
						size="1.75em"
						midValue={100}
						value={isPickAModule ? 100 : 69}
					/>
				)
			}

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
		}

		return (
			<RenderedItem
				className={`hover-strong-lift ${className ?? ''}`}
				onClick={handleSetSelectedActivity}
				{...props}
			>
				<IconSpacer>{showIcon()}</IconSpacer>
				<Text m="0" fontSize="0.8em">
					{isPickAModule ? 'Pick a Module' : name}
				</Text>
			</RenderedItem>
		)
	}
)

export default ProgressItem
