import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import StudentHero from '../Hero/StudentHero'
import ActivityCard from './ActivityCard'

import AddIcon from '@material-ui/icons/Add'
import { setViewStudent } from '../../../redux/actions/viewManager'
import * as viewTypes from '../../../redux/utils/viewTypes'

import { sizes } from '../../../styles/media'

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: start;
	font-size: 90%;
	margin: 0 2em;
	position: relative;

	@media screen and (max-width: ${sizes.thone}px) {
		flex-direction: column;
	}

	@media screen and (min-width: ${sizes.desktop}px) {
		margin: 0 8em;
	}
`

const ColOne = styled.div`
	flex: 1;
`

const ColTwo = styled.div`
	flex: 1;
	position: relative;
	top: 5em;
`

const PickModule = styled.div`
	margin: 2%;
	margin-top: 0;
	padding: 2em;
	height: 20em;
	border-radius: 1em;
	background-color: #fff;
	text-align: center;

	display: flex;
	align-items: center;

	cursor: pointer;
`
const PickButton = styled.div`
	font-size: 1.5em;
	margin: 1.5em auto 1em;
	border-radius: 0.2em;
	color: white;
	width: 1.5em;
	height: 1.5em;
	background-color: ${props => props.theme.accent};
	box-shadow: 0 0 7px 7px ${props => props.theme.accent}07;

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;

	transition: box-shadow 0.2s ease;

	&:hover {
		box-shadow: none;
	}
`

const Progress = props => {
	return (
		<>
			<StudentHero for={'TOPIC'} />

			<Content>
				<ColOne>
					<PickModule className="hover-raise transition-medium">
						<div>
							<h2>Pick a Module</h2>
							<p style={{ padding: '0 3em' }}>
								Choose a module and learn an interesting tidbit about python
							</p>
							<PickButton>
								<AddIcon fontSize="inherit" />
							</PickButton>
						</div>
					</PickModule>

					<ActivityCard isLeft />
					<ActivityCard isLeft isLast />
				</ColOne>

				<ColTwo>
					<ActivityCard
						clicked={() => props.onSetViewStudent(viewTypes.MODULE)}
					/>
					<ActivityCard />
				</ColTwo>
			</Content>
		</>
	)
}

// const mapStateToProps = state => {
//   return {
//     // ...state.studentData
//   };
// };

const mapDispatchToProps = dispatch => {
	return {
		onSetViewStudent: viewName => {
			dispatch(setViewStudent(viewName))
		}
	}
}

export default connect(null, mapDispatchToProps)(Progress)
