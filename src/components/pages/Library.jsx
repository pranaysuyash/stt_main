
// // // // src/components/pages/Library.jsx

// // // import React, { useState, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import FileDashboard from '../common/FileDashboard'; // Adjust path as needed
// // // import api from '../../utils/api'; // Adjust path as needed
// // // import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// // // import 'react-tabs/style/react-tabs.css';
// // // import Loader from '../common/Loader'; // Import Loader for consistent UI

// // // // Helper functions
// // // const isAudioFile = (type) => type && type.startsWith('audio/');
// // // const isVideoFile = (type) => type && type.startsWith('video/');
// // // const isImageFile = (type) => type && type.startsWith('image/');

// // // const LibraryContainer = styled.div`
// // //   padding: 20px;
// // // `;

// // // const TagContainer = styled.div`
// // //   margin-bottom: 20px;
// // // `;

// // // const TagButton = styled.button`
// // //   margin-right: 10px;
// // //   padding: 5px 10px;
// // //   background-color: ${(props) => (props.$active ? '#007bff' : '#f0f0f0')};
// // //   color: ${(props) => (props.$active ? '#fff' : '#333')};
// // //   border: 1px solid #007bff;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // // `;

// // // function Library({ onPlayAudio }) {
// // //   const [files, setFiles] = useState([]);
// // //   const [tags, setTags] = useState(['All']);
// // //   const [activeTag, setActiveTag] = useState('All');
// // //   const [loading, setLoading] = useState(true);
// // //   const [actionMessage, setActionMessage] = useState('');
// // //   const [page, setPage] = useState(1);

// // //   useEffect(() => {
// // //     fetchFiles();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [activeTag]);

// // //   const fetchFiles = async (pageNum = 1) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await api.get('/file_history', {
// // //         params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
// // //       });

// // //       if (response.data && Array.isArray(response.data.files)) {
// // //         setFiles(pageNum === 1 ? response.data.files : [...(files || []), ...response.data.files]);
// // //         if (pageNum === 1) {
// // //           const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// // //           setTags(allTags);
// // //         }
// // //         setPage(pageNum);
// // //       } else {
// // //         console.log('No files returned from the API or incorrect data structure.');
// // //         if (pageNum === 1) {
// // //           setFiles([]);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching file history:', error);
// // //       setActionMessage('Failed to fetch files.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const loadMore = () => {
// // //     fetchFiles(page + 1);
// // //   };

// // //   const audioFiles = (files || []).filter((file) => isAudioFile(file.type));
// // //   const videoFiles = (files || []).filter((file) => isVideoFile(file.type));
// // //   const imageFiles = (files || []).filter((file) => isImageFile(file.type));
// // //   const filteredFiles =
// // //     activeTag === 'All' ? files : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));

// // //   // Updated handleTagFile to allow multiple tags
// // //   const handleTagFile = async (fileId, tagsInput) => {
// // //     try {
// // //       // Split the input tags by commas and standardize them to sentence case
// // //       const tagsArray = tagsInput
// // //         .split(',')
// // //         .map((tag) => tag.trim())
// // //         .filter((tag) => tag.length > 0)
// // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //       await api.post(`/files/${fileId}/tag`, { tags: tagsArray }); // Ensure backend endpoint accepts multiple tags
// // //       setActionMessage('Tags added successfully.');
// // //       fetchFiles(); // Refresh the file list
// // //     } catch (error) {
// // //       console.error('Error tagging file:', error);
// // //       setActionMessage('Failed to add tags.');
// // //     }
// // //   };

// // //   // Updated handleRemoveTag to allow removing multiple tags
// // //   const handleRemoveTag = async (fileId, tagsInput) => {
// // //     try {
// // //       const tagsArray = tagsInput
// // //         .split(',')
// // //         .map((tag) => tag.trim())
// // //         .filter((tag) => tag.length > 0)
// // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //       await api.post(`/files/${fileId}/remove_tag`, { tags: tagsArray }); // Ensure backend endpoint exists for removing tags
// // //       setActionMessage('Tags removed successfully.');
// // //       fetchFiles(); // Refresh the file list
// // //     } catch (error) {
// // //       console.error('Error removing tags:', error);
// // //       setActionMessage('Failed to remove tags.');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return <Loader />;
// // //   }

// // //   if (!files || files.length === 0) {
// // //     return <p>No files uploaded yet.</p>;
// // //   }

// // //   return (
// // //     <LibraryContainer>
// // //       <h1>Library</h1>
// // //       {actionMessage && <p>{actionMessage}</p>}

// // //       <TagContainer>
// // //         {tags.map((tag) => (
// // //           <TagButton
// // //             key={tag}
// // //             $active={activeTag === tag}
// // //             onClick={() => setActiveTag(tag)}
// // //             aria-pressed={activeTag === tag}
// // //           >
// // //             {tag}
// // //           </TagButton>
// // //         ))}
// // //       </TagContainer>

// // //       <Tabs>
// // //         <TabList>
// // //           <Tab>All Files</Tab>
// // //           <Tab>Audio</Tab>
// // //           <Tab>Video</Tab>
// // //           <Tab>Images</Tab>
// // //         </TabList>

// // //         <TabPanel>
// // //           <FileDashboard
// // //             uploadedFiles={filteredFiles || []}
// // //             onTagFile={handleTagFile}
// // //             onRemoveTag={handleRemoveTag}
// // //             onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // //           />
// // //         </TabPanel>
// // //         <TabPanel>
// // //           <FileDashboard
// // //             uploadedFiles={audioFiles}
// // //             onTagFile={handleTagFile}
// // //             onRemoveTag={handleRemoveTag}
// // //             onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // //           />
// // //         </TabPanel>
// // //         <TabPanel>
// // //           <FileDashboard
// // //             uploadedFiles={videoFiles}
// // //             onTagFile={handleTagFile}
// // //             onRemoveTag={handleRemoveTag}
// // //             onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // //           />
// // //         </TabPanel>
// // //         <TabPanel>
// // //           <FileDashboard
// // //             uploadedFiles={imageFiles}
// // //             onTagFile={handleTagFile}
// // //             onRemoveTag={handleRemoveTag}
// // //             onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // //           />
// // //         </TabPanel>
// // //       </Tabs>

// // //       {loading && <p>Loading more...</p>}
// // //       {!loading && files.length >= 20 && (
// // //         <button onClick={loadMore} aria-label="Load More Files">
// // //           Load More
// // //         </button>
// // //       )}
// // //     </LibraryContainer>
// // //   );
// // // }

// // // export default Library;

// // // src/components/pages/Library.jsx

// // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // import {
// //   Box,
// //   Grid,
// //   Image,
// //   Text,
// //   Badge,
// //   Button,
// //   IconButton,
// //   Menu,
// //   MenuButton,
// //   MenuList,
// //   MenuItem,
// //   Spinner,
// //   useToast,
// //   Flex,
// //   Tooltip,
// //   Modal,
// //   ModalOverlay,
// //   ModalContent,
// //   ModalHeader,
// //   ModalBody,
// //   ModalCloseButton,
// //   useDisclosure,
// // } from '@chakra-ui/react';
// // import {
// //   FaPlay,
// //   FaEllipsisV,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaSpinner,
// // } from 'react-icons/fa';
// // import { Link } from 'react-router-dom';
// // import api from '../../utils/api';
// // import Loader from '../common/Loader';
// // import PropTypes from 'prop-types';
// // // import FileDashboard from '../common/FileDashboard'; // Ensure this component exists
// // // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';
// // /**
// //  * Helper functions to determine file types.
// //  */
// // const isAudioFile = (type) => type && type.startsWith('audio/');
// // const isVideoFile = (type) => type && type.startsWith('video/');
// // const isImageFile = (type) => type && type.startsWith('image/');
// // // const audioFiles = (files || []).filter((file) => isAudioFile(file.type));
// // // //   const videoFiles = (files || []).filter((file) => isVideoFile(file.type));
// // // //   const imageFiles = (files || []).filter((file) => isImageFile(file.type));
// // /**
// //  * Confirmation Dialog Component for Deletion.
// //  */
// // function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
// //   return (
// //     <Modal isOpen={isOpen} onClose={onClose} isCentered>
// //       <ModalOverlay />
// //       <ModalContent>
// //         <ModalHeader>{title}</ModalHeader>
// //         <ModalCloseButton />
// //         <ModalBody>
// //           <Text>{description}</Text>
// //         </ModalBody>
// //         <Flex justify="flex-end" p={4}>
// //           <Button variant="ghost" mr={3} onClick={onClose}>
// //             Cancel
// //           </Button>
// //           <Button colorScheme="red" onClick={onConfirm}>
// //             Confirm
// //           </Button>
// //         </Flex>
// //       </ModalContent>
// //     </Modal>
// //   );
// // }

// // ConfirmationDialog.propTypes = {
// //   isOpen: PropTypes.bool.isRequired,
// //   onClose: PropTypes.func.isRequired,
// //   onConfirm: PropTypes.func.isRequired,
// //   title: PropTypes.string.isRequired,
// //   description: PropTypes.string.isRequired,
// // };
// // //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

// // /**
// //  * Main Library Component.
// //  */
// // function Library({ onPlayAudio }) {
// //   const [files, setFiles] = useState([]);
// //   const [tags, setTags] = useState(['All']);
// //   const [activeTag, setActiveTag] = useState('All');
// //   const [loading, setLoading] = useState(true);
// //   const [page, setPage] = useState(1);
// //   const [selectedFile, setSelectedFile] = useState(null);

// //   // Properly destructured useDisclosure for delete confirmation
// //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  
// //   const toast = useToast();

// //   /**
// //    * Fetch files from the API based on the active tag and page number.
// //    */
// //   const fetchFiles = useCallback(async (pageNum = 1) => {
// //     setLoading(true);
// //     try {
// //       const response = await api.get('/file_history', {
// //         params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
// //       });

// //       if (response.data && Array.isArray(response.data.files)) {
// //         setFiles(pageNum === 1 ? response.data.files : [...(files || []), ...response.data.files]);
// //         if (pageNum === 1) {
// //           const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// //           setTags(allTags);
// //         }
// //         setPage(pageNum);
// //       } else {
// //         console.log('No files returned from the API or incorrect data structure.');
// //         if (pageNum === 1) {
// //           setFiles([]);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching file history:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to fetch files.';
// //       toast({
// //         title: 'Error',
// //         description: errorMessage,
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [activeTag, files, toast]);

// //   /**
// //    * Load more files for pagination.
// //    */
// //   const loadMore = () => {
// //     fetchFiles(page + 1);
// //   };

// //   /**
// //    * Fetch files on component mount and when activeTag changes.
// //    */
// //   useEffect(() => {
// //     fetchFiles();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [activeTag]);

// //   /**
// //    * Memoize filtered files to improve performance.
// //    */
// //   const filteredFiles = useMemo(() => {
// //     return activeTag === 'All'
// //       ? files
// //       : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));
// //   }, [activeTag, files]);

// //   /**
// //    * Handle adding tags to a file.
// //    */
// //   const handleTagFile = useCallback(async (fileId, tagsInput) => {
// //     try {
// //       const tagsArray = tagsInput
// //         .split(',')
// //         .map((tag) => tag.trim())
// //         .filter((tag) => tag.length > 0)
// //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// //       await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// //       toast({
// //         title: 'Success',
// //         description: 'Tags added successfully.',
// //         status: 'success',
// //         duration: 3000,
// //         isClosable: true,
// //       });
// //       fetchFiles(); // Refresh the file list
// //     } catch (error) {
// //       console.error('Error tagging file:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to add tags.';
// //       toast({
// //         title: 'Error',
// //         description: errorMessage,
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       });
// //     }
// //   }, [fetchFiles, toast]);

