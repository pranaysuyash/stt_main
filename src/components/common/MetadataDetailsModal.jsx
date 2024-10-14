// import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import FocusTrap from 'focus-trap-react';

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.7);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 3000;
// `;

// const ModalContent = styled.div`
//   background-color: ${({ theme }) => theme.colors.background};
//   padding: 20px;
//   border-radius: 10px;
//   width: 90%;
//   max-width: 600px;
//   max-height: 90vh;
//   overflow-y: auto;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: transparent;
//   border: none;
//   color: ${({ theme }) => theme.colors.text};
//   font-size: 1.5rem;
//   cursor: pointer;
// `;

// const MetadataTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const MetadataRow = styled.tr`
//   &:nth-child(even) {
//     background-color: ${({ theme }) => theme.colors.backgroundAlt};
//   }
// `;

// const MetadataCell = styled.td`
//   padding: 10px;
//   border: 1px solid ${({ theme }) => theme.colors.border};
// `;

// function MetadataDetailsModal({ metadata, fileName, onClose }) {
//   return (
//     <ModalOverlay onClick={onClose}>
//       <FocusTrap>
//         <ModalContent onClick={(e) => e.stopPropagation()}>
//           <h2>Metadata for {fileName}</h2>
//           <CloseButton onClick={onClose} aria-label="Close metadata details">
//             <FontAwesomeIcon icon={faTimes} />
//           </CloseButton>
//           <MetadataTable>
//             <thead>
//               <tr>
//                 <MetadataCell as="th">Property</MetadataCell>
//                 <MetadataCell as="th">Value</MetadataCell>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(metadata).map(([key, value]) => (
//                 <MetadataRow key={key}>
//                   <MetadataCell>{key}</MetadataCell>
//                   <MetadataCell>{JSON.stringify(value)}</MetadataCell>
//                 </MetadataRow>
//               ))}
//             </tbody>
//           </MetadataTable>
//         </ModalContent>
//       </FocusTrap>
//     </ModalOverlay>
//   );
// }

// MetadataDetailsModal.propTypes = {
//   metadata: PropTypes.object.isRequired,
//   fileName: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default MetadataDetailsModal;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FocusTrap from 'focus-trap-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

const MetadataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const MetadataRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const MetadataCell = styled.td`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

function MetadataDetailsModal({ metadata, fileName, onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <FocusTrap>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2>Metadata for {fileName}</h2>
          <CloseButton onClick={onClose} aria-label="Close metadata details">
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          <MetadataTable>
            <thead>
              <tr>
                <MetadataCell as="th">Property</MetadataCell>
                <MetadataCell as="th">Value</MetadataCell>
              </tr>
            </thead>
            <tbody>
              {Object.entries(metadata).map(([key, value]) => (
                <MetadataRow key={key}>
                  <MetadataCell>{key}</MetadataCell>
                  <MetadataCell>{JSON.stringify(value)}</MetadataCell>
                </MetadataRow>
              ))}
            </tbody>
          </MetadataTable>
        </ModalContent>
      </FocusTrap>
    </ModalOverlay>
  );
}

MetadataDetailsModal.propTypes = {
  metadata: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MetadataDetailsModal;