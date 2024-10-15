

import { extendTheme } from '@chakra-ui/react';

// Define your custom theme
const chakraTheme = extendTheme({
  colors: {
    primary: '#4353FF',      // Existing primary color
    secondary: '#D9DCFF',    // Existing secondary color
    disabled: '#A0A0A0',
    text: '#333333',
    background: '#FFFFFF',
    neutral: '#F8F8F8',
    error: '#FF4D4F',
    primaryDark: '#2F3AFF',
    border: '#CCCCCC',
    // Additional colors or overrides
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif', // Align body font with Chakra's default
  },
  fontSizes: {
    body: '16px',
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  styles: {
    global: {
      body: {
        bg: 'background',
        color: 'text',
        fontFamily: 'body',
      },
      h1: {
        fontSize: 'h1',
        fontWeight: 'bold',
        color: 'primary',
      },
      h2: {
        fontSize: 'h2',
        fontWeight: 'semiBold',
        color: 'secondary',
      },
      h3: {
        fontSize: 'h3',
        fontWeight: 'medium',
        color: 'primary',
      },
      h4: {
        fontSize: 'h4',
        fontWeight: 'medium',
        color: 'secondary',
      },
      h5: {
        fontSize: 'h5',
        fontWeight: 'medium',
        color: 'primary',
      },
      h6: {
        fontSize: 'h6',
        fontWeight: 'medium',
        color: 'secondary',
      },
      p: {
        fontSize: 'body',
        fontWeight: 'regular',
        color: 'text',
      },
      a: {
        color: 'primary',
        textDecoration: 'none',
        _hover: {
          color: 'primaryDark',
        },
      },
      button: {
        bg: 'primary',
        color: 'background',
        border: 'none',
        borderRadius: 'md',
        padding: '10px 20px',
        cursor: 'pointer',
        _hover: {
          bg: 'primaryDark',
        },
      },
      input: {
        width: '100%',
        padding: '10px',
        border: '1px solid',
        borderColor: 'border',
        borderRadius: 'md',
        fontSize: 'body',
        color: 'text',
        bg: 'neutral',
        _focus: {
          borderColor: 'primary',
          outline: 'none',
        },
      },
      textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid',
        borderColor: 'border',
        borderRadius: 'md',
        fontSize: 'body',
        color: 'text',
        bg: 'neutral',
        _focus: {
          borderColor: 'primary',
          outline: 'none',
        },
      },
    },
  },
});

export default chakraTheme;