import React from 'react'
import Avatar from 'react-avatar'
import { Stack, Box, Text } from '@chakra-ui/core'

const ProfPic = ({ name, src, size = '1.6em' }) => {
	return (
		<Stack isInline spacing={`calc(${size}/4)`} align="center" flex={1}>
			<Box>
				<Avatar size={size} name={name} src={src} round textSizeRatio={2.5} />
			</Box>
			<Text m="0" fontSize={`calc(${size}/2)`}>
				{name}
			</Text>
		</Stack>
	)
}

export default ProfPic
