import React from 'react';

const ActionCard = (props) => {
    var text;
    if (props.type === 'resume'){
      text = 'Resume Activity';
      // TODO: icon = pie chart
    } else if (props.type === 'start') {
      text = 'Start Activity';
      // TODO: icon = race flag
    } else {
      // TODO: throw error! you should not be here.
    }
    return (
        <div>
          <h1>{text}</h1>
        </div>
    )
}

export default ActionCard;
