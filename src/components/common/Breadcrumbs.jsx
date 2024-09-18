// src/components/common/Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// Styled Components
const BreadcrumbContainer = styled.nav`
  padding: 10px 20px;
  background-color: #ecf0f1;
  font-size: 0.9em;
`;

const BreadcrumbList = styled.ol`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  margin-right: 5px;

  &:after {
    content: ">";
    margin-left: 5px;
  }

  &:last-child:after {
    content: "";
  }

  a {
    text-decoration: none;
    color: #3498db;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Component
function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/dashboard">Dashboard</Link>
        </BreadcrumbItem>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <BreadcrumbItem key={to}>
              {isLast ? <span>{label}</span> : <Link to={to}>{label}</Link>}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
}

Breadcrumbs.propTypes = {
  
};

export default Breadcrumbs;
