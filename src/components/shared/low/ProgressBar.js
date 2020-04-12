import React from 'react'
import { Box } from '@chakra-ui/core'

const ProgressBar = ({
	value = 69,
	midValue,
	color = 'theme.accent',
	midColor = 'theme.accentVariant',
	orientation = 'horizontal',
	reverse,
	...props
}) => {
	const isHorz = orientation === 'horizontal'

	const cappedValue = value > 100 ? 100 : value
	const cappedMidValue = midValue > 100 ? 100 : midValue
	return (
		<Box
			m={isHorz ? '1em 0' : '0 1em'}
			w={isHorz ? '100%' : '0.5em'}
			h={isHorz ? '0.5em' : undefined}
			bg="gray.100"
			pos="relative"
			borderRadius={props.h ?? '0.25em'}
			{...props}
		>
			{/* Mid */}
			<Box
				w={isHorz && `${cappedMidValue}%`}
				h={!isHorz && `${cappedMidValue}%`}
				bg={midColor}
				pos="absolute"
				top={!isHorz && reverse ? undefined : 0}
				left={isHorz && reverse ? undefined : 0}
				right={isHorz && !reverse ? undefined : 0}
				bottom={!isHorz && !reverse ? undefined : 0}
				borderRadius={props.h ?? '0.25em'}
				zIndex="98"
			/>

			{/* Load */}
			<Box
				w={isHorz && `${cappedValue}%`}
				h={!isHorz && `${cappedValue}%`}
				bg={color}
				pos="absolute"
				top={!isHorz && reverse ? undefined : 0}
				left={isHorz && reverse ? undefined : 0}
				right={isHorz && !reverse ? undefined : 0}
				bottom={!isHorz && !reverse ? undefined : 0}
				borderRadius={props.h ?? '0.25em'}
				zIndex="99"
			/>
		</Box>
	)
}

export default ProgressBar
