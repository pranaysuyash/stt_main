// // // // src/components/common/ImageViewer.jsx
 
// // // import React, { useEffect, useRef } from 'react';
// // // import styled from 'styled-components';
// // // import PropTypes from 'prop-types';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faTimes, faSearchPlus, faSearchMinus, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
// // // import FocusTrap from 'focus-trap-react';
 
// // // const ModalOverlay = styled.div`
// // //   position: fixed;
// // //   top: 0;
// // //   left: 0;
// // //   width: 100%;
// // //   height: 100%;
// // //   background-color: rgba(0, 0, 0, 0.8);
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   z-index: 2000;
// // // `;
 
// // // const ModalContent = styled.div`
// // //   position: relative;
// // //   background-color: ${({ theme }) => theme.colors.background};
// // //   padding: 20px;
// // //   border-radius: 10px;
// // //   max-width: 90%;
// // //   max-height: 90%;
// // //   overflow: auto;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // // `;
 
// // // const CloseButton = styled.button`
// // //   position: absolute;
// // //   top: 10px;
// // //   right: 10px;
// // //   background: transparent;
// // //   border: none;
// // //   color: white;
// // //   font-size: 1.5rem;
// // //   cursor: pointer;
 
// // //   &:hover {
// // //     color: #ccc;
// // //   }
 
// // //   &:focus {
// // //     outline: 2px solid #3498db;
// // //     outline-offset: 2px;
// // //   }
// // // `;
 
// // // const ZoomControls = styled.div`
// // //   display: flex;
// // //   justify-content: center;
// // //   gap: 10px;
// // //   margin-top: 10px;
 
// // //   button {
// // //     background: none;
// // //     border: none;
// // //     color: white;
// // //     font-size: 1.2rem;
// // //     cursor: pointer;
// // //     transition: color 0.2s ease;
 
// // //     &:hover {
// // //       color: #3498db;
// // //     }
 
// // //     &:focus {
// // //       outline: 2px solid #3498db;
// // //       outline-offset: 2px;
// // //     }
// // //   }
// // // `;
 
// // // const NavigationControls = styled.div`
// // //   position: absolute;
// // //   top: 50%;
// // //   left: 10px;
// // //   transform: translateY(-50%);
// // //   display: flex;
// // //   flex-direction: column;
// // //   gap: 10px;
 
// // //   button {
// // //     background: rgba(0, 0, 0, 0.5);
// // //     border: none;
// // //     color: white;
// // //     padding: 10px;
// // //     border-radius: 50%;
// // //     cursor: pointer;
// // //     transition: background 0.2s ease;
 
// // //     &:hover {
// // //       background: rgba(0, 0, 0, 0.7);
// // //     }
 
// // //     &:focus {
// // //       outline: 2px solid #3498db;
// // //       outline-offset: 2px;
// // //     }
// // //   }
// // // `;
 
// // // const ImageStyled = styled.img`
// // //   max-width: 100%;
// // //   max-height: 80vh;
// // //   transform: scale(${({ zoom }) => zoom});
// // //   transition: transform 0.3s ease;
// // // `;
 
// // // function ImageViewer({ fileUrl, fileName, onClose, goToNext, goToPrevious }) {
// // //   const [zoom, setZoom] = React.useState(1);
// // //   const imageRef = useRef(null);
 
// // //   const zoomIn = () => {
// // //     setZoom((prevZoom) => Math.min(prevZoom + 0.2, 3));
// // //   };
 
// // //   const zoomOut = () => {
// // //     setZoom((prevZoom) => Math.max(prevZoom - 0.2, 1));
// // //   };
 
// // //   useEffect(() => {
// // //     const handleKeyDown = (e) => {
// // //       if (e.key === 'Escape') {
// // //         onClose();
// // //       }
// // //       if (e.key === '+') {
// // //         zoomIn();
// // //       }
// // //       if (e.key === '-') {
// // //         zoomOut();
// // //       }
// // //       if (e.key === 'ArrowRight') {
// // //         goToNext();
// // //       }
// // //       if (e.key === 'ArrowLeft') {
// // //         goToPrevious();
// // //       }
// // //     };
// // //     window.addEventListener('keydown', handleKeyDown);
// // //     return () => {
// // //       window.removeEventListener('keydown', handleKeyDown);
// // //     };
// // //   }, [onClose, goToNext, goToPrevious]);
 
