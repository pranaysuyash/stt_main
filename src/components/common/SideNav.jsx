// // // src/components/common/SideNav.jsx

// import React, { useContext } from "react";
// import styled from "styled-components";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faUpload,
//   faFolder,
//   faSearch,
//   faCog,
//   faQuestionCircle,
//   faArrowLeft,
//   faArrowRight,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import PropTypes from "prop-types";
// import { AuthContext } from "../../context/AuthContext";

// const Sidebar = styled.nav`
//   position: fixed;
//   left: 0;
//   top: 0;
//   height: 100vh;
//   width: ${({ $collapsed }) => ($collapsed ? "60px" : "240px")};
//   background-color: #2c3e50;
//   color: #ecf0f1;
//   transition: width 0.3s ease-in-out;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   z-index: 1000;

//   @media (max-width: 768px) {
//     transform: ${({ $isMobileOpen }) =>
//       $isMobileOpen ? "translateX(0)" : "translateX(-100%)"};
//     width: ${({ $collapsed }) => ($collapsed ? "60px" : "200px")};
//     transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
//   }
// `;

// const Logo = styled.div`
//   padding: ${({ $collapsed }) => ($collapsed ? "10px 0" : "20px 5px")};
//   font-size: 1.5em;
//   text-align: center;
//   background-color: #1a252f;
//   font-weight: bold;
// `;

// const NavItems = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;

// const NavItem = styled.li`
//   padding: 15px 20px;
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   &.active,
//   &:hover {
//     background-color: #4353ff;
//   }

//   a {
//     text-decoration: none;
//     color: inherit;
//     display: flex;
//     align-items: center;
//     width: 100%;
//   }

//   svg {
//     margin-right: ${({ $collapsed }) => ($collapsed ? "0" : "10px")};
//     font-size: 1.2em;
//   }

//   span {
//     display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
//     white-space: nowrap;
//   }

//   @media (max-width: 768px) {
//     padding: 10px 15px;

//     svg {
//       font-size: 1em;
//     }
//   }
// `;

// const ToggleButton = styled.button`
//   background: none;
//   border: none;
//   color: inherit;
//   padding: 15px;
//   cursor: pointer;
//   font-size: 1.2em;
//   outline: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background-color: #1a252f;
//   }

//   &:focus {
//     outline: 2px solid #3498db;
//     outline-offset: 2px;
//   }
// `;

// const LogoutButton = styled.button`
//   background: none;
//   border: none;
//   color: inherit;
//   padding: 15px 20px;
//   cursor: pointer;
//   text-align: left;
//   width: 100%;
//   display: flex;
//   align-items: center;

//   &:hover {
//     background-color: #4353ff;
//   }

//   svg {
//     margin-right: ${({ $collapsed }) => ($collapsed ? "0" : "10px")};
//     font-size: 1.2em;
//   }

//   span {
//     display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
//     white-space: nowrap;
//   }

//   @media (max-width: 768px) {
//     padding: 10px 15px;

//     svg {
//       font-size: 1em;
//     }
//   }
// `;

// function SideNav({
//   isMobile = false,
//   isMobileOpen = false,
//   toggleMobile,
//   collapsed = false,
//   toggleSidebar,
// }) {
//   const { logout } = useContext(AuthContext);

//   const handleToggle = () => {
//     if (isMobile) {
//       toggleMobile();
//     } else {
//       toggleSidebar();
//     }
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <Sidebar
//       $collapsed={collapsed}
//       $isMobileOpen={isMobileOpen}
//       aria-label="Sidebar Navigation"
//     >
//       <div>
//         <Logo $collapsed={collapsed}>{!collapsed ? "WaveAnalyzer" : "WA"}</Logo>
//         <NavItems>
//           <NavItem $collapsed={collapsed}>
//             <NavLink
//               to="/app/dashboard"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faHome} />
//               <span>Dashboard</span>
//             </NavLink>
//           </NavItem>
//           <NavItem $collapsed={collapsed}>
//             <NavLink
//               to="/app/upload"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faUpload} />
//               <span>Upload</span>
//             </NavLink>
//           </NavItem>
//           <NavItem $collapsed={collapsed}>
//             <NavLink
//               to="/app/library"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faFolder} />
//               <span>Library</span>
//             </NavLink>
//           </NavItem>
//           <NavItem $collapsed={collapsed}>
//             <NavLink
//               to="/app/analysis"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faSearch} />
//               <span>Analysis</span>
//             </NavLink>
//           </NavItem>
//           <NavItem $collapsed={collapsed}>
//             <NavLink
//               to="/app/settings"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faCog} />
//               <span>Settings</span>
//             </NavLink>
//           </NavItem>
//           <NavItem $collapsed={collapsed}>
//             <NavLink
//               to="/app/help"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faQuestionCircle} />
//               <span>Help</span>
//             </NavLink>
//           </NavItem>
//         </NavItems>
//       </div>
//       <div>
//         <LogoutButton onClick={handleLogout} $collapsed={collapsed}>
//           <FontAwesomeIcon icon={faSignOutAlt} />
//           <span>Logout</span>
//         </LogoutButton>
//         <ToggleButton
//           onClick={handleToggle}
//           aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
//         >
//           <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
//         </ToggleButton>
//       </div>
//     </Sidebar>
//   );
// }

