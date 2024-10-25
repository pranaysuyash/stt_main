// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, matchPath } from 'react-router-dom';
// import styled from 'styled-components';
// import routes from '../../routes';

// const BreadcrumbContainer = styled.nav`
//   padding: 10px 20px;
//   background-color: ${({ theme }) => theme.colors.background};
//   font-size: 0.9em;
//   overflow: hidden;
//   z-index: 1101;

//   @media (max-width: 768px) {
//     margin-top: 40px;
//     padding: 10px 20px;
//     font-size: 0.8em;
//   }
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
//   const [breadcrumbs, setBreadcrumbs] = useState([]);

//   useEffect(() => {
//     const generateBreadcrumbs = () => {
//       console.log('Generating breadcrumbs for path:', location.pathname);
//       const pathnames = location.pathname.split('/').filter((x) => x);
//       console.log('Path segments:', pathnames);

//       const crumbs = [];

//       // Always add Home
//       crumbs.push({ label: 'Home', path: '/home' });

//       if (pathnames.length > 0) {
//         let currentPath = '';
//         pathnames.forEach((segment, index) => {
//           currentPath += `/${segment}`;
//           console.log('Current path segment:', currentPath);

//           if (segment !== 'app') {
//             const appRoute = routes.find(route => route.path === '/app');
//             if (appRoute && appRoute.children) {
//               const childRoute = appRoute.children.find(child => child.path === segment);
//               if (childRoute) {
//                 crumbs.push({ label: childRoute.breadcrumb, path: currentPath });
//               } else {
//                 crumbs.push({ label: formatLabel(segment), path: currentPath });
//               }
//             } else {
//               crumbs.push({ label: formatLabel(segment), path: currentPath });
//             }
//           }
//         });
//       }

//       console.log('Generated breadcrumbs:', crumbs);
//       setBreadcrumbs(crumbs);
//     };

//     generateBreadcrumbs();
//   }, [location]);

//   console.log('Rendering breadcrumbs:', breadcrumbs);

//   return (
//     <BreadcrumbContainer aria-label="breadcrumb">
//       <BreadcrumbList>
//         {breadcrumbs.map((crumb, index) => (
//           <BreadcrumbItem key={index} aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}>
//             {crumb.path ? (
//               <Link to={crumb.path}>{crumb.label}</Link>
//             ) : (
//               <span>{crumb.label}</span>
//             )}
//           </BreadcrumbItem>
//         ))}
//       </BreadcrumbList>
//     </BreadcrumbContainer>
//   );
// }

// export default Breadcrumbs;
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import routes from "../../routes";

// const BreadcrumbContainer = styled.div`
//   padding: 16px 24px;
//   background-color: ${({ theme }) => theme.colors?.background || "#f8f9fa"};
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const BreadcrumbLink = styled(Link)`
//   color: ${({ theme }) => theme.colors?.primary || "#6c757d"};
//   text-decoration: none;
//   font-size: 14px;
//   display: flex;
//   align-items: center;

//   &:hover {
//     color: ${({ theme }) => theme.colors?.primaryHover || "#0d6efd"};
//     text-decoration: none;
//   }
// `;

// const BreadcrumbText = styled.span`
//   color: ${({ theme }) => theme.colors?.text || "#212529"};
//   font-size: 14px;
//   font-weight: 500;
// `;

// const Separator = styled.span`
//   color: ${({ theme }) => theme.colors?.separator || "#6c757d"};
//   font-size: 12px;
//   margin: 0 4px;
//   display: flex;
//   align-items: center;
// `;

// const formatLabel = (label) =>
//   label.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// function Breadcrumbs() {
//   const location = useLocation();
//   const [breadcrumbs, setBreadcrumbs] = useState([]);

//   useEffect(() => {
//     const generateBreadcrumbs = () => {
//       const pathnames = location.pathname.split("/").filter((x) => x);

//       const crumbs = [];

