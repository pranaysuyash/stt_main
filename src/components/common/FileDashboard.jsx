// // // // // src/components/common/FileDashboard.jsx

// // // // import React, { useState, useRef } from 'react';
// // // // import styled from 'styled-components';
// // // // import ViewerModal from './ViewerModal'; // Replace with the correct path to your ViewerModal
// // // // import PropTypes from 'prop-types';
// // // // import Tooltip from './Tooltip'; // Replace with the correct path to your Tooltip component
// // // // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/mediaUtils'; // Replace with the correct path
// // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // import { faTag, faTimes } from '@fortawesome/free-solid-svg-icons';

// // // // const DashboardContainer = styled.div`
// // // //   margin-top: 30px;
// // // // `;

// // // // const FileGrid = styled.div`
// // // //   display: grid;
// // // //   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
// // // //   gap: 20px;

// // // //   @media (max-width: 1199px) {
// // // //     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
// // // //   }

// // // //   @media (max-width: 767px) {
// // // //     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
// // // //     gap: 15px;
// // // //     padding: 10px;
// // // //   }
// // // // `;

// // // // const FileCard = styled.div`
// // // //   background-color: ${({ theme }) => theme.colors.neutral};
// // // //   padding: 20px;
// // // //   border-radius: 10px;
// // // //   box-sizing: border-box;
// // // //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// // // //   text-align: center;
// // // //   transition: transform 0.2s ease, box-shadow 0.3s ease;
// // // //   cursor: pointer;
// // // //   display: flex;
// // // //   flex-direction: column;
// // // //   justify-content: space-between;
// // // //   height: 200px;
// // // //   overflow: hidden;

// // // //   &:hover {
// // // //     transform: translateY(-5px);
// // // //     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
// // // //   }

// // // //   .file-info {
// // // //     flex: 1;
// // // //     display: flex;
// // // //     flex-direction: column;
// // // //     justify-content: center;
// // // //   }

// // // //   p {
// // // //     margin-bottom: 10px;
// // // //     color: ${({ theme }) => theme.colors.text};
// // // //     font-size: 1rem;
// // // //     font-weight: ${({ theme }) => theme.fontWeights.medium};
// // // //     overflow: hidden;
// // // //     text-overflow: ellipsis;
// // // //     white-space: nowrap;
// // // //     width: 100%;
// // // //   }

// // // //   @media (max-width: 767px) {
// // // //     padding: 15px;
// // // //     height: auto;

// // // //     p {
// // // //       font-size: 0.875rem;
// // // //     }
// // // //   }
// // // // `;

// // // // const TagButton = styled.button`
// // // //   background: none;
// // // //   border: none;
// // // //   color: ${({ theme }) => theme.colors.primary};
// // // //   cursor: pointer;
// // // //   margin-top: 10px;
// // // // `;

// // // // const TagInput = styled.input`
// // // //   width: 100%;
// // // //   padding: 5px;
// // // //   margin-top: 5px;
// // // //   border: 1px solid ${({ theme }) => theme.colors.border};
// // // //   border-radius: 4px;
// // // // `;

// // // // const TagList = styled.div`
// // // //   display: flex;
// // // //   flex-wrap: wrap;
// // // //   gap: 5px;
// // // //   margin-top: 5px;
// // // // `;

// // // // const Tag = styled.span`
// // // //   background-color: ${({ theme }) => theme.colors.primary};
// // // //   color: ${({ theme }) => theme.colors.neutral};
// // // //   padding: 2px 5px;
// // // //   border-radius: 3px;
// // // //   font-size: 0.8rem;
// // // //   display: flex;
// // // //   align-items: center;
// // // // `;

// // // // const RemoveTagButton = styled.button`
// // // //   background: none;
// // // //   border: none;
// // // //   color: ${({ theme }) => theme.colors.neutral};
// // // //   cursor: pointer;
// // // //   margin-left: 5px;
// // // //   padding: 0;
// // // //   font-size: 0.8rem;
// // // // `;
// // // // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag }) {
// // // //   const [isViewerOpen, setIsViewerOpen] = useState(false);
// // // //   const [selectedIndex, setSelectedIndex] = useState(null);
// // // //   const [tagInput, setTagInput] = useState('');
// // // //   const [fileToTag, setFileToTag] = useState(null);
// // // //   const triggerRef = useRef(null);

// // // //   console.log('FileDashboard received uploadedFiles:', uploadedFiles);

// // // //   if (!uploadedFiles || uploadedFiles.length === 0) {
// // // //     return <p>Loading files... or No files to display.</p>;
// // // //   }

// // // //   const selectFile = (index, event) => {
// // // //     if (event.target.closest('button, input, a')) {
// // // //       return;
// // // //     }
// // // //     if (!uploadedFiles || index >= uploadedFiles.length) return;

// // // //     triggerRef.current = event.currentTarget;
// // // //     const file = uploadedFiles[index];
// // // //     const mimeType = file.type;

// // // //     if (isAudioFile(mimeType) || isVideoFile(mimeType) || isImageFile(mimeType)) {
// // // //       setSelectedIndex(index);
// // // //       setIsViewerOpen(true);
// // // //     } else {
// // // //       console.error('Unsupported media type:', mimeType);
// // // //     }
// // // //   };

// // // //   const closeViewer = () => {
// // // //     setIsViewerOpen(false);
// // // //     setSelectedIndex(null);
// // // //     if (triggerRef.current) {
// // // //       triggerRef.current.focus(); // Important for accessibility
// // // //     }
// // // //   };