// SideNav.propTypes = {
//   isMobile: PropTypes.bool,
//   isMobileOpen: PropTypes.bool,
//   toggleMobile: PropTypes.func.isRequired,
//   collapsed: PropTypes.bool,
//   toggleSidebar: PropTypes.func.isRequired,
// };

// export default SideNav;
// src/components/common/SideNav.jsx
// src/components/common/SideNav.jsx
import { useContext } from "react";
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
  faSignOutAlt,
  faChartBar,
  faHistory,
  faStar,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${(props) => (props.collapsed ? "60px" : "240px")};
  background-color: #1e293b;
  color: #f8fafc;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    transform: ${(props) =>
      props.isMobileOpen ? "translateX(0)" : "translateX(-100%)"};
    width: 240px;
  }
`;

const Logo = styled.div`
  padding: ${(props) => (props.collapsed ? "16px 0" : "16px")};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.collapsed ? "center" : "flex-start")};
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 12px;

  img {
    width: 32px;
    height: 32px;
  }

  span {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const NavSection = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: ${(props) => props.flex || "none"};

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NavItem = styled.div`
  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background-color: #3b82f6;
      color: white;
    }
  }

  .nav-text {
    display: ${(props) => (props.collapsed ? "none" : "inline")};
  }

  .nav-icon {
    width: 20px;
    text-align: center;
    font-size: 1.1em;
  }

  .nav-badge {
    margin-left: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    background-color: #ef4444;
    color: white;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BottomSection = styled.div`
  padding: 8px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .button-text {
    display: ${(props) => (props.collapsed ? "none" : "inline")};
  }
`;

function SideNav({
  isMobile = false,
  isMobileOpen = false,
  toggleMobile = () => {},
  collapsed = false,
  toggleSidebar = () => {},
  uploadProgress = [],
}) {
  const { logout } = useContext(AuthContext);

  const navigationItems = [
    { icon: faHome, text: "Dashboard", path: "/app/dashboard" },
    {
      icon: faUpload,
      text: "Upload",
      path: "/app/upload",
      badge: uploadProgress.length,
    },
    { icon: faFolder, text: "Library", path: "/app/library" },
    { icon: faSearch, text: "Search", path: "/app/search" },
    { icon: faChartBar, text: "Analysis", path: "/app/analysis" },
    { icon: faStar, text: "Favorites", path: "/app/favorites" },
    { icon: faHistory, text: "Recent", path: "/app/recent" },
  ];

  const bottomItems = [
    {
      icon: faBell,
      text: "Notifications",
      path: "/app/notifications",
      badge: 3,
    },
    { icon: faCog, text: "Settings", path: "/app/settings" },
    { icon: faQuestionCircle, text: "Help", path: "/app/help" },
  ];

  const renderNavigationItems = (items) =>
    items.map((item) => (
      <NavItem key={item.path} collapsed={collapsed}>
        <NavLink
          to={item.path}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FontAwesomeIcon icon={item.icon} className="nav-icon" />
          <span className="nav-text">{item.text}</span>
          {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
        </NavLink>
      </NavItem>
    ));

  const sidebarContent = (
    <>
      <div>
        <Logo collapsed={collapsed}>
          {!collapsed && <span>WaveAnalyzer</span>}
        </Logo>

        <NavSection flex="1">
          {renderNavigationItems(navigationItems)}
        </NavSection>

        <NavSection>{renderNavigationItems(bottomItems)}</NavSection>
      </div>

      <BottomSection>
        <ActionButton onClick={toggleSidebar} collapsed={collapsed}>
          <FontAwesomeIcon
            icon={collapsed ? faArrowRight : faArrowLeft}
            className="nav-icon"
          />
          <span className="button-text">
            {collapsed ? "Expand" : "Collapse"}
          </span>
        </ActionButton>

        <ActionButton onClick={logout} collapsed={collapsed}>
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
          <span className="button-text">Logout</span>
        </ActionButton>
      </BottomSection>
    </>
  );

  return (
    <Sidebar collapsed={collapsed} isMobileOpen={isMobileOpen}>
      {sidebarContent}
    </Sidebar>
  );
}

SideNav.propTypes = {
  isMobile: PropTypes.bool,
  isMobileOpen: PropTypes.bool,
  toggleMobile: PropTypes.func,
  collapsed: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  uploadProgress: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
    })
  ),
};

export default SideNav;
