// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.body};
    line-height: 1.5;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h1};
    font-weight: bold;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: 600;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: 500;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: 400;
  }

  .small-text {
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: 300;
  }

  button {
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: 500;
  }

  /* Focus Styles for Accessibility */
  button:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Additional Global Styles */

  a {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default GlobalStyle;
