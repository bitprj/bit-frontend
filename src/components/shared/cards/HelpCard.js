import React from 'react';
import styled from 'styled-components';
import greenIcon from '../../../assets/icons/green-exclamation.png';
import orangeIcon from '../../../assets/icons/orange-exclamation.png';

const WhiteCard = styled.div`
  display: flex;
  text-align: left;
  background-color: white;
  border-radius: 8px;
  margin: 1em 1em;
  padding: 0.25em 1em;
  max-width: 600px;
  box-shadow: 5px 5px 5px grey;
`
const LeftColumn = styled.div`
  flex: 33%;
  padding: 0.25em 1em;
  text-align: center;
`
const RightColumn = styled.div`
  flex: 67%;
  padding: 0.25em 1em;
`
const Icon = styled.div`
  color: white;
  margin: 2em 1em 1em 1em;
  padding: 0.25em 1em;
`
const CardText = styled.p`
  font-size: 1.1em;
  color: black;
  margin: 1em 0em;
  padding: 0.25em 0em;

`
const Button = styled.button`
  font-size: 1.25em;
  color: white;
  margin: 1em 0em;
  padding: 0.25em 1em;
  background-color: ${props => props.color};
`
const HelpCard = (props) => {
    var title, description, btnText, btnColor, icon;
    var width='64', height='64';
    if (props.type === 'issue'){
      title = 'Raise an Issue';
      description = 'Is something unclear? Could be explained better? Raise an issue to improve the curriculum.';
      btnText = 'Raise an Issue';
      btnColor = 'rgba(86,171,104, 1.0)';
      icon = greenIcon;
    } else if (props.type === 'feedback') {
      title = 'Feedback';
      description = 'Have feedback to provide? Send feedback to improve this product.';
      btnText = 'Provide Feedback';
      btnColor = 'rgba(238,112,60, 1.0)';
      icon = orangeIcon;
    } else {
      // Invalid style property, you should not be here.
    }

    return (
        <WhiteCard>
          <LeftColumn>
            <Icon>
              <img src={icon} alt="Icon" width={width} height={height}/>
            </Icon>
          </LeftColumn>
          <RightColumn>
            <h1>{title}</h1>
            <CardText>{description}</CardText>
            <Button color={btnColor} onCLick={props.onClick}>{btnText}</Button>
          </RightColumn>
        </WhiteCard>
    )
}

export default HelpCard;
