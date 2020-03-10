import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import TwoPanelModal from '../../shared/containers/TwoPanelModal'
import { sizes } from '../../../styles/media'

import Project from './Project'

import DotRating from '../../shared/gadgets/DotRating'
import Button from '../../shared/gadgets/Button'

// const Sparkles2 = styled.div
//   box-shadow: 0 0 7px 7px #f2f2f2;
//   border-radius: 1em;
//   line-height: 0.8em;
//   padding: 0.5em 0.7em;
// `;

const LeftPanel = styled.div`
	margin: 0 auto;
	padding: 1.5em 2.5em 2.5em;
	background-color: ${props => props.theme.font};
	color: ${props => props.theme.fontInvert};
	height: 100%;
	display: flex;
	flex-direction: column;
`

const FullImg = styled.div`
	width: 100%;
	height: 100%;

	background: transparent url(${props => props.img});
	background-size: auto 100%;
	background-position: center;

	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		background-size: 100% auto;
	}

	@media screen and (orientation: landscape) and (max-height: 500px) {
		background-size: 100% auto;
	}
`

const Back = styled.p`
	cursor: pointer;
	display: inline-block;
	transition: ease color 0.15s;

	&:hover {
		color: #86c5ff;
	}
`

const SmallText = styled.div`
	font-size: 80%;
`

const Nbsp = styled.p`
	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		display: none;
	}
`

const FinalProject = props => {
	const themeContext = useContext(ThemeContext)

	const [listView, setListView] = useState(true)

	const handleClosed = () => {
		props.closed()
		setTimeout(() => {
			setListView(true)
		}, 69)
	}

	/**
	 * LIST VIEW
	 */
	const choose = (
		<>
			<Nbsp>&nbsp;</Nbsp>
			<h2 style={{ marginBottom: 0 }}>Choose a Project</h2>
			<p>
				Choose a Project to practice your newfound knowledge in Programming
				Principles, GitHub, Command Lines, and other things.
			</p>
			{/* <Sparkles2>
      ✨<span style={{ fontSize: "125%" }}>33</span>/110
      </Sparkles2> */}
		</>
	)
	const projects = (
		<div style={{ padding: '1em', fontSize: '80%' }}>
			{[...Array(4)].map((project, index) => {
				return (
					<Project
						key={`project-${index}`}
						name={props.name}
						description={props.description}
						imgURL={props.img}
						time={props.time}
						clicked={() => setListView(false)}
					/>
				)
			})}
		</div>
	)

	/**
	 * DESCRIPTION VIEW
	 */
	const description = (
		<>
			<Back onClick={() => setListView(true)}>&#8249; Back</Back>
			<h2 style={{ margin: 0 }}>{props.name}</h2>
			<p style={{ marginBottom: 0 }}>{props.description}</p>
			<br />
			<SmallText>difficulty</SmallText>
			<DotRating rating={3} offColor={themeContext.accentVariant} />
			<br />
			<SmallText>estimated time</SmallText>
			<span style={{ fontWeight: 'bold' }}>{props.time}</span>
			<div style={{ flexGrow: '1', display: 'flex', alignItems: 'flex-end' }}>
				<Button invert fullWidth>
					Choose Project
				</Button>
			</div>
		</>
	)
	const fullPic = (
		<FullImg img="http://squareone.co.in/wp-content/uploads/2018/08/food-Birsto-Oakwood-Premier12-720x700.jpg" />
	)

	const leftPanel = <LeftPanel>{listView ? choose : description}</LeftPanel>
	const rightPanel = listView ? projects : fullPic

	return (
		<TwoPanelModal
			open={props.open}
			closed={handleClosed}
			leftPanel={leftPanel}
			rightPanel={rightPanel}
			ratio={0.43}
		/>
	)
}

export default FinalProject
