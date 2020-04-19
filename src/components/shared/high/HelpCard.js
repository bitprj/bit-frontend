import React from 'react';
import styled from 'styled-components';
import exclamation from '../../../assets/icons/exclamation.svg';
import Button from '../low/Button.js';
import Icon from '../low/Icon.js';

const WhiteCard = styled.div`
  display: flex;
  text-align: left;
  background-color: white;
  margin: 1em 1em;
  padding: 0.25em 1em;
  max-width: 600px;
  background: #FFFFFF;
  border: 3px solid rgba(210, 210, 210, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
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
const CardText = styled.p`
  font-size: 1.1em;
  color: black;
  margin: 1em 0em;
  padding: 0.25em 0em;

`
const StyledIcon = styled(Icon)`
  color: ${props => props.color};
  margin: 2em auto;
`

const HelpCard = ({
	type = 'issue',
  onClick,
	className
  }) => {
    var title, description, btnText, color, icon;
    if (type === 'issue'){
      title = 'Raise an Issue';
      description = 'Is something unclear? Could be explained better? Raise an issue to improve the curriculum.';
      btnText = 'Raise an Issue';
      color = 'rgba(86,171,104, 1.0)';
    } else if (type === 'feedback') {
      title = 'Feedback';
      description = 'Have feedback to provide? Send feedback to improve this product.';
      btnText = 'Provide Feedback';
      color = 'rgba(238,112,60, 1.0)';
    } else {
      // Invalid style property, you should not be here.
    }

    return (
        <WhiteCard>
          <LeftColumn>
            <StyledIcon center color={color} src={exclamation} height='3em' width='3em' />
          </LeftColumn>
          <RightColumn>
            <h1>{title}</h1>
            <CardText>{description}</CardText>
            <Button dark={color} invert onClick={onClick}>{btnText}</Button>
          </RightColumn>
        </WhiteCard>
    )
}

export default HelpCard;