// //   /**
// //    * Handle removing tags from a file.
// //    */
// //   const handleRemoveTag = useCallback(async (fileId, tagsInput) => {
// //     try {
// //       const tagsArray = tagsInput
// //         .split(',')
// //         .map((tag) => tag.trim())
// //         .filter((tag) => tag.length > 0)
// //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// //       await api.post(`/files/${fileId}/remove_tag`, { tags: tagsArray });
// //       toast({
// //         title: 'Success',
// //         description: 'Tags removed successfully.',
// //         status: 'success',
// //         duration: 3000,
// //         isClosable: true,
// //       });
// //       fetchFiles(); // Refresh the file list
// //     } catch (error) {
// //       console.error('Error removing tags:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to remove tags.';
// //       toast({
// //         title: 'Error',
// //         description: errorMessage,
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       });
// //     }
// //   }, [fetchFiles, toast]);

// //   /**
// //    * Handle opening contextual menu for a specific file.
// //    */
// //   const handleMenuOpen = (file) => {
// //     setSelectedFile(file);
// //   };

// //   /**
// //    * Handle closing contextual menu.
// //    */
// //   const handleMenuClose = () => {
// //     setSelectedFile(null);
// //   };

// //   /**
// //    * Handle actions from the contextual menu.
// //    */
// //   const handleMenuAction = async (action) => {
// //     if (!selectedFile) return;

// //     switch (action) {
// //       case 'process':
// //         await initiateProcess(selectedFile.id);
// //         break;
// //       case 'analyze':
// //         await initiateAnalyze(selectedFile.id);
// //         break;
// //       case 'viewDetails':
// //         // Navigation is handled by Link, so no action needed here
// //         break;
// //       case 'download':
// //         await downloadFile(selectedFile.id);
// //         break;
// //       case 'delete':
// //         onDeleteOpen();
// //         break;
// //       default:
// //         break;
// //     }

// //     handleMenuClose();
// //   };

// //   /**
// //    * Initiate processing of a file.
// //    */
// //   const initiateProcess = useCallback(async (fileId) => {
// //     try {
// //       await api.post(`/files/${fileId}/process`);
// //       toast({
// //         title: 'Processing',
// //         description: 'Processing started.',
// //         status: 'info',
// //         duration: 3000,
// //         isClosable: true,
// //       });
// //       fetchFiles();
// //     } catch (error) {
// //       console.error('Error initiating processing:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to start processing.';
// //       toast({
// //         title: 'Error',
// //         description: errorMessage,
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       });
// //     }
// //   }, [fetchFiles, toast]);

// //   /**
// //    * Initiate analysis of a file.
// //    */
// //   const initiateAnalyze = useCallback(async (fileId) => {
// //     try {
// //       await api.post(`/files/${fileId}/analyze`);
// //       toast({
// //         title: 'Analysis',
// //         description: 'Analysis started.',
// //         status: 'info',
// //         duration: 3000,
// //         isClosable: true,
// //       });
// //       fetchFiles();
// //     } catch (error) {
// //       console.error('Error initiating analysis:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to start analysis.';
// //       toast({
// //         title: 'Error',
// //         description: errorMessage,
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       });
// //     }
// //   }, [fetchFiles, toast]);

// //   /**
// //    * Download a file.
// //    */
// //   const downloadFile = useCallback(async (fileId) => {
// //     try {
// //       const response = await api.get(`/files/${fileId}/download`, { responseType: 'blob' });
// //       const url = window.URL.createObjectURL(new Blob([response.data]));
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.setAttribute('download', `file_${fileId}`); // Adjust file naming as needed
// //       document.body.appendChild(link);
// //       link.click();
// //       link.parentNode.removeChild(link);
// //       toast({
// //         title: 'Download',
// //         description: 'Download started.',
// //         status: 'success',
// //         duration: 3000,
// //         isClosable: true,
// //       });
// //     } catch (error) {
// //       console.error('Error downloading file:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to download file.';
// //       toast({
// //         title: 'Error',
// //         description: errorMessage,
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       });
// //     }
// //   }, [toast]);

// //   /**
// //    * Delete a file with confirmation.
// //    */
// //   const deleteFile = useCallback(async () => {
// //     if (!selectedFile) return;

// //     try {
// //       await api.delete(`/files/${selectedFile.id}`);
// //       toast({
// //         title: 'Deleted',
// //         description: 'File deleted successfully.',
// //         status: 'success',
// //         duration: 3000,
// //         isClosable: true,
// //       });
// //       fetchFiles();
// //     } catch (error) {
// //       console.error('Error deleting file:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to delete file.';
// //       toast({
// //         title: 'Error',
// //         description: errorMessage,
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       });
// //     } finally {
// //       setSelectedFile(null);
// //       onDeleteClose();
// //     }
// //   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

// //   /**
// //    * Conditional rendering based on loading state and file availability.
// //    */
// //   if (loading && page === 1) {
// //     return <Loader />;
// //   }

// //   if (!files || files.length === 0) {
// //     return (
// //       <Box p={5}>
// //         <Text fontSize="2xl" mb={4}>
// //           Library
// //         </Text>
// //         <Text>No files uploaded yet.</Text>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={5}>
// //       <Text fontSize="2xl" mb={4}>
// //         Library
// //       </Text>

// //       {/* Tag Filters */}
// //       <Flex mb={6} wrap="wrap">
// //         {tags.map((tag) => (
// //           <Button
// //             key={tag}
// //             size="sm"
// //             mr={2}
// //             mb={2}
// //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// //             onClick={() => setActiveTag(tag)}
// //             aria-pressed={activeTag === tag}
// //             aria-label={`Filter by ${tag}`} // Added aria-label for accessibility
// //           >
// //             {tag}
// //           </Button>
// //         ))}
// //       </Flex>

// //       {/* Files Grid */}
// //       <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
// //         {filteredFiles.map((file) => (
// //           <Box
// //             key={file.id}
// //             borderWidth="1px"
// //             borderRadius="lg"
// //             overflow="hidden"
// //             position="relative"
// //             bg="neutral"
// //             _hover={{ boxShadow: 'lg' }}
// //           >
// //             {/* Thumbnail */}
// //             <Link to={`/media/${file.id}`} aria-label={`View details of ${file.filename}`}>
// //               <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
// //             </Link>

// //             {/* File Name and Tags */}
// //             <Box p="6">
// //               <Flex align="baseline">
// //                 <Text
// //                   fontWeight="semibold"
// //                   as="h4"
// //                   lineHeight="tight"
// //                   isTruncated
// //                   title={file.filename}
// //                   mb={2}
// //                 >
// //                   {file.filename}
// //                 </Text>
// //               </Flex>
// //               <Box>
// //                 {file.tags.slice(0, 3).map((tag) => (
// //                   <Badge key={tag} mr={1} mb={1} colorScheme="teal">
// //                     {tag}
// //                   </Badge>
// //                 ))}
// //                 {file.tags.length > 3 && (
// //                   <Badge colorScheme="teal">+{file.tags.length - 3}</Badge>
// //                 )}
// //               </Box>
// //             </Box>

// //             {/* Status Indicator */}
// //             {file.processing_status && (
// //               <Tooltip label={`Status: ${file.processing_status}`} placement="top">
// //                 <Box
// //                   position="absolute"
// //                   top="2"
// //                   left="2"
// //                   color={
// //                     file.processing_status === 'error'
// //                       ? 'red.500'
// //                       : file.processing_status === 'completed'
// //                       ? 'green.500'
// //                       : 'blue.500'
// //                   }
// //                 >
// //                   {file.processing_status === 'completed' && <FaCheckCircle />}
// //                   {file.processing_status === 'processing' && <FaSpinner className="spin" />}
// //                   {file.processing_status === 'error' && <FaTimesCircle />}
// //                 </Box>
// //               </Tooltip>
// //             )}

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
// //               <IconButton
// //                 aria-label={`Play ${file.filename}`}
// //                 icon={<FaPlay />}
// //                 colorScheme="teal"
// //                 size="lg"
// //                 m={2}
// //                 onClick={() => onPlayAudio(file.id)} // Updated to pass file.id
// //               />
// //               <Link to={`/media/${file.id}`}>
// //                 <IconButton
// //                   aria-label={`View details of ${file.filename}`}
// //                   icon={<FaEllipsisV />}
// //                   colorScheme="teal"
// //                   size="lg"
// //                   m={2}
// //                 />
// //               </Link>
// //             </Box>

// //             {/* Contextual Menu */}
// //             <Menu>
// //               <MenuButton
// //                 as={IconButton}
// //                 aria-label={`More actions for ${file.filename}`}
// //                 icon={<FaEllipsisV />}
// //                 variant="outline"
// //                 position="absolute"
// //                 top="2"
// //                 right="2"
// //               />
// //               <MenuList>
// //                 <MenuItem onClick={() => handleMenuAction('process')}>Process</MenuItem>
// //                 <MenuItem onClick={() => handleMenuAction('analyze')}>Analyze</MenuItem>
// //                 <MenuItem onClick={() => handleMenuAction('viewDetails')}>View Details</MenuItem>
// //                 <MenuItem onClick={() => handleMenuAction('download')}>Download</MenuItem>
// //                 <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
// //               </MenuList>
// //             </Menu>
// //           </Box>
// //         ))}
// //       </Grid>

// //       {/* Load More Button */}
// //       {!loading && files.length >= 20 && (
// //         <Flex justify="center" mt={6}>
// //           <Button onClick={loadMore} colorScheme="blue">
// //             Load More
// //           </Button>
// //         </Flex>
// //       )}

// //       {/* Loading Indicator for Pagination */}
// //       {loading && page > 1 && (
// //         <Flex justify="center" mt={6}>
// //           <Spinner />
// //         </Flex>
// //       )}

// //       {/* Delete Confirmation Dialog */}
// //       <ConfirmationDialog
// //         isOpen={isDeleteOpen}
// //         onClose={onDeleteClose}
// //         onConfirm={deleteFile}
// //         title="Confirm Deletion"
// //         description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
// //       />
    
// //     </Box>
// //   )}
// //     Library.propTypes = {
// //       onPlayAudio: PropTypes.func.isRequired,
// //     };

// // //     export default Library;
// // // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // // import {
// // //   Box,
// // //   Grid,
// // //   Image,
// // //   Text,
// // //   Badge,
// // //   Button,
// // //   IconButton,
// // //   Menu,
// // //   MenuButton,
// // //   MenuList,
// // //   MenuItem,
// // //   Spinner,
// // //   useToast,
// // //   Flex,
// // //   Tooltip,
// // //   Modal,
// // //   ModalOverlay,
// // //   ModalContent,
// // //   ModalHeader,
// // //   ModalBody,
// // //   ModalCloseButton,
// // //   useDisclosure,
// // // } from '@chakra-ui/react';
// // // import {
// // //   FaPlay,
// // //   FaEllipsisV,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaSpinner,
// // // } from 'react-icons/fa';
// // // import { Link } from 'react-router-dom';
// // // import api from '../../utils/api';
// // // import Loader from '../common/Loader';
// // // import PropTypes from 'prop-types';

// // // /**
// // //  * Helper functions to determine file types.
// // //  */
// // // const isAudioFile = (type) => type && type.startsWith('audio/');
// // // const isVideoFile = (type) => type && type.startsWith('video/');
// // // const isImageFile = (type) => type && type.startsWith('image/');

