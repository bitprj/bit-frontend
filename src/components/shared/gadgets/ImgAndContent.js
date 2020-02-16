import React, { forwardRef } from 'react'
import styled from 'styled-components'

import ClampedText from '../utils/ClampedText'
import Icon from './Icon'
import IconLine from './IconLine'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

const Container = styled.div`
	margin: ${props => `${props.imgWidthEms / 10}em 0`};
	padding: ${props => `${props.imgWidthEms / 5}em`};
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: ${props => (props.imgWidthEms / 7) ** 0.5 * 1.2}em;
	position: relative;
`

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${props => props.width};
	height: ${props => props.width};

	font-weight: bold;
	font-size: 200%;
	flex-shrink: 0;
`

const Description = styled.div`
	margin-left: ${props => props.gap || `1.5em`};
	display: flex;
	flex-direction: ${props => (props.reverse ? 'column-reverse' : 'column')};
	${props => props.contentSize && `font-size: ${props.contentSize}`}
`

/**
 * To use this component, it is pivotal that the props `imgWidthEms` is provided to create
 * the size context for the component.
 */
const ImgAndContent = forwardRef(({
	className,
	clicked,
	style,

	imgWidthEms,
	imgURL,
	imgText,
	shadow,
	reverse,
	gap,
	contentSize,

	title,
	description,
	time,
	hover,
	children
}, ref) => {
	const showAppropriateImg =
		(imgURL && (
			<Icon width={`${imgWidthEms}em`} src={imgURL} shadow={shadow} />
		)) ||
		(imgText && <Wrapper width={`${imgWidthEms}em`}>{imgText}</Wrapper>)

	return (
		<Container
			ref={ref}
			style={style}
			imgWidthEms={imgWidthEms}
			className={className + (hover ? ' hover-lift transition-short' : '')}
			onClick={clicked}
		>
			{showAppropriateImg}

			<Description
				imgWidthEms={imgWidthEms}
				reverse={reverse}
				gap={gap}
				contentSize={contentSize}
			>
				{/* If there is no description, make title smaller */}
				{description ? (
					<h2 style={{ margin: 0 }}>{title}</h2>
				) : (
					<h3 style={{ margin: 0 }}>{title}</h3>
				)}

				{description && (
					<ClampedText style={{ margin: `${imgWidthEms / 14}em 0` }}>
						{description}
					</ClampedText>
				)}

				{time ? <IconLine icon={<AccessTimeIcon />}>{time}</IconLine> : null}

				{children}
			</Description>
		</Container>
	)
})

export default ImgAndContent