// // // //   const handleTagClick = (file, event) => {
// // // //     event.stopPropagation();
// // // //     setFileToTag(file);
// // // //   };

// // // //   const handleTagSubmit = (event) => {
// // // //     event.preventDefault();
// // // //     if (fileToTag && tagInput) {
// // // //       onTagFile(fileToTag.id, tagInput);
// // // //       setTagInput('');
// // // //       setFileToTag(null);
// // // //     }
// // // //   };

// // // //   const handleRemoveTag = (fileId, tag, event) => {
// // // //     event.stopPropagation();
// // // //     onRemoveTag(fileId, tag);
// // // //   };

// // // //   return (
// // // //     <DashboardContainer>
// // // //       <h2>Uploaded Files</h2>
// // // //       <FileGrid>
// // // //         {uploadedFiles.map((file, index) => (
// // // //           <FileCard 
// // // //             key={file.id} 
// // // //             onClick={(e) => selectFile(index, e)} 
// // // //             tabIndex="0" 
// // // //             onKeyPress={(e) => { if (e.key === 'Enter') selectFile(index, e); }}
// // // //             aria-label={`${isImageFile(file.type) ? 'View' : 'Play'} ${file.filename}`}
// // // //           >
// // // //             <div className="file-info">
// // // //               <Tooltip $text={file.filename}>  {/* Make sure you have a Tooltip component */}
// // // //                 <p>{file.filename}</p>
// // // //               </Tooltip>
// // // //               <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
// // // //             </div>
// // // //             <div>
// // // //               <TagList>
// // // //                 {file.tags && file.tags.map((tag, tagIndex) => (
// // // //                   <Tag key={tagIndex}>
// // // //                     {tag}
// // // //                     <RemoveTagButton onClick={(e) => handleRemoveTag(file.id, tag, e)}>
// // // //                       <FontAwesomeIcon icon={faTimes} />
// // // //                     </RemoveTagButton>
// // // //                   </Tag>
// // // //                 ))}
// // // //               </TagList>
// // // //               {fileToTag === file ? (
// // // //                 <form onSubmit={handleTagSubmit}>
// // // //                   <TagInput
// // // //                     type="text"
// // // //                     value={tagInput}
// // // //                     onChange={(e) => setTagInput(e.target.value)}
// // // //                     placeholder="Enter tag"
// // // //                     onClick={(e) => e.stopPropagation()}
// // // //                   />
// // // //                 </form>
// // // //               ) : (
// // // //                 <TagButton onClick={(e) => handleTagClick(file, e)}>
// // // //                   <FontAwesomeIcon icon={faTag} /> Add Tag
// // // //                 </TagButton>
// // // //               )}
// // // //             </div>
// // // //           </FileCard>
// // // //         ))}
// // // //       </FileGrid>

// // // //       {isViewerOpen && selectedIndex !== null && (
// // // //         <ViewerModal
// // // //           uploadedFiles={uploadedFiles}
// // // //           initialIndex={selectedIndex}
// // // //           onClose={closeViewer}
// // // //         />
// // // //       )}
// // // //     </DashboardContainer>
// // // //   );
// // // // }

// // // // FileDashboard.propTypes = {
// // // //   uploadedFiles: PropTypes.arrayOf(
// // // //     PropTypes.shape({
// // // //       id: PropTypes.number.isRequired,
// // // //       filename: PropTypes.string.isRequired,
// // // //       path: PropTypes.string.isRequired, // Or 'url' if using full URLs
// // // //       size: PropTypes.number.isRequired,
// // // //       type: PropTypes.string.isRequired,
// // // //       duration: PropTypes.string,
// // // //       tags: PropTypes.arrayOf(PropTypes.string),
// // // //     })
// // // //   ).isRequired,
// // // //   onTagFile: PropTypes.func.isRequired,
// // // //   onRemoveTag: PropTypes.func.isRequired,
// // // // };

// // // // export default FileDashboard;

// // // // src/components/common/FileDashboard.jsx

// // // import React, { useState, useRef } from 'react';
// // // import styled from 'styled-components';
// // // import ViewerModal from './ViewerModal';
// // // import PropTypes from 'prop-types';
// // // import Tooltip from './Tooltip';
// // // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/mediaUtils';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faTag, faTimes } from '@fortawesome/free-solid-svg-icons';

// // // const DashboardContainer = styled.div`
// // //   margin-top: 30px;
// // // `;

// // // const FileGrid = styled.div`
// // //   display: grid;
// // //   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
// // //   gap: 20px;

// // //   @media (max-width: 1199px) {
// // //     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
// // //   }

// // //   @media (max-width: 767px) {
// // //     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
// // //     gap: 15px;
// // //     padding: 10px;
// // //   }
// // // `;

// // // const FileCard = styled.div`
// // //   background-color: ${({ theme }) => theme.colors.neutral};
// // //   padding: 20px;
// // //   border-radius: 10px;
// // //   box-sizing: border-box;
// // //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// // //   text-align: center;
// // //   transition: transform 0.2s ease, box-shadow 0.3s ease;
// // //   cursor: pointer;
// // //   display: flex;
// // //   flex-direction: column;
// // //   justify-content: space-between;
// // //   height: 220px;
// // //   overflow: hidden;

// // //   &:hover {
// // //     transform: translateY(-5px);
// // //     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
// // //   }

// // //   .file-info {
// // //     flex: 1;
// // //     display: flex;
// // //     flex-direction: column;
// // //     justify-content: center;
// // //   }