// // // /**
// // //  * Confirmation Dialog Component for Deletion.
// // //  */
// // // function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
// // //   return (
// // //     <Modal isOpen={isOpen} onClose={onClose} isCentered>
// // //       <ModalOverlay />
// // //       <ModalContent>
// // //         <ModalHeader>{title}</ModalHeader>
// // //         <ModalCloseButton />
// // //         <ModalBody>
// // //           <Text>{description}</Text>
// // //         </ModalBody>
// // //         <Flex justify="flex-end" p={4}>
// // //           <Button variant="ghost" mr={3} onClick={onClose}>
// // //             Cancel
// // //           </Button>
// // //           <Button colorScheme="red" onClick={onConfirm}>
// // //             Confirm
// // //           </Button>
// // //         </Flex>
// // //       </ModalContent>
// // //     </Modal>
// // //   );
// // // }

// // // ConfirmationDialog.propTypes = {
// // //   isOpen: PropTypes.bool.isRequired,
// // //   onClose: PropTypes.func.isRequired,
// // //   onConfirm: PropTypes.func.isRequired,
// // //   title: PropTypes.string.isRequired,
// // //   description: PropTypes.string.isRequired,
// // // };

// // // /**
// // //  * Main Library Component.
// // //  */
// // // function Library({ onPlayAudio }) {
// // //   const [files, setFiles] = useState([]);
// // //   const [tags, setTags] = useState(['All']);
// // //   const [activeTag, setActiveTag] = useState('All');
// // //   const [loading, setLoading] = useState(true);
// // //   const [page, setPage] = useState(1);
// // //   const [selectedFile, setSelectedFile] = useState(null);

// // //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  
// // //   const toast = useToast();

// // //   const fetchFiles = useCallback(async (pageNum = 1) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await api.get('/file_history', {
// // //         params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
// // //       });

// // //       if (response.data && Array.isArray(response.data.files)) {
// // //         setFiles(prevFiles => pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]);
// // //         if (pageNum === 1) {
// // //           const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// // //           setTags(allTags);
// // //         }
// // //         setPage(pageNum);
// // //       } else {
// // //         console.log('No files returned from the API or incorrect data structure.');
// // //         if (pageNum === 1) {
// // //           setFiles([]);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching file history:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to fetch files.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [activeTag, toast]);

// // //   const loadMore = () => {
// // //     fetchFiles(page + 1);
// // //   };

// // //   useEffect(() => {
// // //     fetchFiles();
// // //   }, [fetchFiles, activeTag]);

// // //   const filteredFiles = useMemo(() => {
// // //     return activeTag === 'All'
// // //       ? files
// // //       : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));
// // //   }, [activeTag, files]);

// // //   const handleTagFile = useCallback(async (fileId, tagsInput) => {
// // //     try {
// // //       const tagsArray = tagsInput
// // //         .split(',')
// // //         .map((tag) => tag.trim())
// // //         .filter((tag) => tag.length > 0)
// // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //       await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// // //       toast({
// // //         title: 'Success',
// // //         description: 'Tags added successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error tagging file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to add tags.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const handleRemoveTag = useCallback(async (fileId, tagsInput) => {
// // //     try {
// // //       const tagsArray = tagsInput
// // //         .split(',')
// // //         .map((tag) => tag.trim())
// // //         .filter((tag) => tag.length > 0)
// // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //       await api.post(`/files/${fileId}/remove_tag`, { tags: tagsArray });
// // //       toast({
// // //         title: 'Success',
// // //         description: 'Tags removed successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error removing tags:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to remove tags.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const handleMenuOpen = (file) => {
// // //     setSelectedFile(file);
// // //   };

// // //   const handleMenuClose = () => {
// // //     setSelectedFile(null);
// // //   };

// // //   const handleMenuAction = async (action) => {
// // //     if (!selectedFile) return;

// // //     switch (action) {
// // //       case 'process':
// // //         await initiateProcess(selectedFile.id);
// // //         break;
// // //       case 'analyze':
// // //         await initiateAnalyze(selectedFile.id);
// // //         break;
// // //       case 'viewDetails':
// // //         // Navigation is handled by Link, so no action needed here
// // //         break;
// // //       case 'download':
// // //         await downloadFile(selectedFile.id);
// // //         break;
// // //       case 'delete':
// // //         onDeleteOpen();
// // //         break;
// // //       default:
// // //         break;
// // //     }

// // //     handleMenuClose();
// // //   };

// // //   const initiateProcess = useCallback(async (fileId) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/process`);
// // //       toast({
// // //         title: 'Processing',
// // //         description: 'Processing started.',
// // //         status: 'info',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error initiating processing:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to start processing.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const initiateAnalyze = useCallback(async (fileId) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/analyze`);
// // //       toast({
// // //         title: 'Analysis',
// // //         description: 'Analysis started.',
// // //         status: 'info',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error initiating analysis:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to start analysis.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const downloadFile = useCallback(async (fileId) => {
// // //     try {
// // //       const response = await api.get(`/files/${fileId}/download`, { responseType: 'blob' });
// // //       const url = window.URL.createObjectURL(new Blob([response.data]));
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.setAttribute('download', `file_${fileId}`);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.parentNode.removeChild(link);
// // //       toast({
// // //         title: 'Download',
// // //         description: 'Download started.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //     } catch (error) {
// // //       console.error('Error downloading file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to download file.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [toast]);

// // //   const deleteFile = useCallback(async () => {
// // //     if (!selectedFile) return;

// // //     try {
// // //       await api.delete(`/files/${selectedFile.id}`);
// // //       toast({
// // //         title: 'Deleted',
// // //         description: 'File deleted successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error deleting file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to delete file.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     } finally {
// // //       setSelectedFile(null);
// // //       onDeleteClose();
// // //     }
// // //   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

// // //   if (loading && page === 1) {
// // //     return <Loader />;
// // //   }

// // //   if (!files || files.length === 0) {
// // //     return (
// // //       <Box p={5}>
// // //         <Text fontSize="2xl" mb={4}>
// // //           Library
// // //         </Text>
// // //         <Text>No files uploaded yet.</Text>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box p={5}>
// // //       <Text fontSize="2xl" mb={4}>
// // //         Library
// // //       </Text>

// // //       <Flex mb={6} wrap="wrap">
// // //         {tags.map((tag) => (
// // //           <Button
// // //             key={tag}
// // //             size="sm"
// // //             mr={2}
// // //             mb={2}
// // //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// // //             onClick={() => setActiveTag(tag)}
// // //             aria-pressed={activeTag === tag}
// // //             aria-label={`Filter by ${tag}`}
// // //           >
// // //             {tag}
// // //           </Button>
// // //         ))}
// // //       </Flex>

// // //       <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
// // //         {filteredFiles.map((file) => (
// // //           <Box
// // //             key={file.id}
// // //             borderWidth="1px"
// // //             borderRadius="lg"
// // //             overflow="hidden"
// // //             position="relative"
// // //             bg="neutral"
// // //             _hover={{ boxShadow: 'lg' }}
// // //           >
// // //             <Link to={`/media/${file.id}`} aria-label={`View details of ${file.filename}`}>
// // //               <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
// // //             </Link>

// // //             <Box p="6">
// // //               <Flex align="baseline">
// // //                 <Text
// // //                   fontWeight="semibold"
// // //                   as="h4"
// // //                   lineHeight="tight"
// // //                   isTruncated
// // //                   title={file.filename}
// // //                   mb={2}
// // //                 >
// // //                   {file.filename}
// // //                 </Text>
// // //               </Flex>
// // //               <Box>
// // //                 {file.tags.slice(0, 3).map((tag) => (
// // //                   <Badge key={tag} mr={1} mb={1} colorScheme="teal">
// // //                     {tag}
// // //                   </Badge>
// // //                 ))}
// // //                 {file.tags.length > 3 && (
// // //                   <Badge colorScheme="teal">+{file.tags.length - 3}</Badge>
// // //                 )}
// // //               </Box>
// // //             </Box>

// // //             {file.processing_status && (
// // //               <Tooltip label={`Status: ${file.processing_status}`} placement="top">
// // //                 <Box
// // //                   position="absolute"
// // //                   top="2"
// // //                   left="2"
// // //                   color={
// // //                     file.processing_status === 'error'
// // //                       ? 'red.500'
// // //                       : file.processing_status === 'completed'
// // //                       ? 'green.500'
// // //                       : 'blue.500'
// // //                   }
// // //                 >
// // //                   {file.processing_status === 'completed' && <FaCheckCircle />}
// // //                   {file.processing_status === 'processing' && <FaSpinner className="spin" />}
// // //                   {file.processing_status === 'error' && <FaTimesCircle />}
// // //                 </Box>
// // //               </Tooltip>
// // //             )}

// // //             <Box
// // //               position="absolute"
// // //               top="0"
// // //               left="0"
// // //               width="100%"
// // //               height="100%"
// // //               bg="blackAlpha.600"
// // //               opacity="0"
// // //               transition="opacity 0.3s"
// // //               _hover={{ opacity: 1 }}
// // //               display="flex"
// // //               justifyContent="center"
// // //               alignItems="center"
// // //             >
// // //               <IconButton
// // //                 aria-label={`Play ${file.filename}`}
// // //                 icon={<FaPlay />}
// // //                 colorScheme="teal"
// // //                 size="lg"
// // //                 m={2}
// // //                 onClick={() => onPlayAudio(file.id)}
// // //               />
             
// // //                   <Link to={`/media/${file.id}`}>
// // //                 <IconButton
// // //                   aria-label={`View details of ${file.filename}`}
// // //                   icon={<FaEllipsisV />}
// // //                   colorScheme="teal"
// // //                   size="lg"
// // //                   m={2}
// // //                 />
// // //               </Link>
// // //             </Box>

// // //             <Menu>
// // //               <MenuButton
// // //                 as={IconButton}
// // //                 aria-label={`More actions for ${file.filename}`}
// // //                 icon={<FaEllipsisV />}
// // //                 variant="outline"
// // //                 position="absolute"
// // //                 top="2"
// // //                 right="2"
// // //               />
// // //               <MenuList>
// // //                 <MenuItem onClick={() => handleMenuAction('process')}>Process</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('analyze')}>Analyze</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('viewDetails')}>View Details</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('download')}>Download</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
// // //               </MenuList>
// // //             </Menu>
// // //           </Box>
// // //         ))}
// // //       </Grid>

// // //       {!loading && files.length >= 20 && (
// // //         <Flex justify="center" mt={6}>
// // //           <Button onClick={loadMore} colorScheme="blue">
// // //             Load More
// // //           </Button>
// // //         </Flex>
// // //       )}

// // //       {loading && page > 1 && (
// // //         <Flex justify="center" mt={6}>
// // //           <Spinner />
// // //         </Flex>
// // //       )}

// // //       <ConfirmationDialog
// // //         isOpen={isDeleteOpen}
// // //         onClose={onDeleteClose}
// // //         onConfirm={deleteFile}
// // //         title="Confirm Deletion"
// // //         description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
// // //       />
// // //     </Box>
// // //   );
// // // }

// // // Library.propTypes = {
// // //   onPlayAudio: PropTypes.func.isRequired,
// // // };

// // // export default Library;

// // // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // // import {
// // //   Box,
// // //   Grid,
// // //   Image,
// // //   Text,
// // //   Badge,
// // //   Button,
// // //   IconButton,
// // //   Menu,
// // //   MenuButton,
// // //   MenuList,
// // //   MenuItem,
// // //   Spinner,
// // //   useToast,
// // //   Flex,
// // //   Tooltip,
// // //   Modal,
// // //   ModalOverlay,
// // //   ModalContent,
// // //   ModalHeader,
// // //   ModalBody,
// // //   ModalCloseButton,
// // //   useDisclosure,
// // // } from '@chakra-ui/react';
// // // import {
// // //   FaPlay,
// // //   FaEllipsisV,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaSpinner,
// // // } from 'react-icons/fa';
// // // import { Link } from 'react-router-dom';
// // // import api from '../../utils/api';
// // // import Loader from '../common/Loader';
// // // import PropTypes from 'prop-types';

// // // const isAudioFile = (type) => type && type.startsWith('audio/');
// // // const isVideoFile = (type) => type && type.startsWith('video/');
// // // const isImageFile = (type) => type && type.startsWith('image/');

// // // function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
// // //   return (
// // //     <Modal isOpen={isOpen} onClose={onClose} isCentered>
// // //       <ModalOverlay />
// // //       <ModalContent>
// // //         <ModalHeader>{title}</ModalHeader>
// // //         <ModalCloseButton />
// // //         <ModalBody>
// // //           <Text>{description}</Text>
// // //         </ModalBody>
// // //         <Flex justify="flex-end" p={4}>
// // //           <Button variant="ghost" mr={3} onClick={onClose}>
// // //             Cancel
// // //           </Button>
// // //           <Button colorScheme="red" onClick={onConfirm}>
// // //             Confirm
// // //           </Button>
// // //         </Flex>
// // //       </ModalContent>
// // //     </Modal>
// // //   );
// // // }

// // // ConfirmationDialog.propTypes = {
// // //   isOpen: PropTypes.bool.isRequired,
// // //   onClose: PropTypes.func.isRequired,
// // //   onConfirm: PropTypes.func.isRequired,
// // //   title: PropTypes.string.isRequired,
// // //   description: PropTypes.string.isRequired,
// // // };

// // // function Library({ onPlayAudio }) {
// // //   const [files, setFiles] = useState([]);
// // //   const [tags, setTags] = useState(['All']);
// // //   const [activeTag, setActiveTag] = useState('All');
// // //   const [loading, setLoading] = useState(true);
// // //   const [page, setPage] = useState(1);
// // //   const [selectedFile, setSelectedFile] = useState(null);

// // //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  
// // //   const toast = useToast();

// // //   const fetchFiles = useCallback(async (pageNum = 1) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await api.get('/file_history', {
// // //         params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
// // //       });

// // //       if (response.data && Array.isArray(response.data.files)) {
// // //         setFiles(prevFiles => pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]);
// // //         if (pageNum === 1) {
// // //           const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// // //           setTags(allTags);
// // //         }
// // //         setPage(pageNum);
// // //       } else {
// // //         console.log('No files returned from the API or incorrect data structure.');
// // //         if (pageNum === 1) {
// // //           setFiles([]);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching file history:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to fetch files.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [activeTag, toast]);

// // //   const loadMore = () => {
// // //     fetchFiles(page + 1);
// // //   };

// // //   useEffect(() => {
// // //     fetchFiles();
// // //   }, [fetchFiles, activeTag]);

// // //   const filteredFiles = useMemo(() => {
// // //     return activeTag === 'All'
// // //       ? files
// // //       : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));
// // //   }, [activeTag, files]);

// // //   const handleTagFile = useCallback(async (fileId, tagsInput) => {
// // //     try {
// // //       const tagsArray = tagsInput
// // //         .split(',')
// // //         .map((tag) => tag.trim())
// // //         .filter((tag) => tag.length > 0)
// // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //       await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// // //       toast({
// // //         title: 'Success',
// // //         description: 'Tags added successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error tagging file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to add tags.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const handleRemoveTag = useCallback(async (fileId, tagsInput) => {
// // //     try {
// // //       const tagsArray = tagsInput
// // //         .split(',')
// // //         .map((tag) => tag.trim())
// // //         .filter((tag) => tag.length > 0)
// // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //       await api.post(`/files/${fileId}/remove_tag`, { tags: tagsArray });
// // //       toast({
// // //         title: 'Success',
// // //         description: 'Tags removed successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error removing tags:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to remove tags.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const handleMenuAction = async (action) => {
// // //     if (!selectedFile) return;

// // //     switch (action) {
// // //       case 'process':
// // //         await initiateProcess(selectedFile.id);
// // //         break;
// // //       case 'analyze':
// // //         await initiateAnalyze(selectedFile.id);
// // //         break;
// // //       case 'viewDetails':
// // //         // Navigation is handled by Link, so no action needed here
// // //         break;
// // //       case 'download':
// // //         await downloadFile(selectedFile.id);
// // //         break;
// // //       case 'delete':
// // //         onDeleteOpen();
// // //         break;
// // //       default:
// // //         break;
// // //     }

// // //     setSelectedFile(null);
// // //   };

// // //   const initiateProcess = useCallback(async (fileId) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/process`);
// // //       toast({
// // //         title: 'Processing',
// // //         description: 'Processing started.',
// // //         status: 'info',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error initiating processing:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to start processing.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const initiateAnalyze = useCallback(async (fileId) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/analyze`);
// // //       toast({
// // //         title: 'Analysis',
// // //         description: 'Analysis started.',
// // //         status: 'info',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error initiating analysis:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to start analysis.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const downloadFile = useCallback(async (fileId) => {
// // //     try {
// // //       const response = await api.get(`/files/${fileId}/download`, { responseType: 'blob' });
// // //       const url = window.URL.createObjectURL(new Blob([response.data]));
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.setAttribute('download', `file_${fileId}`);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.parentNode.removeChild(link);
// // //       toast({
// // //         title: 'Download',
// // //         description: 'Download started.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //     } catch (error) {
// // //       console.error('Error downloading file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to download file.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [toast]);

// // //   const deleteFile = useCallback(async () => {
// // //     if (!selectedFile) return;

// // //     try {
// // //       await api.delete(`/files/${selectedFile.id}`);
// // //       toast({
// // //         title: 'Deleted',
// // //         description: 'File deleted successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error deleting file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to delete file.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     } finally {
// // //       setSelectedFile(null);
// // //       onDeleteClose();
// // //     }
// // //   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

// // //   if (loading && page === 1) {
// // //     return <Loader />;
// // //   }

// // //   if (!files || files.length === 0) {
// // //     return (
// // //       <Box p={5}>
// // //         <Text fontSize="2xl" mb={4}>
// // //           Library
// // //         </Text>
// // //         <Text>No files uploaded yet.</Text>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box p={5}>
// // //       <Text fontSize="2xl" mb={4}>
// // //         Library
// // //       </Text>

// // //       <Flex mb={6} wrap="wrap">
// // //         {tags.map((tag) => (
// // //           <Button
// // //             key={tag}
// // //             size="sm"
// // //             mr={2}
// // //             mb={2}
// // //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// // //             onClick={() => setActiveTag(tag)}
// // //             aria-pressed={activeTag === tag}
// // //             aria-label={`Filter by ${tag}`}
// // //           >
// // //             {tag}
// // //           </Button>
// // //         ))}
// // //       </Flex>

// // //       <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
// // //         {filteredFiles.map((file) => (
// // //           <Box
// // //             key={file.id}
// // //             borderWidth="1px"
// // //             borderRadius="lg"
// // //             overflow="hidden"
// // //             position="relative"
// // //             bg="neutral"
// // //             _hover={{ boxShadow: 'lg' }}
// // //           >
// // //             <Link to={`/media/${file.id}`} aria-label={`View details of ${file.filename}`}>
// // //               <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
// // //             </Link>

// // //             <Box p="6">
// // //               <Flex align="baseline">
// // //                 <Text
// // //                   fontWeight="semibold"
// // //                   as="h4"
// // //                   lineHeight="tight"
// // //                   isTruncated
// // //                   title={file.filename}
// // //                   mb={2}
// // //                 >
// // //                   {file.filename}
// // //                 </Text>
// // //               </Flex>
// // //               <Box>
// // //                 {file.tags.slice(0, 3).map((tag) => (
// // //                   <Badge key={tag} mr={1} mb={1} colorScheme="teal">
// // //                     {tag}
// // //                   </Badge>
// // //                 ))}
// // //                 {file.tags.length > 3 && (
// // //                   <Badge colorScheme="teal">+{file.tags.length - 3}</Badge>
// // //                 )}
// // //               </Box>
// // //             </Box>

// // //             {file.processing_status && (
// // //               <Tooltip label={`Status: ${file.processing_status}`} placement="top">
// // //                 <Box
// // //                   position="absolute"
// // //                   top="2"
// // //                   left="2"
// // //                   color={
// // //                     file.processing_status === 'error'
// // //                       ? 'red.500'
// // //                       : file.processing_status === 'completed'
// // //                       ? 'green.500'
// // //                       : 'blue.500'
// // //                   }
// // //                 >
// // //                   {file.processing_status === 'completed' && <FaCheckCircle />}
// // //                   {file.processing_status === 'processing' && <FaSpinner className="spin" />}
// // //                   {file.processing_status === 'error' && <FaTimesCircle />}
// // //                 </Box>
// // //               </Tooltip>
// // //             )}

// // //             <Box
// // //               position="absolute"
// // //               top="0"
// // //               left="0"
// // //               width="100%"
// // //               height="100%"
// // //               bg="blackAlpha.600"
// // //               opacity="0"
// // //               transition="opacity 0.3s"
// // //               _hover={{ opacity: 1 }}
// // //               display="flex"
// // //               justifyContent="center"
// // //               alignItems="center"
// // //             >
// // //               {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// // //                 <IconButton
// // //                   aria-label={`Play ${file.filename}`}
// // //                   icon={<FaPlay />}
// // //                   colorScheme="teal"
// // //                   size="lg"
// // //                   m={2}
// // //                   onClick={() => onPlayAudio(file)}
// // //                 />
// // //               )}
// // //               <Link to={`/media/${file.id}`}>
// // //                 <IconButton
// // //                   aria-label={`View details of ${file.filename}`}
// // //                   icon={<FaEllipsisV />}
// // //                   colorScheme="teal"
// // //                   size="lg"
// // //                   m={2}
// // //                 />
// // //               </Link>
// // //             </Box>

// // //             <Menu>
// // //               <MenuButton
// // //                 as={IconButton}
// // //                 aria-label={`More actions for ${file.filename}`}
// // //                 icon={<FaEllipsisV />}
// // //                 variant="outline"
// // //                 position="absolute"
// // //                 top="2"
// // //                 right="2"
// // //                 onClick={() => setSelectedFile(file)}
// // //               />
// // //               <MenuList>
// // //                 <MenuItem onClick={() => handleMenuAction('process')}>Process</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('analyze')}>Analyze</MenuItem>
// // //                 <MenuItem as={Link} to={`/media/${file.id}`}>View Details</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('download')}>Download</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
// // //               </MenuList>
// // //             </Menu>
// // //           </Box>
// // //         ))}
// // //       </Grid>

// // //       {!loading && files.length >= 20 && (
// // //         <Flex justify="center" mt={6}>
// // //           <Button onClick={loadMore} colorScheme="blue">
// // //             Load More
// // //           </Button>
// // //         </Flex>
// // //       )}

// // //       {loading && page > 1 && (
// // //         <Flex justify="center" mt={6}>
// // //           <Spinner />
// // //         </Flex>
// // //       )}

// // //       <ConfirmationDialog
// // //         isOpen={isDeleteOpen}
// // //         onClose={onDeleteClose}
// // //         onConfirm={deleteFile}
// // //         title="Confirm Deletion"
// // //         description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
// // //       />
// // //     </Box>
// // //   );
// // // }

