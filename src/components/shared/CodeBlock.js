import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import codeStyle from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'

const CodeBlock = ({ language, value, style }) => {
	return (
		<SyntaxHighlighter
			className="low-profile-scrollbar light only-hover"
			language={language}
			style={codeStyle}
			showLineNumbers
			lineNumberContainerProps={{ style: { paddingRight: '1em' } }}
			customStyle={{
				borderRadius: '0.75em',
				whiteSpace: 'pre-wrap',
				display: 'flex',
				overflow: 'overlay',
				...style
			}}
			codeTagProps={{ style: { whiteSpace: 'pre-wrap' } }}
		>
			{value}
		</SyntaxHighlighter>
	)
}

export default CodeBlock
