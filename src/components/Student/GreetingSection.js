import React from 'react';
import styled from 'styled-components';

const Greeting = styled.div`
    margin: auto 0 auto 20%;
`

const GreetingSection = (props) => {
    const renderedTop = (props.top) ? <h2>{props.top}</h2> : null;
    const renderedBottom = (props.bottom) ? <div>{props.bottom}</div> : null;

    return (
        <Greeting>
            {renderedTop}
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
            {renderedBottom}
        </Greeting>
    )

}

export default GreetingSection;