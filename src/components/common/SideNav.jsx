// src/components/common/SideNav.jsx
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUpload,
  faFolder,
  faSearch,
  faCog,
  faQuestionCircle,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Sidebar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ collapsed }) => (collapsed ? "60px" : "240px")};
  background-color: #2c3e50;
  color: #ecf0f1;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
  @media (max-width: 768px) {
    transform: ${({ isMobileOpen }) =>
      isMobileOpen ? "translateX(0)" : "translateX(-100%)"};
    width: 200px;
    transition: transform 0.3s ease-in-out;
  }
`;

const Logo = styled.div`
  padding: 20px;
  font-size: 1.5em;
  text-align: center;
  background-color: #1a252f;
`;

const NavItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &.active,
  &:hover {
    background-color: #4353ff;
  }
  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    width: 100%;
  }
  svg {
    margin-right: ${({ collapsed }) => (collapsed ? "0" : "10px")};
    font-size: 1.2em;
  }
  span {
    display: ${({ collapsed }) => (collapsed ? "none" : "inline")};
    white-space: nowrap;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  padding: 15px;
  cursor: pointer;
  font-size: 1.2em;
  outline: none;
  &:hover {
    background-color: #1a252f;
  }
`;

function SideNav({
  isMobile = false,
  isMobileOpen = false,
  toggleMobile,
  collapsed = false,
  toggleSidebar,
}) {
  const handleToggle = () => {
    if (isMobile) {
      toggleMobile();
    } else {
      toggleSidebar();
    }
  };

  return (
    <Sidebar
      collapsed={collapsed}
      isMobileOpen={isMobileOpen}
      aria-label="Sidebar Navigation"
    >
      <div>
        <Logo>{!collapsed ? "WaveAnalyzer" : "WA"}</Logo>
        <NavItems>
          <NavItem collapsed={collapsed}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </NavLink>
          </NavItem>
          <NavItem collapsed={collapsed}>
            <NavLink
              to="/upload"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faUpload} />
              <span>Upload</span>
            </NavLink>
          </NavItem>
          <NavItem collapsed={collapsed}>
            <NavLink
              to="/library"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faFolder} />
              <span>Library</span>
            </NavLink>
          </NavItem>
          <NavItem collapsed={collapsed}>
            <NavLink
              to="/analysis"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faSearch} />
              <span>Analysis</span>
            </NavLink>
          </NavItem>
          <NavItem collapsed={collapsed}>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </NavLink>
          </NavItem>
          <NavItem collapsed={collapsed}>
            <NavLink
              to="/help"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span>Help</span>
            </NavLink>
          </NavItem>
        </NavItems>
      </div>
      <ToggleButton
        onClick={handleToggle}
        aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
      </ToggleButton>
    </Sidebar>
  );
}

SideNav.propTypes = {
  isMobile: PropTypes.bool,
  isMobileOpen: PropTypes.bool,
  toggleMobile: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

export default SideNav;
