import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import StatusIcon from '../../../shared/gadgets/StatusIcon'

const ActivityCardWrapper = styled.div`
	margin: 4.5em 2.25em;
	position: relative;
`

const RenderActivityCard = styled.div`
	padding: 2.25em 2.25em 0;
	height: 18em;
	border-radius: 1em;
	background-color: #fff;
	text-align: center;
	display: inline-block;
	overflow-y: auto;
	cursor: pointer;
`
const DottedLine = styled.div`
	border-bottom: 3px #eaeaea dashed;
	position: absolute;
	width: 100%;
	left: ${props => (props.isLeft ? '50%' : '-50%')};
	bottom: 4.2em;
	z-index: -1;
`

const styledLink = { color: 'black', textDecoration: 'none' }

const ActivityCard = ({ isLast, isLeft, id, name }) => {
	return (
		<ActivityCardWrapper>
			<Link style={styledLink} to={`/modules/${id}`}>
				<RenderActivityCard className="hover-raise transition-medium">
					<div>
						<StatusIcon type="incomplete" width={'2em'} />
						<h2 style={{ margin: '0.5em 0', fontSize: '115%' }}>{name}</h2>
						<p style={{ fontSize: '85%', margin: 0 }}>
							Choose a module to learn an interesting tidbit about Python
						</p>
					</div>
				</RenderActivityCard>
			</Link>
			{!isLast && <DottedLine isLeft={isLeft} />}
		</ActivityCardWrapper>
	)
}

export default ActivityCard
