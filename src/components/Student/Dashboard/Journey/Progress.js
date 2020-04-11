import React from 'react'
import { Box, Stack, Flex, Heading, Text } from '@chakra-ui/core'

import GitHubIcon from '@material-ui/icons/GitHub'

const Progress = ({}) => {
	//
	return (
		<Box>
			<Stack isInline spacing="1em" align="center">
				<Box>
					<Box
						as={GitHubIcon}
						size="2em"
						color="white"
						bg="theme.accentVariant"
						borderRadius="50%"
						p="0.225em"
					/>
				</Box>
				<Stack>
					<Heading as="h2" fontSize="1em" m="0">
						Frontend Engineering
					</Heading>
					<Text fontSize="0.8em" m="0">
						Focus in React.js
					</Text>
				</Stack>
			</Stack>
		</Box>
	)
}

export default Progress
