import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import SubmissionCheckpoint from './SubmissionCheckpoint'

import Button from '../../shared/gadgets/Button'
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
	currentSubmissionIndex
}) => {
	const containerRef = useRef(null)

	const currentScrollTop = useRef(0)
	const cardsScrollTop = useRef([])

	/** note: initial state undefined, set in effect */
	const [grading, setGrading] = useState([])
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
    const isFinished = grading.every(g => g.is_passed !== undefined)
    console.log(checkpoints, grading)
		if (isFinished) {
			const data = {
				student_id: studentId,
				checkpoints: grading
			}
			try {
				setIsWaiting(true)
				const res = await gradeSubmission(activityId, data)
			} catch (e) {
				alert(e + '\nSaving not successful, please try again later')
			} finally {
				setIsWaiting(false)
			}
		} else {
			const error = grading.find(g => g.is_passed === undefined)
			alert('Grading is not complete')
		}
	}

	const renderCheckpoints = checkpoints?.map((checkpoint, i) => {
		const { checkpointId, content, studentComment } = checkpoint
		return (
			<SubmissionCheckpoint
				key={`teacher-checkpoint-${checkpointId}`}
				id={checkpointId}
				content={content}
				studentComment={studentComment}
				onGradingChange={changes => {
					setGrading(currentState => {
						const newGrading = currentState.slice()
						newGrading[i] = { ...grading[i], ...changes }
						return newGrading
					})
				}}
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
					<Button invert disabled={isWaiting} onClick={handleSubmitGrading}>
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
			indicators: { currentSubmissionIndex }
		}
	} = state

	const { studentId, activityId, checkpoints } =
		submissions?.[currentSubmissionIndex] ?? {}

	return {
		isReady: !!submissions.length,
		studentId,
		activityId,
		checkpoints,
		currentSubmissionIndex
	}
}

export default connect(mapStateToProps)(Content)
