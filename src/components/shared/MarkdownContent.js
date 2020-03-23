import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import CodeBlock from './CodeBlock'

const Image = styled.img`
	display: block;
	max-width: 90%;
	margin-left: auto;
	margin-right: auto;
`

const MarkdownContent = ({ source }) => {
	const renderers = { code: CodeBlock, img: Image }
	return <ReactMarkdown source={source} renderers={renderers} />
}

export default MarkdownContent
