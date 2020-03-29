import React, { useState } from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

import Icon from '../../../shared/gadgets/Icon'
import IconArea from '../../../shared/gadgets/IconArea'
import Scrollable from '../../../shared/containers/Scrollable'
import TwoPanel from '../../../shared/containers/TwoPanel'

const flagIcon = require('../../../../assets/icons/flag.svg')

const TestLineContainer = styled.div`
	padding: 1em;
	margin: 0.5em 1em;
	display: flex;

	cursor: pointer;
	transition: box-shadow 0.1s ease;
`

const TestLineName = styled.h4`
	margin: 0;
	flex: 1;
	font-size: 1em;

	white-space: nowrap;
`
const PassFail = styled.div`
	width: 4.5em;
	border-radius: 0.6em;

	background-color: ${props => (props.pass ? '#95FF7088' : '#f002')};
	color: ${props => (props.pass ? '#1C6A00' : '#C70000')};
	text-align: center;
`

const TestLine = ({ className, pass, name, onClick }) => {
	return (
		<TestLineContainer
			className={`${className || ''} hover-strong-lift`}
			onClick={onClick}
		>
			<TestLineName className="low-profile-scrollbar only-hover">
				{name}
			</TestLineName>
			<PassFail pass={pass}>{pass ? 'Passed' : 'Failed'}</PassFail>
		</TestLineContainer>
	)
}

const LeftPanelContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`

const LeftPanelHeader = styled.div`
	padding: 3.1em 2em 2em;
	padding-right: 4em;
	display: flex;
	align-items: center;
	font-size: 90%;
`

const StyledIcon = styled(Icon)`
	margin-left: 2em;
	margin-right: 1em;
`

const TestLineList = styled(Scrollable)`
	margin: 0 1em;
	padding: 0 1em;
`

const LeftPanel = ({ results, testCaseIndex, setTestCaseIndex }) => {
	const { numFail, numPass, allCases } = results
	return (
		<LeftPanelContainer>
			<LeftPanelHeader>
				<IconArea gap={'2em'} icon={<StyledIcon width="3em" src={flagIcon} />}>
					<div>
						<h1 style={{ margin: 0 }}>Test Cases</h1>
						<p style={{ margin: 0 }}>{`${numPass}/${numPass +
							numFail} PASSED`}</p>
					</div>
				</IconArea>
			</LeftPanelHeader>

			<TestLineList>
				<div style={{ margin: '1em 0 2em' }}>
					{allCases &&
						allCases.map((details, index) => {
							return (
								<TestLine
									key={`learn-checkpointresult-failcase-${index}`}
									className={testCaseIndex === index ? 'big-lift' : ''}
									pass={!(index === 0 && numFail > 0)}
									name={details.name}
									onClick={() => setTestCaseIndex(index)}
								/>
							)
						})}
				</div>
			</TestLineList>
		</LeftPanelContainer>
	)
}

const RightPanelContainer = styled.div`
	padding: 3em 4em 0;
	padding-left: 2em;
	height: 100%;
`

const DetailsContainer = styled.div`
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	font-size: 75%;
`

const BlackTextArea = styled.pre`
	flex: 1;
	margin: 0;
	padding: 2em;
	border-radius: 0.5em;
	width: 100%;
	background-color: black;
	color: white;
`

const SmallHeader = styled.h4`
	margin: 1.5em 0;
`

const RightPanel = ({ results, testCaseIndex }) => {
	const { allCases } = results
	const { output, expected } = allCases[testCaseIndex]

	return (
		<RightPanelContainer>
			<DetailsContainer>
				<SmallHeader>Expected Output</SmallHeader>
				<BlackTextArea className="code low-profile-scrollbar fat light">
					{expected.join('\n') || output.join('\n')}
				</BlackTextArea>
				<SmallHeader>Your Output</SmallHeader>
				<BlackTextArea className="code low-profile-scrollbar fat light">
					{output.join('\n')}
				</BlackTextArea>
			</DetailsContainer>
		</RightPanelContainer>
	)
}

const StyledTwoPanel = styled(TwoPanel)`
	padding-bottom: 1em;
`

const AutograderResult = ({ results }) => {
	const [testCaseIndex, setTestCaseIndex] = useState(0)

	if (results.error) {
		return <h1>{results.error}</h1>
	}

	const processedResults = { ...results }
	const { passCases, failCase } = processedResults
	processedResults.allCases = [...passCases].reverse()
	if (!isEmpty(failCase)) {
		processedResults.allCases.unshift(failCase)
	}

	return (
		<StyledTwoPanel
			fullSizeAxis
			fullSizeOffAxis
			first={
				<LeftPanel
					results={processedResults}
					testCaseIndex={testCaseIndex}
					setTestCaseIndex={setTestCaseIndex}
				/>
			}
			second={
				<RightPanel results={processedResults} testCaseIndex={testCaseIndex} />
			}
		/>
	)
}

export default AutograderResult
