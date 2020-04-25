import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar'
import AvatarGroup from './AvatarGroup'
import IconLine from '../low/IconLine'
import Icon from '../low/Icon'

const lightingIcon = require('../../../assets/icons/lightning.svg')

const ContainerCard = styled.div`
    width:100%;
    max-width:27.5em;
    margin: 1em 1em;
    border: 0.11em solid rgba(210, 210, 210, 0.2);
    border-radius: 0.5em;
`

const Pic = styled.div`
    width:100%;
    height: 8.3em;
    background-size: 100% auto;
    background-image: url(${props => props.imgURL});
    background-position: center;
    border-radius: 0.2em 0.2em 0em 0em;
`
const ContentCard = styled.div`
    width:100%;
    padding: 2em 2em;
    background: #FFFFFF;
    border-radius: 0.2em;
`

const CardTitle = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 1.1em;
    line-height: 1.37em;
    color: #000000;
    margin: 0px;
`

const CardDescription = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 0.5em;
    line-height: 1.65em;
    color: #000000;
    margin-top: 2em;
`
const InlineDiv = styled.div`
    margin: 1em auto;
    display: flex;
`
const CommitText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 0.37em;
    line-height: 1.4em;
    color: #6D6D6D;
`

const DateText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 0.37em;
    line-height: 1.4em;
    color: #4D4D4D;
    margin-left: 1.5em;
`
const AvatarWrappr = styled.div`
    flex: 40%;
`

const Wrapper = styled.div`
    flex: 60%;
    display: flex;
`

const FeaturedActivity = ({
    imgURL,
    titleText,
    contentText,
    authors = [],
    date,
}) => {
    return(
        <ContainerCard>
            <Pic imgURL = {imgURL}> </Pic>
            <ContentCard>
                <CardTitle>{titleText}</CardTitle>
                <InlineDiv>
                    <AvatarWrappr>
                        <AvatarGroup size="1.1em" spacing='-0.5em' names={authors} showNames={true}>
                            {authors.map(owner => <Avatar key={owner} name={owner} />)}
                        </AvatarGroup>
                    </AvatarWrappr>
                    <Wrapper>
                        <IconLine icon = {<Icon  src={lightingIcon} />} gap = '0em'></IconLine>
                        <CommitText>Last Commit</CommitText>
                        <DateText>{date}</DateText>
                    </Wrapper>
                </InlineDiv>

                <CardDescription>
                    {contentText}
                </CardDescription>
            </ContentCard>
        </ContainerCard>
    )

}

export default FeaturedActivity