// // //   p {
// // //     margin-bottom: 10px;
// // //     color: ${({ theme }) => theme.colors.text};
// // //     font-size: 1rem;
// // //     font-weight: ${({ theme }) => theme.fontWeights.medium};
// // //     overflow: hidden;
// // //     text-overflow: ellipsis;
// // //     white-space: nowrap;
// // //     width: 100%;
// // //   }

// // //   @media (max-width: 767px) {
// // //     padding: 15px;
// // //     height: auto;

// // //     p {
// // //       font-size: 0.875rem;
// // //     }
// // //   }
// // // `;

// // // const TagButton = styled.button`
// // //   background: none;
// // //   border: none;
// // //   color: ${({ theme }) => theme.colors.primary};
// // //   cursor: pointer;
// // //   margin-top: 10px;
// // // `;

// // // const TagInput = styled.input`
// // //   width: 100%;
// // //   padding: 5px;
// // //   margin-top: 5px;
// // //   border: 1px solid ${({ theme }) => theme.colors.border};
// // //   border-radius: 4px;
// // // `;

// // // const TagList = styled.div`
// // //   display: flex;
// // //   flex-wrap: wrap;
// // //   gap: 5px;
// // //   margin-top: 5px;
// // // `;

// // // const Tag = styled.span`
// // //   background-color: ${({ theme }) => theme.colors.primary};
// // //   color: ${({ theme }) => theme.colors.neutral};
// // //   padding: 2px 5px;
// // //   border-radius: 3px;
// // //   font-size: 0.8rem;
// // //   display: flex;
// // //   align-items: center;
// // // `;

// // // const RemoveTagButton = styled.button`
// // //   background: none;
// // //   border: none;
// // //   color: ${({ theme }) => theme.colors.neutral};
// // //   cursor: pointer;
// // //   margin-left: 5px;
// // //   padding: 0;
// // //   font-size: 0.8rem;
// // // `;

// // // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag }) {
// // //   const [isViewerOpen, setIsViewerOpen] = useState(false);
// // //   const [selectedIndex, setSelectedIndex] = useState(null);
// // //   const [tagInput, setTagInput] = useState('');
// // //   const [fileToTag, setFileToTag] = useState(null);
// // //   const triggerRef = useRef(null);

// // //   if (!uploadedFiles || uploadedFiles.length === 0) {
// // //     return <p>Loading files... or No files to display.</p>;
// // //   }

// // //   const selectFile = (index, event) => {
// // //     if (event.target.closest('button, input, a')) {
// // //       return;
// // //     }
// // //     if (!uploadedFiles || index >= uploadedFiles.length) return;

// // //     triggerRef.current = event.currentTarget;
// // //     const file = uploadedFiles[index];
// // //     const mimeType = file.type;

// // //     if (isAudioFile(mimeType) || isVideoFile(mimeType) || isImageFile(mimeType)) {
// // //       setSelectedIndex(index);
// // //       setIsViewerOpen(true);
// // //     } else {
// // //       console.error('Unsupported media type:', mimeType);
// // //     }
// // //   };

// // //   const closeViewer = () => {
// // //     setIsViewerOpen(false);
// // //     setSelectedIndex(null);
// // //     if (triggerRef.current) {
// // //       triggerRef.current.focus();
// // //     }
// // //   };

// // //   const handleTagClick = (file, event) => {
// // //     event.stopPropagation();
// // //     setFileToTag(file);
// // //   };

// // //   const handleTagSubmit = (event) => {
// // //     event.preventDefault();
// // //     if (fileToTag && tagInput) {
// // //       onTagFile(fileToTag.id, [tagInput]); // Assuming onTagFile expects an array of tags
// // //       setTagInput('');
// // //       setFileToTag(null);
// // //     }
// // //   };

// // //   const handleRemoveTag = (fileId, tag, event) => {
// // //     event.stopPropagation();
// // //     onRemoveTag(fileId, [tag]); // Assuming onRemoveTag expects an array of tags
// // //   };

// // //   return (
// // //     <DashboardContainer>
// // //       <h2>Uploaded Files</h2>
// // //       <FileGrid>
// // //         {uploadedFiles.map((file, index) => (
// // //           <FileCard
// // //             key={file.id}
// // //             onClick={(e) => selectFile(index, e)}
// // //             tabIndex="0"
// // //             onKeyPress={(e) => {
// // //               if (e.key === 'Enter') selectFile(index, e);
// // //             }}
// // //             aria-label={`${isImageFile(file.type) ? 'View' : 'Play'} ${file.filename}`}
// // //           >
// // //             <div className="file-info">
// // //               <Tooltip $text={file.filename}>
// // //                 <p>{file.filename}</p>
// // //               </Tooltip>
// // //               <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
// // //             </div>
// // //             <div>
// // //               <TagList>
// // //                 {file.tags &&
// // //                   file.tags.map((tag, tagIndex) => (
// // //                     <Tag key={tagIndex}>
// // //                       {tag}
// // //                       <RemoveTagButton onClick={(e) => handleRemoveTag(file.id, tag, e)}>
// // //                         <FontAwesomeIcon icon={faTimes} />
// // //                       </RemoveTagButton>
// // //                     </Tag>
// // //                   ))}
// // //               </TagList>
// // //               {fileToTag && fileToTag.id === file.id ? (
// // //                 <form onSubmit={handleTagSubmit}>
// // //                   <TagInput
// // //                     type="text"
// // //                     value={tagInput}
// // //                     onChange={(e) => setTagInput(e.target.value)}
// // //                     placeholder="Enter tag"
// // //                     onClick={(e) => e.stopPropagation()}
// // //                   />
// // //                 </form>
// // //               ) : (
// // //                 <TagButton onClick={(e) => handleTagClick(file, e)}>
// // //                   <FontAwesomeIcon icon={faTag} /> Add Tag
// // //                 </TagButton>
// // //               )}
// // //             </div>
// // //           </FileCard>
// // //         ))}
// // //       </FileGrid>

