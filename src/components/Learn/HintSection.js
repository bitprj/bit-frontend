import React from 'react'
import styled from 'styled-components'

const HintSection = ({ hints }) => {
  console.log(hints)
  const renderedHints = hints && hints.map((hint, index) => {
    console.log(hint.fields)
  })

  return (
    <>
    {renderedHints}
    </>
  )
}

// const

export default HintSection