// // // Library.propTypes = {
// // //   onPlayAudio: PropTypes.func.isRequired,
// // // };

// // // export default Library;

// // // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // // import {
// // //   Box,
// // //   Grid,
// // //   Image,
// // //   Text,
// // //   Badge,
// // //   Button,
// // //   IconButton,
// // //   Menu,
// // //   MenuButton,
// // //   MenuList,
// // //   MenuItem,
// // //   Spinner,
// // //   useToast,
// // //   Flex,
// // //   Tooltip,
// // //   Modal,
// // //   ModalOverlay,
// // //   ModalContent,
// // //   ModalHeader,
// // //   ModalBody,
// // //   ModalCloseButton,
// // //   useDisclosure,
// // // } from '@chakra-ui/react';
// // // import {
// // //   FaPlay,
// // //   FaEllipsisV,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaSpinner,
// // // } from 'react-icons/fa';
// // // import { Link } from 'react-router-dom';
// // // import api from '../../utils/api';
// // // import Loader from '../common/Loader';
// // // import PropTypes from 'prop-types';

// // // const isAudioFile = (type) => type && type.startsWith('audio/');
// // // const isVideoFile = (type) => type && type.startsWith('video/');
// // // const isImageFile = (type) => type && type.startsWith('image/');

// // // function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
// // //   return (
// // //     <Modal isOpen={isOpen} onClose={onClose} isCentered>
// // //       <ModalOverlay />
// // //       <ModalContent>
// // //         <ModalHeader>{title}</ModalHeader>
// // //         <ModalCloseButton />
// // //         <ModalBody>
// // //           <Text>{description}</Text>
// // //         </ModalBody>
// // //         <Flex justify="flex-end" p={4}>
// // //           <Button variant="ghost" mr={3} onClick={onClose}>
// // //             Cancel
// // //           </Button>
// // //           <Button colorScheme="red" onClick={onConfirm}>
// // //             Confirm
// // //           </Button>
// // //         </Flex>
// // //       </ModalContent>
// // //     </Modal>
// // //   );
// // // }

// // // ConfirmationDialog.propTypes = {
// // //   isOpen: PropTypes.bool.isRequired,
// // //   onClose: PropTypes.func.isRequired,
// // //   onConfirm: PropTypes.func.isRequired,
// // //   title: PropTypes.string.isRequired,
// // //   description: PropTypes.string.isRequired,
// // // };

// // // function Library({ onPlayAudio }) {
// // //   const [files, setFiles] = useState([]);
// // //   const [tags, setTags] = useState(['All']);
// // //   const [activeTag, setActiveTag] = useState('All');
// // //   const [loading, setLoading] = useState(true);
// // //   const [page, setPage] = useState(1);
// // //   const [selectedFile, setSelectedFile] = useState(null);

// // //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  
// // //   const toast = useToast();

// // //   const fetchFiles = useCallback(async (pageNum = 1) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await api.get('/file_history', {
// // //         params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
// // //       });

// // //       if (response.data && Array.isArray(response.data.files)) {
// // //         setFiles(prevFiles => pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]);
// // //         if (pageNum === 1) {
// // //           const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// // //           setTags(allTags);
// // //         }
// // //         setPage(pageNum);
// // //       } else {
// // //         console.log('No files returned from the API or incorrect data structure.');
// // //         if (pageNum === 1) {
// // //           setFiles([]);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching file history:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to fetch files.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [activeTag, toast]);

// // //   const loadMore = () => {
// // //     fetchFiles(page + 1);
// // //   };

// // //   useEffect(() => {
// // //     fetchFiles();
// // //   }, [fetchFiles, activeTag]);

// // //   const filteredFiles = useMemo(() => {
// // //     return activeTag === 'All'
// // //       ? files
// // //       : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));
// // //   }, [activeTag, files]);

// // //   const handleTagFile = useCallback(async (fileId, tagsInput) => {
// // //     try {
// // //       const tagsArray = tagsInput
// // //         .split(',')
// // //         .map((tag) => tag.trim())
// // //         .filter((tag) => tag.length > 0)
// // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //       await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// // //       toast({
// // //         title: 'Success',
// // //         description: 'Tags added successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error tagging file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to add tags.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const handleMenuAction = async (action) => {
// // //     if (!selectedFile) return;

// // //     switch (action) {
// // //       case 'process':
// // //         await initiateProcess(selectedFile.id);
// // //         break;
// // //       case 'analyze':
// // //         await initiateAnalyze(selectedFile.id);
// // //         break;
// // //       case 'viewDetails':
// // //         // Navigation is handled by Link, so no action needed here
// // //         break;
// // //       case 'download':
// // //         await downloadFile(selectedFile.id);
// // //         break;
// // //       case 'delete':
// // //         onDeleteOpen();
// // //         break;
// // //       default:
// // //         break;
// // //     }

// // //     setSelectedFile(null);
// // //   };

// // //   const initiateProcess = useCallback(async (fileId) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/process`);
// // //       toast({
// // //         title: 'Processing',
// // //         description: 'Processing started.',
// // //         status: 'info',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error initiating processing:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to start processing.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const initiateAnalyze = useCallback(async (fileId) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/analyze`);
// // //       toast({
// // //         title: 'Analysis',
// // //         description: 'Analysis started.',
// // //         status: 'info',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error initiating analysis:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to start analysis.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   const downloadFile = useCallback(async (fileId) => {
// // //     try {
// // //       const response = await api.get(`/files/${fileId}/download`, { responseType: 'blob' });
// // //       const url = window.URL.createObjectURL(new Blob([response.data]));
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.setAttribute('download', `file_${fileId}`);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.parentNode.removeChild(link);
// // //       toast({
// // //         title: 'Download',
// // //         description: 'Download started.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //     } catch (error) {
// // //       console.error('Error downloading file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to download file.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [toast]);

// // //   const deleteFile = useCallback(async () => {
// // //     if (!selectedFile) return;

// // //     try {
// // //       await api.delete(`/files/${selectedFile.id}`);
// // //       toast({
// // //         title: 'Deleted',
// // //         description: 'File deleted successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error deleting file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to delete file.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     } finally {
// // //       setSelectedFile(null);
// // //       onDeleteClose();
// // //     }
// // //   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

// // //   if (loading && page === 1) {
// // //     return <Loader />;
// // //   }

// // //   if (!files || files.length === 0) {
// // //     return (
// // //       <Box p={5}>
// // //         <Text fontSize="2xl" mb={4}>
// // //           Library
// // //         </Text>
// // //         <Text>No files uploaded yet.</Text>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box p={5}>
// // //       <Text fontSize="2xl" mb={4}>
// // //         Library
// // //       </Text>

// // //       <Flex mb={6} wrap="wrap">
// // //         {tags.map((tag) => (
// // //           <Button
// // //             key={tag}
// // //             size="sm"
// // //             mr={2}
// // //             mb={2}
// // //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// // //             onClick={() => setActiveTag(tag)}
// // //             aria-pressed={activeTag === tag}
// // //             aria-label={`Filter by ${tag}`}
// // //           >
// // //             {tag}
// // //           </Button>
// // //         ))}
// // //       </Flex>

// // //       <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
// // //         {filteredFiles.map((file) => (
// // //           <Box
// // //             key={file.id}
// // //             borderWidth="1px"
// // //             borderRadius="lg"
// // //             overflow="hidden"
// // //             position="relative"
// // //             bg="neutral"
// // //             _hover={{ boxShadow: 'lg' }}
// // //           >
// // //             <Link to={`/media/${file.id}`} aria-label={`View details of ${file.filename}`}>
// // //               <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
// // //             </Link>

// // //             <Box p="6">
// // //               <Flex align="baseline">
// // //                 <Text
// // //                   fontWeight="semibold"
// // //                   as="h4"
// // //                   lineHeight="tight"
// // //                   isTruncated
// // //                   title={file.filename}
// // //                   mb={2}
// // //                 >
// // //                   {file.filename}
// // //                 </Text>
// // //               </Flex>
// // //               <Box>
// // //                 {file.tags.slice(0, 3).map((tag) => (
// // //                   <Badge key={tag} mr={1} mb={1} colorScheme="teal">
// // //                     {tag}
// // //                   </Badge>
// // //                 ))}
// // //                 {file.tags.length > 3 && (
// // //                   <Badge colorScheme="teal">+{file.tags.length - 3}</Badge>
// // //                 )}
// // //               </Box>
// // //             </Box>

// // //             {file.processing_status && (
// // //               <Tooltip label={`Status: ${file.processing_status}`} placement="top">
// // //                 <Box
// // //                   position="absolute"
// // //                   top="2"
// // //                   left="2"
// // //                   color={
// // //                     file.processing_status === 'error'
// // //                       ? 'red.500'
// // //                       : file.processing_status === 'completed'
// // //                       ? 'green.500'
// // //                       : 'blue.500'
// // //                   }
// // //                 >
// // //                   {file.processing_status === 'completed' && <FaCheckCircle />}
// // //                   {file.processing_status === 'processing' && <FaSpinner className="spin" />}
// // //                   {file.processing_status === 'error' && <FaTimesCircle />}
// // //                 </Box>
// // //               </Tooltip>
// // //             )}

// // //             <Box
// // //               position="absolute"
// // //               top="0"
// // //               left="0"
// // //               width="100%"
// // //               height="100%"
// // //               bg="blackAlpha.600"
// // //               opacity="0"
// // //               transition="opacity 0.3s"
// // //               _hover={{ opacity: 1 }}
// // //               display="flex"
// // //               justifyContent="center"
// // //               alignItems="center"
// // //             >
// // //               {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// // //                 <IconButton
// // //                   aria-label={`Play ${file.filename}`}
// // //                   icon={<FaPlay />}
// // //                   colorScheme="teal"
// // //                   size="lg"
// // //                   m={2}
// // //                   onClick={() => onPlayAudio(file)}
// // //                 />
// // //               )}
// // //               <Link to={`/media/${file.id}`}>
// // //                 <IconButton
// // //                   aria-label={`View details of ${file.filename}`}
// // //                   icon={<FaEllipsisV />}
// // //                   colorScheme="teal"
// // //                   size="lg"
// // //                   m={2}
// // //                 />
// // //               </Link>
// // //             </Box>

// // //             <Menu>
// // //               <MenuButton
// // //                 as={IconButton}
// // //                 aria-label={`More actions for ${file.filename}`}
// // //                 icon={<FaEllipsisV />}
// // //                 variant="outline"
// // //                 position="absolute"
// // //                 top="2"
// // //                 right="2"
// // //                 onClick={() => setSelectedFile(file)}
// // //               />
// // //               <MenuList>
// // //                 <MenuItem onClick={() => handleMenuAction('process')}>Process</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('analyze')}>Analyze</MenuItem>
// // //                 <MenuItem as={Link} to={`/media/${file.id}`}>View Details</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('download')}>Download</MenuItem>
// // //                 <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
// // //               </MenuList>
// // //             </Menu>
// // //           </Box>
// // //         ))}
// // //       </Grid>

// // //       {!loading && files.length >= 20 && (
// // //         <Flex justify="center" mt={6}>
// // //           <Button onClick={loadMore} colorScheme="blue">
// // //             Load More
// // //           </Button>
// // //         </Flex>
// // //       )}

// // // {loading && page > 1 && (
// // //         <Flex justify="center" mt={6}>
// // //           <Spinner />
// // //         </Flex>
// // //       )}

