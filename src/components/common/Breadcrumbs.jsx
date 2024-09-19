// // // // // import React, { useEffect, useState, useMemo } from 'react';
// // // // // import { Link, useLocation, matchPath } from 'react-router-dom';
// // // // // import styled from 'styled-components';
// // // // // import routes from '../../routes'; 

// // // // // const BreadcrumbContainer = styled.nav`
// // // // //   padding: 10px 20px;
// // // // //   background-color: ${({ theme }) => theme.colors.background};
// // // // //   font-size: 0.9em;
// // // // //   overflow: hidden;
// // // // // `;

// // // // // const BreadcrumbList = styled.ol`
// // // // //   list-style: none;
// // // // //   display: flex;
// // // // //   flex-wrap: nowrap;
// // // // //   margin: 0;
// // // // //   padding: 0;
// // // // //   overflow: hidden;
// // // // // `;

// // // // // const BreadcrumbItem = styled.li`
// // // // //   margin-right: 5px;
// // // // //   white-space: nowrap;
// // // // //   text-overflow: ellipsis;
// // // // //   overflow: hidden;
// // // // //   &:after {
// // // // //     content: ">";
// // // // //     margin-left: 5px;
// // // // //     @media (max-width: 768px) {
// // // // //       display: none;
// // // // //     }
// // // // //   }
// // // // //   &:last-child:after {
// // // // //     content: "";
// // // // //   }
// // // // //   a {
// // // // //     text-decoration: none;
// // // // //     color: ${({ theme }) => theme.colors.primary};
// // // // //     &:hover {
// // // // //       text-decoration: underline;
// // // // //     }
// // // // //   }
// // // // //   span {
// // // // //     color: ${({ theme }) => theme.colors.text};
// // // // //   }
// // // // // `;

// // // // // const formatLabel = (label) =>
// // // // //   label
// // // // //     .replace(/-/g, " ")
// // // // //     .replace(/\b\w/g, (char) => char.toUpperCase());

// // // // // function Breadcrumbs() {
// // // // //   const location = useLocation();
// // // // //   const { pathname } = location;
// // // // //   const [dynamicLabels, setDynamicLabels] = useState({});

// // // // //   const pathnames = useMemo(() => ['', ...pathname.split("/").filter((x) => x)], [pathname]);

// // // // //   useEffect(() => {
// // // // //     const fetchDynamicLabels = async () => {
// // // // //       const labels = {};
// // // // //       for (let index = 0; index < pathnames.length; index++) {
// // // // //         const to = `/${pathnames.slice(1, index + 1).join("/")}`;
// // // // //         const matchedRoute = routes.find((route) => matchPath({ path: route.path, end: true }, to));
// // // // //         if (matchedRoute) {
// // // // //           if (typeof matchedRoute.breadcrumb === 'function') {
// // // // //             const match = matchPath({ path: matchedRoute.path, end: true }, to);
// // // // //             const params = match ? match.params : {};
// // // // //             const label = await matchedRoute.breadcrumb(params);
// // // // //             labels[to] = label;
// // // // //           } else {
// // // // //             labels[to] = matchedRoute.breadcrumb || formatLabel(pathnames[index]);
// // // // //           }
// // // // //         } else {
// // // // //           labels[to] = formatLabel(pathnames[index]);
// // // // //         }
// // // // //       }
// // // // //       setDynamicLabels(labels);
// // // // //     };
// // // // //     fetchDynamicLabels();
// // // // //   }, [pathnames]);

// // // // //   const breadcrumbItems = useMemo(() => {
// // // // //     return pathnames.map((_, index) => {
// // // // //       const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
// // // // //       return {
// // // // //         label: dynamicLabels[to] || formatLabel(pathnames[index] || 'Home'),
// // // // //         path: to,
// // // // //       };
// // // // //     });
// // // // //   }, [pathnames, dynamicLabels]);

