import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import SubmissionCheckpoint from './SubmissionCheckpoint'

import { fadeIn } from '../../../styles/GlobalAnime'

const Container = styled.div`
	position: relative;
	flex: 0.55;
	background-color: #fff;
	overflow-y: auto;
`

const ContentArea = styled.div`
	opacity: 0;
`

const Content = ({ isReady, checkpoints, currentSubmissionIndex }) => {
	const containerRef = useRef(null)

	const currentScrollTop = useRef(0)
	const cardsScrollTop = useRef([])

	/** note: initial state undefined, set in effect */
	const [grading, setGrading] = useState([])

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
		fadeIn('.teacher-i-contentheader, .teacher-i-contentarea')
	}, [isReady])

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
				{renderCheckpoints}
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

	const checkpoints = submissions?.[currentSubmissionIndex]?.checkpoints

	return {
		isReady: !!submissions.length,
		checkpoints,
		currentSubmissionIndex
	}
}

export default connect(mapStateToProps)(Content)
