// // src/components/common/Tooltip.jsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// // Transient Prop: $text
// const TooltipContent = styled.div`
//   position: absolute;
//   bottom: 125%; /* Position above the text */
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: ${({ theme }) => theme.colors.background || '#000'};
//   color: ${({ theme }) => theme.colors.text || '#fff'};
//   padding: 5px 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   white-space: nowrap;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//   z-index: 1001; /* Ensure it appears above other elements */
//   opacity: 0.9;
//   pointer-events: none;
//   transition: opacity 0.3s;
// `;

// const TooltipArrow = styled.div`
//   position: absolute;
//   bottom: 115%;
//   left: 50%;
//   transform: translateX(-50%);
//   border-width: 5px;
//   border-style: solid;
//   border-color: ${({ theme }) => theme.colors.background || '#000'} transparent transparent transparent;
//   opacity: 0.9;
//   pointer-events: none;
//   z-index: 1001;
// `;

// const TooltipWrapper = styled.div`
//   position: relative;
//   display: inline-block;

//   &:hover .tooltip-content {
//     opacity: 1;
//     visibility: visible;
//   }

//   &:hover .tooltip-arrow {
//     opacity: 1;
//     visibility: visible;
//   }
// `;

// function Tooltip({ $text, children }) {
//   const tooltip = (
//     <>
//       <TooltipContent className="tooltip-content">
//         {$text}
//       </TooltipContent>
//       <TooltipArrow className="tooltip-arrow" />
//     </>
//   );

//   return (
//     <TooltipWrapper>
//       {children}
//       {ReactDOM.createPortal(
//         tooltip,
//         document.body
//       )}
//     </TooltipWrapper>
//   );
// }

// Tooltip.propTypes = {
//   $text: PropTypes.string.isRequired, // Updated to $text
//   children: PropTypes.node.isRequired,
// };

// export default Tooltip;

// src/components/common/Tooltip.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Transient Prop: $text
const TooltipContent = styled.div`
  position: absolute;
  bottom: 125%; /* Position above the text */
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.background || '#000'};
  color: ${({ theme }) => theme.colors.text || '#fff'};
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001; /* Ensure it appears above other elements */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;
`;

const TooltipArrow = styled.div`
  position: absolute;
  bottom: 115%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.background || '#000'} transparent transparent transparent;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 1001;
  transition: opacity 0.3s, visibility 0.3s;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${TooltipContent}, &:hover ${TooltipArrow} {
    opacity: 1;
    visibility: visible;
  }
`;

function Tooltip({ $text, children }) {
  return (
    <TooltipWrapper>
      {children}
      <TooltipContent className="tooltip-content">
        {$text}
      </TooltipContent>
      <TooltipArrow className="tooltip-arrow" />
    </TooltipWrapper>
  );
}

Tooltip.propTypes = {
  $text: PropTypes.string.isRequired, // Tooltip text
  children: PropTypes.node.isRequired, // Element that triggers the tooltip
};

export default Tooltip;
