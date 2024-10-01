import React, { useEffect, useState } from 'react';
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
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const generateBreadcrumbs = () => {
      console.log('Generating breadcrumbs for path:', location.pathname);
      const pathnames = location.pathname.split('/').filter((x) => x);
      console.log('Path segments:', pathnames);

      const crumbs = [];

      // Always add Home
      crumbs.push({ label: 'Home', path: '/home' });

      if (pathnames.length > 0) {
        let currentPath = '';
        pathnames.forEach((segment, index) => {
          currentPath += `/${segment}`;
          console.log('Current path segment:', currentPath);
          
          if (segment !== 'app') {
            const appRoute = routes.find(route => route.path === '/app');
            if (appRoute && appRoute.children) {
              const childRoute = appRoute.children.find(child => child.path === segment);
              if (childRoute) {
                crumbs.push({ label: childRoute.breadcrumb, path: currentPath });
              } else {
                crumbs.push({ label: formatLabel(segment), path: currentPath });
              }
            } else {
              crumbs.push({ label: formatLabel(segment), path: currentPath });
            }
          }
        });
      }

      console.log('Generated breadcrumbs:', crumbs);
      setBreadcrumbs(crumbs);
    };

    generateBreadcrumbs();
  }, [location]);

  console.log('Rendering breadcrumbs:', breadcrumbs);

  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={index} aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}>
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