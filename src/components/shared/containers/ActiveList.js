import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll'
import Scrollable from './Scrollable'
import { usePrevious } from '../../../utils/customHooks'

const ActiveList = ({
	className,
	identifier,
	itemList,
	activeIndex,
	activeMinIndex = 0,
	activeMaxIndex = itemList.length - 1,
	selectCallback,
	activeClassName,
	activeStyles,
	children
}) => {
	const ariaSelection = useRef(null)

	// 	const [ariaCurrentIndex, setAriaCurrentIndex] = useState(activeIndex)
	// 	const prevAriaIndex = usePrevious(ariaCurrentIndex)

	// 	const getAriaSelected = index => {
	// 		return ariaSelection.current.children[index]
	// 	}

	// 	useEffect(() => {
	// 		const selected = getAriaSelected(activeIndex)
	// 		if (selected) {
	// 			selected.setAttribute('tabindex', 0)
	// 		}
	// 	}, [])

	// 	useEffect(() => {
	// 		const prevSelected = getAriaSelected(prevAriaIndex)
	// 		const selected = getAriaSelected(ariaCurrentIndex)

	// 		if (prevSelected) {
	// 			prevSelected.setAttribute('tabindex', -1)
	// 			selected.setAttribute('tabindex', 0)
	// 			selected.focus()
	// 		}
	// 	}, [ariaCurrentIndex])

	// 	const handleKeyboardNav = (e, item, i) => {
	// 		switch (e.key) {
	// 			case 'ArrowUp':
	// 				if (ariaCurrentIndex > activeMinIndex) {
	// 					setAriaCurrentIndex(i - 1)
	// 				}
	// 				break
	// 			case 'ArrowDown':
	// 				if (ariaCurrentIndex < activeMaxIndex) {
	// 					setAriaCurrentIndex(i + 1)
	// 				}
	// 				break

	// 			case 'Tab':
	// 				// const selected = getAriaSelected(ariaCurrentIndex)
	// 				// const active = getAriaSelected(activeIndex)
	// 				// selected.setAttribute('tabindex', -1)
	// 				// active.setAttribute('tabindex', 0)
	// 				break

	// 			case 'Enter':
	// 			case ' ':
	// 				if (activeIndex !== ariaCurrentIndex) {
	// 					selectCallback(item, i)
	// 				}
	// 				break
	// 		}
	// 	}

	const handleScrollToBottom = container =>
		animateScroll.scrollToBottom({
			duration: 500,
			smooth: true,
			containerId: container
		})

	const renderedList =
		itemList &&
		itemList.map((item, i) => {
			const key = `${identifier}-nav-${i}`
			return (
				<React.Fragment key={key}>
					<li
						id={key}
						className={`${activeClassName?.(item, i) || ''} ${
							activeIndex === i ? `${identifier}-list-active` : ''
						}`}
						// tabIndex="-1"
						onClick={() => {
							if (i >= activeMinIndex && i <= activeMaxIndex)
								selectCallback(item, i)
						}}
						// onKeyDown={e => handleKeyboardNav(e, item, i)}
					>
						{children(item, i)}
					</li>
				</React.Fragment>
			)
		})

	return (
		<Scrollable
			idName={`${identifier}-sidebar-nav`}
			bottomType="arrow"
			bottomCallback={() => handleScrollToBottom(`${identifier}-sidebar-nav`)}
			arrowNav={false}
		>
			<ul ref={ariaSelection} className="">
				{renderedList}
			</ul>
		</Scrollable>
	)
}

export default ActiveList
