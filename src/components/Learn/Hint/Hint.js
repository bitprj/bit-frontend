import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import VisibilityIcon from '@material-ui/icons/Visibility'

import RenderedContent from '../../shared/ParsedContent'

import Button from '../../shared/Button'
import HintModal from './HintModal'
import StepAsset from '../../shared/StepAsset'

import { getHint } from '../../../services/ContentfulService'

const HintCard = styled.div`
	position: relative;
	padding: ${props => (props.step ? '.65rem' : '1.5rem')};
	border-radius: 7px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
	overflow: hidden;
	margin-bottom: 0.5rem;
	background: ${props => (props.locked ? '#000033' : 'white')};
	transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
	color: ${props => (props.locked ? 'white' : 'black')};
	display: ${props => (props.display ? 'block' : 'none')};
`

const FloatRight = styled.div`
	text-align: right;
`

const Heading = styled.div`
	font-weight: bold;
`

class Hint extends Component {
	constructor(props) {
		super()
		this.state = {
			dbID: props.dbID,
			id: props.id,
			title: '',
			gems: -50, // get from API call
			isLocked: props.isLocked,
			steps: [],
			isExpanded: false,
			currentStep: 0
		}
		this.unlockHint = this.unlockHint.bind(this)
		this.expandHint = this.expandHint.bind(this)
		this.shrinkHint = this.shrinkHint.bind(this)
		this.showNextStep = this.showNextStep.bind(this)

		// this.service = new LearnService();
	}

	componentDidMount() {
		getHint(this.props.id).then(data => {
			this.setState({
				title: data.title,
				steps: data.steps
			})
		})
	}

	unlockHint = () => {
		this.props.changeTotalGems(this.state.gems)
		if (this.props.isParent) {
			this.props.showChildrenHints(this.props.index)
		}
		// later - API call to unlock card and get its content
		this.setState({
			isLocked: false
		})
		this.expandHint()
	}

	expandHint = () => {
		this.props.setCurrentHint(this.state.id)
		this.setState({
			isExpanded: true
		})
	}

	shrinkHint = () => {
		this.props.setCurrentHint(null)
		this.setState({
			isExpanded: false
		})
	}

	showNextStep = index => {
		const newSteps = [...this.state.steps]
		newSteps[index + 1].isShown = true
		this.setState({
			steps: newSteps,
			currentStep: index + 1
		})
	}

	render() {
		const steps = this.state.steps.map((step, index) => {
			const renderedStep =
				step.isShown && this.state.isExpanded ? (
					<>
						<HintCard
							key={`step-${step.title}`}
							display={step.isShown}
							step={true}
						>
							<Heading>{step.heading}</Heading>
							<RenderedContent
								uniqueKey={`hint-${this.state.id}`}
								content={step.content}
							/>

							<StepAsset image={step.image} snippet={step.snippet} />
						</HintCard>

						<FloatRight>
							{index < this.state.steps.length - 1 &&
							index === this.state.currentStep ? (
								<Button
									buttonState="NextHint"
									class_name="button invert"
									index={index}
									click={this.showNextStep}
								/>
							) : null}

							{index === this.state.steps.length - 1 ? (
								<Button
									buttonState="<"
									class_name="button invert"
									click={this.shrinkHint}
								/>
							) : null}
						</FloatRight>
					</>
				) : null
			return renderedStep
		})

		const icon = (
			<FloatRight>
				{this.state.isExpanded ? (
					<VisibilityIcon onClick={this.shrinkHint} />
				) : (
					<VisibilityIcon onClick={this.expandHint} />
				)}
			</FloatRight>
		)

		return (
			<>
				{this.state.isLocked ? (
					<HintCard locked={this.state.isLocked} display={this.props.display}>
						<Grid container spacing={0}>
							<Grid item xs={8}>
								<Heading>{this.state.title}</Heading>
							</Grid>

							<Grid item xs={4}>
								<HintModal
									hintID={this.state.id}
									gems={this.state.gems}
									unlockHint={this.unlockHint}
								/>
							</Grid>
						</Grid>
					</HintCard>
				) : (
					<div>
						<HintCard locked={this.state.isLocked} display={this.props.display}>
							<Grid container spacing={0}>
								<Grid item xs={8}>
									<div>{this.state.title}</div>
								</Grid>

								<Grid item xs={4}>
									{icon}
								</Grid>
							</Grid>
						</HintCard>
						{steps}
					</div>
				)}
			</>
		)
	}
}

export default Hint
