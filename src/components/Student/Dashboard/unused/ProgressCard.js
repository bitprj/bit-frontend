import React from 'react'
import styled from 'styled-components'

import BrickWall from '../../../../assets/icons/unused/brickwall'
import GitHub from '../../../../assets/icons/github'
import Button from '../../../shared/low/Button'

import withApiCache, { CACHE_ACTIVITY } from '../../../HOC/WithApiCache'

const Container = styled.div`
	padding: 2em;
	width: 15em;
	height: 18em;
	display: flex;
	flex-direction: column;

	background-color: ${props => props.theme.bgVariant};
	color: #fff;
	text-align: center;

	&:hover {
		box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.05);
	}
`

const InfoArea = styled.div`
	flex-shrink: 1;
`

const IconWrapper = styled.div`
	margin-bottom: 0.75em;
`

const Name = styled.h3`
	margin: 0;
	margin-bottom: 0.2em;
`

const Description = styled.p`
	margin: 0.5em 0;
	margin-top: 0;
	font-size: 65%;
	padding: 0 10%;
`

const ButtonContainer = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`

const StyledButton = styled(Button)`
	margin: 1em 0 0.5em;
	padding: 0.6em 2em;
	font-size: 75%;
`

const ActivityCard = ({
	wac_data: [activity],

	image,
	onClickButton
}) => {
	const { name, summary } = activity ?? {}

	const renderAppropriateImage = (imageName, width, height) => {
		switch (imageName) {
			case 'brickwall':
				return <BrickWall color="#FFF" width={width} height={height} />

			case 'github':
				return <GitHub color="#FFF" width={width} height={height} />

			default:
				return null
		}
	}

	return (
		<Container className="hover-lift-shadowless transition-medium">
			<InfoArea>
				<IconWrapper>{renderAppropriateImage(image, '3em')}</IconWrapper>
				<Name>{name}</Name>
				<Description>{summary}</Description>
			</InfoArea>

			<ButtonContainer>
				<StyledButton
					light={'#ffffff'}
					dark={'#000000'}
					noOutline
					onClick={onClickButton}
				>
					Resume
				</StyledButton>
			</ButtonContainer>
		</Container>
	)
}

export default withApiCache([CACHE_ACTIVITY])(ActivityCard)