// // //   return (
// // //     <ModalOverlay onClick={onClose} aria-modal="true" role="dialog">
// // //       <FocusTrap>
// // //         <ModalContent onClick={(e) => e.stopPropagation()}>
// // //           <CloseButton onClick={onClose} aria-label="Close Image Viewer">
// // //             <FontAwesomeIcon icon="times" />
// // //           </CloseButton>
// // //           <h3>{fileName}</h3>
// // //           <ImageStyled src={fileUrl} alt={fileName} zoom={zoom} ref={imageRef} />
// // //           <ZoomControls>
// // //             <button onClick={zoomIn} aria-label="Zoom In">
// // //               <FontAwesomeIcon icon="search-plus" />
// // //             </button>
// // //             <button onClick={zoomOut} aria-label="Zoom Out">
// // //               <FontAwesomeIcon icon="search-minus" />
// // //             </button>
// // //           </ZoomControls>
// // //           <NavigationControls>
// // //             <button onClick={goToPrevious} aria-label="Previous Image">
// // //               <FontAwesomeIcon icon="backward" />
// // //             </button>
// // //             <button onClick={goToNext} aria-label="Next Image">
// // //               <FontAwesomeIcon icon="forward" />
// // //             </button>
// // //           </NavigationControls>
// // //         </ModalContent>
// // //       </FocusTrap>
// // //     </ModalOverlay>
// // //   );
// // // }
 
// // // ImageViewer.propTypes = {
// // //   fileUrl: PropTypes.string.isRequired,
// // //   fileName: PropTypes.string.isRequired,
// // //   onClose: PropTypes.func.isRequired,
// // //   goToNext: PropTypes.func.isRequired,
// // //   goToPrevious: PropTypes.func.isRequired,
// // // };
 
// // // export default ImageViewer;


// // import React, { useState, useEffect, useCallback } from 'react';
// // import styled from 'styled-components';
// // import PropTypes from 'prop-types';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { 
// //   faTimes, 
// //   faSearchPlus, 
// //   faSearchMinus, 
// //   faForward, 
// //   faBackward,
// //   faInfoCircle,
// //   faChevronDown,
// //   faChevronUp
// // } from '@fortawesome/free-solid-svg-icons';

// // const ModalOverlay = styled.div`
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   width: 100%;
// //   height: 100%;
// //   background-color: rgba(0, 0, 0, 0.8);
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   z-index: 2000;
// // `;

// // const ModalContent = styled.div`
// //   position: relative;
// //   background-color: ${({ theme }) => theme.colors.background};
// //   padding: 20px;
// //   border-radius: 10px;
// //   width: 90%;
// //   height: 90%;
// //   max-width: 1200px;
// //   max-height: 800px;
// //   overflow: hidden;
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const CloseButton = styled.button`
// //   position: absolute;
// //   top: 10px;
// //   right: 10px;
// //   background: transparent;
// //   border: none;
// //   color: ${({ theme }) => theme.colors.text};
// //   font-size: 1.5rem;
// //   cursor: pointer;
// //   z-index: 10;

// //   &:hover {
// //     color: ${({ theme }) => theme.colors.primary};
// //   }
// // `;

// // const ImageContainer = styled.div`
// //   flex: 1;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   overflow: hidden;
// // `;

// // const Image = styled.img`
// //   max-width: 100%;
// //   max-height: 100%;
// //   object-fit: contain;
// //   transition: transform 0.3s ease;
// //   transform: scale(${props => props.zoom});
// // `;

// // const Controls = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   gap: 10px;
// //   margin-top: 10px;
// // `;

// // const ControlButton = styled.button`
// //   background: none;
// //   border: none;
// //   color: ${({ theme }) => theme.colors.text};
// //   font-size: 1.2rem;
// //   cursor: pointer;
// //   transition: color 0.2s ease;

// //   &:hover {
// //     color: ${({ theme }) => theme.colors.primary};
// //   }

// //   &:disabled {
// //     color: ${({ theme }) => theme.colors.disabled};
// //     cursor: not-allowed;
// //   }
// // `;

