// // // // import React, { Suspense, useEffect } from 'react';
// // // // import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// // // // import styled from 'styled-components';
// // // // import GlobalStyle from './styles/GlobalStyle';
// // // // import ErrorBoundary from './components/common/ErrorBoundary';
// // // // import Loader from './components/common/Loader';
// // // // import routes from './routes';
// // // // import './fontAwesome';
// // // // import { AuthProvider, useAuth } from './context/AuthContext';
// // // // import NotFound from './components/pages/NotFound';
// // // // import LandingPage from './components/pages/LandingPage';

// // // // const AppContainer = styled.div`
// // // //   max-width: 100%;
// // // //   margin: 0 auto;
// // // //   background-color: ${({ theme }) => theme.colors.background};
// // // // `;

// // // // function AppRoutes() {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const { auth, loading } = useAuth();

// // // //   useEffect(() => {
// // // //     console.log('Current path:', location.pathname);
// // // //     console.log('Auth state:', auth);
// // // //     console.log('Loading state:', loading);
// // // //   }, [location.pathname, auth, loading]);

// // // //   if (loading) {
// // // //     return <Loader />;
// // // //   }

// // // //   return (
// // // //     <Routes>
// // // //       <Route path="/" element={<LandingPage />} />
// // // //       {routes.map((route, index) => {
// // // //         if (route.children) {
// // // //           return (
// // // //             <Route key={index} path={route.path} element={route.element}>
// // // //               {route.children.map((child, childIndex) => (
// // // //                 <Route key={childIndex} path={child.path} element={child.element} />
// // // //               ))}
// // // //             </Route>
// // // //           );
// // // //         }
// // // //         return (
// // // //           <Route key={index} path={route.path} element={route.element} />
// // // //         );
// // // //       })}
// // // //       <Route path="*" element={<NotFound />} />
// // // //     </Routes>
// // // //   );
// // // // }

// // // // function App() {
// // // //   return (
// // // //     <AuthProvider>
// // // //       <ErrorBoundary>
// // // //         <AppContainer>
// // // //           <GlobalStyle />
// // // //           <Suspense fallback={<Loader />}>
// // // //             <AppRoutes />
// // // //           </Suspense>
// // // //         </AppContainer>
// // // //       </ErrorBoundary>
// // // //     </AuthProvider>
// // // //   );
// // // // }

// // // // export default App;
// // // import React, { Suspense, useEffect } from 'react';
// // // import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// // // import styled from 'styled-components';
// // // import GlobalStyle from './styles/GlobalStyle';
// // // import ErrorBoundary from './components/common/ErrorBoundary';
// // // import Loader from './components/common/Loader';
// // // import routes from './routes';
// // // import './fontAwesome';
// // // import { AuthProvider, useAuth } from './context/AuthContext';
// // // import NotFound from './components/pages/NotFound';
// // // import LandingPage from './components/pages/LandingPage';

// // // const AppContainer = styled.div`
// // //   max-width: 100%;
// // //   margin: 0 auto;
// // //   background-color: ${({ theme }) => theme.colors.background};
// // // `;

// // // function AppRoutes() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const { auth, loading } = useAuth();

// // //   useEffect(() => {
// // //     console.log('Route changed:', location.pathname);
// // //     console.log('Auth state:', auth);
// // //     console.log('Loading state:', loading);
// // //   }, [location.pathname, auth, loading]);

// // //   return (
// // //     <Routes>
// // //       <Route path="/" element={<LandingPage />} />
// // //       {routes.map((route, index) => {
// // //         if (route.children) {
// // //           return (
// // //             <Route key={index} path={route.path} element={route.element}>
// // //               {route.children.map((child, childIndex) => (
// // //                 <Route key={childIndex} path={child.path} element={child.element} />
// // //               ))}
// // //             </Route>
// // //           );
// // //         }
// // //         return (
// // //           <Route key={index} path={route.path} element={route.element} />
// // //         );
// // //       })}
// // //       <Route path="*" element={<NotFound />} />
// // //     </Routes>
// // //   );
// // // }

// // // function App() {
// // //   const location = useLocation();

// // //   useEffect(() => {
// // //     console.log('Initial route:', location.pathname);
// // //   }, []);

// // //   return (
// // //     <AuthProvider>
// // //       <ErrorBoundary>
// // //         <AppContainer>
// // //           <GlobalStyle />
// // //           <Suspense fallback={<Loader />}>
// // //             <AppRoutes />
// // //           </Suspense>
// // //         </AppContainer>
// // //       </ErrorBoundary>
// // //     </AuthProvider>
// // //   );
// // // }