// // //       {isViewerOpen && selectedIndex !== null && (
// // //         <ViewerModal
// // //           uploadedFiles={uploadedFiles}
// // //           initialIndex={selectedIndex}
// // //           onClose={closeViewer}
// // //         />
// // //       )}
// // //     </DashboardContainer>
// // //   );
// // // }

// // // FileDashboard.propTypes = {
// // //   uploadedFiles: PropTypes.arrayOf(
// // //     PropTypes.shape({
// // //       id: PropTypes.number.isRequired,
// // //       filename: PropTypes.string.isRequired,
// // //       path: PropTypes.string.isRequired,
// // //       size: PropTypes.number.isRequired,
// // //       type: PropTypes.string.isRequired,
// // //       duration: PropTypes.string,
// // //       tags: PropTypes.arrayOf(PropTypes.string),
// // //       meta_data: PropTypes.object,
// // //     })
// // //   ).isRequired,
// // //   onTagFile: PropTypes.func.isRequired,
// // //   onRemoveTag: PropTypes.func.isRequired,
// // // };

// // // export default FileDashboard;

// // // src/components/common/FileDashboard.jsx

// // import React, { useState, useRef } from 'react';
// // import {
// //   Box,
// //   Grid,
// //   Image,
// //   Text,
// //   Badge,
// //   IconButton,
// //   Button,
// //   Flex,
// //   Input,
// //   Tooltip,
// //   Menu,
// //   MenuButton,
// //   MenuList,
// //   MenuItem,
// //   // useDisclosure,
// //   useToast,
// //   Spinner,
// // } from '@chakra-ui/react';
// // import {
// //   FaTag,
// //   FaTimes,
// //   FaEllipsisV,
// //   FaPlay,
// //   FaCheckCircle,
// //   FaTimesCircle,
// // } from 'react-icons/fa';
// // import { Link } from 'react-router-dom';
// // import PropTypes from 'prop-types';
// // import ViewerModal from './ViewerModal'; // Assuming this still exists or can be removed
// // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag }) {
// //   const [isViewerOpen, setIsViewerOpen] = useState(false);
// //   const [selectedIndex, setSelectedIndex] = useState(null);
// //   const [tagInput, setTagInput] = useState('');
// //   const [fileToTag, setFileToTag] = useState(null);
// //   const triggerRef = useRef(null);
// //   const toast = useToast();

// //   // const { isOpen, onOpen, onClose } = useDisclosure(); // For ViewerModal if still used

// //   if (!uploadedFiles || uploadedFiles.length === 0) {
// //     return <Text>Loading files... or No files to display.</Text>;
// //   }

// //   const selectFile = (index, event) => {
// //     if (event.target.closest('button, input, a')) {
// //       return;
// //     }
// //     if (!uploadedFiles || index >= uploadedFiles.length) return;

// //     triggerRef.current = event.currentTarget;
// //     const file = uploadedFiles[index];
// //     const mimeType = file.type;

// //     if (isAudioFile(mimeType) || isVideoFile(mimeType) || isImageFile(mimeType)) {
// //       setSelectedIndex(index);
// //       setIsViewerOpen(true);
// //     } else {
// //       console.error('Unsupported media type:', mimeType);
// //       toast({
// //         title: 'Error',
// //         description: 'Unsupported media type.',
// //         status: 'error',
// //         duration: 3000,
// //         isClosable: true,
// //       });
// //     }
// //   };

// //   const closeViewer = () => {
// //     setIsViewerOpen(false);
// //     setSelectedIndex(null);
// //     if (triggerRef.current) {
// //       triggerRef.current.focus();
// //     }
// //   };

// //   const handleTagClick = (file, event) => {
// //     event.stopPropagation();
// //     setFileToTag(file);
// //   };

// //   const handleTagSubmit = (event) => {
// //     event.preventDefault();
// //     if (fileToTag && tagInput.trim()) {
// //       onTagFile(fileToTag.id, [tagInput.trim()]);
// //       toast({
// //         title: 'Tag Added',
// //         description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
// //         status: 'success',
// //         duration: 3000,
// //         isClosable: true,
// //       });
// //       setTagInput('');
// //       setFileToTag(null);
// //     }
// //   };

// //   const handleRemoveTag = (fileId, tag, event) => {
// //     event.stopPropagation();
// //     onRemoveTag(fileId, [tag]);
// //     toast({
// //       title: 'Tag Removed',
// //       description: `Tag "${tag}" removed from file.`,
// //       status: 'info',
// //       duration: 3000,
// //       isClosable: true,
// //     });
// //   };

