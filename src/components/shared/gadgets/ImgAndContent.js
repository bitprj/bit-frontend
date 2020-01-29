import React from 'react'
import styled from 'styled-components'

import ClampedText from '../utils/ClampedText'
import AppIcon from './AppIcon'
import IconLine from './IconLine'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

const Container = styled.div`
	margin: ${props => props.margin || `${props.imgWidthEms / 10}em 0`};
	padding: ${props => props.padding || `${props.imgWidthEms / 5}em`};
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: ${props => (props.imgWidthEms / 7) ** 0.5 * 1.2}em;
	position: relative;
`

const Wrapper = styled.div`
	width: ${props => props.width};
	height: ${props => props.width};
	line-height: ${props => props.width};
	text-align: center;
	font-weight: bold;
	font-size: 200%;
	flex-shrink: 0;
`

const Description = styled.div`
	margin-left: ${props => props.gap || `${props.imgWidthEms / 14}em`};
	display: flex;
	flex-direction: ${props => (props.reverse ? 'column-reverse' : 'column')};
`

/**
 * To use this component, it is pivotal that the props `imgWidthEms` is provided to create
 * the size context for the component.
 *
 * @param {*} props
 */
const Project = props => {
	const showAppropriateImg = (
		<>
			{props.imgURL && (
				<AppIcon
					width={`${props.imgWidthEms}em`}
					url={props.imgURL}
					noShadow={props.noShadow}
				/>
			)}

			{props.imgText && (
				<Wrapper width={`${props.imgWidthEms}em`}>{props.imgText}</Wrapper>
			)}
		</>
	)

	return (
		<Container
			margin={props.margin}
			padding={props.padding}
			style={props.style}
			imgWidthEms={props.imgWidthEms}
			className={
				props.className || props.classes + ' hover-lift transition-short'
			}
			onClick={props.clicked}
		>
			{showAppropriateImg}

			<Description
				imgWidthEms={props.imgWidthEms}
				reverse={props.reverse}
				gap={props.gap}
			>
				{/* If there is no description, make title smaller */}
				{props.description ? (
					<h2 style={{ margin: 0 }}>{props.title}</h2>
				) : (
					<h3 style={{ margin: 0 }}>{props.title}</h3>
				)}

				<ClampedText style={{ margin: `${props.imgWidthEms / 14}em 0` }}>
					{props.description}
				</ClampedText>

				{props.time ? (
					<IconLine icon={<AccessTimeIcon />}>{props.time}</IconLine>
				) : null}

				{props.children}
			</Description>
		</Container>
	)
}

export default Project
