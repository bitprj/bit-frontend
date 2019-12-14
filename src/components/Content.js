import React from 'react';
import Button from './Button'

const Content = (props) => {
    return (
        <div>
            <p>{props.cardContent}</p>
            <Button name="< Prev" class_name="button" />
            <Button name="Next >" class_name="button invert" />
        </div>
    )
}

export default Content;