// //   return (
// //     <Box mt={8}>
// //       <Text fontSize="2xl" mb={4}>
// //         Uploaded Files
// //       </Text>
// //       <Grid
// //         templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 1fr))', md: 'repeat(auto-fill, minmax(200px, 1fr))', lg: 'repeat(auto-fill, minmax(250px, 1fr))' }}
// //         gap={6}
// //       >
// //         {uploadedFiles.map((file, index) => (
// //           <Box
// //             key={file.id}
// //             borderWidth="1px"
// //             borderRadius="lg"
// //             overflow="hidden"
// //             position="relative"
// //             bg="neutral"
// //             boxShadow="md"
// //             _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
// //             transition="all 0.2s"
// //             cursor="pointer"
// //             onClick={(e) => selectFile(index, e)}
// //             tabIndex="0"
// //             onKeyPress={(e) => {
// //               if (e.key === 'Enter') selectFile(index, e);
// //             }}
// //             aria-label={`View details of ${file.filename}`}
// //           >
// //             {/* Thumbnail */}
// //             <Link to={`/media/${file.id}`}>
// //               <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
// //             </Link>

// //             {/* File Info */}
// //             <Box p={4}>
// //               <Tooltip label={file.filename} hasArrow>
// //                 <Text isTruncated fontWeight="medium" fontSize="md">
// //                   {file.filename}
// //                 </Text>
// //               </Tooltip>
// //               <Text fontSize="sm" color="gray.600">
// //                 {(file.size / (1024 * 1024)).toFixed(2)} MB
// //               </Text>

// //               {/* Tags */}
// //               <Flex mt={2} wrap="wrap" gap={1}>
// //                 {file.tags && file.tags.slice(0, 3).map((tag, tagIndex) => (
// //                   <Badge key={tagIndex} colorScheme="teal" fontSize="xs" display="flex" alignItems="center">
// //                     {tag}
// //                     <IconButton
// //                       icon={<FaTimes />}
// //                       size="xs"
// //                       ml={1}
// //                       variant="ghost"
// //                       colorScheme="red"
// //                       aria-label={`Remove tag ${tag}`}
// //                       onClick={(e) => handleRemoveTag(file.id, tag, e)}
// //                     />
// //                   </Badge>
// //                 ))}
// //                 {file.tags && file.tags.length > 3 && (
// //                   <Badge colorScheme="teal" fontSize="xs">
// //                     +{file.tags.length - 3}
// //                   </Badge>
// //                 )}
// //               </Flex>

// //               {/* Add Tag */}
// //               {fileToTag && fileToTag.id === file.id ? (
// //                 <form onSubmit={handleTagSubmit}>
// //                   <Input
// //                     size="sm"
// //                     mt={2}
// //                     placeholder="Enter tag"
// //                     value={tagInput}
// //                     onChange={(e) => setTagInput(e.target.value)}
// //                     onClick={(e) => e.stopPropagation()}
// //                   />
// //                 </form>
// //               ) : (
// //                 <Button
// //                   size="sm"
// //                   leftIcon={<FaTag />}
// //                   mt={2}
// //                   variant="outline"
// //                   colorScheme="teal"
// //                   onClick={(e) => handleTagClick(file, e)}
// //                 >
// //                   Add Tag
// //                 </Button>
// //               )}
// //             </Box>

// //             {/* Status Indicator */}
// //             {file.processing_status && (
// //               <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
// //                 <Box position="absolute" top="2" left="2">
// //                   {file.processing_status === 'completed' && <FaCheckCircle color="green" size="20" />}
// //                   {file.processing_status === 'processing' && <Spinner size="sm" color="blue.500" />}
// //                   {file.processing_status === 'error' && <FaTimesCircle color="red" size="20" />}
// //                 </Box>
// //               </Tooltip>
// //             )}

// //             {/* Contextual Menu */}
// //             <Menu>
// //               <MenuButton
// //                 as={IconButton}
// //                 aria-label="More actions"
// //                 icon={<FaEllipsisV />}
// //                 variant="ghost"
// //                 position="absolute"
// //                 top="2"
// //                 right="2"
// //                 onClick={(e) => e.stopPropagation()} // Prevent triggering the card click
// //               />
// //               <MenuList>
// //                 <MenuItem as={Link} to={`/media/${file.id}`}>
// //                   View Details
// //                 </MenuItem>
// //                 <MenuItem onClick={() => onTagFile(file.id, [])}>
// //                   Process
// //                 </MenuItem>
// //                 <MenuItem onClick={() => onTagFile(file.id, [])}>
// //                   Analyze
// //                 </MenuItem>
// //                 <MenuItem onClick={(e) => { e.stopPropagation(); /* Implement Download */ }}>
// //                   Download
// //                 </MenuItem>
// //                 <MenuItem onClick={(e) => { e.stopPropagation(); /* Implement Delete */ }}>
// //                   Delete
// //                 </MenuItem>
// //               </MenuList>
// //             </Menu>

// //             {/* Hover Actions */}
// //             <Box
// //               position="absolute"
// //               top="0"
// //               left="0"
// //               width="100%"
// //               height="100%"
// //               bg="blackAlpha.600"
// //               opacity="0"
// //               transition="opacity 0.3s"
// //               _hover={{ opacity: 1 }}
// //               display="flex"
// //               justifyContent="center"
// //               alignItems="center"
// //             >
// //               {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// //                 <IconButton
// //                   aria-label={`Play ${file.filename}`}
// //                   icon={<FaPlay />}
// //                   colorScheme="teal"
// //                   size="lg"
// //                   m={2}
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     // Implement Play functionality or navigate to details page
// //                   }}
// //                 />
// //               )}
// //               <Link to={`/media/${file.id}`}>
// //                 <IconButton
// //                   aria-label={`View details of ${file.filename}`}
// //                   icon={<FaEllipsisV />}
// //                   colorScheme="teal"
// //                   size="lg"
// //                   m={2}
// //                   onClick={(e) => e.stopPropagation()}
// //                 />
// //               </Link>
// //             </Box>
// //           </Box>
// //         ))}
// //       </Grid>

