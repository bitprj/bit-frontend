import React from 'react';
import styled from 'styled-components';
import { BLOCKS } from '@contentful/rich-text-types';

import RichTextToReact from 'rich-text-to-react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const Heading = styled.div`
    color: black;
`

const img_style = {
    maxWidth: '90%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
}

const renderingOptions = {
    renderMark: {
    },
    renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]: (node, key, next, options) => <ReactMarkdown source={node.data.target.fields.markdown} renderers={{ code: CodeBlock }} />,
        [BLOCKS.HEADING_3]: (node, key, next) => <Heading key={key} as="h3">{next(node.content, key, next)}</Heading>,
        'embedded-asset-block': (node) => <img alt={node.data.target.fields.title} style={img_style} src={node.data.target.fields.file.url} />,
        // 'embedded-entry-block': (node) => (
        //     <ReactMarkdown source={node.data.target.fields.markdown} renderers={{ code: CodeBlock }} />
        // )
    }
}

export default (props) => (
    <RichTextToReact key={props.uniqueKey}
        document={props.content}
        options={renderingOptions} />
)