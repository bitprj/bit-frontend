import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import codeStyle from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'

const CodeBlock = ({ language, value, style }) => {
	return (
		<SyntaxHighlighter
			language={language}
			style={codeStyle}
			lineNumberContainerProps={{ style: { paddingRight: '1em' } }}
			customStyle={{
				borderRadius: '1em',
				whiteSpace: 'pre-wrap',
				display: 'flex',
				...style
			}}
			codeTagProps={{ style: { whitespace: 'pre-wrap' } }}
			showLineNumbers
		>
			{value}
		</SyntaxHighlighter>
	)
}

export default CodeBlock
