// import React, { useContext, useEffect } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { AuthContext } from '../../context/AuthContext';
// import Loader from '../common/Loader';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileAudio, faSearch, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';

// const LandingContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
// `;

// const Header = styled.header`
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: ${({ theme }) => theme.colors.neutral};
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Logo = styled.h1`
//   font-size: ${({ theme }) => theme.fontSizes.h2};
//   margin: 0;
// `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 1rem;
// `;

// const NavLink = styled(Link)`
//   color: ${({ theme }) => theme.colors.neutral};
//   text-decoration: none;
//   font-weight: bold;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//   }
// `;

// const Hero = styled.section`
//   background-color: ${({ theme }) => theme.colors.background};
//   color: ${({ theme }) => theme.colors.text};
//   padding: 4rem 2rem;
//   text-align: center;
// `;

// const Title = styled.h2`
//   font-size: ${({ theme }) => theme.fontSizes.h1};
//   margin-bottom: 1rem;
// `;

// const Subtitle = styled.p`
//   font-size: ${({ theme }) => theme.fontSizes.h3};
//   max-width: 600px;
//   margin: 0 auto 2rem;
// `;

// const CTAButton = styled(Link)`
//   display: inline-block;
//   background-color: ${({ theme }) => theme.colors.accent};
//   color: ${({ theme }) => theme.colors.neutral};
//   padding: 1rem 2rem;
//   border-radius: 5px;
//   text-decoration: none;
//   font-weight: bold;
//   font-size: ${({ theme }) => theme.fontSizes.body};
//   transition: background-color 0.3s ease;
  
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.secondary};
//   }
// `;

// const FeaturesSection = styled.section`
//   padding: 4rem 2rem;
//   background-color: ${({ theme }) => theme.colors.neutral};
// `;

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 2rem;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const FeatureCard = styled.div`
//   background-color: ${({ theme }) => theme.colors.background};
//   border-radius: 8px;
//   padding: 2rem;
//   text-align: center;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease;
  
//   &:hover {
//     transform: translateY(-5px);
//   }
// `;

// const FeatureIcon = styled(FontAwesomeIcon)`
//   font-size: 2.5rem;
//   color: ${({ theme }) => theme.colors.primary};
//   margin-bottom: 1rem;
// `;

// const FeatureTitle = styled.h3`
//   font-size: ${({ theme }) => theme.fontSizes.h3};
//   margin-bottom: 0.5rem;
// `;

// const FeatureDescription = styled.p`
//   font-size: ${({ theme }) => theme.fontSizes.body};
// `;

// const CTASection = styled.section`
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: ${({ theme }) => theme.colors.neutral};
//   padding: 4rem 2rem;
//   text-align: center;
// `;

// const CTATitle = styled.h2`
//   font-size: ${({ theme }) => theme.fontSizes.h2};
//   margin-bottom: 1rem;
// `;

// const Footer = styled.footer`
//   background-color: ${({ theme }) => theme.colors.background};
//   color: ${({ theme }) => theme.colors.text};
//   padding: 2rem;
//   text-align: center;
// `;

// const LandingPage = () => {
//   const { auth, loading } = useContext(AuthContext);

//   useEffect(() => {
//     console.log('LandingPage - Auth state:', auth);
//     console.log('LandingPage - Loading state:', loading);
//   }, [auth, loading]);

//   if (loading) {
//     return <Loader />;
//   }

//   if (auth.isAuthenticated) {
//     console.log('LandingPage - Redirecting to dashboard');
//     return <Navigate to="/app/dashboard" replace />;
//   }

//   return (
//     <LandingContainer>
//       <Header>
//         <Logo>WaveAnalyzer</Logo>
//         <Nav>
//           <NavLink to="/login">Login</NavLink>
//           <NavLink to="/register">Sign Up</NavLink>
//         </Nav>
//       </Header>

//       <Hero>
//         <Title>Analyze and Manage Your Media Files Effortlessly</Title>
//         <Subtitle>
//           Powerful tools for uploading, organizing, and analyzing your audio and video content.
//         </Subtitle>
//         <CTAButton to="/register">Get Started</CTAButton>
//       </Hero>

