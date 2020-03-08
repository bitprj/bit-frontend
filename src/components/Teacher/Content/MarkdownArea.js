import React from 'react'
import styled from 'styled-components'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

const RenderedMarkdownArea = styled(ReactQuill)`
	border-radius: 0.5em;
	overflow-y: auto;
	width: 100%;
`

const MarkdownArea = ({ placeholder = 'Comments...' }) => {
	return (
		<RenderedMarkdownArea
			className="strong-lift"
			theme="bubble"
			placeholder={placeholder}
			preserveWhitespace
			onChange={(content, delta, source, editor) => {
				// console.log(content, delta, source, editor)
				console.log(content, editor.getContents().ops[0])
			}}
		/>
	)
}

export default MarkdownArea