// // // // //   const getVisibleBreadcrumbs = () => {
// // // // //     const maxVisible = 4; 
// // // // //     if (breadcrumbItems.length <= maxVisible) {
// // // // //       return breadcrumbItems;
// // // // //     } else {
// // // // //       const first = breadcrumbItems[0];
// // // // //       const last = breadcrumbItems[breadcrumbItems.length - 1];
// // // // //       return [first, { label: '...', path: null }, last];
// // // // //     }
// // // // //   };

// // // // //   const visibleBreadcrumbs = getVisibleBreadcrumbs();

// // // // //   return (
// // // // //     <BreadcrumbContainer aria-label="breadcrumb">
// // // // //       <BreadcrumbList>
// // // // //         {visibleBreadcrumbs.map((item, index) => (
// // // // //           <BreadcrumbItem key={index}>
// // // // //             {item.path ? (
// // // // //               <Link to={item.path}>{item.label}</Link>
// // // // //             ) : (
// // // // //               <span>{item.label}</span>
// // // // //             )}
// // // // //           </BreadcrumbItem>
// // // // //         ))}
// // // // //       </BreadcrumbList>
// // // // //     </BreadcrumbContainer>
// // // // //   );
// // // // // }

// // // // // export default Breadcrumbs;

// // // // // src/components/common/Breadcrumbs.jsx
// // // // import React, { useEffect, useState, useMemo } from 'react';
// // // // import { Link, useLocation, matchPath } from 'react-router-dom';
// // // // import styled from 'styled-components';
// // // // import routes from '../../routes'; 

// // // // const BreadcrumbContainer = styled.nav`
// // // //   padding: 10px 20px;
// // // //   background-color: ${({ theme }) => theme.colors.background};
// // // //   font-size: 0.9em;
// // // //   overflow: hidden;
// // // // `;

// // // // const BreadcrumbList = styled.ol`
// // // //   list-style: none;
// // // //   display: flex;
// // // //   flex-wrap: nowrap;
// // // //   margin: 0;
// // // //   padding: 0;
// // // //   overflow: hidden;
// // // // `;

// // // // const BreadcrumbItem = styled.li`
// // // //   margin-right: 5px;
// // // //   white-space: nowrap;
// // // //   text-overflow: ellipsis;
// // // //   overflow: hidden;
// // // //   &:after {
// // // //     content: ">";
// // // //     margin-left: 5px;
// // // //     @media (max-width: 768px) {
// // // //       display: none;
// // // //     }
// // // //   }
// // // //   &:last-child:after {
// // // //     content: "";
// // // //   }
// // // //   a {
// // // //     text-decoration: none;
// // // //     color: ${({ theme }) => theme.colors.primary};
// // // //     &:hover {
// // // //       text-decoration: underline;
// // // //     }
// // // //   }
// // // //   span {
// // // //     color: ${({ theme }) => theme.colors.text};
// // // //   }
// // // // `;

// // // // const formatLabel = (label) =>
// // // //   label
// // // //     .replace(/-/g, " ")
// // // //     .replace(/\b\w/g, (char) => char.toUpperCase());

// // // // function Breadcrumbs() {
// // // //   const location = useLocation();
// // // //   const { pathname } = location;
// // // //   const [dynamicLabels, setDynamicLabels] = useState({});
// // // //   const [isNotFound, setIsNotFound] = useState(false); // Track if current path is Not Found

// // // //   const pathnames = useMemo(() => ['', ...pathname.split("/").filter((x) => x)], [pathname]);

// // // //   useEffect(() => {
// // // //     const fetchDynamicLabels = async () => {
// // // //       const labels = {};
// // // //       let foundMatch = false; // Flag to check if any route matches

// // // //       for (let index = 0; index < pathnames.length; index++) {
// // // //         const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
// // // //         const matchedRoute = routes.find((route) => matchPath({ path: route.path, end: true }, to));