// // //       <ConfirmationDialog
// // //         isOpen={isDeleteOpen}
// // //         onClose={onDeleteClose}
// // //         onConfirm={deleteFile}
// // //         title="Confirm Deletion"
// // //         description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
// // //       />
// // //     </Box>
// // //   );
// // // }

// // // Library.propTypes = {
// // //   onPlayAudio: PropTypes.func.isRequired,
// // // };

// // // export default Library;

// // // src/components/pages/Library.jsx

// // // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // // import {
// // //   Box,
// // //   Grid,
// // //   Image,
// // //   Text,
// // //   Badge,
// // //   Button,
// // //   IconButton,
// // //   Menu,
// // //   MenuButton,
// // //   MenuList,
// // //   MenuItem,
// // //   Spinner,
// // //   useToast,
// // //   Flex,
// // //   Tooltip,
// // //   Tabs,
// // //   TabList,
// // //   TabPanels,
// // //   Tab,
// // //   TabPanel,
// // //   Modal,
// // //   ModalOverlay,
// // //   ModalContent,
// // //   ModalHeader,
// // //   ModalBody,
// // //   ModalCloseButton,
// // //   useDisclosure,
// // // } from '@chakra-ui/react';
// // // import {
// // //   FaPlay,
// // //   FaEllipsisV,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaSpinner,
// // // } from 'react-icons/fa';
// // // import { Link } from 'react-router-dom';
// // // import api from '../../utils/api';
// // // import Loader from '../common/Loader';
// // // import PropTypes from 'prop-types';
// // // import FileDashboard from '../common/FileDashboard'; // Ensure this component exists
// // // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// // // /**
// // //  * Confirmation Dialog Component for Deletion.
// // //  */
// // // function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
// // //   return (
// // //     <Modal isOpen={isOpen} onClose={onClose} isCentered>
// // //       <ModalOverlay />
// // //       <ModalContent>
// // //         <ModalHeader>{title}</ModalHeader>
// // //         <ModalCloseButton />
// // //         <ModalBody>
// // //           <Text>{description}</Text>
// // //         </ModalBody>
// // //         <Flex justify="flex-end" p={4}>
// // //           <Button variant="ghost" mr={3} onClick={onClose}>
// // //             Cancel
// // //           </Button>
// // //           <Button colorScheme="red" onClick={onConfirm}>
// // //             Confirm
// // //           </Button>
// // //         </Flex>
// // //       </ModalContent>
// // //     </Modal>
// // //   );
// // // }

// // // ConfirmationDialog.propTypes = {
// // //   isOpen: PropTypes.bool.isRequired,
// // //   onClose: PropTypes.func.isRequired,
// // //   onConfirm: PropTypes.func.isRequired,
// // //   title: PropTypes.string.isRequired,
// // //   description: PropTypes.string.isRequired,
// // // };

// // // /**
// // //  * Main Library Component.
// // //  */
// // // function Library({ onPlayAudio }) {
// // //   const [files, setFiles] = useState([]);
// // //   const [tags, setTags] = useState(['All']);
// // //   const [activeTag, setActiveTag] = useState('All');
// // //   const [loading, setLoading] = useState(true);
// // //   const [page, setPage] = useState(1);
// // //   const [selectedFile, setSelectedFile] = useState(null);

// // //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

// // //   const toast = useToast();

// // //   /**
// // //    * Fetch files from the API based on the active tag and page number.
// // //    */
// // //   const fetchFiles = useCallback(async (pageNum = 1) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await api.get('/file_history', {
// // //         params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
// // //       });

// // //       if (response.data && Array.isArray(response.data.files)) {
// // //         setFiles((prevFiles) =>
// // //           pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
// // //         );
// // //         if (pageNum === 1) {
// // //           const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// // //           setTags(allTags);
// // //         }
// // //         setPage(pageNum);
// // //       } else {
// // //         console.log('No files returned from the API or incorrect data structure.');
// // //         if (pageNum === 1) {
// // //           setFiles([]);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching file history:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to fetch files.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [activeTag, toast]);

// // //   /**
// // //    * Load more files for pagination.
// // //    */
// // //   const loadMore = () => {
// // //     fetchFiles(page + 1);
// // //   };

// // //   /**
// // //    * Fetch files on component mount and when activeTag changes.
// // //    */
// // //   useEffect(() => {
// // //     fetchFiles();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [activeTag]);

// // //   /**
// // //    * Define filtered file arrays based on file type.
// // //    */
// // //   const audioFiles = useMemo(() => files.filter(isAudioFile), [files]);
// // //   const videoFiles = useMemo(() => files.filter(isVideoFile), [files]);
// // //   const imageFiles = useMemo(() => files.filter(isImageFile), [files]);

// // //   /**
// // //    * Memoize filtered files to improve performance.
// // //    */
// // //   const filteredFiles = useMemo(() => {
// // //     return activeTag === 'All'
// // //       ? files
// // //       : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));
// // //   }, [activeTag, files]);

// // //   /**
// // //    * Handle actions from the contextual menu.
// // //    */
// // //   const handleMenuAction = async (action) => {
// // //     if (!selectedFile) return;

// // //     switch (action) {
// // //       case 'process':
// // //         await initiateProcess(selectedFile.id);
// // //         break;
// // //       case 'analyze':
// // //         await initiateAnalyze(selectedFile.id);
// // //         break;
// // //       case 'download':
// // //         await downloadFile(selectedFile.id);
// // //         break;
// // //       case 'delete':
// // //         onDeleteOpen();
// // //         break;
// // //       default:
// // //         break;
// // //     }

// // //     setSelectedFile(null);
// // //   };

// // //   /**
// // //    * Initiate processing of a file.
// // //    */
// // //   const initiateProcess = useCallback(async (fileId) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/process`);
// // //       toast({
// // //         title: 'Processing',
// // //         description: 'Processing started.',
// // //         status: 'info',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error initiating processing:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to start processing.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   /**
// // //    * Initiate analysis of a file.
// // //    */
// // //   const initiateAnalyze = useCallback(async (fileId) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/analyze`);
// // //       toast({
// // //         title: 'Analysis',
// // //         description: 'Analysis started.',
// // //         status: 'info',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error initiating analysis:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to start analysis.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   /**
// // //    * Download a file.
// // //    */
// // //   const downloadFile = useCallback(async (fileId) => {
// // //     try {
// // //       const response = await api.get(`/files/${fileId}/download`, { responseType: 'blob' });
// // //       const url = window.URL.createObjectURL(new Blob([response.data]));
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.setAttribute('download', `file_${fileId}`);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.parentNode.removeChild(link);
// // //       toast({
// // //         title: 'Download',
// // //         description: 'Download started.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //     } catch (error) {
// // //       console.error('Error downloading file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to download file.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [toast]);

// // //   /**
// // //    * Delete a file with confirmation.
// // //    */
// // //   const deleteFile = useCallback(async () => {
// // //     if (!selectedFile) return;

// // //     try {
// // //       await api.delete(`/files/${selectedFile.id}`);
// // //       toast({
// // //         title: 'Deleted',
// // //         description: 'File deleted successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error deleting file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to delete file.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     } finally {
// // //       setSelectedFile(null);
// // //       onDeleteClose();
// // //     }
// // //   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

// // //   /**
// // //    * Handle adding tags to a file.
// // //    */
// // //   const handleTagFile = useCallback(async (fileId, tagsInput) => {
// // //     try {
// // //       const tagsArray = tagsInput
// // //         .split(',')
// // //         .map((tag) => tag.trim())
// // //         .filter((tag) => tag.length > 0)
// // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //       await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// // //       toast({
// // //         title: 'Success',
// // //         description: 'Tags added successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error tagging file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to add tags.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   /**
// // //    * Handle removing tags from a file.
// // //    */
// // //   const handleRemoveTag = useCallback(async (fileId, tag) => {
// // //     try {
// // //       await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
// // //       toast({
// // //         title: 'Success',
// // //         description: 'Tags removed successfully.',
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       console.error('Error removing tags:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to remove tags.';
// // //       toast({
// // //         title: 'Error',
// // //         description: errorMessage,
// // //         status: 'error',
// // //         duration: 5000,
// // //         isClosable: true,
// // //       });
// // //     }
// // //   }, [fetchFiles, toast]);

// // //   /**
// // //    * Handle closing contextual menu.
// // //    */
// // //   const handleMenuClose = () => {
// // //     setSelectedFile(null);
// // //   };

// // //   if (loading && page === 1) {
// // //     return <Loader />;
// // //   }

// // //   if (!files || files.length === 0) {
// // //     return (
// // //       <Box p={5}>
// // //         <Text fontSize="2xl" mb={4}>
// // //           Library
// // //         </Text>
// // //         <Text>No files uploaded yet.</Text>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box p={5}>
// // //       <Text fontSize="2xl" mb={4}>
// // //         Library
// // //       </Text>

// // //       {/* Tag Filters */}
// // //       <Flex mb={6} wrap="wrap">
// // //         {tags.map((tag) => (
// // //           <Button
// // //             key={tag}
// // //             size="sm"
// // //             mr={2}
// // //             mb={2}
// // //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// // //             onClick={() => setActiveTag(tag)}
// // //             aria-pressed={activeTag === tag}
// // //             aria-label={`Filter by ${tag}`}
// // //           >
// // //             {tag}
// // //           </Button>
// // //         ))}
// // //       </Flex>

// // //       {/* Tabs with FileDashboard Components */}
// // //       <Tabs>
// // //         <TabList>
// // //           <Tab>All</Tab>
// // //           <Tab>Audio</Tab>
// // //           <Tab>Video</Tab>
// // //           <Tab>Images</Tab>
// // //         </TabList>

// // //         <TabPanels>
// // //           <TabPanel>
// // //             <FileDashboard
// // //               uploadedFiles={filteredFiles || []}
// // //               onTagFile={handleTagFile}
// // //               onRemoveTag={handleRemoveTag}
// // //               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // //             />
// // //           </TabPanel>
// // //           <TabPanel>
// // //             <FileDashboard
// // //               uploadedFiles={audioFiles}
// // //               onTagFile={handleTagFile}
// // //               onRemoveTag={handleRemoveTag}
// // //               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // //             />
// // //           </TabPanel>
// // //           <TabPanel>
// // //             <FileDashboard
// // //               uploadedFiles={videoFiles}
// // //               onTagFile={handleTagFile}
// // //               onRemoveTag={handleRemoveTag}
// // //               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // //             />
// // //           </TabPanel>
// // //           <TabPanel>
// // //             <FileDashboard
// // //               uploadedFiles={imageFiles}
// // //               onTagFile={handleTagFile}
// // //               onRemoveTag={handleRemoveTag}
// // //               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // //             />
// // //           </TabPanel>
// // //         </TabPanels>
// // //       </Tabs>

// // //       {/* Load More Button */}
// // //       {!loading && files.length >= 20 && (
// // //         <Flex justify="center" mt={6}>
// // //           <Button onClick={loadMore} colorScheme="blue" aria-label="Load More Files">
// // //             Load More
// // //           </Button>
// // //         </Flex>
// // //       )}

// // //       {/* Loading Indicator for Pagination */}
// // //       {loading && page > 1 && (
// // //         <Flex justify="center" mt={6}>
// // //           <Spinner />
// // //         </Flex>
// // //       )}

// // //       {/* Delete Confirmation Dialog */}
// // //       <ConfirmationDialog
// // //         isOpen={isDeleteOpen}
// // //         onClose={onDeleteClose}
// // //         onConfirm={deleteFile}
// // //         title="Confirm Deletion"
// // //         description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
// // //       />
// // //     </Box>
// // //   );
// // // }

// // // Library.propTypes = {
// // //   onPlayAudio: PropTypes.func.isRequired,
// // // };

// // // export default Library;

// // src/components/pages/Library.jsx

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Box,
//   Grid,
//   Image,
//   Text,
//   Badge,
//   Button,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Spinner,
//   useToast,
//   Flex,
//   Tooltip,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from '@chakra-ui/react';
// import {
//   FaPlay,
//   FaEllipsisV,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSpinner,
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import api from '../../utils/api';
// import Loader from '../common/Loader';
// import PropTypes from 'prop-types';
// import FileDashboard from '../common/FileDashboard'; // Ensure this component exists
// import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// /**
//  * Confirmation Dialog Component for Deletion.
//  */
// function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>{title}</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Text>{description}</Text>
//         </ModalBody>
//         <Flex justify="flex-end" p={4}>
//           <Button variant="ghost" mr={3} onClick={onClose}>
//             Cancel
//           </Button>
//           <Button colorScheme="red" onClick={onConfirm}>
//             Confirm
//           </Button>
//         </Flex>
//       </ModalContent>
//     </Modal>
//   );
// }

// ConfirmationDialog.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onConfirm: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };

// /**
//  * Main Library Component.
//  */
// function Library({ onPlayAudio }) {
//   const [files, setFiles] = useState([]);
//   const [tags, setTags] = useState(['All']);
//   const [activeTag, setActiveTag] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

//   const toast = useToast();

//   /**
//    * Fetch files from the API based on the active tag and page number.
//    */
//   const fetchFiles = useCallback(async (pageNum = 1) => {
//     setLoading(true);
//     try {
//       const response = await api.get('/file_history', {
//         params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
//       });

//       if (response.data && Array.isArray(response.data.files)) {
//         setFiles((prevFiles) =>
//           pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
//         );
//         if (pageNum === 1) {
//           const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
//           setTags(allTags);
//         }
//         setPage(pageNum);
//       } else {
//         console.log('No files returned from the API or incorrect data structure.');
//         if (pageNum === 1) {
//           setFiles([]);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching file history:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to fetch files.';
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [activeTag, toast]);

