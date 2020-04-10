import React from 'react'
import { Stack, Avatar, Text } from '@chakra-ui/core'

const ProfPic = ({ name, src, size = 'xs' }) => {
	return (
		<Stack isInline spacing={2} align="center" flex={1}>
			<Avatar size={size} name={name} src={src} />
			<Text m="0" fontSize={size}>
				{name}
			</Text>
		</Stack>
	)
}

export default ProfPic
