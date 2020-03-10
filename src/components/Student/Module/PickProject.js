import React, { useState } from 'react'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'

import ProjectModal from './ProjectModal'
import MuiIconBox from '../../shared/external/MuiIconBox'

const Container = styled.div`
	flex: 1;
	margin: 1em;
	padding-top: 2.5em;
	border-radius: 0.5em;
	background-color: white;
	text-align: center;
	position: relative;
	cursor: pointer;
	top: 4em;
	transition: 0.25s ease all;

	box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0px 12px 24px rgba(38, 38, 38, 0.3);
	}
`

const ButtonContainer = styled(MuiIconBox)`
	margin: 1.5em auto;
`

const Img = styled.img`
	width: 100%;
	border-radius: 0 0 0.5em 0.5em;
	position: relative;
	bottom: 0;
`

const PickProject = ({}) => {
	const [openProject, setOpenProject] = useState(false)

	return (
		<>
			<Container onClick={() => setOpenProject(true)}>
				<h2>Pick a Project</h2>
				<p>
					Choose a Project to apply <br /> what you have learned!
				</p>
				<ButtonContainer width="2em">
					<AddIcon fontSize="inherit" />
				</ButtonContainer>
				<Img src="https://cdn.dribbble.com/users/418188/screenshots/5694634/moonworkers_digital_illustration_tubik_2x.png"></Img>
			</Container>

			<ProjectModal
				open={openProject}
				closed={() => setOpenProject(false)}
				name="Tip Calculator"
				description="Design a calculator to calculate the tip you have to leave when you go to a restaurant"
				img="http://squareone.co.in/wp-content/uploads/2018/08/food-Birsto-Oakwood-Premier12-720x700.jpg"
				time="4 hours"
			/>
		</>
	)
}

export default PickProject
