import React from 'react'
import styled from 'styled-components'

import Button from '../../shared/low/Button'

import withApiCache, { CACHE_ACTIVITY } from '../../HOC/WithApiCache'

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;

	color: #fff;
`

const Background = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;

	background: ${props =>
		`${props.theme.bgVariant} url("${props.image ??
			'https://i.imgur.com/J1FzZ1l.png'}")`};
	background-position: center;
	background-size: auto;

	box-shadow: inset 0 0 69420px 69420px rgba(0, 0, 0, 0.69);

	&:hover {
		box-shadow: inset 0 0 69420px 69420px rgba(0, 0, 0, 0.69);
	}
`

const Name = styled.h3`
	margin: 0;
	margin-bottom: 0.5em;
`

const Description = styled.p`
	font-size: 65%;
`

const StyledButton = styled(Button)`
	margin: 1em 0 0.5em;
	padding: 0.4em 3em;
	font-size: 69%;
`

const Suggested = ({
	id,
	wac_data: [activity],

	loading,
	onClickButton
}) => {
	const { name, summary, image } = activity ?? {}
	const isReady = !!name

	return (
		<Container>
			<Background image={image} />
			{!loading ? (
				id ? (
					isReady ? (
						<div style={{ width: '18em', zIndex: 1 }}>
							<Name>{name}</Name>
							<Description>{summary}</Description>
							<StyledButton invert onClick={onClickButton}>
								Resume
							</StyledButton>
						</div>
					) : (
						<Name>. . .</Name>
					)
				) : (
					<Name>An activity has not been started yet</Name>
				)
			) : null}
		</Container>
	)
}

export default withApiCache([CACHE_ACTIVITY])(Suggested)
