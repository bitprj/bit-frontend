import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { initSteps } from '../../redux/actions/learnData'

const Container = styled.div`

`

const Hint = ({ id }) => {
  const unlockHint = () => {
    initSteps(id)
  }

  return (
    <Container onClick={unlockHint}>
      ni hao
    </Container>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onInitSteps: (hintID) => initSteps(hintID)
  }
}

export default connect(null, mapDispatchToProps)(Hint)
