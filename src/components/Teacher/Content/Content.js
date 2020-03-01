import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'

import SubmissionCheckpoint from './SubmissionCheckpoints'

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

	useEffect(() => {
		containerRef.current.addEventListener('scroll', handleScroll)
		return () =>
			containerRef.current.removeEventListener('scroll', handleScroll)
	}, [])

	/**
	 * Keep track of scroll in scrollTopRef
	 */
	const handleScroll = () => {
		const scrollTop = containerRef.current.scrollTop
		currentScrollTop.current = scrollTop
	}

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

	const renderCheckpoints =
		checkpoints &&
		checkpoints.map(checkpoint => (
			<SubmissionCheckpoint
				key={`teacher-checkpoint-${checkpoint.checkpointId}`}
				name={checkpoint.name}
				type={checkpoint.type.toUpperCase()}
				content={checkpoint.content}
			/>
		))

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

	const submission = submissions && submissions[currentSubmissionIndex]

	return {
		isReady: !!submissions.length,
		checkpoints: get(submission, 'checkpoints'),
		currentSubmissionIndex
	}
}

export default connect(mapStateToProps)(Content)