//       <FeaturesSection>
//         <FeaturesGrid>
//           <FeatureCard>
//             <FeatureIcon icon={faFileAudio} />
//             <FeatureTitle>Organized Library</FeatureTitle>
//             <FeatureDescription>
//               Easily upload and categorize your media files for quick access and management.
//             </FeatureDescription>
//           </FeatureCard>
//           <FeatureCard>
//             <FeatureIcon icon={faSearch} />
//             <FeatureTitle>Advanced Search</FeatureTitle>
//             <FeatureDescription>
//               Utilize our powerful search tools to find specific files or information effortlessly.
//             </FeatureDescription>
//           </FeatureCard>
//           <FeatureCard>
//             <FeatureIcon icon={faChartLine} />
//             <FeatureTitle>Comprehensive Analysis</FeatureTitle>
//             <FeatureDescription>
//               Perform in-depth analyses on your media files to gain valuable insights.
//             </FeatureDescription>
//           </FeatureCard>
//           <FeatureCard>
//             <FeatureIcon icon={faCog} />
//             <FeatureTitle>Custom Settings</FeatureTitle>
//             <FeatureDescription>
//               Tailor the platform to your specific needs with customizable settings and preferences.
//             </FeatureDescription>
//           </FeatureCard>
//         </FeaturesGrid>
//       </FeaturesSection>

//       <CTASection>
//         <CTATitle>Ready to streamline your media workflow?</CTATitle>
//         <CTAButton to="/register">Sign Up Now</CTAButton>
//       </CTASection>

//       <Footer>
//         <p>&copy; {new Date().getFullYear()} WaveAnalyzer. All rights reserved.</p>
//       </Footer>
//     </LandingContainer>
//   );
// };

// export default LandingPage;

import React, { useContext, useEffect } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Container,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../common/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faSearch, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  const { auth, loading } = useContext(AuthContext);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const primaryColor = useColorModeValue('primary.500', 'primary.300');

  useEffect(() => {
    console.log('LandingPage - Auth state:', auth);
    console.log('LandingPage - Loading state:', loading);
  }, [auth, loading]);

  if (loading) {
    return <Loader />;
  }

  if (auth.isAuthenticated) {
    console.log('LandingPage - Redirecting to dashboard');
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <Box minH="100vh" bg={bgColor} color={textColor}>
      <Box as="header" bg={primaryColor} color="white" py={4} px={8}>
        <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
          <Heading as="h1" size="lg">WaveAnalyzer</Heading>
          <HStack spacing={4}>
            <Button as={RouterLink} to="/login" variant="ghost" _hover={{ bg: 'whiteAlpha.200' }}>
              Login
            </Button>
            <Button as={RouterLink} to="/register" variant="outline" _hover={{ bg: 'whiteAlpha.200' }}>
              Sign Up
            </Button>
          </HStack>
        </Flex>
      </Box>

      <Box as="section" py={20} textAlign="center">
        <Container maxW="container.xl">
          <VStack spacing={6}>
            <Heading as="h2" size="3xl" mb={4}>
              Analyze and Manage Your Media Files Effortlessly
            </Heading>
            <Text fontSize="xl" maxW="2xl" mb={8}>
              Powerful tools for uploading, organizing, and analyzing your audio and video content.
            </Text>
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              colorScheme="primary"
              fontWeight="bold"
              px={8}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            >
              Get Started
            </Button>
          </VStack>
        </Container>
      </Box>

      <Box as="section" bg={useColorModeValue('gray.100', 'gray.700')} py={20}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8}>
            {[
              { icon: faFileAudio, title: 'Organized Library', description: 'Easily upload and categorize your media files for quick access and management.' },
              { icon: faSearch, title: 'Advanced Search', description: 'Utilize our powerful search tools to find specific files or information effortlessly.' },
              { icon: faChartLine, title: 'Comprehensive Analysis', description: 'Perform in-depth analyses on your media files to gain valuable insights.' },
              { icon: faCog, title: 'Custom Settings', description: 'Tailor the platform to your specific needs with customizable settings and preferences.' },
            ].map((feature, index) => (
              <GridItem key={index}>
                <VStack
                  bg={useColorModeValue('white', 'gray.800')}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                  height="100%"
                >
                  <Icon as={FontAwesomeIcon} icon={feature.icon} boxSize={10} color={primaryColor} mb={4} />
                  <Heading as="h3" size="md" mb={2}>
                    {feature.title}
                  </Heading>
                  <Text textAlign="center">{feature.description}</Text>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box as="section" bg={primaryColor} color="white" py={20} textAlign="center">
        <Container maxW="container.xl">
          <VStack spacing={6}>
            <Heading as="h2" size="2xl" mb={4}>
              Ready to streamline your media workflow?
            </Heading>
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              colorScheme="whiteAlpha"
              fontWeight="bold"
              px={8}
              _hover={{ bg: 'whiteAlpha.300' }}
            >
              Sign Up Now
            </Button>
          </VStack>
        </Container>
      </Box>

      <Box as="footer" bg={useColorModeValue('gray.100', 'gray.800')} py={8} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} WaveAnalyzer. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default LandingPage;