//   /**
//    * Load more files for pagination.
//    */
//   const loadMore = () => {
//     fetchFiles(page + 1);
//   };

//   /**
//    * Fetch files on component mount and when activeTag changes.
//    */
//   useEffect(() => {
//     fetchFiles();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeTag]);

//   /**
//    * Define filtered file arrays based on file type.
//    */
//   const audioFiles = useMemo(() => files.filter(isAudioFile), [files]);
//   const videoFiles = useMemo(() => files.filter(isVideoFile), [files]);
//   const imageFiles = useMemo(() => files.filter(isImageFile), [files]);

//   /**
//    * Memoize filtered files to improve performance.
//    */
//   const filteredFiles = useMemo(() => {
//     return activeTag === 'All'
//       ? files
//       : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));
//   }, [activeTag, files]);

//   /**
//    * Handle adding tags to a file.
//    */
//   const handleTagFile = useCallback(async (fileId, tagsInput) => {
//     try {
//       const tagsArray = tagsInput
//         .split(',')
//         .map((tag) => tag.trim())
//         .filter((tag) => tag.length > 0)
//         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

//       await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
//       toast({
//         title: 'Success',
//         description: 'Tags added successfully.',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//       fetchFiles(); // Refresh the file list
//     } catch (error) {
//       console.error('Error tagging file:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to add tags.';
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   }, [fetchFiles, toast]);

//   /**
//    * Handle removing tags from a file.
//    */
//   const handleRemoveTag = useCallback(async (fileId, tag) => {
//     try {
//       await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
//       toast({
//         title: 'Success',
//         description: 'Tags removed successfully.',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//       fetchFiles(); // Refresh the file list
//     } catch (error) {
//       console.error('Error removing tags:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to remove tags.';
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   }, [fetchFiles, toast]);

//   /**
//    * Handle opening contextual menu for a specific file.
//    */
//   const handleMenuOpen = (file) => {
//     setSelectedFile(file);
//   };

//   /**
//    * Handle closing contextual menu.
//    */
//   const handleMenuClose = () => {
//     setSelectedFile(null);
//   };

//   /**
//    * Handle actions from the contextual menu.
//    */
//   const handleMenuAction = async (action) => {
//     if (!selectedFile) return;

//     switch (action) {
//       case 'process':
//         await initiateProcess(selectedFile.id);
//         break;
//       case 'analyze':
//         await initiateAnalyze(selectedFile.id);
//         break;
//       case 'download':
//         await downloadFile(selectedFile.id);
//         break;
//       case 'delete':
//         onDeleteOpen();
//         break;
//       default:
//         break;
//     }

//     handleMenuClose();
//   };

//   /**
//    * Initiate processing of a file.
//    */
//   const initiateProcess = useCallback(async (fileId) => {
//     try {
//       await api.post(`/files/${fileId}/process`);
//       toast({
//         title: 'Processing',
//         description: 'Processing started.',
//         status: 'info',
//         duration: 3000,
//         isClosable: true,
//       });
//       fetchFiles();
//     } catch (error) {
//       console.error('Error initiating processing:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to start processing.';
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   }, [fetchFiles, toast]);

//   /**
//    * Initiate analysis of a file.
//    */
//   const initiateAnalyze = useCallback(async (fileId) => {
//     try {
//       await api.post(`/files/${fileId}/analyze`);
//       toast({
//         title: 'Analysis',
//         description: 'Analysis started.',
//         status: 'info',
//         duration: 3000,
//         isClosable: true,
//       });
//       fetchFiles();
//     } catch (error) {
//       console.error('Error initiating analysis:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to start analysis.';
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   }, [fetchFiles, toast]);

//   /**
//    * Download a file.
//    */
//   const downloadFile = useCallback(async (fileId) => {
//     try {
//       const response = await api.get(`/files/${fileId}/download`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `file_${fileId}`); // Adjust file naming as needed
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//       toast({
//         title: 'Download',
//         description: 'Download started.',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error('Error downloading file:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to download file.';
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   }, [toast]);

//   /**
//    * Delete a file with confirmation.
//    */
//   const deleteFile = useCallback(async () => {
//     if (!selectedFile) return;

//     try {
//       await api.delete(`/files/${selectedFile.id}`);
//       toast({
//         title: 'Deleted',
//         description: 'File deleted successfully.',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//       fetchFiles();
//     } catch (error) {
//       console.error('Error deleting file:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to delete file.';
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setSelectedFile(null);
//       onDeleteClose();
//     }
//   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

//   /**
//    * Conditional rendering based on loading state and file availability.
//    */
//   if (loading && page === 1) {
//     return <Loader />;
//   }

//   if (!files || files.length === 0) {
//     return (
//       <Box p={5}>
//         <Text fontSize="2xl" mb={4}>
//           Library
//         </Text>
//         <Text>No files uploaded yet.</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box p={5}>
//       <Text fontSize="2xl" mb={4}>
//         Library
//       </Text>

//       {/* Tag Filters */}
//       <Flex mb={6} wrap="wrap">
//         {tags.map((tag) => (
//           <Button
//             key={tag}
//             size="sm"
//             mr={2}
//             mb={2}
//             colorScheme={activeTag === tag ? 'blue' : 'gray'}
//             onClick={() => setActiveTag(tag)}
//             aria-pressed={activeTag === tag}
//             aria-label={`Filter by ${tag}`} // Added aria-label for accessibility
//           >
//             {tag}
//           </Button>
//         ))}
//       </Flex>

//       {/* Tabs with FileDashboard Components */}
//       <Tabs>
//         <TabList>
//           <Tab>All</Tab>
//           <Tab>Audio</Tab>
//           <Tab>Video</Tab>
//           <Tab>Images</Tab>
//         </TabList>

//         <TabPanels>
//           <TabPanel>
//             <FileDashboard
//               uploadedFiles={filteredFiles || []}
//               onTagFile={handleTagFile}
//               onRemoveTag={handleRemoveTag}
//               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
//             />
//           </TabPanel>
//           <TabPanel>
//             <FileDashboard
//               uploadedFiles={audioFiles}
//               onTagFile={handleTagFile}
//               onRemoveTag={handleRemoveTag}
//               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
//             />
//           </TabPanel>
//           <TabPanel>
//             <FileDashboard
//               uploadedFiles={videoFiles}
//               onTagFile={handleTagFile}
//               onRemoveTag={handleRemoveTag}
//               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
//             />
//           </TabPanel>
//           <TabPanel>
//             <FileDashboard
//               uploadedFiles={imageFiles}
//               onTagFile={handleTagFile}
//               onRemoveTag={handleRemoveTag}
//               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
//             />
//           </TabPanel>
//         </TabPanels>
//       </Tabs>

//       {/* Files Grid */}
//       <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
//         {filteredFiles.map((file) => (
//           <Box
//             key={file.id}
//             borderWidth="1px"
//             borderRadius="lg"
//             overflow="hidden"
//             position="relative"
//             bg="neutral"
//             _hover={{ boxShadow: 'lg' }}
//           >
//             {/* Thumbnail */}
//             <Link to={`/media/${file.id}`} aria-label={`View details of ${file.filename}`}>
//               <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
//             </Link>

//             {/* File Name and Tags */}
//             <Box p="6">
//               <Flex align="baseline">
//                 <Text
//                   fontWeight="semibold"
//                   as="h4"
//                   lineHeight="tight"
//                   isTruncated
//                   title={file.filename}
//                   mb={2}
//                 >
//                   {file.filename}
//                 </Text>
//               </Flex>
//               <Box>
//                 {file.tags.slice(0, 3).map((tag) => (
//                   <Badge key={tag} mr={1} mb={1} colorScheme="teal">
//                     {tag}
//                   </Badge>
//                 ))}
//                 {file.tags.length > 3 && (
//                   <Badge colorScheme="teal">+{file.tags.length - 3}</Badge>
//                 )}
//               </Box>
//             </Box>

//             {/* Status Indicator */}
//             {file.processing_status && (
//               <Tooltip label={`Status: ${file.processing_status}`} placement="top">
//                 <Box
//                   position="absolute"
//                   top="2"
//                   left="2"
//                   color={
//                     file.processing_status === 'error'
//                       ? 'red.500'
//                       : file.processing_status === 'completed'
//                       ? 'green.500'
//                       : 'blue.500'
//                   }
//                 >
//                   {file.processing_status === 'completed' && <FaCheckCircle />}
//                   {file.processing_status === 'processing' && <FaSpinner className="spin" />}
//                   {file.processing_status === 'error' && <FaTimesCircle />}
//                 </Box>
//               </Tooltip>
//             )}

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
//                   onClick={() => onPlayAudio(file.id)} // Updated to pass file.id
//                 />
//               )}
//               <Link to={`/media/${file.id}`}>
//                 <IconButton
//                   aria-label={`View details of ${file.filename}`}
//                   icon={<FaEllipsisV />}
//                   colorScheme="teal"
//                   size="lg"
//                   m={2}
//                 />
//               </Link>
//             </Box>

