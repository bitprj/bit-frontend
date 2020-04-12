import React from 'react'
import { Box, Flex, Stack, Heading, Text, Grid, Divider } from '@chakra-ui/core'

import Avatar from 'react-avatar'
import GitHubIcon from '@material-ui/icons/GitHub'

import AvatarGroup from '../../../shared/high/AvatarGroup'
import ProgressBar from '../../../shared/low/ProgressBar'

const Floating = ({ ...props }) => {
	return (
		<Box className="big-lift" fontSize="70%" w="30em" bg="white" {...props}>
			<Box pt="2.5em" px="3em">
				{/* Heading */}
				<Heading as="h1" mt={0} mb="1em" fontSize="1.8em">
					Advanced Javascript
				</Heading>

				{/* Description Area */}
				<Box w="80%">
					<Text fontSize="0.75em">
						Lorem Ipsum Module Description. Lorem Ipsum Module Description.
						Lorem Ipsum Module Description. Lorem Ipsum Module Description.
						Lorem Ipsum Module Description. Lorem Ipsum Module Description.
						Lorem Ipsum
					</Text>

					{/* ProgressBar */}
					<Box m="2em 0">
						<ProgressBar value={20} h="0.5em" color="theme.mild" />
						<Stack isInline align="center" mt="0.4em" ml={3}>
							<Box size={2} rounded="50%" bg="theme.mild" />
							<Text m="0" fontSize="0.6em" color="theme.mild">
								IN PROGRESS
							</Text>
						</Stack>
					</Box>
				</Box>

				<Divider borderColor="gray.300" />

				{/* Experts Area */}
				<Box m="1em 0">
					<Heading as="h3" m="0" mb="0.5em" fontSize="0.8em">
						Experts
					</Heading>

					{/* Avatars */}
					<AvatarGroup size="2.4em">
						<Avatar name="Barack Obama" />
						<Avatar name="Donald Trump" />
						<Avatar name="Ronald Reagan" />
						<Avatar name="George W. Bush" />
					</AvatarGroup>
				</Box>

				<Divider borderColor="gray.300" />

				{/* Topics Covered */}
				<Box m="1em 0" mb="1.5em">
					<Heading as="h3" m="0" mb="0.5em" fontSize="0.8em">
						Topics Covered
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
			</Box>

			{/* World Info */}
			<Flex p="1.5em" bg="gray.50" justify="center">
				<Stack isInline spacing="1.2em" align="center">
					<Box as={GitHubIcon} size="2.4em" color="theme.accent" />
					<Box>
						<Heading as="h2" fontSize="1em" m="0">
							Frontend Engineering
						</Heading>
						<Text fontSize="0.8em" m="0">
							Focus in React.js
						</Text>
					</Box>
				</Stack>
			</Flex>
		</Box>
	)
}

export default Floating
