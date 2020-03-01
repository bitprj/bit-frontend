import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import Button from '../../../shared/unused/Button'

import TeacherService from '../../../../services/TeacherService'

const GradingArea = styled.div`
	padding: 1.5rem;
`

const Checkpoint = styled.div`
	margin-bottom: 3rem;
`

const Title = styled.div`
	font-weight: bold;
	font-size: 25px;
	margin-bottom: 1rem;
`

const Comment = styled.div`
	margin: 1rem 0;
`

class Submission extends Component {
	constructor(props) {
		super()
		this.state = {
			submission: props.submission,
			feedbacks: []
		}

		this.initializeInputs = this.initializeInputs.bind(this)
		this.changeInput = this.changeInput.bind(this)
		this.submitGrading = this.submitGrading.bind(this)

		this.service = new TeacherService()
	}

	componentDidUpdate(prevProps) {
		if (this.props.submission !== prevProps.submission) {
			this.setState({ submission: this.props.submission })
			this.initializeInputs()
		}
	}

	initializeInputs() {
		if (this.props.submission) {
			const emptyFeedbacks = []
			for (const checkpoint of this.props.submission.checkpoints) {
				const emptyFeedback = {
					id: checkpoint.id,
					comment: '',
					passed: false
				}
				emptyFeedbacks.push(emptyFeedback)
			}
			this.setState({ feedbacks: [...emptyFeedbacks] })
		}
	}

	changeInput(value, index) {
		const newFeedbacks = [...this.state.feedbacks]
		newFeedbacks[index].comment = value
		this.setState({ feedbacks: [...newFeedbacks] })
	}

	passCheckpoint(event, index) {
		const newFeedbacks = [...this.state.feedbacks]
		newFeedbacks[index].passed = event.target.checked
		this.setState({ feedbacks: [...newFeedbacks] })
	}

	submitGrading = event => {
		event.preventDefault()
		// POST comments to backend
		this.service.submitFeedbacks(
			this.props.classroomID,
			this.state.submission.id,
			this.state.feedbacks
		)
	}

	render() {
		const checkpoints = this.state.submission
			? this.state.submission.checkpoints.map((checkpoint, index) => {
					return (
						<Checkpoint key={`checkpoint-${index}`}>
							<Title>Checkpoint #{index + 1}</Title>
							<Checkbox
								onChange={event => this.passCheckpoint(event, index)}
								color="primary"
							/>
							<p>
								Bacon ipsum dolor amet swine picanha pork porchetta landjaeger
								sirloin venison spare ribs drumstick chislic beef ribs cow.{' '}
							</p>

							<Grid container spacing={1}>
								<Grid item xs={12} sm={6}>
									{checkpoint.image ? (
										<img
											src={checkpoint.image}
											alt={checkpoint.image}
											width="100%"
										/>
									) : null}

									{checkpoint.video ? (
										<video
											type="video/mp4"
											src={checkpoint.video}
											width="100%"
											controls
										></video>
									) : null}
								</Grid>

								<Grid item xs={12} sm={6}>
									<div>
										Bacon ipsum dolor amet swine picanha pork porchetta
										landjaeger sirloin venison spare ribs drumstick chislic beef
										ribs cow. Cupim pastrami doner tenderloin, ground round
										fatback jerky alcatra short ribs kevin ribeye corned beef.
										Tenderloin ham beef ribs corned beef turducken landjaeger,
										chuck kevin. Chislic jowl brisket meatloaf frankfurter
										boudin pastrami short ribs pork loin.
									</div>
								</Grid>
							</Grid>

							<Comment>
								<ReactQuill
									onChange={value => this.changeInput(value, index)}
								/>
							</Comment>
						</Checkpoint>
					)
			  })
			: null

		return (
			<GradingArea>
				{this.state.text}
				{checkpoints}
				<Button
					buttonState="Submit"
					class_name="button invert"
					click={this.submitGrading}
				/>
			</GradingArea>
		)
	}
}

export default Submission