// //       {/* Viewer Modal - Optional */}
// //       {isViewerOpen && selectedIndex !== null && (
// //         <ViewerModal
// //           uploadedFiles={uploadedFiles}
// //           initialIndex={selectedIndex}
// //           onClose={closeViewer}
// //         />
// //       )}
    
// // </Box>)}
// //     FileDashboard.propTypes = {
// //       uploadedFiles: PropTypes.arrayOf(
// //         PropTypes.shape({
// //           id: PropTypes.number.isRequired,
// //           filename: PropTypes.string.isRequired,
// //           thumbnailUrl: PropTypes.string.isRequired,
// //           size: PropTypes.number.isRequired,
// //           type: PropTypes.string.isRequired,
// //           tags: PropTypes.arrayOf(PropTypes.string),
// //           processing_status: PropTypes.string,
// //         })
// //       ).isRequired,
// //       onTagFile: PropTypes.func.isRequired,
// //       onRemoveTag: PropTypes.func.isRequired,
// //     };

// //     export default FileDashboard;


// // src/components/common/FileDashboard.jsx

// import React, { useState } from 'react';
// import {
//   Box,
//   Grid,
//   Image,
//   Text,
//   Badge,
//   IconButton,
//   Button,
//   Flex,
//   Input,
//   Tooltip,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   useToast,
//   Spinner,
//   // useDisclosure,
// } from '@chakra-ui/react';
// import {
//   FaTag,
//   FaTimes,
//   FaEllipsisV,
//   FaPlay,
//   FaCheckCircle,
//   FaTimesCircle,
//   // FaDownload,
//   // FaTrash,
//   // FaShareAlt,
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag }) {
//   const [tagInput, setTagInput] = useState('');
//   const [fileToTag, setFileToTag] = useState(null);
//   const toast = useToast();

//   /**
//    * Handle clicking the "Add Tag" button.
//    */
//   const handleTagClick = (file, event) => {
//     event.stopPropagation();
//     setFileToTag(file);
//   };

//   /**
//    * Handle submitting a new tag.
//    */
//   const handleTagSubmit = (event) => {
//     event.preventDefault();
//     if (fileToTag && tagInput.trim()) {
//       onTagFile(fileToTag.id, [tagInput.trim()]);
//       toast({
//         title: 'Tag Added',
//         description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//       setTagInput('');
//       setFileToTag(null);
//     }
//   };

//   /**
//    * Handle removing a tag.
//    */
//   const handleRemoveTag = (fileId, tag, event) => {
//     event.stopPropagation();
//     onRemoveTag(fileId, [tag]);
//     toast({
//       title: 'Tag Removed',
//       description: `Tag "${tag}" removed from file.`,
//       status: 'info',
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   /**
//    * Handle menu actions like Process, Analyze, Download, Delete.
//    */
//   const handleMenuAction = (action, file) => {
//     switch (action) {
//       case 'process':
//         // Implement process action
//         onTagFile(file.id, ['processing']); // Example: Adding 'processing' tag
//         break;
//       case 'analyze':
//         // Implement analyze action
//         onTagFile(file.id, ['analyzed']); // Example: Adding 'analyzed' tag
//         break;
//       case 'download':
//         // Implement download functionality
//         window.open(file.path, '_blank');
//         break;
//       case 'delete':
//         // Implement delete functionality
//         onRemoveTag(file.id, []); // Placeholder for deletion
//         break;
//       default:
//         break;
//     }
//   };

//   if (!uploadedFiles || uploadedFiles.length === 0) {
//     return <Text>Loading files... or No files to display.</Text>;
//   }

//   return (
//     <Box mt={8}>
//       <Text fontSize="2xl" mb={4}>
//         Uploaded Files
//       </Text>
//       <Grid
//         templateColumns={{
//           base: 'repeat(auto-fill, minmax(150px, 1fr))',
//           md: 'repeat(auto-fill, minmax(200px, 1fr))',
//           lg: 'repeat(auto-fill, minmax(250px, 1fr))',
//         }}
//         gap={6}
//       >
//         {uploadedFiles.map((file) => (
//           <Box
//             key={file.id}
//             borderWidth="1px"
//             borderRadius="lg"
//             overflow="hidden"
//             position="relative"
//             bg="neutral"
//             boxShadow="md"
//             _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
//             transition="all 0.2s"
//             cursor="pointer"
//           >
//             {/* Link to Details Page */}
//             <Link to={`/media/${file.id}`}>
//               <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
//             </Link>

//             {/* File Info */}
//             <Box p={4}>
//               <Tooltip label={file.filename} hasArrow>
//                 <Text isTruncated fontWeight="medium" fontSize="md">
//                   {file.filename}
//                 </Text>
//               </Tooltip>
//               <Text fontSize="sm" color="gray.600">
//                 {(file.size / (1024 * 1024)).toFixed(2)} MB
//               </Text>

//               {/* Tags */}
//               <Flex mt={2} wrap="wrap" gap={1}>
//                 {file.tags &&
//                   file.tags.slice(0, 3).map((tag, index) => (
//                     <Badge
//                       key={index}
//                       colorScheme={
//                         tag.toLowerCase() === 'processing'
//                           ? 'yellow'
//                           : tag.toLowerCase() === 'analyzed'
//                           ? 'purple'
//                           : 'teal'
//                       }
//                       fontSize="xs"
//                       display="flex"
//                       alignItems="center"
//                     >
//                       {tag}
//                       <IconButton
//                         icon={<FaTimes />}
//                         size="xs"
//                         ml={1}
//                         variant="ghost"
//                         colorScheme="red"
//                         aria-label={`Remove tag ${tag}`}
//                         onClick={(e) => handleRemoveTag(file.id, tag, e)}
//                       />
//                     </Badge>
//                   ))}
//                 {file.tags && file.tags.length > 3 && (
//                   <Badge colorScheme="teal" fontSize="xs">
//                     +{file.tags.length - 3}
//                   </Badge>
//                 )}
//               </Flex>

//               {/* Add Tag */}
//               {fileToTag && fileToTag.id === file.id ? (
//                 <form onSubmit={handleTagSubmit}>
//                   <Input
//                     size="sm"
//                     mt={2}
//                     placeholder="Enter tag"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                 </form>
//               ) : (
//                 <Button
//                   size="sm"
//                   leftIcon={<FaTag />}
//                   mt={2}
//                   variant="outline"
//                   colorScheme="teal"
//                   onClick={(e) => handleTagClick(file, e)}
//                 >
//                   Add Tag
//                 </Button>
//               )}
//             </Box>

//             {/* Status Indicator */}
//             {file.processing_status && (
//               <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
//                 <Box position="absolute" top="2" left="2">
//                   {file.processing_status.toLowerCase() === 'completed' && (
//                     <FaCheckCircle color="green" size="20" />
//                   )}
//                   {file.processing_status.toLowerCase() === 'processing' && (
//                     <Spinner size="sm" color="blue.500" />
//                   )}
//                   {file.processing_status.toLowerCase() === 'error' && (
//                     <FaTimesCircle color="red" size="20" />
//                   )}
//                 </Box>
//               </Tooltip>
//             )}

//             {/* Contextual Menu */}
//             <Menu>
//               <MenuButton
//                 as={IconButton}
//                 aria-label="More actions"
//                 icon={<FaEllipsisV />}
//                 variant="ghost"
//                 position="absolute"
//                 top="2"
//                 right="2"
//                 onClick={(e) => e.stopPropagation()} // Prevent triggering card click
//               />
//               <MenuList>
//                 <MenuItem as={Link} to={`/media/${file.id}`}>
//                   View Details
//                 </MenuItem>
//                 <MenuItem onClick={(e) => { e.stopPropagation(); handleMenuAction('process', file); }}>
//                   Process
//                 </MenuItem>
//                 <MenuItem onClick={(e) => { e.stopPropagation(); handleMenuAction('analyze', file); }}>
//                   Analyze
//                 </MenuItem>
//                 <MenuItem onClick={(e) => { e.stopPropagation(); handleMenuAction('download', file); }}>
//                   Download
//                 </MenuItem>
//                 <MenuItem onClick={(e) => { e.stopPropagation(); handleMenuAction('delete', file); }}>
//                   Delete
//                 </MenuItem>
//               </MenuList>
//             </Menu>

//             {/* Hover Actions */}
//             <Box
//               position="absolute"
//               top="0"
//               left="0"
//               width="100%"
//               height="100%"
//               bg="blackAlpha.600"
//               opacity="0"
//               transition="opacity 0.3s"
//               _hover={{ opacity: 1 }}
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//             >
//               {(isAudioFile(file.type) || isVideoFile(file.type)) && (
//                 <IconButton
//                   aria-label={`Play ${file.filename}`}
//                   icon={<FaPlay />}
//                   colorScheme="teal"
//                   size="lg"
//                   m={2}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     // Optionally, navigate to details page or implement play functionality
//                     // For simplicity, navigate to details page
//                     window.location.href = `/media/${file.id}`;
//                   }}
//                 />
//               )}
//               <Link to={`/media/${file.id}`}>
//                 <IconButton
//                   aria-label={`View details of ${file.filename}`}
//                   icon={<FaEllipsisV />}
//                   colorScheme="teal"
//                   size="lg"
//                   m={2}
//                   onClick={(e) => e.stopPropagation()}
//                 />
//               </Link>
//             </Box>
//           </Box>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
//   FileDashboard.propTypes = {
//     uploadedFiles: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         filename: PropTypes.string.isRequired,
//         thumbnailUrl: PropTypes.string.isRequired,
//         size: PropTypes.number.isRequired,
//         type: PropTypes.string.isRequired,
//         tags: PropTypes.arrayOf(PropTypes.string),
//         processing_status: PropTypes.string,
//         path: PropTypes.string, // For download
//       })
//     ).isRequired,
//     onTagFile: PropTypes.func.isRequired,
//     onRemoveTag: PropTypes.func.isRequired,
//   };
  
//   export default FileDashboard;
// src/components/common/FileDashboard.jsx

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Badge,
  IconButton,
  Button,
  Flex,
  Input,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import {
  FaTag,
  FaTimes,
  FaEllipsisV,
  FaPlay,
  FaCheckCircle,
  FaTimesCircle,
  // FaDownload,
  // FaTrash,
  // FaShareAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag }) {
  const [tagInput, setTagInput] = useState('');
  const [fileToTag, setFileToTag] = useState(null);
  const toast = useToast();

  /**
   * Handle clicking the "Add Tag" button.
   */
  const handleTagClick = (file, event) => {
    event.stopPropagation();
    setFileToTag(file);
  };

  /**
   * Handle submitting a new tag.
   */
  const handleTagSubmit = (event) => {
    event.preventDefault();
    if (fileToTag && tagInput.trim()) {
      onTagFile(fileToTag.id, [tagInput.trim()]);
      toast({
        title: 'Tag Added',
        description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTagInput('');
      setFileToTag(null);
    }
  };

  /**
   * Handle removing a tag.
   */
  const handleRemoveTag = (fileId, tag, event) => {
    event.stopPropagation();
    onRemoveTag(fileId, [tag]);
    toast({
      title: 'Tag Removed',
      description: `Tag "${tag}" removed from file.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  /**
   * Handle menu actions like Process, Analyze, Download, Delete.
   */
  const handleMenuAction = (action, file) => {
    switch (action) {
      case 'process':
        // Implement process action
        onTagFile(file.id, ['processing']); // Example: Adding 'processing' tag
        break;
      case 'analyze':
        // Implement analyze action
        onTagFile(file.id, ['analyzed']); // Example: Adding 'analyzed' tag
        break;
      case 'download':
        // Implement download functionality
        window.open(file.path, '_blank');
        break;
      case 'delete':
        // Implement delete functionality
        onRemoveTag(file.id, []); // Placeholder for deletion
        break;
      default:
        break;
    }
  };

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return <Text>Loading files... or No files to display.</Text>;
  }

  return (
    <Box mt={8}>
      <Text fontSize="2xl" mb={4}>
        Uploaded Files
      </Text>
      <Grid
        templateColumns={{
          base: 'repeat(auto-fill, minmax(150px, 1fr))',
          md: 'repeat(auto-fill, minmax(200px, 1fr))',
          lg: 'repeat(auto-fill, minmax(250px, 1fr))',
        }}
        gap={6}
      >
        {uploadedFiles.map((file) => (
          <Box
            key={file.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            bg="white"
            boxShadow="md"
            transition="box-shadow 0.2s, transform 0.2s"
            _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
            cursor="pointer"
            display="flex"
            flexDirection="column"
            height="100%"
          >
            {/* Media Section */}
            <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
              <Image
                src={file.thumbnailUrl}
                alt={file.filename}
                objectFit="cover"
                height="150px"
                width="100%"
              />
            </Link>

            {/* File Info */}
            <Box p={4} flex="0 0 auto">
              <Tooltip label={file.filename} hasArrow>
                <Text isTruncated fontWeight="medium" fontSize="md">
                  {file.filename}
                </Text>
              </Tooltip>
              <Text fontSize="sm" color="gray.600">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </Text>

              {/* Tags */}
              <Flex mt={2} wrap="wrap" gap={1}>
                {file.tags &&
                  file.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      colorScheme={
                        tag.toLowerCase() === 'processing'
                          ? 'yellow'
                          : tag.toLowerCase() === 'analyzed'
                          ? 'purple'
                          : 'teal'
                      }
                      fontSize="xs"
                      display="flex"
                      alignItems="center"
                    >
                      {tag}
                      <IconButton
                        icon={<FaTimes />}
                        size="xs"
                        ml={1}
                        variant="ghost"
                        colorScheme="red"
                        aria-label={`Remove tag ${tag}`}
                        onClick={(e) => handleRemoveTag(file.id, tag, e)}
                      />
                    </Badge>
                  ))}
                {file.tags && file.tags.length > 3 && (
                  <Badge colorScheme="teal" fontSize="xs">
                    +{file.tags.length - 3}
                  </Badge>
                )}
              </Flex>

              {/* Add Tag */}
              {fileToTag && fileToTag.id === file.id ? (
                <form onSubmit={handleTagSubmit}>
                  <Input
                    size="sm"
                    mt={2}
                    placeholder="Enter tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </form>
              ) : (
                <Button
                  size="sm"
                  leftIcon={<FaTag />}
                  mt={2}
                  variant="outline"
                  colorScheme="teal"
                  onClick={(e) => handleTagClick(file, e)}
                >
                  Add Tag
                </Button>
              )}
            </Box>

            {/* Footer with Play and Menu Buttons */}
            <Flex
              p={2}
              justify="space-between"
              align="center"
              borderTop="1px solid"
              borderColor="gray.200"
              flex="0 0 auto"
            >
              {/* Play Button */}
              {(isAudioFile(file.type) || isVideoFile(file.type)) && (
                <Tooltip label="Play" hasArrow>
                  <IconButton
                    icon={<FaPlay />}
                    colorScheme="teal"
                    aria-label={`Play ${file.filename}`}
                    onClick={() => {
                      // Navigate to details page or handle play action
                      window.location.href = `/app/media/${file.id}`;
                    }}
                  />
                </Tooltip>
              )}

              {/* Contextual Menu */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="More actions"
                  icon={<FaEllipsisV />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem as={Link} to={`/app/media/${file.id}`}>
                    View Details
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('process', file)}>
                    Process
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('analyze', file)}>
                    Analyze
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('download', file)}>
                    Download
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('delete', file)}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            {/* Status Indicator */}
            {file.processing_status && (
              <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
                <Box position="absolute" top="2" left="2">
                  {file.processing_status.toLowerCase() === 'completed' && (
                    <FaCheckCircle color="green" size="20" />
                  )}
                  {file.processing_status.toLowerCase() === 'processing' && (
                    <Spinner size="sm" color="blue.500" />
                  )}
                  {file.processing_status.toLowerCase() === 'error' && (
                    <FaTimesCircle color="red" size="20" />
                  )}
                </Box>
              </Tooltip>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

FileDashboard.propTypes = {
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      filename: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      processing_status: PropTypes.string,
      path: PropTypes.string, // For download
    })
  ).isRequired,
  onTagFile: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};

export default FileDashboard;
