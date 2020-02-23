import React, { useState } from 'react'
import styled from 'styled-components'
import Upload from './Upload'

const Checkpoint = ({ className, render, open, setOpen }) => {
	const [isResults, setIsResults] = useState(false)

	const selectType = type => {
		switch (type) {
			default: {
				return (
					<Upload open={open} setOpen={setOpen} />
				)
			}
		}
	}

	return selectType()
}

export default Checkpoint
