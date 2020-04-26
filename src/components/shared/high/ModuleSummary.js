import React from 'react'
import styled from 'styled-components'
import Button from '../low/Button.js'
import Avatar from 'react-avatar'
import AvatarGroup from '../high/AvatarGroup.js'

const Card = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;
    box-sizing: border-box;
    border-radius: 0.3em;
`
const Title = styled.p`
    margin-block-end: 0.4em;
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 1em;
    color: #000000;
`

const Img = styled.img`
	width: 60%;
	border-radius: 0.5em;
`
const Contributor = styled.div`
    display: flex;
    margin-bottom: 0.8em;
    justify-content: center;
    align-items: center;
`

const ContributorCount = styled.p`
    margin-left: 0.6em;
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 0.7em;
    color: #616161;
`

const ButtonConfig = {
    width: '12em',
    fontSize: "0.7em",
    smallFont: true
}

const ModuleSummary = ({
    title,
    imageUrl,
    peoples,
    avatarGroupWidth, //unit: em
    ...props
}) => {
    const spacing = 1.5 - avatarGroupWidth / peoples.length // make avatars distribute evenly within avatarGroupWidth
    return (
        <Card {...props}>
            <Img src={imageUrl} />
            <Title>{title}</Title>
            <Contributor>
                <AvatarGroup size="1.5em" spacing={-spacing + 'em'} names={peoples} showNames={false}>
                    {peoples.map(person => <Avatar key={person} name={person} />)}
                </AvatarGroup>
                <ContributorCount>{peoples.length} Contributors</ContributorCount>
            </Contributor>
            <Button invert {...ButtonConfig}>Explore Module</Button>
        </Card>
    )
}



export default ModuleSummary;
