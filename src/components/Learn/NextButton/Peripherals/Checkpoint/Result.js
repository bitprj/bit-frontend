import React from 'react'
import styled from 'styled-components'

const LeftPanel = styled.div`
	padding: 2em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	text-align: center;
	position: relative;
`

export const ResultLeftPanel = ({}) => {
	return <LeftPanel></LeftPanel>
}

const TestLineContainer = styled.div`
	margin: 1em 0;
	font-size: 80%;
`

const PassFail = styled.div`
	width: 4.5em;
	border-radius: 0.6em;

	background-color: ${props => (props.pass ? '#95FF7088' : '#f002')};
	color: ${props => (props.pass ? '#1C6A00' : '#C70000')};
	text-align: center;
`

const BlackTextArea = styled.pre`
	padding: 1em;
	width: 100%;
	background-color: black;
	color: white;
	min-height: 6em;
`

const TestLine = ({ pass, details = {} }) => {
	if (Array.isArray(details.expected.length)) {
		details.expected.join('\n')
	}
	if (Array.isArray(details.output.length)) {
		details.expected.join('\n')
	}
	return (
		<TestLineContainer>
			<div style={{ display: 'flex' }}>
				<div style={{ flex: 1 }}>
					<h4>{details.name}</h4>
				</div>
				<PassFail pass={pass}>{pass ? 'Passed' : 'Failed'}</PassFail>
			</div>
			{!pass && (
				<div style={{ margin: '1em 0' }}>
					<hr />
					<h4>Expected Output</h4>
					<BlackTextArea className="code">{details.expected}</BlackTextArea>
					<h4>Your Output</h4>
					<BlackTextArea className="code">{details.output}</BlackTextArea>
					<hr />
				</div>
			)}
		</TestLineContainer>
	)
}

const RightPanelContainer = styled.div``

export const AutograderRightPanel = ({ gradingInfo = {} }) => {
	const { failCase, numFail, numPass, passCases } = gradingInfo
	return (
		<RightPanelContainer>
			{passCases &&
				passCases.map(details => {
					return <TestLine details={details} pass />
				})}
			{failCase && <TestLine details={failCase} pass={false} />}
			<div style={{ textAlign: 'right' }}>
				{numPass}/{numPass + numFail}
			</div>
		</RightPanelContainer>
	)
}
