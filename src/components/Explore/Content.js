import React from 'react'
import styled from 'styled-components'

import FeaturedDisplay from './FeaturedDisplay'
import TopicDisplay from './TopicDisplay'

const Container = styled.div`
	padding-top: 2em;
	width: calc(100% - 18em);
`

const HorzScroll = styled.div`
	padding: 2em;
	padding-right: 2em;
	display: flex;
	flex-wrap: nowrap;

	> div {
		flex-shrink: 0;
		margin-right: 2em;
	}

	> div:last-child::before {
		content: '';
		margin-right: 3em;
		display: block;
		// width: 40em;
		height: 0.1px;
	}
`

const Content = props => {
	return (
		<Container>
			<h1>{props.activeName}</h1>
			<HorzScroll className="low-profile-scrollbar only-hover">
				<FeaturedDisplay
					name="Simulating Nature with Algorithms"
					category="Algorithms"
					imgURL="https://i.imgur.com/I7DFnzE.png"
				/>
				<FeaturedDisplay />
				<FeaturedDisplay bgColor="#333" />
			</HorzScroll>

			<HorzScroll className="low-profile-scrollbar only-hover">
				<TopicDisplay name="💻 DevOps" />
				<TopicDisplay name="🌎 Earth Day" />
			</HorzScroll>
		</Container>
	)
}

export default Content
