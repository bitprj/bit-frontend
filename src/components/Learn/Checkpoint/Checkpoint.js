import React from 'react'
import styled from 'styled-components'

import TwoPanelModal from '../../shared/containers/TwoPanelModal'

const Checkpoint = ({ className, render, open, setOpen }) => {
	console.log(open)
	return (
		<TwoPanelModal open={open} closed={() => setOpen(false)}></TwoPanelModal>
	)
}

export default Checkpoint