//             {/* Contextual Menu */}
//             <Menu>
//               <MenuButton
//                 as={IconButton}
//                 aria-label={`More actions for ${file.filename}`}
//                 icon={<FaEllipsisV />}
//                 variant="outline"
//                 position="absolute"
//                 top="2"
//                 right="2"
//                 onClick={() => handleMenuOpen(file)}
//               />
//               <MenuList>
//                 <MenuItem onClick={() => handleMenuAction('process')}>Process</MenuItem>
//                 <MenuItem onClick={() => handleMenuAction('analyze')}>Analyze</MenuItem>
//                 <MenuItem as={Link} to={`/media/${file.id}`}>View Details</MenuItem>
//                 <MenuItem onClick={() => handleMenuAction('download')}>Download</MenuItem>
//                 <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
//               </MenuList>
//             </Menu>
//           </Box>
//         ))}
//       </Grid>

//       {/* Load More Button */}
//       {!loading && files.length >= 20 && (
//         <Flex justify="center" mt={6}>
//           <Button onClick={loadMore} colorScheme="blue" aria-label="Load More Files">
//             Load More
//           </Button>
//         </Flex>
//       )}

//       {/* Loading Indicator for Pagination */}
//       {loading && page > 1 && (
//         <Flex justify="center" mt={6}>
//           <Spinner />
//         </Flex>
//       )}

//       {/* Delete Confirmation Dialog */}
//       <ConfirmationDialog
//         isOpen={isDeleteOpen}
//         onClose={onDeleteClose}
//         onConfirm={deleteFile}
//         title="Confirm Deletion"
//         description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
//       />
//     </Box>
//   );
// }

// Library.propTypes = {
//   onPlayAudio: PropTypes.func.isRequired,
// };

// export default Library;

// src/components/pages/Library.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  // Grid,
  // Image,
  Text,
  // Badge,
  Button,
  // IconButton,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  Spinner,
  useToast,
  Flex,
  // Tooltip,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FaPlay,
  FaEllipsisV,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Loader from '../common/Loader';
import PropTypes from 'prop-types';
import FileDashboard from '../common/FileDashboard'; // Ensure this component exists
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

/**
 * Confirmation Dialog Component for Deletion.
 */
function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>
        <Flex justify="flex-end" p={4}>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            Confirm
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

/**
 * Main Library Component.
 */
function Library({ onPlayAudio }) {
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState(['All']);
  const [activeTag, setActiveTag] = useState('All');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const toast = useToast();

  /**
   * Fetch files from the API based on the active tag and page number.
   */
  const fetchFiles = useCallback(async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await api.get('/file_history', {
        params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
      });

      if (response.data && Array.isArray(response.data.files)) {
        setFiles((prevFiles) =>
          pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
        );
        if (pageNum === 1) {
          const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
          setTags(allTags);
        }
        setPage(pageNum);
      } else {
        console.log('No files returned from the API or incorrect data structure.');
        if (pageNum === 1) {
          setFiles([]);
        }
      }
    } catch (error) {
      console.error('Error fetching file history:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch files.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [activeTag, toast]);

  /**
   * Load more files for pagination.
   */
  const loadMore = () => {
    fetchFiles(page + 1);
  };

  /**
   * Fetch files on component mount and when activeTag changes.
   */
  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag]);

  /**
   * Define filtered file arrays based on file type.
   */
  const audioFiles = useMemo(() => files.filter(isAudioFile), [files]);
  const videoFiles = useMemo(() => files.filter(isVideoFile), [files]);
  const imageFiles = useMemo(() => files.filter(isImageFile), [files]);

  /**
   * Memoize filtered files to improve performance.
   */
  const filteredFiles = useMemo(() => {
    return activeTag === 'All'
      ? files
      : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));
  }, [activeTag, files]);

  /**
   * Handle adding tags to a file.
   */
  const handleTagFile = useCallback(async (fileId, tagsInput) => {
    try {
      const tagsArray = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
        .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

      await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
      toast({
        title: 'Success',
        description: 'Tags added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error tagging file:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add tags.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [fetchFiles, toast]);

  /**
   * Handle removing tags from a file.
   */
  const handleRemoveTag = useCallback(async (fileId, tag) => {
    try {
      await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
      toast({
        title: 'Success',
        description: 'Tags removed successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error removing tags:', error);
      const errorMessage = error.response?.data?.message || 'Failed to remove tags.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [fetchFiles, toast]);

  /**
   * Handle opening contextual menu for a specific file.
   */
  const handleMenuOpen = (file) => {
    setSelectedFile(file);
  };

  /**
   * Handle closing contextual menu.
   */
  const handleMenuClose = () => {
    setSelectedFile(null);
  };

  /**
   * Handle actions from the contextual menu.
   */
  const handleMenuAction = async (action) => {
    if (!selectedFile) return;

    switch (action) {
      case 'process':
        await initiateProcess(selectedFile.id);
        break;
      case 'analyze':
        await initiateAnalyze(selectedFile.id);
        break;
      case 'download':
        await downloadFile(selectedFile.id);
        break;
      case 'delete':
        onDeleteOpen();
        break;
      default:
        break;
    }

    handleMenuClose();
  };

  /**
   * Initiate processing of a file.
   */
  const initiateProcess = useCallback(async (fileId) => {
    try {
      await api.post(`/files/${fileId}/process`);
      toast({
        title: 'Processing',
        description: 'Processing started.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      fetchFiles();
    } catch (error) {
      console.error('Error initiating processing:', error);
      const errorMessage = error.response?.data?.message || 'Failed to start processing.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [fetchFiles, toast]);

  /**
   * Initiate analysis of a file.
   */
  const initiateAnalyze = useCallback(async (fileId) => {
    try {
      await api.post(`/files/${fileId}/analyze`);
      toast({
        title: 'Analysis',
        description: 'Analysis started.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      fetchFiles();
    } catch (error) {
      console.error('Error initiating analysis:', error);
      const errorMessage = error.response?.data?.message || 'Failed to start analysis.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [fetchFiles, toast]);

  /**
   * Download a file.
   */
  const downloadFile = useCallback(async (fileId) => {
    try {
      const response = await api.get(`/files/${fileId}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file_${fileId}`); // Adjust file naming as needed
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast({
        title: 'Download',
        description: 'Download started.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      const errorMessage = error.response?.data?.message || 'Failed to download file.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  /**
   * Delete a file with confirmation.
   */
  const deleteFile = useCallback(async () => {
    if (!selectedFile) return;

    try {
      await api.delete(`/files/${selectedFile.id}`);
      toast({
        title: 'Deleted',
        description: 'File deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete file.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSelectedFile(null);
      onDeleteClose();
    }
  }, [selectedFile, fetchFiles, onDeleteClose, toast]);

  /**
   * Conditional rendering based on loading state and file availability.
   */
  if (loading && page === 1) {
    return <Loader />;
  }

  if (!files || files.length === 0) {
    return (
      <Box p={5}>
        <Text fontSize="2xl" mb={4}>
          Library
        </Text>
        <Text>No files uploaded yet.</Text>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        Library
      </Text>

      {/* Tag Filters */}
      <Flex mb={6} wrap="wrap">
        {tags.map((tag) => (
          <Button
            key={tag}
            size="sm"
            mr={2}
            mb={2}
            colorScheme={activeTag === tag ? 'blue' : 'gray'}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            aria-label={`Filter by ${tag}`} // Added aria-label for accessibility
          >
            {tag}
          </Button>
        ))}
      </Flex>

      {/* Tabs with FileDashboard Components */}
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          <Tab>Audio</Tab>
          <Tab>Video</Tab>
          <Tab>Images</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FileDashboard
              uploadedFiles={filteredFiles || []}
              onTagFile={handleTagFile}
              onRemoveTag={handleRemoveTag}
              onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
            />
          </TabPanel>
          <TabPanel>
            <FileDashboard
              uploadedFiles={audioFiles}
              onTagFile={handleTagFile}
              onRemoveTag={handleRemoveTag}
              onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
            />
          </TabPanel>
          <TabPanel>
            <FileDashboard
              uploadedFiles={videoFiles}
              onTagFile={handleTagFile}
              onRemoveTag={handleRemoveTag}
              onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
            />
          </TabPanel>
          <TabPanel>
            <FileDashboard
              uploadedFiles={imageFiles}
              onTagFile={handleTagFile}
              onRemoveTag={handleRemoveTag}
              onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Files Grid */}
      {/* <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {filteredFiles.map((file) => (
          <Box
            key={file.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            bg="neutral"
            _hover={{ boxShadow: 'lg' }}
          > */}
            {/* Thumbnail */}
            {/* <Link to={`/media/${file.id}`} aria-label={`View details of ${file.filename}`}>
              <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
            </Link> */}

            {/* File Name and Tags */}
            {/* <Box p="6">
              <Flex align="baseline">
                <Text
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                  title={file.filename}
                  mb={2}
                >
                  {file.filename}
                </Text>
              </Flex>
              <Box>
                {file.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} mr={1} mb={1} colorScheme="teal">
                    {tag}
                  </Badge>
                ))}
                {file.tags.length > 3 && (
                  <Badge colorScheme="teal">+{file.tags.length - 3}</Badge>
                )}
              </Box>
            </Box> */}

            {/* Status Indicator */}
            {/* {file.processing_status && (
              <Tooltip label={`Status: ${file.processing_status}`} placement="top">
                <Box
                  position="absolute"
                  top="2"
                  left="2"
                  color={
                    file.processing_status === 'error'
                      ? 'red.500'
                      : file.processing_status === 'completed'
                      ? 'green.500'
                      : 'blue.500'
                  }
                >
                  {file.processing_status === 'completed' && <FaCheckCircle />}
                  {file.processing_status === 'processing' && <Spinner />}
                  {file.processing_status === 'error' && <FaTimesCircle />}
                </Box>
              </Tooltip>
            )} */}

            {/* Hover Actions */}
            {/* <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="blackAlpha.600"
              opacity="0"
              transition="opacity 0.3s"
              _hover={{ opacity: 1 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {(isAudioFile(file.type) || isVideoFile(file.type)) && (
                <IconButton
                  aria-label={`Play ${file.filename}`}
                  icon={<FaPlay />}
                  colorScheme="teal"
                  size="lg"
                  m={2}
                  onClick={() => onPlayAudio(file.id)} // Updated to pass file.id
                />
              )}
              <Link to={`/media/${file.id}`}>
                <IconButton
                  aria-label={`View details of ${file.filename}`}
                  icon={<FaEllipsisV />}
                  colorScheme="teal"
                  size="lg"
                  m={2}
                />
              </Link>
            </Box> */}

            {/* Contextual Menu */}
            {/* <Menu>
              <MenuButton
                as={IconButton}
                aria-label={`More actions for ${file.filename}`}
                icon={<FaEllipsisV />}
                variant="outline"
                position="absolute"
                top="2"
                right="2"
                onClick={() => handleMenuOpen(file)}
              />
              <MenuList>
                <MenuItem onClick={() => handleMenuAction('process')}>Process</MenuItem>
                <MenuItem onClick={() => handleMenuAction('analyze')}>Analyze</MenuItem>
                <MenuItem as={Link} to={`/media/${file.id}`}>View Details</MenuItem>
                <MenuItem onClick={() => handleMenuAction('download')}>Download</MenuItem>
                <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ))}
      </Grid> */}

      {/* Load More Button */}
      {!loading && files.length >= 20 && (
        <Flex justify="center" mt={6}>
          <Button onClick={loadMore} colorScheme="blue" aria-label="Load More Files">
            Load More
          </Button>
        </Flex>
      )}

      {/* Loading Indicator for Pagination */}
      {loading && page > 1 && (
        <Flex justify="center" mt={6}>
          <Spinner />
        </Flex>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={deleteFile}
        title="Confirm Deletion"
        description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
      />
    </Box>
  );
}

Library.propTypes = {
  onPlayAudio: PropTypes.func.isRequired,
};

export default Library;