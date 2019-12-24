import React from 'react';

const Progress = (props) => {
    return (
        <div>
            <h1>{props.topicTitle}</h1>
            <div>{props.topicDescription}</div>
        </div>
    )
}

export default Progress;