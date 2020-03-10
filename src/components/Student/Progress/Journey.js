import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import PickCard from './PickCard'
import ActivityCard from './ActivityCard'

const Container = styled.div`
	padding-bottom: 6em;
	flex: 6;
	display: flex;
	flex-flow: row wrap;
	align-items: start;
	font-size: 90%;
	position: relative;
`

const ColOne = styled.div`
	flex: 1;
`

const ColTwo = styled.div`
	flex: 1;
	position: relative;
	top: 5em;
`

const Journey = ({ inprogressModules }) => {
	console.log(inprogressModules)

	useEffect(() => {}, [inprogressModules])

	const colOne =
		inprogressModules &&
		inprogressModules
			.filter((_, index) => index % 2 === 1)
			.map((mod, index) => {
				return (
					<ActivityCard
						key={`module-activity-${mod.id}`}
						id={mod.id}
						name={mod.name}
						isLeft
						isLast={inprogressModules.length === index}
					/>
				)
			})

	const colTwo =
		inprogressModules &&
		inprogressModules
			.filter((_, index) => index % 2 === 0)
			.map((mod, index) => {
				return (
					<ActivityCard
						key={`module-activity-${mod.id}`}
						id={mod.id}
						name={mod.name}
						isLeft
						isLast={inprogressModules.length === index}
					/>
				)
			})

	return (
		<Container>
			<ColOne>
				<PickCard />
				{colOne}
			</ColOne>

			<ColTwo>{colTwo}</ColTwo>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { inprogressModules }
	} = state

	return { inprogressModules }
}

export default connect(mapStateToProps)(Journey)
