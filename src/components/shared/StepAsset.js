import React from 'react';

import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './MarkdownContent'

const img_style = {
    height: '100%',
    width: '100%',
    display: 'block',
}

const StepAsset = (props) => (
    <div>
        {props.image ?
            <img src={props.image.fields.file.url} style={img_style} alt={props.image.fields.title} />
            : null}
        {props.snippet ?
            <ReactMarkdown source={props.snippet} renderers={{ code: CodeBlock }} />
            : null}
    </div>
);

export default StepAsset;