// // // //         if (matchedRoute) {
// // // //           foundMatch = true;
// // // //           if (matchedRoute.path === '*') {
// // // //             // Only set 'Not Found' if no other route has matched
// // // //             if (!foundMatch) {
// // // //               labels[to] = matchedRoute.breadcrumb;
// // // //               setIsNotFound(true);
// // // //             }
// // // //             continue; // Skip adding wildcard route to breadcrumbs
// // // //           }

// // // //           if (typeof matchedRoute.breadcrumb === 'function') {
// // // //             const match = matchPath({ path: matchedRoute.path, end: true }, to);
// // // //             const params = match ? match.params : {};
// // // //             try {
// // // //               const label = await matchedRoute.breadcrumb(params);
// // // //               labels[to] = label;
// // // //             } catch (error) {
// // // //               console.error(`Error fetching breadcrumb for path "${to}":`, error);
// // // //               labels[to] = formatLabel(pathnames[index]);
// // // //             }
// // // //           } else {
// // // //             labels[to] = matchedRoute.breadcrumb || formatLabel(pathnames[index]);
// // // //           }
// // // //         } else {
// // // //           // No matched route; check if it's the root path
// // // //           if (to !== '/') {
// // // //             labels[to] = formatLabel(pathnames[index]);
// // // //             setIsNotFound(true);
// // // //           }
// // // //         }
// // // //       }

// // // //       setDynamicLabels(labels);
// // // //     };

// // // //     fetchDynamicLabels();
// // // //   }, [pathnames]);

// // // //   const breadcrumbItems = useMemo(() => {
// // // //     return pathnames.map((_, index) => {
// // // //       const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
// // // //       // If the last breadcrumb is 'Not Found', adjust accordingly
// // // //       if (isNotFound && index === pathnames.length - 1) {
// // // //         return {
// // // //           label: 'Not Found',
// // // //           path: null, // Non-clickable
// // // //         };
// // // //       }
// // // //       return {
// // // //         label: dynamicLabels[to] || formatLabel(pathnames[index] || 'Home'),
// // // //         path: to,
// // // //       };
// // // //     });
// // // //   }, [pathnames, dynamicLabels, isNotFound]);

// // // //   const getVisibleBreadcrumbs = () => {
// // // //     const maxVisible = 4; 
// // // //     if (breadcrumbItems.length <= maxVisible) {
// // // //       return breadcrumbItems;
// // // //     } else {
// // // //       const first = breadcrumbItems[0];
// // // //       const last = breadcrumbItems[breadcrumbItems.length - 1];
// // // //       return [first, { label: '...', path: null }, last];
// // // //     }
// // // //   };

// // // //   const visibleBreadcrumbs = getVisibleBreadcrumbs();

// // // //   return (
// // // //     <BreadcrumbContainer aria-label="breadcrumb">
// // // //       <BreadcrumbList>
// // // //         {visibleBreadcrumbs.map((item, index) => (
// // // //           <BreadcrumbItem key={index}>
// // // //             {item.path ? (
// // // //               <Link to={item.path}>{item.label}</Link>
// // // //             ) : (
// // // //               <span>{item.label}</span>
// // // //             )}
// // // //           </BreadcrumbItem>
// // // //         ))}
// // // //       </BreadcrumbList>
// // // //     </BreadcrumbContainer>
// // // //   );
// // // // }

// // // // export default Breadcrumbs;

// // // // src/components/common/Breadcrumbs.jsx
// // // import React, { useEffect, useState, useMemo } from 'react';
// // // import { Link, useLocation, matchPath } from 'react-router-dom';
// // // import styled from 'styled-components';
// // // import routes from '../../routes'; 

// // // const BreadcrumbContainer = styled.nav`
// // //   padding: 10px 20px;
// // //   background-color: ${({ theme }) => theme.colors.background};
// // //   font-size: 0.9em;
// // //   overflow: hidden;
// // // `;