// // const TabContainer = styled.div`
// //   display: flex;
// //   margin-bottom: 10px;
// // `;

// // const Tab = styled.button`
// //   padding: 10px 20px;
// //   background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
// //   color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
// //   border: none;
// //   cursor: pointer;
// //   transition: background-color 0.3s ease;

// //   &:hover {
// //     background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
// //   }
// // `;

// // const MetadataContainer = styled.div`
// //   background-color: ${({ theme }) => theme.colors.background};
// //   padding: 15px;
// //   border-radius: 5px;
// //   margin-top: 10px;
// //   max-height: 200px;
// //   overflow-y: auto;
// // `;

// // const MetadataItem = styled.p`
// //   margin: 5px 0;
// //   font-size: 0.9rem;
// // `;

// // const CollapsibleMetadata = styled.div`
// //   position: absolute;
// //   bottom: ${props => props.isOpen ? '0' : '-180px'};
// //   left: 0;
// //   right: 0;
// //   background-color: ${({ theme }) => theme.colors.background};
// //   transition: bottom 0.3s ease;
// //   padding: 10px;
// //   border-top: 1px solid ${({ theme }) => theme.colors.border};
// // `;

// // const CollapsibleToggle = styled.button`
// //   position: absolute;
// //   top: -30px;
// //   left: 50%;
// //   transform: translateX(-50%);
// //   background-color: ${({ theme }) => theme.colors.background};
// //   border: 1px solid ${({ theme }) => theme.colors.border};
// //   border-bottom: none;
// //   padding: 5px 10px;
// //   cursor: pointer;
// // `;

// // function ImageViewer({ fileUrl, fileName, metadata, onClose, goToNext, goToPrevious }) {
// //   const [zoom, setZoom] = useState(1);
// //   const [activeTab, setActiveTab] = useState('image');
// //   const [isMetadataOpen, setIsMetadataOpen] = useState(false);

// //   const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
// //   const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

// //   const handleKeyDown = useCallback((e) => {
// //     switch (e.key) {
// //       case 'ArrowRight':
// //         goToNext();
// //         break;
// //       case 'ArrowLeft':
// //         goToPrevious();
// //         break;
// //       case '+':
// //         handleZoomIn();
// //         break;
// //       case '-':
// //         handleZoomOut();
// //         break;
// //       case 'Escape':
// //         onClose();
// //         break;
// //       default:
// //         break;
// //     }
// //   }, [goToNext, goToPrevious, onClose]);

// //   useEffect(() => {
// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => window.removeEventListener('keydown', handleKeyDown);
// //   }, [handleKeyDown]);

// //   return (
// //     <ModalOverlay onClick={onClose}>
// //       <ModalContent onClick={(e) => e.stopPropagation()}>
// //         <CloseButton onClick={onClose} aria-label="Close Image Viewer">
// //           <FontAwesomeIcon icon={faTimes} />
// //         </CloseButton>

// //         <TabContainer>
// //           <Tab active={activeTab === 'image'} onClick={() => setActiveTab('image')}>Image</Tab>
// //           <Tab active={activeTab === 'metadata'} onClick={() => setActiveTab('metadata')}>Metadata</Tab>
// //         </TabContainer>

// //         {activeTab === 'image' && (
// //           <>
// //             <ImageContainer>
// //               <Image src={fileUrl} alt={fileName} zoom={zoom} />
// //             </ImageContainer>
// //             <Controls>
// //               <ControlButton onClick={handleZoomOut} aria-label="Zoom Out">
// //                 <FontAwesomeIcon icon={faSearchMinus} />
// //               </ControlButton>
// //               <ControlButton onClick={handleZoomIn} aria-label="Zoom In">
// //                 <FontAwesomeIcon icon={faSearchPlus} />
// //               </ControlButton>
// //               <ControlButton onClick={goToPrevious} aria-label="Previous Image">
// //                 <FontAwesomeIcon icon={faBackward} />
// //               </ControlButton>
// //               <ControlButton onClick={goToNext} aria-label="Next Image">
// //                 <FontAwesomeIcon icon={faForward} />
// //               </ControlButton>
// //             </Controls>
// //             <CollapsibleMetadata isOpen={isMetadataOpen}>
// //               <CollapsibleToggle onClick={() => setIsMetadataOpen(!isMetadataOpen)}>
// //                 <FontAwesomeIcon icon={isMetadataOpen ? faChevronDown : faChevronUp} />
// //                 {isMetadataOpen ? ' Hide Metadata' : ' Show Metadata'}
// //               </CollapsibleToggle>
// //               {isMetadataOpen && (
// //                 <MetadataContainer>
// //                   {Object.entries(metadata).map(([key, value]) => (
// //                     <MetadataItem key={key}>
// //                       <strong>{key}:</strong> {value}
// //                     </MetadataItem>
// //                   ))}
// //                 </MetadataContainer>
// //               )}
// //             </CollapsibleMetadata>
// //           </>
// //         )}