//       // Always add Home
//       crumbs.push({ label: "Home", path: "/app/dashboard" });

//       if (pathnames.length > 0) {
//         let currentPath = "";
//         pathnames.forEach((segment) => {
//           if (segment !== "app") {
//             currentPath += `/${segment}`;

//             const appRoute = routes.find((route) => route.path === "/app");
//             if (appRoute?.children) {
//               const childRoute = appRoute.children.find(
//                 (child) => child.path === segment
//               );
//               if (childRoute) {
//                 crumbs.push({
//                   label: childRoute.breadcrumb || formatLabel(segment),
//                   path: `/app${currentPath}`,
//                 });
//               } else {
//                 crumbs.push({
//                   label: formatLabel(segment),
//                   path: `/app${currentPath}`,
//                 });
//               }
//             }
//           }
//         });
//       }

//       setBreadcrumbs(crumbs);
//     };

//     generateBreadcrumbs();
//   }, [location]);

//   return (
//     <BreadcrumbContainer>
//       {breadcrumbs.map((crumb, index) => {
//         const isLast = index === breadcrumbs.length - 1;
//         // Use combination of index and path for unique key
//         const key = `${index}-${crumb.path}`;

//         return (
//           <React.Fragment key={key}>
//             {isLast ? (
//               <BreadcrumbText>{crumb.label}</BreadcrumbText>
//             ) : (
//               <>
//                 <BreadcrumbLink to={crumb.path}>{crumb.label}</BreadcrumbLink>
//                 <Separator>
//                   <FontAwesomeIcon icon={faChevronRight} size="xs" />
//                 </Separator>
//               </>
//             )}
//           </React.Fragment>
//         );
//       })}
//     </BreadcrumbContainer>
//   );
// }

// export default Breadcrumbs;
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Box,
  Icon,
  Text,
} from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import routes from "../../routes";

const formatLabel = (label) =>
  label.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

function Breadcrumbs() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Color modes
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const activeColor = useColorModeValue("gray.900", "white");
  const hoverColor = useColorModeValue("gray.800", "white");
  const separatorColor = useColorModeValue("gray.400", "gray.600");

  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathnames = location.pathname.split("/").filter((x) => x);
      const crumbs = [];

      // Always add Home
      crumbs.push({ label: "Home", path: "/app/dashboard" });

      if (pathnames.length > 0) {
        let currentPath = "";
        pathnames.forEach((segment) => {
          if (segment !== "app") {
            currentPath += `/${segment}`;

            const appRoute = routes.find((route) => route.path === "/app");
            if (appRoute?.children) {
              const childRoute = appRoute.children.find(
                (child) => child.path === segment
              );
              if (childRoute) {
                crumbs.push({
                  label: childRoute.breadcrumb || formatLabel(segment),
                  path: `/app${currentPath}`,
                });
              } else {
                crumbs.push({
                  label: formatLabel(segment),
                  path: `/app${currentPath}`,
                });
              }
            }
          }
        });
      }

      setBreadcrumbs(crumbs);
    };

    generateBreadcrumbs();
  }, [location]);

  return (
    <Box
      py={4}
      px={6}
      bg={bgColor}
      borderBottom="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      transition="all 0.2s"
    >
      <Breadcrumb
        spacing="8px"
        separator={
          <Icon as={ChevronRight} color={separatorColor} boxSize={4} mt="1px" />
        }
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <BreadcrumbItem
              key={`${index}-${crumb.path}`}
              isCurrentPage={isLast}
            >
              {isLast ? (
                <Text fontWeight="medium" color={activeColor} fontSize="sm">
                  {crumb.label}
                </Text>
              ) : (
                <BreadcrumbLink
                  as={Link}
                  to={crumb.path}
                  color={textColor}
                  _hover={{
                    color: hoverColor,
                    textDecoration: "none",
                  }}
                  fontSize="sm"
                  fontWeight="normal"
                  transition="color 0.2s"
                >
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
}

export default Breadcrumbs;
