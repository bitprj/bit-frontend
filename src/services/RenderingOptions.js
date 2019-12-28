import React from 'react';
import styled from 'styled-components';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';

import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/shared/CodeBlock';

const Heading = styled.div`
    color: red;
`

const img_style = {
    maxWidth: '80%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
}

export const RenderingOptions = {
    renderMark: {
    },
    renderNode: {
        // Pass the node data for the inline embed to MyCustomComponent.
        [BLOCKS.EMBEDDED_ENTRY]: (node, key, next, options) => <ReactMarkdown source={node.data.target.fields.markdown} renderers={{ code: CodeBlock }} />,
        [BLOCKS.HEADING_3]: (node, key, next) => <Heading key={key} as="h3">{next(node.content, key, next)}</Heading>,
        'embedded-asset-block': (node) => <img style={img_style} src={node.data.target.fields.file.url} />,
        // 'embedded-entry-block': (node) => (
        //     <ReactMarkdown source={node.data.target.fields.markdown} renderers={{ code: CodeBlock }} />
        // )
    }
}