// // // const BreadcrumbList = styled.ol`
// // //   list-style: none;
// // //   display: flex;
// // //   flex-wrap: nowrap;
// // //   margin: 0;
// // //   padding: 0;
// // //   overflow: hidden;
// // // `;

// // // const BreadcrumbItem = styled.li`
// // //   margin-right: 5px;
// // //   white-space: nowrap;
// // //   text-overflow: ellipsis;
// // //   overflow: hidden;
// // //   &:after {
// // //     content: ">";
// // //     margin-left: 5px;
// // //     @media (max-width: 768px) {
// // //       display: none;
// // //     }
// // //   }
// // //   &:last-child:after {
// // //     content: "";
// // //   }
// // //   a {
// // //     text-decoration: none;
// // //     color: ${({ theme }) => theme.colors.primary};
// // //     &:hover {
// // //       text-decoration: underline;
// // //     }
// // //   }
// // //   span {
// // //     color: ${({ theme }) => theme.colors.text};
// // //   }
// // // `;

// // // const formatLabel = (label) =>
// // //   label
// // //     .replace(/-/g, " ")
// // //     .replace(/\b\w/g, (char) => char.toUpperCase());

// // // function Breadcrumbs() {
// // //   const location = useLocation();
// // //   const { pathname } = location;
// // //   const [dynamicLabels, setDynamicLabels] = useState({});
// // //   const [isNotFound, setIsNotFound] = useState(false); // Track if current path is Not Found

// // //   // Split the pathname into segments
// // //   const pathnames = useMemo(() => ['', ...pathname.split("/").filter((x) => x)], [pathname]);

// // //   useEffect(() => {
// // //     const fetchDynamicLabels = async () => {
// // //       const labels = {};
// // //       let foundMatch = false; // Flag to check if any non-wildcard route matches

// // //       for (let index = 0; index < pathnames.length; index++) {
// // //         const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
// // //         const matchedRoute = routes.find((route) => matchPath({ path: route.path, end: true }, to));

// // //         if (matchedRoute) {
// // //           if (matchedRoute.path !== '*') {
// // //             foundMatch = true; // Only set foundMatch if the route is not a wildcard
// // //           }

// // //           if (matchedRoute.path === '*') {
// // //             if (!foundMatch) { // Only set 'Not Found' if no other route has matched
// // //               labels[to] = matchedRoute.breadcrumb;
// // //               setIsNotFound(true);
// // //             }
// // //             continue; // Skip adding wildcard route to breadcrumbs
// // //           }

// // //           if (typeof matchedRoute.breadcrumb === 'function') {
// // //             const match = matchPath({ path: matchedRoute.path, end: true }, to);
// // //             const params = match ? match.params : {};
// // //             try {
// // //               const label = await matchedRoute.breadcrumb(params);
// // //               labels[to] = label;
// // //             } catch (error) {
// // //               console.error(`Error fetching breadcrumb for path "${to}":`, error);
// // //               labels[to] = formatLabel(pathnames[index]);
// // //             }
// // //           } else {
// // //             labels[to] = matchedRoute.breadcrumb || formatLabel(pathnames[index]);
// // //           }
// // //         } else {
// // //           // No matched route; consider it as Not Found only if it's not the root path
// // //           if (to !== '/') {
// // //             labels[to] = formatLabel(pathnames[index]);
// // //             setIsNotFound(true);
// // //           }
// // //         }
// // //       }

// // //       setDynamicLabels(labels);
// // //     };

// // //     fetchDynamicLabels();
// // //   }, [pathnames]);

// // //   const breadcrumbItems = useMemo(() => {
// // //     return pathnames.map((_, index) => {
// // //       const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
      
// // //       // If the last breadcrumb is 'Not Found', adjust accordingly
// // //       if (isNotFound && index === pathnames.length - 1) {
// // //         return {
// // //           label: 'Not Found',
// // //           path: null, // Non-clickable
// // //         };
// // //       }