// //         {activeTab === 'metadata' && (
// //           <MetadataContainer>
// //             <h3>{fileName}</h3>
// //             {Object.entries(metadata).map(([key, value]) => (
// //               <MetadataItem key={key}>
// //                 <strong>{key}:</strong> {value}
// //               </MetadataItem>
// //             ))}
// //           </MetadataContainer>
// //         )}
// //       </ModalContent>
// //     </ModalOverlay>
// //   );
// // }

// // ImageViewer.propTypes = {
// //   fileUrl: PropTypes.string.isRequired,
// //   fileName: PropTypes.string.isRequired,
// //   metadata: PropTypes.object,
// //   onClose: PropTypes.func.isRequired,
// //   goToNext: PropTypes.func.isRequired,
// //   goToPrevious: PropTypes.func.isRequired,
// // };

// // export default ImageViewer;

// // import React, { useState, useEffect, useCallback } from 'react';
// // import styled from 'styled-components';
// // import PropTypes from 'prop-types';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { 
// //   faTimes, 
// //   faSearchPlus, 
// //   faSearchMinus, 
// //   faForward, 
// //   faBackward,
// //   faInfoCircle,
// //   faChevronDown,
// //   faChevronUp
// // } from '@fortawesome/free-solid-svg-icons';
// // import Metadata from './Metadata';

// // const ModalOverlay = styled.div`
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   width: 100%;
// //   height: 100%;
// //   background-color: rgba(0, 0, 0, 0.8);
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   z-index: 2000;
// // `;

// // const ModalContent = styled.div`
// //   position: relative;
// //   background-color: ${({ theme }) => theme.colors.background};
// //   padding: 20px;
// //   border-radius: 10px;
// //   width: 90%;
// //   height: 90%;
// //   max-width: 1200px;
// //   max-height: 800px;
// //   overflow: hidden;
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const CloseButton = styled.button`
// //   position: absolute;
// //   top: 10px;
// //   right: 10px;
// //   background: transparent;
// //   border: none;
// //   color: ${({ theme }) => theme.colors.text};
// //   font-size: 1.5rem;
// //   cursor: pointer;
// //   z-index: 10;

// //   &:hover {
// //     color: ${({ theme }) => theme.colors.primary};
// //   }
// // `;

// // const ImageContainer = styled.div`
// //   flex: 1;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   overflow: hidden;
// // `;

// // const Image = styled.img`
// //   max-width: 100%;
// //   max-height: 100%;
// //   object-fit: contain;
// //   transition: transform 0.3s ease;
// //   transform: scale(${props => props.zoom});
// // `;

// // const Controls = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   gap: 10px;
// //   margin-top: 10px;
// // `;

// // const ControlButton = styled.button`
// //   background: none;
// //   border: none;
// //   color: ${({ theme }) => theme.colors.text};
// //   font-size: 1.2rem;
// //   cursor: pointer;
// //   transition: color 0.2s ease;

// //   &:hover {
// //     color: ${({ theme }) => theme.colors.primary};
// //   }

// //   &:disabled {
// //     color: ${({ theme }) => theme.colors.disabled};
// //     cursor: not-allowed;
// //   }
// // `;

// // const TabContainer = styled.div`
// //   display: flex;
// //   margin-bottom: 10px;
// // `;

// // const Tab = styled.button`
// //   padding: 10px 20px;
// //   background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
// //   color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
// //   border: none;
// //   cursor: pointer;
// //   transition: background-color 0.3s ease;

// //   &:hover {
// //     background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
// //   }
// // `;

