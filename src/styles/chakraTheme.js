

// import { extendTheme } from '@chakra-ui/react';

// // Define your custom theme
// const chakraTheme = extendTheme({
//   colors: {
//     primary: '#4353FF',      // Existing primary color
//     secondary: '#D9DCFF',    // Existing secondary color
//     disabled: '#A0A0A0',
//     text: '#333333',
//     background: '#FFFFFF',
//     neutral: '#F8F8F8',
//     error: '#FF4D4F',
//     primaryDark: '#2F3AFF',
//     border: '#CCCCCC',
//     // Additional colors or overrides
//   },
//   fonts: {
//     heading: 'Roboto, sans-serif',
//     body: 'Roboto, sans-serif', // Align body font with Chakra's default
//   },
//   fontSizes: {
//     body: '16px',
//     h1: '2.5rem',
//     h2: '2rem',
//     h3: '1.75rem',
//     h4: '1.5rem',
//     h5: '1.25rem',
//     h6: '1rem',
//   },
//   fontWeights: {
//     light: 300,
//     regular: 400,
//     medium: 500,
//     semiBold: 600,
//     bold: 700,
//   },
//   styles: {
//     global: {
//       body: {
//         bg: 'background',
//         color: 'text',
//         fontFamily: 'body',
//       },
//       h1: {
//         fontSize: 'h1',
//         fontWeight: 'bold',
//         color: 'primary',
//       },
//       h2: {
//         fontSize: 'h2',
//         fontWeight: 'semiBold',
//         color: 'secondary',
//       },
//       h3: {
//         fontSize: 'h3',
//         fontWeight: 'medium',
//         color: 'primary',
//       },
//       h4: {
//         fontSize: 'h4',
//         fontWeight: 'medium',
//         color: 'secondary',
//       },
//       h5: {
//         fontSize: 'h5',
//         fontWeight: 'medium',
//         color: 'primary',
//       },
//       h6: {
//         fontSize: 'h6',
//         fontWeight: 'medium',
//         color: 'secondary',
//       },
//       p: {
//         fontSize: 'body',
//         fontWeight: 'regular',
//         color: 'text',
//       },
//       a: {
//         color: 'primary',
//         textDecoration: 'none',
//         _hover: {
//           color: 'primaryDark',
//         },
//       },
//       button: {
//         bg: 'primary',
//         color: 'background',
//         border: 'none',
//         borderRadius: 'md',
//         padding: '10px 20px',
//         cursor: 'pointer',
//         _hover: {
//           bg: 'primaryDark',
//         },
//       },
//       input: {
//         width: '100%',
//         padding: '10px',
//         border: '1px solid',
//         borderColor: 'border',
//         borderRadius: 'md',
//         fontSize: 'body',
//         color: 'text',
//         bg: 'neutral',
//         _focus: {
//           borderColor: 'primary',
//           outline: 'none',
//         },
//       },
//       textarea: {
//         width: '100%',
//         padding: '10px',
//         border: '1px solid',
//         borderColor: 'border',
//         borderRadius: 'md',
//         fontSize: 'body',
//         color: 'text',
//         bg: 'neutral',
//         _focus: {
//           borderColor: 'primary',
//           outline: 'none',
//         },
//       },
//     },
//   },
// });

// export default chakraTheme;

import { extendTheme } from '@chakra-ui/react';

const chakraTheme = extendTheme({
  colors: {
    primary: {
      50: '#E6E8FF',
      100: '#C0C6FF',
      200: '#9AA3FF',
      300: '#7480FF',
      400: '#4E5DFF',
      500: '#4353FF', // Main primary color
      600: '#3342CC',
      700: '#232E99',
      800: '#131B66',
      900: '#060933',
    },
    secondary: {
      50: '#F2F3FF',
      100: '#D9DCFF',
      200: '#B3B9FF',
      300: '#8D96FF',
      400: '#6673FF',
      500: '#4050FF',
      600: '#3340CC',
      700: '#262F99',
      800: '#1A1F66',
      900: '#0D0F33',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    success: '#38A169',
    error: '#E53E3E',
    warning: '#D69E2E',
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Inter, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
    lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
    xl: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
          },
          _active: {
            bg: `${props.colorScheme}.700`,
          },
          boxShadow: 'md',
          transition: 'all 0.2s',
        }),
        gradient: (props) => ({
          bgGradient: `linear(to-r, ${props.colorScheme}.400, ${props.colorScheme}.600)`,
          color: 'white',
          _hover: {
            bgGradient: `linear(to-r, ${props.colorScheme}.500, ${props.colorScheme}.700)`,
          },
          _active: {
            bgGradient: `linear(to-r, ${props.colorScheme}.600, ${props.colorScheme}.800)`,
          },
          boxShadow: 'md',
          transition: 'all 0.2s',
        }),
      },
    },
    Card: {
      baseStyle: {
        p: '6',
        bg: 'white',
        boxShadow: 'md',
        borderRadius: 'lg',
        transition: 'all 0.2s',
        _hover: {
          boxShadow: 'lg',
          transform: 'translateY(-2px)',
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'gray.100',
            _hover: {
              bg: 'gray.200',
            },
            _focus: {
              bg: 'white',
              borderColor: 'primary.500',
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
      '.gradient-bg': {
        bgGradient: 'linear(to-r, primary.400, secondary.400)',
        color: 'white',
      },
    },
  },
});

export default chakraTheme;