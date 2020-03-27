import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import ActivityModal from './ActivityModal'
import ProgressCircle from '../../shared/gadgets/ProgressCircle'
import MuiIconBox from '../../shared/external/MuiIconBox'
import media from '../../../styles/media'

const Container = styled.div`
	flex: 1;
	margin: 1em;
	margin-right: 3em;
	padding: 0 2em 4em;
	border-radius: 0.5em;
	background-color: white;
	position: relative;
	z-index: 1;

	box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);

	&:before {
		content: '';
		display: block;
		width: 0.2em;
		height: 55%;
		position: absolute;
		left: 4.4em;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ebebeb;
		z-index: -1;
	}

	${media.thone`
    margin: 1em auto;
  `}

	${media.desktop`
    margin-right: 1em;
  `}
`
const List = styled.div`
	display: grid;
	grid-row-gap: 2em;
`

const Title = styled.div`
	margin: 3.5em 0;
	display: flex;
	align-items: center;

	background-color: #fff;
`
const Activity = styled.div`
	padding: 1.5em 0;
	padding-right: 1.5em;
	display: flex;
	align-items: center;

	cursor: pointer;

	&:hover {
		background-color: white;
	}
`
const ProgressWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5em;
`
const CircleWrapper = styled.div`
	background-color: #fff;
	width: 3em;
	height: 3em;
	display: flex;
	align-items: center;
	justify-content: center;
`
const ActivityContent = styled.div`
	flex: 7;
`

const Circle = styled(MuiIconBox)`
	background-color: ${props => props.theme.accent};
`

const ActivityList = ({ activities }) => {
	const themeContext = useContext(ThemeContext)

	const [openActivity, setOpenActivity] = useState(false)
	const [selectedActivity, setSelectedActivity] = useState(null)

	const activityContentList =
		activities &&
		activities.map((activity, index) => {
			return (
				<Activity
					className="hover-lift transition-short"
					key={`module-${index}`}
					onClick={() => {
						setSelectedActivity(activities[index])
						setOpenActivity(true)
					}}
				>
					<ProgressWrapper>
						<CircleWrapper>
							<Circle circle width={'1em'} />
						</CircleWrapper>
					</ProgressWrapper>

					<ActivityContent>
						<h3 style={{ margin: 0 }}>{activity.name}</h3>
						<p style={{ margin: 0 }}>{activity.description}</p>
					</ActivityContent>
				</Activity>
			)
		})

	return (
		<>
			<Container>
				<Title>
					<ProgressWrapper>
						<ProgressCircle size={'4em'} value={60} />
					</ProgressWrapper>
					<ActivityContent>
						<h2 style={{ marginLeft: '1em' }}>Activities</h2>
					</ActivityContent>
				</Title>

				<List>{activityContentList}</List>
			</Container>
			<ActivityModal
				open={openActivity}
				closed={() => setOpenActivity(false)}
				id={selectedActivity?.id}
				name={selectedActivity?.name}
				description={selectedActivity?.description}
				learningObjectives={selectedActivity?.summary}
			/>
		</>
	)
}

export default ActivityList
