import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar'
import AvatarGroup from './AvatarGroup'
import IconLine from '../low/IconLine'

const ContainerCard = styled.div`
    width:100%;
    max-width:27.5em;
    margin: 1em 1em;
    border: 3px solid rgba(210, 210, 210, 0.2);
    border-radius: 0.5em;
`

const Pic = styled.div`
    width:100%;
    height: 8.5em;
    background-size: 100% auto;
    background-image: url(${props => props.imgURL});
    background-position: center;
    border-radius: 0.5em 0.5em 0em 0em;
`
const ContentCard = styled.div`
    width:100%
    padding: 2em 2em;
    background: #FFFFFF;
    border-radius: 0.5em;
`

const CardTtile = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 41px
    color: #000000;
    margin: 0px;
`

const CardDescription = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
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
    font-size: 10px;
    line-height: 14px;
    color: #6D6D6D;
`

const DateText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
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
    owners = [],
    date,
}) => {
    return(
        <ContainerCard>
            <Pic imgURL = {imgURL}> </Pic>
            <ContentCard>
                <CardTtile>{titleText}</CardTtile>
                <InlineDiv>
                    <AvatarWrappr>
                        <AvatarGroup size="1.1em" spacing='-0.5em' names={owners} showNames={true}>
                            {owners.map(owner => <Avatar key={owner} name={owner} />)}
                        </AvatarGroup>
                    </AvatarWrappr>
                    <Wrapper>
                        <IconLine icon = "⚡" gap = '0.2em'></IconLine>
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