// // const MetadataContainer = styled.div`
// //   background-color: ${({ theme }) => theme.colors.background};
// //   padding: 15px;
// //   border-radius: 5px;
// //   margin-top: 10px;
// //   max-height: 200px;
// //   overflow-y: auto;
// // `;

// // function ImageViewer({ fileUrl, fileName, fileId, metadata, onClose, goToNext, goToPrevious }) {
// //   const [zoom, setZoom] = useState(1);
// //   const [activeTab, setActiveTab] = useState('image');

// //   const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
// //   const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

// //   const handleKeyDown = useCallback((e) => {
// //     switch (e.key) {
// //       case 'ArrowRight':
// //         goToNext();
// //         break;
// //       case 'ArrowLeft':
// //         goToPrevious();
// //         break;
// //       case '+':
// //         handleZoomIn();
// //         break;
// //       case '-':
// //         handleZoomOut();
// //         break;
// //       case 'Escape':
// //         onClose();
// //         break;
// //       default:
// //         break;
// //     }
// //   }, [goToNext, goToPrevious, onClose]);

// //   useEffect(() => {
// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => window.removeEventListener('keydown', handleKeyDown);
// //   }, [handleKeyDown]);

// //   return (
// //     <ModalOverlay onClick={onClose}>
// //       <ModalContent onClick={(e) => e.stopPropagation()}>
// //         <CloseButton onClick={onClose} aria-label="Close Image Viewer">
// //           <FontAwesomeIcon icon={faTimes} />
// //         </CloseButton>

// //         <TabContainer>
// //           <Tab active={activeTab === 'image'} onClick={() => setActiveTab('image')}>Image</Tab>
// //           <Tab active={activeTab === 'metadata'} onClick={() => setActiveTab('metadata')}>Metadata</Tab>
// //         </TabContainer>

// //         {activeTab === 'image' && (
// //           <>
// //             <ImageContainer>
// //               <Image src={fileUrl} alt={fileName} zoom={zoom} />
// //             </ImageContainer>
// //             <Controls>
// //               <ControlButton onClick={handleZoomOut} aria-label="Zoom Out">
// //                 <FontAwesomeIcon icon={faSearchMinus} />
// //               </ControlButton>
// //               <ControlButton onClick={handleZoomIn} aria-label="Zoom In">
// //                 <FontAwesomeIcon icon={faSearchPlus} />
// //               </ControlButton>
// //               <ControlButton onClick={goToPrevious} aria-label="Previous Image">
// //                 <FontAwesomeIcon icon={faBackward} />
// //               </ControlButton>
// //               <ControlButton onClick={goToNext} aria-label="Next Image">
// //                 <FontAwesomeIcon icon={faForward} />
// //               </ControlButton>
// //             </Controls>
// //           </>
// //         )}

// //         {activeTab === 'metadata' && (
// //           <MetadataContainer>
// //             <Metadata metadata={metadata} fileId={fileId} />
// //           </MetadataContainer>
// //         )}
// //       </ModalContent>
// //     </ModalOverlay>
// //   );
// // }

// // ImageViewer.propTypes = {
// //   fileUrl: PropTypes.string.isRequired,
// //   fileName: PropTypes.string.isRequired,
// //   fileId: PropTypes.string.isRequired,
// //   metadata: PropTypes.object,
// //   onClose: PropTypes.func.isRequired,
// //   goToNext: PropTypes.func.isRequired,
// //   goToPrevious: PropTypes.func.isRequired,
// // };

// // export default ImageViewer;

// import React, { useState, useEffect, useCallback } from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faTimes, 
//   faSearchPlus, 
//   faSearchMinus, 
//   faForward, 
//   faBackward
// } from '@fortawesome/free-solid-svg-icons';
// import Metadata from './Metadata';

// const ViewerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: ${({ theme }) => theme.colors.background};
//   border-radius: 10px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   width: 100%;
//   height: 500px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;
// `;

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 100%;
//   object-fit: contain;
//   transition: transform 0.3s ease;
//   transform: scale(${props => props.zoom});
// `;

// const Controls = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10px;
//   margin-top: 10px;
// `;

// const Button = styled.button`
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.secondary};
//   }

//   &:disabled {
//     background-color: ${({ theme }) => theme.colors.disabled};
//     cursor: not-allowed;
//   }
// `;

