// // src/components/common/SideNav.jsx
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
//   width: ${({ collapsed }) => (collapsed ? "60px" : "240px")};
  
//   background-color: #2c3e50;
//   color: #ecf0f1;
//   transition: width 0.3s ease-in-out;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   z-index: 1000;

//   @media (max-width: 768px) {
//     transform: ${({ isMobileOpen }) =>
//       isMobileOpen ? "translateX(0)" : "translateX(-100%)"};
//     width: ${({ collapsed }) => (collapsed ? "60px" : "200px")}; /* Adjust width for mobile */
//     transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
//   }
// `;

// const Logo = styled.div`
//   padding: ${({ collapsed }) => (collapsed ? "10px 0" : "20px 5px")};
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
//     margin-right: ${({ collapsed }) => (collapsed ? "0" : "10px")};
//     font-size: 1.2em;
//   }

//   span {
//     display: ${({ collapsed }) => (collapsed ? "none" : "inline")};
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
//     margin-right: ${({ collapsed }) => (collapsed ? "0" : "10px")};
//     font-size: 1.2em;
//   }

//   span {
//     display: ${({ collapsed }) => (collapsed ? "none" : "inline")};
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
//       collapsed={collapsed}
//       isMobileOpen={isMobileOpen}
//       aria-label="Sidebar Navigation"
//     >
//       <div>
//         <Logo collapsed={collapsed}>{!collapsed ? "WaveAnalyzer" : "WA"}</Logo>
//         <NavItems>
//           <NavItem collapsed={collapsed}>
//             <NavLink
//               to="/app/dashboard"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faHome} />
//               <span>Dashboard</span>
//             </NavLink>
//           </NavItem>
//           <NavItem collapsed={collapsed}>
//             <NavLink
//               to="/app/upload"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faUpload} />
//               <span>Upload</span>
//             </NavLink>
//           </NavItem>
//           <NavItem collapsed={collapsed}>
//             <NavLink
//               to="/app/library"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faFolder} />
//               <span>Library</span>
//             </NavLink>
//           </NavItem>
//           <NavItem collapsed={collapsed}>
//             <NavLink
//               to="/app/analysis"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faSearch} />
//               <span>Analysis</span>
//             </NavLink>
//           </NavItem>
//           <NavItem collapsed={collapsed}>
//             <NavLink
//               to="/app/settings"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <FontAwesomeIcon icon={faCog} />
//               <span>Settings</span>
//             </NavLink>
//           </NavItem>
//           <NavItem collapsed={collapsed}>
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
//         <LogoutButton onClick={handleLogout} collapsed={collapsed}>
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

import React, { useContext } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ $collapsed }) => ($collapsed ? "60px" : "240px")};
  background-color: #2c3e50;
  color: #ecf0f1;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;

  @media (max-width: 768px) {
    transform: ${({ $isMobileOpen }) =>
      $isMobileOpen ? "translateX(0)" : "translateX(-100%)"};
    width: ${({ $collapsed }) => ($collapsed ? "60px" : "200px")};
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }
`;

const Logo = styled.div`
  padding: ${({ $collapsed }) => ($collapsed ? "10px 0" : "20px 5px")};
  font-size: 1.5em;
  text-align: center;
  background-color: #1a252f;
  font-weight: bold;
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
    margin-right: ${({ $collapsed }) => ($collapsed ? "0" : "10px")};
    font-size: 1.2em;
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;

    svg {
      font-size: 1em;
    }
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1a252f;
  }

  &:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  padding: 15px 20px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #4353ff;
  }

  svg {
    margin-right: ${({ $collapsed }) => ($collapsed ? "0" : "10px")};
    font-size: 1.2em;
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;

    svg {
      font-size: 1em;
    }
  }
`;

function SideNav({
  isMobile = false,
  isMobileOpen = false,
  toggleMobile,
  collapsed = false,
  toggleSidebar,
}) {
  const { logout } = useContext(AuthContext);

  const handleToggle = () => {
    if (isMobile) {
      toggleMobile();
    } else {
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar
      $collapsed={collapsed}
      $isMobileOpen={isMobileOpen}
      aria-label="Sidebar Navigation"
    >
      <div>
        <Logo $collapsed={collapsed}>{!collapsed ? "WaveAnalyzer" : "WA"}</Logo>
        <NavItems>
          <NavItem $collapsed={collapsed}>
            <NavLink
              to="/app/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </NavLink>
          </NavItem>
          <NavItem $collapsed={collapsed}>
            <NavLink
              to="/app/upload"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faUpload} />
              <span>Upload</span>
            </NavLink>
          </NavItem>
          <NavItem $collapsed={collapsed}>
            <NavLink
              to="/app/library"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faFolder} />
              <span>Library</span>
            </NavLink>
          </NavItem>
          <NavItem $collapsed={collapsed}>
            <NavLink
              to="/app/analysis"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faSearch} />
              <span>Analysis</span>
            </NavLink>
          </NavItem>
          <NavItem $collapsed={collapsed}>
            <NavLink
              to="/app/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </NavLink>
          </NavItem>
          <NavItem $collapsed={collapsed}>
            <NavLink
              to="/app/help"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span>Help</span>
            </NavLink>
          </NavItem>
        </NavItems>
      </div>
      <div>
        <LogoutButton onClick={handleLogout} $collapsed={collapsed}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </LogoutButton>
        <ToggleButton
          onClick={handleToggle}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
        </ToggleButton>
      </div>
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