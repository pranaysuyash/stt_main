import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes'; 

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

const formatLabel = (label) =>
  label
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

function Breadcrumbs() {
  const location = useLocation();
  const { pathname } = location;
  const [dynamicLabels, setDynamicLabels] = useState({});

  const pathnames = useMemo(() => pathname.split("/").filter((x) => x), [pathname]);

  useEffect(() => {
    const fetchDynamicLabels = async () => {
      const labels = {};
      for (let index = 0; index < pathnames.length; index++) {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const matchedRoute = routes.find((route) => matchPath({ path: route.path, end: true }, to));
        if (matchedRoute && typeof matchedRoute.breadcrumb === 'function') {
          const match = matchPath({ path: matchedRoute.path, end: true }, to);
          const params = match ? match.params : {};
          const label = await matchedRoute.breadcrumb(params);
          labels[to] = label;
        }
      }
      setDynamicLabels(labels);
    };
    fetchDynamicLabels();
  }, [pathnames]);

  const breadcrumbItems = useMemo(() => {
    return pathnames.map((_, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const matchedRoute = routes.find((route) => matchPath({ path: route.path, end: true }, to));
      return {
        label: dynamicLabels[to] || (matchedRoute ? matchedRoute.breadcrumb : formatLabel(pathnames[index])),
        path: to,
      };
    });
  }, [pathnames, dynamicLabels]);

  const getVisibleBreadcrumbs = () => {
    const maxVisible = 4; 
    if (breadcrumbItems.length <= maxVisible) {
      return breadcrumbItems;
    } else {
      const first = breadcrumbItems[0];
      const last = breadcrumbItems[breadcrumbItems.length - 1];
      return [first, { label: '...', path: null }, last];
    }
  };

  const visibleBreadcrumbs = getVisibleBreadcrumbs();

  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        {visibleBreadcrumbs.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
}

export default Breadcrumbs;