// function ImageViewer({ fileUrl, fileName, fileId, metadata, onClose, goToNext, goToPrevious }) {
//   const [zoom, setZoom] = useState(1);

//   const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
//   const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

//   const handleKeyDown = useCallback((e) => {
//     switch (e.key) {
//       case 'ArrowRight':
//         goToNext();
//         break;
//       case 'ArrowLeft':
//         goToPrevious();
//         break;
//       case '+':
//         handleZoomIn();
//         break;
//       case '-':
//         handleZoomOut();
//         break;
//       case 'Escape':
//         onClose();
//         break;
//       default:
//         break;
//     }
//   }, [goToNext, goToPrevious, onClose]);

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [handleKeyDown]);

//   return (
//     <ViewerContainer>
//       <h3>{fileName}</h3>
//       <ImageContainer>
//         <Image src={fileUrl} alt={fileName} zoom={zoom} />
//       </ImageContainer>
//       <Controls>
//         <Button onClick={handleZoomOut} aria-label="Zoom Out">
//           <FontAwesomeIcon icon={faSearchMinus} />
//         </Button>
//         <Button onClick={handleZoomIn} aria-label="Zoom In">
//           <FontAwesomeIcon icon={faSearchPlus} />
//         </Button>
//         <Button onClick={goToPrevious} aria-label="Previous Image">
//           <FontAwesomeIcon icon={faBackward} />
//         </Button>
//         <Button onClick={goToNext} aria-label="Next Image">
//           <FontAwesomeIcon icon={faForward} />
//         </Button>
//         <Button onClick={onClose} aria-label="Close Image Viewer">
//           <FontAwesomeIcon icon={faTimes} />
//         </Button>
//       </Controls>
//       <Metadata metadata={metadata} fileId={fileId} fileName={fileName} fileUrl={fileUrl} />
//     </ViewerContainer>
//   );
// }

// ImageViewer.propTypes = {
//   fileUrl: PropTypes.string.isRequired,
//   fileName: PropTypes.string.isRequired,
//   fileId: PropTypes.string.isRequired,
//   metadata: PropTypes.object,
//   onClose: PropTypes.func.isRequired,
//   goToNext: PropTypes.func.isRequired,
//   goToPrevious: PropTypes.func.isRequired,
// };

// export default ImageViewer;

// ImageViewer.jsx
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faSearchPlus, 
  faSearchMinus, 
  faForward, 
  faBackward
} from '@fortawesome/free-solid-svg-icons';
import Metadata from './Metadata';

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  transform: scale(${props => props.zoom});
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

function ImageViewer({ fileUrl, fileName, fileId, metadata, fileType, onClose, goToNext, goToPrevious }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowRight':
        goToNext();
        break;
      case 'ArrowLeft':
        goToPrevious();
        break;
      case '+':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  }, [goToNext, goToPrevious, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <ViewerContainer>
      <h3>{fileName}</h3>
      <ImageContainer>
        <Image src={fileUrl} alt={fileName} zoom={zoom} />
      </ImageContainer>
      <Controls>
        <Button onClick={handleZoomOut} aria-label="Zoom Out">
          <FontAwesomeIcon icon={faSearchMinus} />
        </Button>
        <Button onClick={handleZoomIn} aria-label="Zoom In">
          <FontAwesomeIcon icon={faSearchPlus} />
        </Button>
        <Button onClick={goToPrevious} aria-label="Previous Image">
          <FontAwesomeIcon icon={faBackward} />
        </Button>
        <Button onClick={goToNext} aria-label="Next Image">
          <FontAwesomeIcon icon={faForward} />
        </Button>
        <Button onClick={onClose} aria-label="Close Image Viewer">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Controls>
      <Metadata 
        metadata={metadata} 
        fileId={fileId} 
        fileName={fileName} 
        fileUrl={fileUrl} 
        fileType={fileType} // Pass fileType here
      />
    </ViewerContainer>
  );
}

ImageViewer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileId: PropTypes.string.isRequired,
  metadata: PropTypes.object,
  fileType: PropTypes.string.isRequired, // Add fileType to propTypes
  onClose: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
  goToPrevious: PropTypes.func.isRequired,
};

export default ImageViewer;