// // //       return {
// // //         label: dynamicLabels[to] || formatLabel(pathnames[index] || 'Home'),
// // //         path: to,
// // //       };
// // //     });
// // //   }, [pathnames, dynamicLabels, isNotFound]);

// // //   const getVisibleBreadcrumbs = () => {
// // //     const maxVisible = 4; 
// // //     if (breadcrumbItems.length <= maxVisible) {
// // //       return breadcrumbItems;
// // //     } else {
// // //       const first = breadcrumbItems[0];
// // //       const last = breadcrumbItems[breadcrumbItems.length - 1];
// // //       return [first, { label: '...', path: null }, last];
// // //     }
// // //   };

// // //   const visibleBreadcrumbs = getVisibleBreadcrumbs();

// // //   return (
// // //     <BreadcrumbContainer aria-label="breadcrumb">
// // //       <BreadcrumbList>
// // //         {visibleBreadcrumbs.map((item, index) => (
// // //           <BreadcrumbItem key={index} aria-current={index === visibleBreadcrumbs.length - 1 ? 'page' : undefined}>
// // //             {item.path ? (
// // //               <Link to={item.path}>{item.label}</Link>
// // //             ) : (
// // //               <span>{item.label}</span>
// // //             )}
// // //           </BreadcrumbItem>
// // //         ))}
// // //       </BreadcrumbList>
// // //     </BreadcrumbContainer>
// // //   );
// // // }

// // // export default Breadcrumbs;

// // // src/components/common/Breadcrumbs.jsx
// // import React, { useEffect, useState, useMemo } from 'react';
// // import { Link, useLocation, matchPath } from 'react-router-dom';
// // import styled from 'styled-components';
// // import routes from '../../routes'; 

// // const BreadcrumbContainer = styled.nav`
// //   padding: 10px 20px;
// //   background-color: ${({ theme }) => theme.colors.background};
// //   font-size: 0.9em;
// //   overflow: hidden;
// // `;

// // const BreadcrumbList = styled.ol`
// //   list-style: none;
// //   display: flex;
// //   flex-wrap: nowrap;
// //   margin: 0;
// //   padding: 0;
// //   overflow: hidden;
// // `;

// // const BreadcrumbItem = styled.li`
// //   margin-right: 5px;
// //   white-space: nowrap;
// //   text-overflow: ellipsis;
// //   overflow: hidden;
// //   &:after {
// //     content: ">";
// //     margin-left: 5px;
// //     @media (max-width: 768px) {
// //       display: none;
// //     }
// //   }
// //   &:last-child:after {
// //     content: "";
// //   }
// //   a {
// //     text-decoration: none;
// //     color: ${({ theme }) => theme.colors.primary};
// //     &:hover {
// //       text-decoration: underline;
// //     }
// //   }
// //   span {
// //     color: ${({ theme }) => theme.colors.text};
// //   }
// // `;

// // const formatLabel = (label) =>
// //   label
// //     .replace(/-/g, " ")
// //     .replace(/\b\w/g, (char) => char.toUpperCase());

// // function Breadcrumbs() {
// //   const location = useLocation();
// //   const { pathname } = location;
// //   const [dynamicLabels, setDynamicLabels] = useState({});
// //   const [isNotFound, setIsNotFound] = useState(false); // Track if current path is Not Found

// //   // Split the pathname into segments
// //   const pathnames = useMemo(() => ['', ...pathname.split("/").filter((x) => x)], [pathname]);

// //   useEffect(() => {
// //     const fetchDynamicLabels = async () => {
// //       const labels = {};
// //       let foundMatch = false; // Flag to check if any non-wildcard route matches

// //       for (let index = 0; index < pathnames.length; index++) {
// //         const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
// //         const matchedRoute = routes.find((route) => matchPath({ path: route.path, end: true }, to));

