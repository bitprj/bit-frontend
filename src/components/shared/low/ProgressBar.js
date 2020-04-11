import React from 'react'
import { Box } from '@chakra-ui/core'

const ProgressBar = ({ value = '69%', color = 'theme.accent', ...props }) => {
	return (
		<Box m="1em 0" w="100%" h="0.5em" bg="gray.100" pos="relative" {...props}>
			<Box
				w={`${value}%`}
				bg={color}
				pos="absolute"
				top="0"
				left="0"
				bottom="0"
			></Box>
		</Box>
	)
}

export default ProgressBar
