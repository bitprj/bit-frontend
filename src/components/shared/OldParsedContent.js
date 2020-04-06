import React from 'react'
import styled from 'styled-components'
import { BLOCKS } from '@contentful/rich-text-types'

import RichTextToReact from 'rich-text-to-react'
import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './MarkdownContent'

const Heading = styled.div`
	color: black;
`

const img_style = {
	maxWidth: '90%',
	display: 'block',
	marginLeft: 'auto',
	marginRight: 'auto'
}

const renderingOptions = {
	renderMark: {},
	renderNode: {
		[BLOCKS.EMBEDDED_ENTRY]: (node, key, next, options) => {
			if (process.env.NODE_ENV !== 'production')
				console.log(
					'if this message is seen, go to [ParsedContent] and record not to delete this block'
				)
			return (
				<ReactMarkdown
					key={key}
					source={node.data.target.markdown}
					renderers={{ code: CodeBlock }}
				/>
			)
		},
		[BLOCKS.HEADING_3]: (node, key, next) => (
			<Heading key={key} as="h3">
				{next(node.content, key, next)}
			</Heading>
		),
		'embedded-asset-block': (node, key) => (
			<img
				key={key}
				alt={node.data.target.title}
				style={img_style}
				src={node.data.target.file.url}
			/>
		),
		'embedded-entry-block': (node, key) => (
			<ReactMarkdown
				key={key}
				source={node.data.target.markdown}
				renderers={{ code: CodeBlock }}
			/>
		)
	}
}

export default props => (
	<RichTextToReact document={props.document} options={renderingOptions} />
)