// //         if (matchedRoute) {
// //           if (matchedRoute.path !== '*') {
// //             foundMatch = true; // Only set foundMatch if the route is not a wildcard
// //           }

// //           if (matchedRoute.path === '*') {
// //             if (!foundMatch) { // Only set 'Not Found' if no other route has matched
// //               labels[to] = matchedRoute.breadcrumb;
// //               setIsNotFound(true);
// //             }
// //             continue; // Skip adding wildcard route to breadcrumbs
// //           }

// //           if (typeof matchedRoute.breadcrumb === 'function') {
// //             const match = matchPath({ path: matchedRoute.path, end: true }, to);
// //             const params = match ? match.params : {};
// //             try {
// //               const label = await matchedRoute.breadcrumb(params);
// //               labels[to] = label;
// //             } catch (error) {
// //               console.error(`Error fetching breadcrumb for path "${to}":`, error);
// //               labels[to] = formatLabel(pathnames[index]);
// //             }
// //           } else {
// //             labels[to] = matchedRoute.breadcrumb || formatLabel(pathnames[index]);
// //           }
// //         } else {
// //           // No matched route; consider it as Not Found only if it's not the root path
// //           if (to !== '/') {
// //             labels[to] = formatLabel(pathnames[index]);
// //             setIsNotFound(true);
// //           }
// //         }
// //       }

// //       setDynamicLabels(labels);
// //     };

// //     fetchDynamicLabels();
// //   }, [pathnames]);

// //   const breadcrumbItems = useMemo(() => {
// //     return pathnames.map((_, index) => {
// //       const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
      
// //       // If the last breadcrumb is 'Not Found', adjust accordingly
// //       if (isNotFound && index === pathnames.length - 1) {
// //         return {
// //           label: 'Not Found',
// //           path: null, // Non-clickable
// //         };
// //       }

// //       return {
// //         label: dynamicLabels[to] || formatLabel(pathnames[index] || 'Home'),
// //         path: to,
// //       };
// //     });
// //   }, [pathnames, dynamicLabels, isNotFound]);

// //   const getVisibleBreadcrumbs = () => {
// //     const maxVisible = 4; 
// //     if (breadcrumbItems.length <= maxVisible) {
// //       return breadcrumbItems;
// //     } else {
// //       const first = breadcrumbItems[0];
// //       const last = breadcrumbItems[breadcrumbItems.length - 1];
// //       return [first, { label: '...', path: null }, last];
// //     }
// //   };

// //   const visibleBreadcrumbs = getVisibleBreadcrumbs();

// //   return (
// //     <BreadcrumbContainer aria-label="breadcrumb">
// //       <BreadcrumbList>
// //         {visibleBreadcrumbs.map((item, index) => (
// //           <BreadcrumbItem key={index} aria-current={index === visibleBreadcrumbs.length - 1 ? 'page' : undefined}>
// //             {item.path ? (
// //               <Link to={item.path}>{item.label}</Link>
// //             ) : (
// //               <span>{item.label}</span>
// //             )}
// //           </BreadcrumbItem>
// //         ))}
// //       </BreadcrumbList>
// //     </BreadcrumbContainer>
// //   );
// // }

// // export default Breadcrumbs;

// // src/components/common/Breadcrumbs.jsx
// import React, { useEffect, useState, useMemo } from 'react';
// import { Link, useLocation, matchPath } from 'react-router-dom';
// import styled from 'styled-components';
// import routes from '../../routes'; 

// const BreadcrumbContainer = styled.nav`
//   padding: 10px 20px;
//   background-color: ${({ theme }) => theme.colors.background};
//   font-size: 0.9em;
//   overflow: hidden;
// `;

// const BreadcrumbList = styled.ol`
//   list-style: none;
//   display: flex;
//   flex-wrap: nowrap;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
// `;

