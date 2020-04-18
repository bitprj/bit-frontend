import React from 'react';
import { FaFlagCheckered, } from 'react-icons/fa';
import { AiTwotonePieChart } from 'react-icons/ai';
import styled from 'styled-components';

const BlueCard = styled.div`
  text-align: center;
  background-color: rgba(44,114,223, 0.85);
  border-radius: 8px;
  margin: 1em 1em;
  padding: 0.25em 1em;
  max-width: 600px;
`

const WhiteIcon = styled.div`
  color: white;
  margin: 2em 1em 1em 1em;
  padding: 0.25em 1em;
`

const CardText = styled.h1`
  color: white;
  margin: 1em 1em;
  padding: 0.25em 1em;
`

const ActionCard = (props) => {
    var text, icon, size=48;
    if (props.type === 'resume'){
      text = 'Resume Activity';
      icon = <AiTwotonePieChart size={size}/>;
    } else if (props.type === 'start') {
      text = 'Start Activity';
      icon = <FaFlagCheckered size={size}/>;
    } else {
      // Invalid style property, you should not be here.
    }

    return (
        <BlueCard>
          <WhiteIcon>{icon}</WhiteIcon>
          <CardText>{text}</CardText>
        </BlueCard>
    )
}

export default ActionCard;
