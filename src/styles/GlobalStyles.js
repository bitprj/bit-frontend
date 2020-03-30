import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Poppins|Source+Code+Pro&display=swap');
  
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins';
  }

  body, .sans,
  span, p, .serif {
    font-family: 'Open Sans';
  }

  code, code *, .code {
    font-family: 'Source Code Pro';
  }

  /**
   * Normalize Poppins
   */
  h1 { font-size: 1.8em }
  h2 { font-size: 1.35em }
  h3 { font-size: 1.05em }
  h4 { font-size: 0.9em }
  h5 { font-size: 0.75em }
  h6 { font-size: 0.6em }

  /**
   * Normalize Markdown For Headers
   */
  .markdown-header,
  .markdown-header span,
  .markdown-header p {
    margin: 0;
    font-family: 'Poppins';
  }

  code {
    border-radius: 0.2em;
    padding: 0 0.2em;
    background: #e2e2e280;
    font-style: normal;
  }

  pre {
    white-space: pre-wrap;
    font-family: inherit;
  }

  pre > code {
    border: 0;
    border-radius: 0;
    background: transparent;
    padding: 0;
  }

  .invisible {
    opacity: 0;
  }

  /**
   * HIDE SCROLLBAR
   */
  .no-scrollbar {
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    } 
  }

  /**
   * Change Highlight Color
   */
  ::selection {
    background: ${props => props.theme.accentVariant};  
  }
  ::-moz-selection {
    background: ${props => props.theme.accentVariant};
  } 
  
  /**
   * LOW PROFILE SCROLLBAR
   * - with only-hover, fat
   */
  .low-profile-scrollbar { overflow: auto; }
  .low-profile-scrollbar.only-hover { overflow: overlay; }

  .low-profile-scrollbar.only-hover:hover::-webkit-scrollbar,
  .low-profile-scrollbar::-webkit-scrollbar { 
    width: 0.5em; 
    height: 0.5em; 
  }
  .low-profile-scrollbar.only-hover::-webkit-scrollbar { 
    width: 0; 
    height: 0;
  }
  .low-profile-scrollbar.fat::-webkit-scrollbar { 
    width: 1em; 
    height: 1em; 
  }
  
  .low-profile-scrollbar::-webkit-scrollbar-thumb
  .low-profile-scrollbar::-webkit-scrollbar-track {
    border-radius: 0.5em;
  }
  .low-profile-scrollbar.sharp::-webkit-scrollbar-thumb {
    border-radius: 0.2em;
  }
  .low-profile-scrollbar.sharp::-webkit-scrollbar-track {
    border-radius: 0
  }

  .low-profile-scrollbar::-webkit-scrollbar-track {
    background: #0000; // not working
  }
  .low-profile-scrollbar.fat::-webkit-scrollbar-track {
    background: #0001;
  }

  .low-profile-scrollbar::-webkit-scrollbar-thumb { 
    background: #0002; 
  }
  .low-profile-scrollbar.light::-webkit-scrollbar-thumb { 
    background: #fff6; 
  }
  
  .low-profile-scrollbar::-webkit-scrollbar-thumb:hover { 
    background: #0003; 
  }
  .low-profile-scrollbar.light::-webkit-scrollbar-thumb:hover { 
    background: #fff7; 
  }

  .low-profile-scrollbar::-webkit-scrollbar-thumb:active { 
    background: #0004; 
  }
  .low-profile-scrollbar.light::-webkit-scrollbar-thumb:active { 
    background: #fff8; 
  }

  /**
   * TRANSITIONS 
   */
  .transition-short,
  .transition-short-children > * {
    transition: 0.1s ease all;
  }
  .transition-medium,
  .transition-medium-children > * {
    transition: 0.2s ease all;
  }
  .transition-long,
  .transition-long-children > * {
    transition: 0.4s ease all;
  }
  .transition-none,
  .transition-none-children > * {
    transition: none;
  }
  .lift,
  .hover-raise,
  .hover-lift:hover {
    box-shadow: 0px 4px 1.5em rgba(0, 0, 0, 0.075);
  }
  .strong-lift,
  .hover-strong-lift:hover {
    box-shadow: 0px 4px 1.5em rgba(0, 0, 0, 0.1);
  }
  .strong-lift-bottom {
    box-shadow: 0px 4px 1.5em -1.5em rgba(0, 0, 0, 0.1);
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

  /**
   * Externals
   */
	.react-images__view-image {
		margin: 0 auto;
  }
  .fullscreen .react-images__blanket {
    z-index: 2199;
  }
  .fullscreen .react-images__positioner {
    z-index: 2200;
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
  // h1,
  // h2,
  // h3,
  // h4,
  // p,
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

  button {
    cursor: pointer;
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
