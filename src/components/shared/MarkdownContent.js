import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import codeStyle from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'

const Styles = styled.div`
	/**
   * Header Styling
   */
	// h1,
	// h2 {
	// 	padding-bottom: 0.25em;
	// 	border-bottom: 0.5px solid #ddd;
	// }

	h1 + h1,
	h2 + h2 {
		padding: 0;
		border: 0;
	}

	p {
		margin: 1.5em 0;
	}
	/**
   * List Styling
   */
	li {
		margin: 1em 0;
	}

	/**
   * Img Styling
   */
	img {
		margin: 2em auto;
		max-width: 90%;
		max-height: calc(100vh - 8em);
	}
`

const Image = styled.img`
	margin: 2em auto;
	max-width: 90%;
	max-height: calc(100vh - 8em);
`

const Blockquote = styled.blockquote`
	margin: 2em ${props => (props.expandBlocks ? '-2em' : 0)};
	padding: 0.1px 1.25em;
	background-color: ${props => props.theme.pastel.yellow}44;
	border-left: 0.5em solid ${props => props.theme.pastel.yellow};
`

const Table = styled.table`
	margin: 0 auto;
	width: 80%;
	border-collapse: separate;
	border-spacing: 0;
`

const TableRow = styled.tr`
	tr:hover {
		background-color: #f5f5f5;
	}
`

const TableCell = styled.td`
	padding: 1em;
	border: 0;
	border-bottom: 1px solid ${props => props.theme.offFont};
`

export const CodeBlock = ({ language, value, style, expandBlocks }) => {
	return (
		<SyntaxHighlighter
			className="low-profile-scrollbar light only-hover"
			language={language}
			style={codeStyle}
			showLineNumbers
			lineNumberContainerProps={{ style: { paddingRight: '1em' } }}
			customStyle={{
				margin: `2em ${expandBlocks ? '-2em' : 0}`,
				borderRadius: '0.75em',
				whiteSpace: 'pre-wrap',
				display: 'flex',
				overflow: 'overlay', // necessary to override default inlineStyles
				...style
			}}
			codeTagProps={{ style: { whiteSpace: 'pre-wrap' } }}
		>
			{value}
		</SyntaxHighlighter>
	)
}

const initialOptions = {
	expandBlocks: false
}

const MarkdownContent = ({ className, source, options = initialOptions }) => {
	const { expandBlocks } = { ...initialOptions, ...options }

	const renderers = {
		code: props => CodeBlock({ ...props, expandBlocks }),
		image: Image,
		blockquote: props => Blockquote({ ...props, expandBlocks }),
		table: Table,
		tableRow: TableRow,
		tableCell: TableCell
	}
	return (
		<Styles expandBlocks={expandBlocks}>
			<ReactMarkdown
				className={className}
				source={source}
				escapeHtml={false}
				astPlugins={[
					htmlParser({ isValidNode: node => node.type !== 'script' })
				]}
				renderers={renderers}
			/>
		</Styles>
	)
}

export default MarkdownContent
