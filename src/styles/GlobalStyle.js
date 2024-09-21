// // src/styles/GlobalStyle.js
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
// html {
//     font-size: 100%; /* 16px */
//     @media (max-width: 1200px) {
//       font-size: 95%; /* ~15.2px */
//     }
//     @media (max-width: 768px) {
//       font-size: 90%; /* ~14.4px */
//     }
//   }  
// body {
//     margin: 0;
//     padding: 0;
//     background-color: ${({ theme }) => theme.colors.background};
//     color: ${({ theme }) => theme.colors.text};
//     font-family: ${({ theme }) => theme.fonts.primary};
//     font-size: ${({ theme }) => theme.fontSizes.body};
//     line-height: 1.5;
//   }
//   h1 {
//     font-size: ${({ theme }) => theme.fontSizes.h1};
//     font-weight: ${({ theme }) => theme.fontWeights.bold};
//     color: ${({ theme }) => theme.colors.primary}; /* Primary color for headings */
//   }
//   h2 {
//     font-size: ${({ theme }) => theme.fontSizes.h2};
//     font-weight: ${({ theme }) => theme.fontWeights.semiBold};
//     color: ${({ theme }) => theme.colors.secondary}; /* Secondary color for subheadings */
//   }
//   h3 {
//     font-size: ${({ theme }) => theme.fontSizes.h3};
//     font-weight: ${({ theme }) => theme.fontWeights.medium};
//     color: ${({ theme }) => theme.colors.primary};
//   }
//   p {
//     font-size: ${({ theme }) => theme.fontSizes.body};
//     font-weight: ${({ theme }) => theme.fontWeights.normal};
//   }
//   .small-text {
//     font-size: ${({ theme }) => theme.fontSizes.small};
//     font-weight: ${({ theme }) => theme.fontWeights.light};
//   }
//   button {
//     font-size: ${({ theme }) => theme.fontSizes.body};
//     font-weight: ${({ theme }) => theme.fontWeights.medium};
//   }
//   /* Focus Styles for Accessibility */
//   button:focus {
//     outline: 2px solid ${({ theme }) => theme.colors.primary};
//     outline-offset: 2px;
//   }
//   /* Additional Global Styles */
//   a {
//     font-weight: ${({ theme }) => theme.fontWeights.medium};
//     color: ${({ theme }) => theme.colors.primary};
//     text-decoration: none;
//   }
//   a:hover {
//     color: ${({ theme }) => theme.colors.secondary};
//   }
//     @media (max-width: 768px) {
//   html {
//     font-size: 90%;
//   }

//   body {
//     padding: 10px;
//   }

//   h1 {
//     font-size: 2rem;
//   }

//   h2 {
//     font-size: 1.75rem;
//   }

//   h3 {
//     font-size: 1.5rem;
//   }

//   p {
//     font-size: 0.9rem;
//   }

//   .small-text {
//     font-size: 0.75rem;
//   }

//   button {
//     font-size: 0.9rem;
//     padding: 8px 16px;
//   }

//   a {
//     font-size: 0.9rem;
//   }
// }

// `;
// export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 100%; /* 16px */
    @media (max-width: 1200px) {
      font-size: 95%; /* ~15.2px */
    }
    @media (max-width: 768px) {
      font-size: 90%; /* ~14.4px */
    }
  }

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
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary}; /* Primary color for headings */
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    color: ${({ theme }) => theme.colors.secondary}; /* Secondary color for subheadings */
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.primary};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.h4};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.secondary};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.primary};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.h6};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.secondary};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 5px;
    font-size: ${({ theme }) => theme.fontSizes.body};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.neutral};
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
    }
  }

  .file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;

    @media (max-width: 1199px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    @media (max-width: 767px) {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;
      padding: 10px;
    }
  }

  .file-card {
    background-color: ${({ theme }) => theme.colors.neutral};
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 150px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    p {
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.text};
      font-size: 1rem;
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media (max-width: 767px) {
      padding: 15px;
      height: auto;

      p {
        font-size: 0.875rem;
      }
    }

    @media (max-width: 480px) {
      height: auto;

      p {
        font-size: 0.8125rem;
      }
    }
  }
`;

export default GlobalStyle;
