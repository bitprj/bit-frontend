import React from 'react'
import styled from 'styled-components'

import TwoPanelModal from '../../shared/containers/TwoPanelModal'

const Concept = ({ className, render, open, setOpen }) => {
	return (
		<TwoPanelModal open={open} closed={() => setOpen(false)}></TwoPanelModal>
	)
}

export default Concept
