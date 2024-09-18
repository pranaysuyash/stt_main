// // src/components/common/Breadcrumbs.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import PropTypes from "prop-types";

// // Styled Components
// const BreadcrumbContainer = styled.nav`
//   padding: 10px 20px;
//   background-color: #ecf0f1;
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
//     color: #3498db;
//     &:hover {
//       text-decoration: underline;
//     }
//   }

//   span {
//     color: ${({ theme }) => theme.colors.text};
//   }
// `;

// // Helper Function to Format Labels
// const formatLabel = (label) =>
//   label
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (char) => char.toUpperCase());

// // Component
// function Breadcrumbs() {
//   const location = useLocation();
//   const pathnames = location.pathname.split("/").filter((x) => x);

//   // Function to determine visible breadcrumbs with ellipsis for long paths
//   const getVisibleBreadcrumbs = () => {
//     const maxVisible = 3; // Maximum number of breadcrumbs to display
//     if (pathnames.length <= maxVisible) {
//       return pathnames;
//     } else {
//       // Always show the first and last breadcrumb, and replace the middle with ellipsis
//       return [
//         pathnames[0],
//         "...",
//         pathnames[pathnames.length - 1],
//       ];
//     }
//   };

//   const visibleBreadcrumbs = getVisibleBreadcrumbs();

//   return (
//     <BreadcrumbContainer aria-label="breadcrumb">
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <Link to="/">Home</Link>
//         </BreadcrumbItem>
//         {visibleBreadcrumbs.map((value, index) => {
//           const isEllipsis = value === "...";
//           const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//           const isLast = index === visibleBreadcrumbs.length - 1;

//           return (
//             <BreadcrumbItem key={to}>
//               {isEllipsis ? (
//                 <span>...</span>
//               ) : isLast ? (
//                 <span>{formatLabel(value)}</span>
//               ) : (
//                 <Link to={to}>{formatLabel(value)}</Link>
//               )}
//             </BreadcrumbItem>
//           );
//         })}
//       </BreadcrumbList>
//     </BreadcrumbContainer>
//   );
// }

// Breadcrumbs.propTypes = {};

// export default Breadcrumbs;

// src/components/common/Breadcrumbs.jsx


// src/components/common/Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// Styled Components
const BreadcrumbContainer = styled.nav`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 0.9em;
  overflow: hidden;
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

// Helper Function to Format Labels
const formatLabel = (label) =>
  label
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

// Component
function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Function to determine visible breadcrumbs with ellipsis for long paths
  const getVisibleBreadcrumbs = () => {
    const maxVisible = 4; // Maximum number of breadcrumbs to display
    if (pathnames.length <= maxVisible) {
      return pathnames;
    } else {
      // Show first two, ellipsis, and last two
      return [
        pathnames[0],
        pathnames[1],
        "...",
        pathnames[pathnames.length - 2],
        pathnames[pathnames.length - 1],
      ];
    }
  };

  const visibleBreadcrumbs = getVisibleBreadcrumbs();

  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        {visibleBreadcrumbs.map((value, index) => {
          const isEllipsis = value === "...";
          let to = "/";
          if (!isEllipsis) {
            to = `/${pathnames.slice(0, index + 1).join("/")}`;
          }
          const isLast = index === visibleBreadcrumbs.length - 1;

          return (
            <BreadcrumbItem key={to}>
              {isEllipsis ? (
                <span>...</span>
              ) : isLast ? (
                <span>{formatLabel(value)}</span>
              ) : (
                <Link to={to}>{formatLabel(value)}</Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
}

Breadcrumbs.propTypes = {};

export default Breadcrumbs;
