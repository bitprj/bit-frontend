import React from 'react';

import Module from './Module';

const Progress = (props) => {
    return (
        <div>
            <h1>{props.topicTitle}</h1>
            <div>{props.topicDescription}</div>
            <Module />
        </div>
    )
}

export default Progress;