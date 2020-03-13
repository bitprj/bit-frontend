import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import Icon from '../../../../shared/gadgets/Icon'
import Scrollable from '../../../../shared/containers/Scrollable'
import TwoPanel from '../../../../shared/containers/TwoPanel'

const flagIcon = require('../../../../../assets/icons/flag.svg')

const TestLineContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`

const TestLineName = styled.h4`
	margin: 0;
	flex: 1;
	font-size: 1em;
`
const PassFail = styled.div`
	width: 4.5em;
	border-radius: 0.6em;

	background-color: ${props => (props.pass ? '#95FF7088' : '#f002')};
	color: ${props => (props.pass ? '#1C6A00' : '#C70000')};
	text-align: center;
`

const TestLine = ({ pass, name }) => {
	return (
		<TestLineContainer>
			<div style={{ display: 'flex' }}>
				<TestLineName>{name}</TestLineName>
				<PassFail pass={pass}>{pass ? 'Passed' : 'Failed'}</PassFail>
			</div>
		</TestLineContainer>
	)
}

const LeftPanelContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`

const LeftPanelHeader = styled.div`
	padding: 1em;
	padding-right: 2em;
	padding-bottom: 0em;
	display: flex;
	align-items: center;
	font-size: 90%;
`

const StyledIcon = styled(Icon)`
	margin-left: 2em;
	margin-right: 1em;
`

const Title = styled.h1`
	margin: 1em;
`

const TestLineList = styled(Scrollable)`
	padding: 0 2.5em;
`

const LeftPanel = ({ result = {} }) => {
	const { failCase, numFail, numPass, passCases } = result
	return (
		<LeftPanelContainer>
			<LeftPanelHeader>
				<StyledIcon width="3em" src={flagIcon} />
				<Title>{`${numPass}/${numPass + numFail} TEST CASES`}</Title>
			</LeftPanelHeader>

			<TestLineList>
				<div style={{ margin: '2em 0' }}>
					{passCases &&
						passCases.map(details => {
							return <TestLine pass name={details.name} />
						})}
					{failCase && <TestLine pass={false} name={failCase.name} />}
				</div>
			</TestLineList>
		</LeftPanelContainer>
	)
}

const RightPanelContainer = styled.div`
	padding: 2em 2.5em 0;
	height: 100%;
`

const FailContainer = styled.div`
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
	margin: 0.8em 0;
`

const RightPanel = ({ result = {} }) => {
	const { failCase, numFail, numPass, passCases } = result
	return (
		<RightPanelContainer>
			{failCase && (
				<FailContainer>
					<SmallHeader>Expected Output</SmallHeader>
					<BlackTextArea className="code low-profile-scrollbar fat light">
						{failCase.expected}
					</BlackTextArea>
					<SmallHeader>Your Output</SmallHeader>
					<BlackTextArea className="code low-profile-scrollbar fat light">
						{failCase.output}
					</BlackTextArea>
				</FailContainer>
			)}
		</RightPanelContainer>
	)
}

const StyledTwoPanel = styled(TwoPanel)`
	padding-bottom: 1em;
`

const AutograderResult = ({ result }) => {
	return (
		<StyledTwoPanel
			fullSizeAxis
			fullSizeOffAxis
			first={<LeftPanel result={result} />}
			second={<RightPanel result={result} />}
		/>
	)
}

export default AutograderResult