// // // export default App;

// // import React, { Suspense, useEffect } from 'react';
// // import { Routes, Route, useLocation } from 'react-router-dom';
// // import styled from 'styled-components';
// // import GlobalStyle from './styles/GlobalStyle';
// // import ErrorBoundary from './components/common/ErrorBoundary';
// // import Loader from './components/common/Loader';
// // import routes from './routes';
// // import './fontAwesome';
// // import { AuthProvider } from './context/AuthContext';
// // import LandingPage from './components/pages/LandingPage';

// // const AppContainer = styled.div`
// //   max-width: 100%;
// //   margin: 0 auto;
// //   background-color: ${({ theme }) => theme.colors.background};
// // `;

// // function AppRoutes() {
// //   const location = useLocation();

// //   useEffect(() => {
// //     console.log('Route changed:', location.pathname);
// //   }, [location.pathname]);

// //   return (
// //     <Routes>
// //       <Route path="/" element={<LandingPage />} />
// //       {routes.map((route, index) => (
// //         <Route key={index} path={route.path} element={route.element}>
// //           {route.children?.map((child, childIndex) => (
// //             <Route key={childIndex} path={child.path} element={child.element} />
// //           ))}
// //         </Route>
// //       ))}
// //     </Routes>
// //   );
// // }

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <ErrorBoundary>
// //         <AppContainer>
// //           <GlobalStyle />
// //           <Suspense fallback={<Loader />}>
// //             <AppRoutes />
// //           </Suspense>
// //         </AppContainer>
// //       </ErrorBoundary>
// //     </AuthProvider>
// //   );
// // }

// // export default App;
// import React, { Suspense, useEffect } from 'react';
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import styled from 'styled-components';
// import GlobalStyle from './styles/GlobalStyle';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import Loader from './components/common/Loader';
// import routes from './routes';
// import './fontAwesome';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import LandingPage from './components/pages/LandingPage';

// const AppContainer = styled.div`
//   max-width: 100%;
//   margin: 0 auto;
//   background-color: ${({ theme }) => theme.colors.background};
// `;

// function AppRoutes() {
//   const location = useLocation();
//   const { auth, loading } = useAuth();

//   useEffect(() => {
//     console.log('Current route:', location.pathname);
//     console.log('Auth state:', auth);
//     console.log('Loading state:', loading);
//   }, [location.pathname, auth, loading]);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       {routes.map((route, index) => (
//         <Route key={index} path={route.path} element={route.element} />
//       ))}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <ErrorBoundary>
//         <AppContainer>
//           <GlobalStyle />
//           <Suspense fallback={<Loader />}>
//             <AppRoutes />
//           </Suspense>
//         </AppContainer>
//       </ErrorBoundary>
//     </AuthProvider>
//   );
// }

// export default App;

// import React, { Suspense, useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import styled from 'styled-components';
// import GlobalStyle from './styles/GlobalStyle';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import Loader from './components/common/Loader';
// import routes from './routes';
// import './fontAwesome';
// import { AuthProvider, useAuth } from './context/AuthContext';

// const AppContainer = styled.div`
//   max-width: 100%;
//   margin: 0 auto;
//   background-color: ${({ theme }) => theme.colors.background};
// `;

// function AppRoutes() {
//   const location = useLocation();
//   const { auth, loading } = useAuth();

//   useEffect(() => {
//     console.log('Current route:', location.pathname);
//     console.log('Auth state:', auth);
//     console.log('Loading state:', loading);
//   }, [location.pathname, auth, loading]);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Routes>
//       {routes.map((route, index) => {
//         if (route.children) {
//           return (
//             <Route key={index} path={route.path} element={route.element}>
//               {route.children.map((child, childIndex) => (
//                 <Route
//                   key={`${index}-${childIndex}`}
//                   path={child.path}
//                   element={child.element}
//                 />
//               ))}
//             </Route>
//           );
//         }
//         return (
//           <Route key={index} path={route.path} element={route.element} />
//         );
//       })}
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <ErrorBoundary>
//         <AppContainer>
//           <GlobalStyle />
//           <Suspense fallback={<Loader />}>
//             <AppRoutes />
//           </Suspense>
//         </AppContainer>
//       </ErrorBoundary>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { Suspense } from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';
import AppRoutes from './AppRoutes';
import './fontAwesome';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

function App() {
  return (
    <ErrorBoundary>
      <AppContainer>
        <GlobalStyle />
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>
      </AppContainer>
    </ErrorBoundary>
  );
}

export default App;