import React, { forwardRef } from 'react'
import styled from 'styled-components'

import ParsedContent from '../../shared/ParsedContent'

const UnlockedHint = forwardRef(({ id, steps, name }, ref) => {
	const renderSteps = steps.map((step, i) => {
		return (
			<div key={`step-${id}-${i}`}>
				<h3>{step.heading}</h3>
				<ParsedContent document={step.content} />
			</div>
		)
	})
	return (
		<div ref={ref}>
			<h2>{name}</h2>
			{renderSteps}
		</div>
	)
})

export default UnlockedHint