// const BreadcrumbItem = styled.li`
//   margin-right: 5px;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   &:after {
//     content: ">";
//     margin-left: 5px;
//     @media (max-width: 768px) {
//       display: none;
//     }
//   }
//   &:last-child:after {
//     content: "";
//   }
//   a {
//     text-decoration: none;
//     color: ${({ theme }) => theme.colors.primary};
//     &:hover {
//       text-decoration: underline;
//     }
//   }
//   span {
//     color: ${({ theme }) => theme.colors.text};
//   }
// `;

// const formatLabel = (label) =>
//   label
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (char) => char.toUpperCase());

// function Breadcrumbs() {
//   const location = useLocation();
//   const { pathname } = location;
//   const [dynamicLabels, setDynamicLabels] = useState({});
//   const [isNotFound, setIsNotFound] = useState(false); // Track if current path is Not Found

//   // Split the pathname into segments
//   const pathnames = useMemo(() => ['', ...pathname.split("/").filter((x) => x)], [pathname]);

//   useEffect(() => {
//     const fetchDynamicLabels = async () => {
//       setIsNotFound(false); // Reset isNotFound at the start
//       const labels = {};
//       let foundMatch = false; // Flag to check if any non-wildcard route matches

//       for (let index = 0; index < pathnames.length; index++) {
//         const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
//         const matchedRoute = routes.find((route) => matchPath({ path: route.path, end: true }, to));

//         if (matchedRoute) {
//           if (matchedRoute.path !== '*') {
//             foundMatch = true; // Only set foundMatch if the route is not a wildcard
//           }

//           if (matchedRoute.path === '*') {
//             if (!foundMatch) { // Only set 'Not Found' if no other route has matched
//               labels[to] = matchedRoute.breadcrumb;
//               setIsNotFound(true);
//             }
//             continue; // Skip adding wildcard route to breadcrumbs
//           }

//           if (typeof matchedRoute.breadcrumb === 'function') {
//             const match = matchPath({ path: matchedRoute.path, end: true }, to);
//             const params = match ? match.params : {};
//             try {
//               const label = await matchedRoute.breadcrumb(params);
//               labels[to] = label;
//             } catch (error) {
//               console.error(`Error fetching breadcrumb for path "${to}":`, error);
//               labels[to] = formatLabel(pathnames[index]);
//             }
//           } else {
//             labels[to] = matchedRoute.breadcrumb || formatLabel(pathnames[index]);
//           }
//         } else {
//           // No matched route; consider it as Not Found only if it's not the root path
//           if (to !== '/') {
//             labels[to] = formatLabel(pathnames[index]);
//             setIsNotFound(true);
//           }
//         }
//       }

//       setDynamicLabels(labels);
//     };

//     fetchDynamicLabels();
//   }, [pathnames]);

//   const breadcrumbItems = useMemo(() => {
//     return pathnames.map((_, index) => {
//       const to = index === 0 ? '/' : `/${pathnames.slice(1, index + 1).join("/")}`;
      
//       // If the last breadcrumb is 'Not Found', adjust accordingly
//       if (isNotFound && index === pathnames.length - 1) {
//         return {
//           label: 'Not Found',
//           path: null, // Non-clickable
//         };
//       }

//       return {
//         label: dynamicLabels[to] || formatLabel(pathnames[index] || 'Home'),
//         path: to,
//       };
//     });
//   }, [pathnames, dynamicLabels, isNotFound]);

//   const getVisibleBreadcrumbs = () => {
//     const maxVisible = 4; 
//     if (breadcrumbItems.length <= maxVisible) {
//       return breadcrumbItems;
//     } else {
//       const first = breadcrumbItems[0];
//       const last = breadcrumbItems[breadcrumbItems.length - 1];
//       return [first, { label: '...', path: null }, last];
//     }
//   };

//   const visibleBreadcrumbs = getVisibleBreadcrumbs();

