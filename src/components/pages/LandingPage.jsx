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
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../common/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faSearch, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.neutral};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.neutral};
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Hero = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h1};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.neutral};
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.body};
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.neutral};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

const CTASection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.neutral};
  padding: 4rem 2rem;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  margin-bottom: 1rem;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 2rem;
  text-align: center;
`;

const LandingPage = () => {
  const { auth, loading } = useContext(AuthContext);

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
    <LandingContainer>
      <Header>
        <Logo>WaveAnalyzer</Logo>
        <Nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Sign Up</NavLink>
        </Nav>
      </Header>

      <Hero>
        <Title>Analyze and Manage Your Media Files Effortlessly</Title>
        <Subtitle>
          Powerful tools for uploading, organizing, and analyzing your audio and video content.
        </Subtitle>
        <CTAButton to="/register">Get Started</CTAButton>
      </Hero>

      <FeaturesSection>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon icon={faFileAudio} />
            <FeatureTitle>Organized Library</FeatureTitle>
            <FeatureDescription>
              Easily upload and categorize your media files for quick access and management.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon icon={faSearch} />
            <FeatureTitle>Advanced Search</FeatureTitle>
            <FeatureDescription>
              Utilize our powerful search tools to find specific files or information effortlessly.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon icon={faChartLine} />
            <FeatureTitle>Comprehensive Analysis</FeatureTitle>
            <FeatureDescription>
              Perform in-depth analyses on your media files to gain valuable insights.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon icon={faCog} />
            <FeatureTitle>Custom Settings</FeatureTitle>
            <FeatureDescription>
              Tailor the platform to your specific needs with customizable settings and preferences.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <CTASection>
        <CTATitle>Ready to streamline your media workflow?</CTATitle>
        <CTAButton to="/register">Sign Up Now</CTAButton>
      </CTASection>

      <Footer>
        <p>&copy; {new Date().getFullYear()} WaveAnalyzer. All rights reserved.</p>
      </Footer>
    </LandingContainer>
  );
};

export default LandingPage;