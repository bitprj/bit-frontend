import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import snakeCaseKeys from 'snakecase-keys'

import SubmissionCheckpoint from './SubmissionCheckpoint'

import Button from '../../shared/low/Button'
import { fadeIn } from '../../../styles/GlobalAnime'
import { gradeSubmission } from '../../../services/TeacherService'

const Container = styled.div`
	position: relative;
	flex: 0.55;
	background-color: #fff;
	overflow-y: auto;
`

const ContentArea = styled.div`
	opacity: 0;
`

const ButtonWrapper = styled.div`
	margin: 2em;
	text-align: right;
`

const Content = ({
	isReady,
	studentId,
	activityId,
	checkpoints,
	feedbacksArray,
	currentSubmissionIndex
}) => {
	const containerRef = useRef(null)

	const currentScrollTop = useRef(0)
	const cardsScrollTop = useRef([])

	const [isWaiting, setIsWaiting] = useState(false)

	useEffect(() => {
		/** Update current scroll in currentScrollTop */
		const handleScroll = () => {
			const scrollTop = containerRef.current.scrollTop
			currentScrollTop.current = scrollTop
		}

		containerRef.current.addEventListener('scroll', handleScroll)
		return () =>
			containerRef.current.removeEventListener('scroll', handleScroll)
	}, [])

	/**
	 * scroll to top each card change so that unlocking a new
	 * card won't leave you at the bottom of the page
	 */
	useEffect(() => {
		if (currentSubmissionIndex) {
			setTimeout(() => {
				containerRef.current.scrollTo(
					0,
					cardsScrollTop.current[currentSubmissionIndex]
				)
			}, 0) // needed to scroll
			return () => {
				cardsScrollTop.current[currentSubmissionIndex] =
					currentScrollTop.current
			}
		}
	}, [currentSubmissionIndex])

	/**
	 * animation loading
	 */
	useEffect(() => {
		if (isReady) {
			fadeIn('.teacher-i-contentheader, .teacher-i-contentarea')
		}
	}, [isReady])

	const handleSubmitGrading = async () => {
		if (!isAllowedToSubmit) return

		const data = snakeCaseKeys({
			studentId,
			checkpoints: feedbacksArray
		})

		try {
			setIsWaiting(true)
			const res = await gradeSubmission(activityId, data)
		} catch (e) {
			alert(e + '\nFeedback not successful, please try again later')
		} finally {
			setIsWaiting(false)
		}
	}

	const isAllowedToSubmit = feedbacksArray?.every(
		feedback => feedback?.isPassed !== undefined && feedback?.comment
	)

	const renderCheckpoints = checkpoints?.map((checkpoint, i) => {
		const {
			checkpoint: { id: checkpointId },
			content,
			studentComment
		} = checkpoint
		return (
			<SubmissionCheckpoint
				key={`teacher-checkpoint-${checkpointId}`}
				id={checkpointId}
				studentId={studentId}
				content={content}
				studentComment={studentComment}
			/>
		)
	})

	return (
		<Container ref={containerRef} className="low-profile-scrollbar only-hover">
			<ContentArea className="teacher-i-contentarea">
				{renderCheckpoints?.length > 0 ? (
					renderCheckpoints
				) : (
					<p style={{ textAlign: 'center' }}>
						There are no checkpoints to grade
					</p>
				)}
				<ButtonWrapper>
					<Button
						invert
						disabled={isWaiting || !isAllowedToSubmit}
						onClick={handleSubmitGrading}
					>
						Submit Grading
					</Button>
				</ButtonWrapper>
			</ContentArea>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		teacherData: {
			submissions,
			indicators: { currentSubmissionIndex },
			ram: { feedbacks }
		}
	} = state

	const { studentId, student, activity, checkpoints } =
		submissions?.[currentSubmissionIndex] ?? {}

	const feedbacksArray = checkpoints?.map(checkpoint => {
		const { id: checkpointId } = checkpoint.checkpoint
		return feedbacks[`student${studentId}_checkpoint${checkpointId}`]
	})

	return {
		isReady: !!submissions.length,
		studentId: studentId ?? student?.id,
		activityId: activity?.id,
		checkpoints,
		feedbacksArray,
		currentSubmissionIndex
	}
}

export default connect(mapStateToProps)(Content)
