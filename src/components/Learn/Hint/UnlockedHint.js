import React, { forwardRef } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import ParsedContent from '../../shared/ParsedContent'

const UnlockedHint = forwardRef(({ id, steps, name }, ref) => {
	const renderSteps = steps.map((step, i) => {
		return (
			<div key={`step-${id}-${i}`}>
				{steps.length === 1 && name !== step.heading && (
					<h3>
						<ReactMarkdown className="markdown-header" source={step.heading} />
					</h3>
				)}
				<ParsedContent document={step.content} />
			</div>
		)
	})
	return (
		<div ref={ref}>
			<h2 style={{ paddingTop: '1em' }}>
				<ReactMarkdown className="markdown-header" source={name} />
			</h2>
			<hr />
			{renderSteps}
		</div>
	)
})

export default UnlockedHint
