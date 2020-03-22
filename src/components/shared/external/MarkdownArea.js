import React from 'react'
import styled from 'styled-components'
import TurndownService from 'turndown'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

const turndownService = new TurndownService({
	headingStyle: 'atx',
	fence: '```'
})

const RenderedMarkdownArea = styled(ReactQuill)`
	border-radius: 0.5em;
	width: 100%;

	.ql-editor {
		padding: 1.5em;
		min-height: 9em;
		max-height: 18em;
	}
`

const MarkdownArea = ({ placeholder = 'Comments...', onChange }) => {
	const convertHtmlToMarkdown = html => {
		return turndownService.turndown(html)
	}

	return (
		<RenderedMarkdownArea
			className="strong-lift"
			theme="bubble"
			placeholder={placeholder}
			preserveWhitespace
			onChange={contents => {
				const markdown = convertHtmlToMarkdown(contents)
				onChange(markdown)
			}}
		/>
	)
}

export default MarkdownArea
