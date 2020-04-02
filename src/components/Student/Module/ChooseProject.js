import React, { useState } from 'react'
import styled from 'styled-components'

import AddIcon from '@material-ui/icons/Add'
import NextIcon from '@material-ui/icons/NavigateNextRounded'

import ProjectModal from './ProjectModal'
import MuiIconBox from '../../shared/external/MuiIconBox'

import withApiCache, { CACHE_ACTIVITY } from '../../HOC/WithApiCache'

const Project = styled.div`
	flex: 1;
	padding: 2em 0 0em;
	max-height: 32em;
	position: relative;
	border-radius: 0.5em;

	background-color: white;
	box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
	overflow: hidden;
	text-align: center;
	cursor: pointer;
	transition: 0.2s ease all;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0px 12px 24px rgba(38, 38, 38, 0.3);
	}
`

const ButtonContainer = styled(MuiIconBox)`
	margin: 3.5em auto 2.5em;
	position: relative;
	z-index: 1;
`

const Img = styled.img`
	margin-top: -8em;
	width: 100%;
	position: absolute;
	border-radius: 0 0 0.5em 0.5em;
`

const ProjectBox = ({ title, description, src, buttonIcon, onClick }) => {
	return (
		<Project onClick={onClick}>
			<h2>{title}</h2>
			<p style={{ padding: '0 5em' }}>{description}</p>
			<ButtonContainer width="2.5em">{buttonIcon}</ButtonContainer>
			<Img src={src} />
		</Project>
	)
}

const UnconnectedWacProjectBox = ({
	wac_data: [activity],

	setOpenActivity,
	setSelectedActivity
}) => {
	const {
		name = 'Contributing to Git',
		description = 'Learn how to work collaboratively on coding projects!',
		image = 'https://i.imgur.com/MlfXbOo.png'
	} = activity ?? {}

	return (
		<ProjectBox
			title={name}
			description={description}
			src={image}
			buttonIcon={<NextIcon fontSize="inherit" />}
			onClick={() => {
				setOpenActivity(true)
				setSelectedActivity(activity)
			}}
		/>
	)
}

const WacProjectBox = withApiCache([CACHE_ACTIVITY])(UnconnectedWacProjectBox)

const Container = styled.div`
	flex: 1;
	margin: 1em;
	max-height: 40em;

	display: flex;
	flex-direction: column;
	position: relative;
	top: 4em;

	> div:first-child {
		margin-bottom: 2em;
	}
`

const ChooseProject = ({
	projectIds,
	moduleId,
	moduleName,
	chosenProject,
	setOpenActivity,
	setSelectedActivity
}) => {
	const [openProject, setOpenProject] = useState(false)

	return (
		<>
			<Container>
				<ProjectBox
					title="Pick a Project"
					description="Choose a Project to apply what you have learned!"
					src="https://i.imgur.com/u7s49uD.png"
					buttonIcon={<AddIcon fontSize="inherit" />}
					onClick={() => setOpenProject(true)}
				/>

				{chosenProject && (
					<WacProjectBox
						id={chosenProject?.id}
						onClick={() => setOpenActivity()}
						setOpenActivity={setOpenActivity}
						setSelectedActivity={setSelectedActivity}
					/>
				)}
			</Container>

			<ProjectModal
				moduleId={moduleId}
				moduleName={moduleName}
				open={openProject}
				closed={() => setOpenProject(false)}
				projectIds={projectIds}
			/>
		</>
	)
}

export default ChooseProject
