import React, { useEffect } from 'react'
import styled from 'styled-components'
import TurndownService from 'turndown'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

const turndownService = new TurndownService({
	headingStyle: 'atx',
	fence: '```'
})

const MarkdownArea = styled(ReactQuill)`
	border-radius: 0.5em;
	width: 100%;
	height: ${props => props.height ?? 'auto'};

	.ql-editor {
		padding: 1.5em;
		min-height: 9em;
		max-height: 18em;
	}
`

const MarkdownAreaInput = ({
	className,
	placeholder = 'Comments...',
	initialValue,
	onChange,
	height
}) => {
	const convertHtmlToMarkdown = html => {
		return turndownService.turndown(html)
	}

	useEffect(() => {
		const className = 'ql-editor'
		Array.from(document.getElementsByClassName(className)).forEach(mai => {
			if (!mai.classList.contains('low-profile-scrollbar')) {
				mai.classList.add('low-profile-scrollbar', 'only-hover')
			}
		})
	}, [])

	return (
		<MarkdownArea
			className={`strong-lift ${className ?? ''}`}
			theme="bubble"
			placeholder={placeholder}
			defaultValue={initialValue}
			preserveWhitespace
			onChange={contents => {
				const markdown = convertHtmlToMarkdown(contents)
				onChange(markdown)
			}}
			height={height}
		/>
	)
}

export default MarkdownAreaInput
