import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro|Source+Sans+Pro|Source+Serif+Pro');
  
  body {
    font-family: 'Source Sans Pro';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    font-family: 'Source Serif Pro';
  }

  code {
    font-family: 'Source Code Pro';
    font-size: 80%;
  }
  
  .transition-short {
    transition: 0.1s ease all;
  }
  .transition-medium {
    transition: 0.2s ease all;
  }
  .transition-long {
    transition: 0.4s ease all;
  }
  
  .lift,
  .hover-raise,
  .hover-lift:hover {
    box-shadow: 0px 4px 1.5em rgba(0, 0, 0, 0.075);
  }

  .big-lift {
    box-shadow: 0px 4px 1.5em rgba(0, 0, 0, 0.15);
  }
  
  .hover-lift:hover .lift {
    box-shadow: none;
  }
  .hover-raise:hover,
  .hover-lift-shadowless:hover {
    transform: translateY(-5px);
  }
  .hover-raise:hover {
    box-shadow: 0px 0.75em 1.5em rgba(38, 38, 38, 0.125);
  }
`

export const GlobalStyleReset = createGlobalStyle`
  /* https://dev.to/hankchizljaw/a-modern-css-reset-6p3 */

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /*
  * SELF DEFAULTS
  */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5em 0;
  }

  p {
    margin-bottom: 0.5em;
  }

  button {
    cursor: pointer;
  } 

  html {
    scroll-behavior: smooth;
  }

  /* FONT-SIZE */
  body {
    font-size: 32px;
  }

  @media screen and (max-width: 1920px) {
    body {
      font-size: 27px;
    }
  }

  @media screen and (max-width: 1680px) {
    body {
      font-size: 23px;
    }
  }

  @media screen and (max-width: 1440px) {
    body {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 1200px) {
    body {
      font-size: 17.5px;
    }
  }

  @media screen and (max-width: 1000px) {
    body {
      font-size: 15.5px;
    }
  }

  @media screen and (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 600px) {
    body {
      font-size: 13.7px;
    }
  }

  @media screen and (max-width: 480px) {
    body {
      font-size: 13.3px;
    }
  }

  @media screen and (max-width: 376px) {
    body {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 330px) {
    body {
      font-size: 12.8px;
    }
  }
`
