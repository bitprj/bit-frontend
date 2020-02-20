import React, { useState } from 'react'
import { connect } from 'react-redux'

// import ConceptModal from ''
// import CheckpointModal from

const NextButtonManager = ({ className }) => {
	const [openConcept, setOpenConcept] = useState(false)
	const [openCheckpoint, setOpenCheckpoint] = useState(false)
}

const mapStateToProps = state => {
  const {
    learnData: {
      indicators: { buttonStateStack }
    }
  }
  return {
    buttonStateStack
  }
}

export default connect(mapStateToProps)(NextButtonManager)