//   return (
//     <BreadcrumbContainer aria-label="breadcrumb">
//       <BreadcrumbList>
//         {visibleBreadcrumbs.map((item, index) => (
//           <BreadcrumbItem key={index} aria-current={index === visibleBreadcrumbs.length - 1 ? 'page' : undefined}>
//             {item.path ? (
//               <Link to={item.path}>{item.label}</Link>
//             ) : (
//               <span>{item.label}</span>
//             )}
//           </BreadcrumbItem>
//         ))}
//       </BreadcrumbList>
//     </BreadcrumbContainer>
//   );
// }

// export default Breadcrumbs;
// src/components/common/Breadcrumbs.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes'; 

const BreadcrumbContainer = styled.nav`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 0.9em;
  overflow: hidden;
  z-index: 1101;

  @media (max-width: 768px) {
  margin-top: 40px;
  padding: 10px 20px;
  font-size: 0.8em;
}

`;

const BreadcrumbList = styled.ol`
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const BreadcrumbItem = styled.li`
  margin-right: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &:after {
    content: ">";
    margin-left: 5px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:last-child:after {
    content: "";
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const formatLabel = (label) =>
  label
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

function Breadcrumbs() {
  const location = useLocation();
  const { pathname } = location;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const generateBreadcrumbs = async () => {
      // Handle root path '/'
      if (pathname === '/') {
        setBreadcrumbs([{ label: 'Dashboard', path: '/' }]);
        return;
      }

      // Split the pathname into segments, excluding empty strings
      const pathSegments = pathname.split('/').filter(seg => seg);
      // Build an array of paths leading to the current path
      const allPaths = pathSegments.map((_, index) => `/${pathSegments.slice(0, index + 1).join('/')}`);
      // Always include the root path '/'
      allPaths.unshift('/');

      const crumbs = [];
      let hasMatchedNonWildcard = false; // Flag to track if any non-wildcard route has been matched

      for (let to of allPaths) {
        const matchedRoute = routes.find(route => matchPath({ path: route.path, end: true }, to));

        if (matchedRoute) {
          if (matchedRoute.path !== '*') {
            hasMatchedNonWildcard = true;
          }

          if (matchedRoute.path === '*') {
            if (!hasMatchedNonWildcard) { // Only set 'Not Found' if no other route has matched
              crumbs.push({ label: matchedRoute.breadcrumb, path: null });
            }
            continue; // Skip adding wildcard route to breadcrumbs unless it's a genuine 'Not Found' case
          }

          let label = matchedRoute.breadcrumb;
          if (typeof matchedRoute.breadcrumb === 'function') {
            const match = matchPath({ path: matchedRoute.path, end: true }, to);
            const params = match ? match.params : {};
            try {
              label = await matchedRoute.breadcrumb(params);
            } catch (error) {
              console.error(`Error fetching breadcrumb for path "${to}":`, error);
              label = formatLabel(to.split('/').pop());
            }
          }

          crumbs.push({ label, path: to });
        } else {
          // No matched route; consider it as 'Not Found' only if it's not the root path
          if (to !== '/') {
            crumbs.push({ label: formatLabel(to.split('/').pop()), path: to });
            // If no routes match and it's not the root, consider 'Not Found'
            crumbs.push({ label: 'Not Found', path: null });
          }
        }
      }

      setBreadcrumbs(crumbs);
    };

    generateBreadcrumbs();
  }, [pathname]);

  const getVisibleBreadcrumbs = () => {
    const maxVisible = 4; 
    if (breadcrumbs.length <= maxVisible) {
      return breadcrumbs;
    } else {
      const first = breadcrumbs[0];
      const last = breadcrumbs[breadcrumbs.length - 1];
      return [first, { label: '...', path: null }, last];
    }
  };

  const visibleBreadcrumbs = getVisibleBreadcrumbs();

  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      <BreadcrumbList>
        {visibleBreadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={index} aria-current={index === visibleBreadcrumbs.length -1 ? 'page' : undefined}>
            {crumb.path ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              <span>{crumb.label}</span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
}

export default Breadcrumbs;
