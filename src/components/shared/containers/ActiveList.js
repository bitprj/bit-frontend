import React from 'react'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll'
import Scrollable from './Scrollable'

const ActiveList = ({
	className,
	identifier,
	itemList,
	selectCallback,
	activeClassName,
	children
}) => {
	const handleScrollToBottom = container =>
		animateScroll.scrollToBottom({
			duration: 500,
			smooth: true,
			containerId: container
		})

	const renderedList =
		itemList &&
		itemList.map((item, index) => {
			return (
				<React.Fragment key={`${identifier}-nav-${index}`}>
					<div
						id={`${identifier}-nav-${index}`}
						className={`${activeClassName(
							item,
							index
						)} ${identifier}-list-active`}
						onClick={() => selectCallback(item, index)}
					>
						{children(item, index)}
					</div>
				</React.Fragment>
			)
		})

	return (
		<Scrollable
			id={`${identifier}-sidebar-nav`}
			bottomType="arrow"
			bottomCallback={() => handleScrollToBottom(`${identifier}-sidebar-nav`)}
		>
			{renderedList}
		</Scrollable>
	)
}

export default ActiveList
