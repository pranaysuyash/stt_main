// // // // // // src/components/pages/Library.jsx

// // // // // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   // Grid,
// // // // //   // Image,
// // // // //   Text,
// // // // //   // Badge,
// // // // //   Button,
// // // // //   // IconButton,
// // // // //   // Menu,
// // // // //   // MenuButton,
// // // // //   // MenuList,
// // // // //   // MenuItem,
// // // // //   Spinner,
// // // // //   useToast,
// // // // //   Flex,
// // // // //   // Tooltip,
// // // // //   Tabs,
// // // // //   TabList,
// // // // //   TabPanels,
// // // // //   Tab,
// // // // //   TabPanel,
// // // // //   Modal,
// // // // //   ModalOverlay,
// // // // //   ModalContent,
// // // // //   ModalHeader,
// // // // //   ModalBody,
// // // // //   ModalCloseButton,
// // // // //   useDisclosure,
// // // // // } from '@chakra-ui/react';
// // // // // import {
// // // // //   FaPlay,
// // // // //   FaEllipsisV,
// // // // //   FaCheckCircle,
// // // // //   FaTimesCircle,
// // // // //   FaSpinner,
// // // // // } from 'react-icons/fa';
// // // // // import { Link } from 'react-router-dom';
// // // // // import api from '../../utils/api';
// // // // // import Loader from '../common/Loader';
// // // // // import PropTypes from 'prop-types';
// // // // // import FileDashboard from '../common/FileDashboard'; // Ensure this component exists
// // // // // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// // // // // /**
// // // // //  * Confirmation Dialog Component for Deletion.
// // // // //  */
// // // // // function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
// // // // //   return (
// // // // //     <Modal isOpen={isOpen} onClose={onClose} isCentered>
// // // // //       <ModalOverlay />
// // // // //       <ModalContent>
// // // // //         <ModalHeader>{title}</ModalHeader>
// // // // //         <ModalCloseButton />
// // // // //         <ModalBody>
// // // // //           <Text>{description}</Text>
// // // // //         </ModalBody>
// // // // //         <Flex justify="flex-end" p={4}>
// // // // //           <Button variant="ghost" mr={3} onClick={onClose}>
// // // // //             Cancel
// // // // //           </Button>
// // // // //           <Button colorScheme="red" onClick={onConfirm}>
// // // // //             Confirm
// // // // //           </Button>
// // // // //         </Flex>
// // // // //       </ModalContent>
// // // // //     </Modal>
// // // // //   );
// // // // // }

// // // // // ConfirmationDialog.propTypes = {
// // // // //   isOpen: PropTypes.bool.isRequired,
// // // // //   onClose: PropTypes.func.isRequired,
// // // // //   onConfirm: PropTypes.func.isRequired,
// // // // //   title: PropTypes.string.isRequired,
// // // // //   description: PropTypes.string.isRequired,
// // // // // };

// // // // // /**
// // // // //  * Main Library Component.
// // // // //  */
// // // // // function Library({ onPlayAudio }) {
// // // // //   const [files, setFiles] = useState([]);
// // // // //   const [tags, setTags] = useState(['All']);
// // // // //   const [activeTag, setActiveTag] = useState('All');
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [page, setPage] = useState(1);
// // // // //   const [selectedFile, setSelectedFile] = useState(null);

// // // // //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

// // // // //   const toast = useToast();

// // // // //   /**
// // // // //    * Fetch files from the API based on the active tag and page number.
// // // // //    */
// // // // //   const fetchFiles = useCallback(async (pageNum = 1) => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await api.get('/file_history', {
// // // // //         params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
// // // // //       });

// // // // //       if (response.data && Array.isArray(response.data.files)) {
// // // // //         setFiles((prevFiles) =>
// // // // //           pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
// // // // //         );
// // // // //         if (pageNum === 1) {
// // // // //           const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// // // // //           setTags(allTags);
// // // // //         }
// // // // //         setPage(pageNum);
// // // // //       } else {
// // // // //         console.log('No files returned from the API or incorrect data structure.');
// // // // //         if (pageNum === 1) {
// // // // //           setFiles([]);
// // // // //         }
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching file history:', error);
// // // // //       let errorMessage = error.response?.data?.message || 'Failed to fetch files.';
// // // // //       if (error.response) {
// // // // //         // Server responded with a status other than 2xx
// // // // //         errorMessage = error.response.data?.message || errorMessage;
// // // // //       } else if (error.request) {
// // // // //         // Request was made but no response received
// // // // //         errorMessage = 'Network error. Please check your connection and try again.';
// // // // //       } else {
// // // // //         // Something else caused the error
// // // // //         errorMessage = error.message;
// // // // //       }

// // // // //       toast({
// // // // //         title: 'Error',
// // // // //         description: errorMessage,
// // // // //         status: 'error',
// // // // //         duration: 5000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, [activeTag, toast]);

// // // // //   /**
// // // // //    * Load more files for pagination.
// // // // //    */
// // // // //   const loadMore = () => {
// // // // //     fetchFiles(page + 1);
// // // // //   };

// // // // //   /**
// // // // //    * Fetch files on component mount and when activeTag changes.
// // // // //    */
// // // // //   useEffect(() => {
// // // // //     fetchFiles();
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [activeTag]);

// // // // //   /**
// // // // //    * Define filtered file arrays based on file type.
// // // // //    */
// // // // //   const audioFiles = useMemo(() => files.filter(isAudioFile), [files]);
// // // // //   const videoFiles = useMemo(() => files.filter(isVideoFile), [files]);
// // // // //   const imageFiles = useMemo(() => files.filter(isImageFile), [files]);

// // // // //   /**
// // // // //    * Memoize filtered files to improve performance.
// // // // //    */
// // // // //   const filteredFiles = useMemo(() => {
// // // // //     return activeTag === 'All'
// // // // //       ? files
// // // // //       : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));
// // // // //   }, [activeTag, files]);

// // // // //   /**
// // // // //    * Handle adding tags to a file.
// // // // //    */
// // // // //   const handleTagFile = useCallback(async (fileId, tagsInput) => {
// // // // //     try {
// // // // //       const tagsArray = tagsInput
// // // // //         .split(',')
// // // // //         .map((tag) => tag.trim())
// // // // //         .filter((tag) => tag.length > 0)
// // // // //         .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // // // //       await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// // // // //       toast({
// // // // //         title: 'Success',
// // // // //         description: 'Tags added successfully.',
// // // // //         status: 'success',
// // // // //         duration: 3000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //       fetchFiles(); // Refresh the file list
// // // // //     } catch (error) {
// // // // //       console.error('Error tagging file:', error);
// // // // //       let errorMessage = error.response?.data?.message || 'Failed to add tags.';
// // // // //       if (error.response) {
// // // // //         errorMessage = error.response.data?.message || errorMessage;
// // // // //       } else if (error.request) {
// // // // //         errorMessage = 'Network error. Please check your connection and try again.';
// // // // //       } else {
// // // // //         errorMessage = error.message;
// // // // //       }
// // // // //       toast({
// // // // //         title: 'Error',
// // // // //         description: errorMessage,
// // // // //         status: 'error',
// // // // //         duration: 5000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //     }
// // // // //   }, [fetchFiles, toast]);

// // // // //   /**
// // // // //    * Handle removing tags from a file.
// // // // //    */
// // // // //   const handleRemoveTag = useCallback(async (fileId, tag) => {
// // // // //     try {
// // // // //       await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
// // // // //       toast({
// // // // //         title: 'Success',
// // // // //         description: 'Tags removed successfully.',
// // // // //         status: 'success',
// // // // //         duration: 3000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //       fetchFiles(); // Refresh the file list
// // // // //     } catch (error) {
// // // // //       console.error('Error removing tags:', error);
// // // // //       let errorMessage = error.response?.data?.message || 'Failed to remove tags.';
// // // // //       if (error.response) {
// // // // //         errorMessage = error.response.data?.message || errorMessage;
// // // // //       } else if (error.request) {
// // // // //         errorMessage = 'Network error. Please check your connection and try again.';
// // // // //       } else {
// // // // //         errorMessage = error.message;
// // // // //       }
// // // // //       toast({
// // // // //         title: 'Error',
// // // // //         description: errorMessage,
// // // // //         status: 'error',
// // // // //         duration: 5000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //     }
// // // // //   }, [fetchFiles, toast]);

// // // // //   /**
// // // // //    * Handle opening contextual menu for a specific file.
// // // // //    */
// // // // //   const handleMenuOpen = (file) => {
// // // // //     setSelectedFile(file);
// // // // //   };

// // // // //   /**
// // // // //    * Handle closing contextual menu.
// // // // //    */
// // // // //   const handleMenuClose = () => {
// // // // //     setSelectedFile(null);
// // // // //   };

// // // // //   /**
// // // // //    * Handle actions from the contextual menu.
// // // // //    */
// // // // //   const handleMenuAction = async (action) => {
// // // // //     if (!selectedFile) return;

// // // // //     switch (action) {
// // // // //       case 'process':
// // // // //         await initiateProcess(selectedFile.id);
// // // // //         break;
// // // // //       case 'analyze':
// // // // //         await initiateAnalyze(selectedFile.id);
// // // // //         break;
// // // // //       case 'download':
// // // // //         await downloadFile(selectedFile.id);
// // // // //         break;
// // // // //       case 'delete':
// // // // //         onDeleteOpen();
// // // // //         break;
// // // // //       default:
// // // // //         break;
// // // // //     }

// // // // //     handleMenuClose();
// // // // //   };

// // // // //   /**
// // // // //    * Initiate processing of a file.
// // // // //    */
// // // // //   const initiateProcess = useCallback(async (fileId) => {
// // // // //     try {
// // // // //       await api.post(`/files/${fileId}/process`);
// // // // //       toast({
// // // // //         title: 'Processing',
// // // // //         description: 'Processing started.',
// // // // //         status: 'info',
// // // // //         duration: 3000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //       fetchFiles();
// // // // //     } catch (error) {
// // // // //       console.error('Error initiating processing:', error);
// // // // //       let errorMessage = error.response?.data?.message || 'Failed to start processing.';
// // // // //       if (error.response) {
// // // // //         errorMessage = error.response.data?.message || errorMessage;
// // // // //       } else if (error.request) {
// // // // //         errorMessage = 'Network error. Please check your connection and try again.';
// // // // //       } else {
// // // // //         errorMessage = error.message;
// // // // //       }
// // // // //       toast({
// // // // //         title: 'Error',
// // // // //         description: errorMessage,
// // // // //         status: 'error',
// // // // //         duration: 5000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //     }
// // // // //   }, [fetchFiles, toast]);

// // // // //   /**
// // // // //    * Initiate analysis of a file.
// // // // //    */
// // // // //   const initiateAnalyze = useCallback(async (fileId) => {
// // // // //     try {
// // // // //       await api.post(`/files/${fileId}/analyze`);
// // // // //       toast({
// // // // //         title: 'Analysis',
// // // // //         description: 'Analysis started.',
// // // // //         status: 'info',
// // // // //         duration: 3000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //       fetchFiles();
// // // // //     } catch (error) {
// // // // //       console.error('Error initiating analysis:', error);
// // // // //       let errorMessage = error.response?.data?.message || 'Failed to start analysis.';
// // // // //       if (error.response) {
// // // // //         errorMessage = error.response.data?.message || errorMessage;
// // // // //       } else if (error.request) {
// // // // //         errorMessage = 'Network error. Please check your connection and try again.';
// // // // //       } else {
// // // // //         errorMessage = error.message;
// // // // //       }
// // // // //       toast({
// // // // //         title: 'Error',
// // // // //         description: errorMessage,
// // // // //         status: 'error',
// // // // //         duration: 5000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //     }
// // // // //   }, [fetchFiles, toast]);

// // // // //   /**
// // // // //    * Download a file.
// // // // //    */
// // // // //   const downloadFile = useCallback(async (fileId) => {
// // // // //     try {
// // // // //       const response = await api.get(`/files/${fileId}/download`, { responseType: 'blob' });
// // // // //       const url = window.URL.createObjectURL(new Blob([response.data]));
// // // // //       const link = document.createElement('a');
// // // // //       link.href = url;
// // // // //       link.setAttribute('download', `file_${fileId}`); // Adjust file naming as needed
// // // // //       document.body.appendChild(link);
// // // // //       link.click();
// // // // //       link.parentNode.removeChild(link);
// // // // //       toast({
// // // // //         title: 'Download',
// // // // //         description: 'Download started.',
// // // // //         status: 'success',
// // // // //         duration: 3000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error('Error downloading file:', error);
// // // // //       let errorMessage = error.response?.data?.message || 'Failed to download file.';
// // // // //       if (error.response) {
// // // // //         errorMessage = error.response.data?.message || errorMessage;
// // // // //       } else if (error.request) {
// // // // //         errorMessage = 'Network error. Please check your connection and try again.';
// // // // //       } else {
// // // // //         errorMessage = error.message;
// // // // //       }
// // // // //       toast({
// // // // //         title: 'Error',
// // // // //         description: errorMessage,
// // // // //         status: 'error',
// // // // //         duration: 5000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //     }
// // // // //   }, [toast]);

// // // // //   /**
// // // // //    * Delete a file with confirmation.
// // // // //    */
// // // // //   const deleteFile = useCallback(async () => {
// // // // //     if (!selectedFile) return;

// // // // //     try {
// // // // //       await api.delete(`/files/${selectedFile.id}`);
// // // // //       toast({
// // // // //         title: 'Deleted',
// // // // //         description: 'File deleted successfully.',
// // // // //         status: 'success',
// // // // //         duration: 3000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //       fetchFiles();
// // // // //     } catch (error) {
// // // // //       console.error('Error deleting file:', error);
// // // // //       let errorMessage = error.response?.data?.message || 'Failed to delete file.';
// // // // //       if (error.response) {
// // // // //         errorMessage = error.response.data?.message || errorMessage;
// // // // //       } else if (error.request) {
// // // // //         errorMessage = 'Network error. Please check your connection and try again.';
// // // // //       } else {
// // // // //         errorMessage = error.message;
// // // // //       }
// // // // //       toast({
// // // // //         title: 'Error',
// // // // //         description: errorMessage,
// // // // //         status: 'error',
// // // // //         duration: 5000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right', // Standardized position
// // // // //       });
// // // // //     } finally {
// // // // //       setSelectedFile(null);
// // // // //       onDeleteClose();
// // // // //     }
// // // // //   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

// // // // //   /**
// // // // //    * Conditional rendering based on loading state and file availability.
// // // // //    */
// // // // //   if (loading && page === 1) {
// // // // //     return <Loader />;
// // // // //   }

// // // // //   if (!files || files.length === 0) {
// // // // //     return (
// // // // //       <Box p={5}>
// // // // //         <Text fontSize="3xl" fontWeight="bold" mb={4}>
// // // // //   Library
// // // // // </Text>
// // // // // <Text fontSize="lg" color="gray.600">
// // // // //   No files uploaded yet. Start by uploading your first file!
// // // // // </Text>
// // // // //       </Box>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Box p={5}>
// // // // //       <Text fontSize="2xl" mb={4}>
// // // // //         Library
// // // // //       </Text>

// // // // //       {/* Tag Filters */}
// // // // //       <Flex mb={6} wrap="wrap" gap={2}>
// // // // //         {tags.map((tag) => (
// // // // //           <Button
// // // // //             key={tag}
// // // // //             size="sm"
// // // // //             // mr={2}
// // // // //             // mb={2}
// // // // //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// // // // //             onClick={() => setActiveTag(tag)}
// // // // //             aria-pressed={activeTag === tag}
// // // // //             aria-label={`Filter by ${tag}`} // Added aria-label for accessibility
// // // // //           >
// // // // //             {tag}
// // // // //           </Button>
// // // // //         ))}
// // // // //       </Flex>

// // // // //       {/* Tabs with FileDashboard Components */}
// // // // //       <Tabs isFitted variant={"enclosed"}>
// // // // //         <TabList>
// // // // //           <Tab>All</Tab>
// // // // //           <Tab>Audio</Tab>
// // // // //           <Tab>Video</Tab>
// // // // //           <Tab>Images</Tab>
// // // // //         </TabList>

// // // // //         <TabPanels>
// // // // //           <TabPanel>
// // // // //             <FileDashboard
// // // // //               uploadedFiles={filteredFiles || []}
// // // // //               onTagFile={handleTagFile}
// // // // //               onRemoveTag={handleRemoveTag}
// // // // //               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // // // //             />
// // // // //           </TabPanel>
// // // // //           <TabPanel>
// // // // //             <FileDashboard
// // // // //               uploadedFiles={audioFiles}
// // // // //               onTagFile={handleTagFile}
// // // // //               onRemoveTag={handleRemoveTag}
// // // // //               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // // // //             />
// // // // //           </TabPanel>
// // // // //           <TabPanel>
// // // // //             <FileDashboard
// // // // //               uploadedFiles={videoFiles}
// // // // //               onTagFile={handleTagFile}
// // // // //               onRemoveTag={handleRemoveTag}
// // // // //               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // // // //             />
// // // // //           </TabPanel>
// // // // //           <TabPanel>
// // // // //             <FileDashboard
// // // // //               uploadedFiles={imageFiles}
// // // // //               onTagFile={handleTagFile}
// // // // //               onRemoveTag={handleRemoveTag}
// // // // //               onPlayAudio={onPlayAudio} // Pass onPlayAudio to FileDashboard
// // // // //             />
// // // // //           </TabPanel>
// // // // //         </TabPanels>
// // // // //       </Tabs>

// // // // //       {/* Files Grid */}
// // // // //       {/* <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
// // // // //         {filteredFiles.map((file) => (
// // // // //           <Box
// // // // //             key={file.id}
// // // // //             borderWidth="1px"
// // // // //             borderRadius="lg"
// // // // //             overflow="hidden"
// // // // //             position="relative"
// // // // //             bg="neutral"
// // // // //             _hover={{ boxShadow: 'lg' }}
// // // // //           > */}
// // // // //             {/* Thumbnail */}
// // // // //             {/* <Link to={`/media/${file.id}`} aria-label={`View details of ${file.filename}`}>
// // // // //               <Image src={file.thumbnailUrl} alt={file.filename} objectFit="cover" height="150px" width="100%" />
// // // // //             </Link> */}

// // // // //             {/* File Name and Tags */}
// // // // //             {/* <Box p="6">
// // // // //               <Flex align="baseline">
// // // // //                 <Text
// // // // //                   fontWeight="semibold"
// // // // //                   as="h4"
// // // // //                   lineHeight="tight"
// // // // //                   isTruncated
// // // // //                   title={file.filename}
// // // // //                   mb={2}
// // // // //                 >
// // // // //                   {file.filename}
// // // // //                 </Text>
// // // // //               </Flex>
// // // // //               <Box>
// // // // //                 {file.tags.slice(0, 3).map((tag) => (
// // // // //                   <Badge key={tag} mr={1} mb={1} colorScheme="teal">
// // // // //                     {tag}
// // // // //                   </Badge>
// // // // //                 ))}
// // // // //                 {file.tags.length > 3 && (
// // // // //                   <Badge colorScheme="teal">+{file.tags.length - 3}</Badge>
// // // // //                 )}
// // // // //               </Box>
// // // // //             </Box> */}

// // // // //             {/* Status Indicator */}
// // // // //             {/* {file.processing_status && (
// // // // //               <Tooltip label={`Status: ${file.processing_status}`} placement="top">
// // // // //                 <Box
// // // // //                   position="absolute"
// // // // //                   top="2"
// // // // //                   left="2"
// // // // //                   color={
// // // // //                     file.processing_status === 'error'
// // // // //                       ? 'red.500'
// // // // //                       : file.processing_status === 'completed'
// // // // //                       ? 'green.500'
// // // // //                       : 'blue.500'
// // // // //                   }
// // // // //                 >
// // // // //                   {file.processing_status === 'completed' && <FaCheckCircle />}
// // // // //                   {file.processing_status === 'processing' && <Spinner />}
// // // // //                   {file.processing_status === 'error' && <FaTimesCircle />}
// // // // //                 </Box>
// // // // //               </Tooltip>
// // // // //             )} */}

// // // // //             {/* Hover Actions */}
// // // // //             {/* <Box
// // // // //               position="absolute"
// // // // //               top="0"
// // // // //               left="0"
// // // // //               width="100%"
// // // // //               height="100%"
// // // // //               bg="blackAlpha.600"
// // // // //               opacity="0"
// // // // //               transition="opacity 0.3s"
// // // // //               _hover={{ opacity: 1 }}
// // // // //               display="flex"
// // // // //               justifyContent="center"
// // // // //               alignItems="center"
// // // // //             >
// // // // //               {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// // // // //                 <IconButton
// // // // //                   aria-label={`Play ${file.filename}`}
// // // // //                   icon={<FaPlay />}
// // // // //                   colorScheme="teal"
// // // // //                   size="lg"
// // // // //                   m={2}
// // // // //                   onClick={() => onPlayAudio(file.id)} // Updated to pass file.id
// // // // //                 />
// // // // //               )}
// // // // //               <Link to={`/media/${file.id}`}>
// // // // //                 <IconButton
// // // // //                   aria-label={`View details of ${file.filename}`}
// // // // //                   icon={<FaEllipsisV />}
// // // // //                   colorScheme="teal"
// // // // //                   size="lg"
// // // // //                   m={2}
// // // // //                 />
// // // // //               </Link>
// // // // //             </Box> */}

// // // // //             {/* Contextual Menu */}
// // // // //             {/* <Menu>
// // // // //               <MenuButton
// // // // //                 as={IconButton}
// // // // //                 aria-label={`More actions for ${file.filename}`}
// // // // //                 icon={<FaEllipsisV />}
// // // // //                 variant="outline"
// // // // //                 position="absolute"
// // // // //                 top="2"
// // // // //                 right="2"
// // // // //                 onClick={() => handleMenuOpen(file)}
// // // // //               />
// // // // //               <MenuList>
// // // // //                 <MenuItem onClick={() => handleMenuAction('process')}>Process</MenuItem>
// // // // //                 <MenuItem onClick={() => handleMenuAction('analyze')}>Analyze</MenuItem>
// // // // //                 <MenuItem as={Link} to={`/media/${file.id}`}>View Details</MenuItem>
// // // // //                 <MenuItem onClick={() => handleMenuAction('download')}>Download</MenuItem>
// // // // //                 <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
// // // // //               </MenuList>
// // // // //             </Menu>
// // // // //           </Box>
// // // // //         ))}
// // // // //       </Grid> */}

// // // // //       {/* Load More Button */}
// // // // //       {!loading && files.length >= 20 && (
// // // // //         <Flex justify="center" mt={6}>
// // // // //           <Button onClick={loadMore} colorScheme="blue" aria-label="Load More Files">
// // // // //             Load More
// // // // //           </Button>
// // // // //         </Flex>
// // // // //       )}

// // // // //       {/* Loading Indicator for Pagination */}
// // // // //       {loading && page > 1 && (
// // // // //         <Flex justify="center" mt={6}>
// // // // //           <Spinner size="lg" color="blue.500" />
// // // // //         </Flex>
// // // // //       )}

// // // // //       {/* Delete Confirmation Dialog */}
// // // // //       <ConfirmationDialog
// // // // //         isOpen={isDeleteOpen}
// // // // //         onClose={onDeleteClose}
// // // // //         onConfirm={deleteFile}
// // // // //         title="Confirm Deletion"
// // // // //         description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
// // // // //       />
// // // // //     </Box>
// // // // //   );
// // // // // }

// // // // // Library.propTypes = {
// // // // //   onPlayAudio: PropTypes.func.isRequired,
// // // // // };

// // // // // export default Library;

// // // // // src/components/pages/Library.jsx

// // // // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // // // import {
// // // //   Box,
// // // //   Text,
// // // //   Button,
// // // //   Spinner,
// // // //   useToast,
// // // //   Flex,
// // // //   Tabs,
// // // //   TabList,
// // // //   TabPanels,
// // // //   Tab,
// // // //   TabPanel,
// // // //   Modal,
// // // //   ModalOverlay,
// // // //   ModalContent,
// // // //   ModalHeader,
// // // //   ModalBody,
// // // //   ModalCloseButton,
// // // //   useDisclosure,
// // // // } from '@chakra-ui/react';
// // // // import {
// // // //   FaEllipsisV,
// // // //   FaCheckCircle,
// // // //   FaTimesCircle,
// // // // } from 'react-icons/fa';
// // // // import { Link } from 'react-router-dom';
// // // // import api from '../../utils/api';
// // // // import Loader from '../common/Loader';
// // // // import PropTypes from 'prop-types';
// // // // import FileDashboard from '../common/FileDashboard';

// // // // /**
// // // //  * Confirmation Dialog Component for Deletion.
// // // //  */
// // // // function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description }) {
// // // //   return (
// // // //     <Modal isOpen={isOpen} onClose={onClose} isCentered>
// // // //       <ModalOverlay />
// // // //       <ModalContent>
// // // //         <ModalHeader>{title}</ModalHeader>
// // // //         <ModalCloseButton />
// // // //         <ModalBody>
// // // //           <Text>{description}</Text>
// // // //         </ModalBody>
// // // //         <Flex justify="flex-end" p={4}>
// // // //           <Button variant="ghost" mr={3} onClick={onClose}>
// // // //             Cancel
// // // //           </Button>
// // // //           <Button colorScheme="red" onClick={onConfirm}>
// // // //             Confirm
// // // //           </Button>
// // // //         </Flex>
// // // //       </ModalContent>
// // // //     </Modal>
// // // //   );
// // // // }

// // // // ConfirmationDialog.propTypes = {
// // // //   isOpen: PropTypes.bool.isRequired,
// // // //   onClose: PropTypes.func.isRequired,
// // // //   onConfirm: PropTypes.func.isRequired,
// // // //   title: PropTypes.string.isRequired,
// // // //   description: PropTypes.string.isRequired,
// // // // };

// // // // /**
// // // //  * Helper function for error handling.
// // // //  */
// // // // const handleError = (error, toast, defaultMessage) => {
// // // //   console.error(error);
// // // //   let errorMessage = defaultMessage;
// // // //   if (error.response) {
// // // //     // Server responded with a status other than 2xx
// // // //     errorMessage = error.response.data?.message || errorMessage;
// // // //   } else if (error.request) {
// // // //     // Request was made but no response received
// // // //     errorMessage = 'Network error. Please check your connection and try again.';
// // // //   } else {
// // // //     // Something else caused the error
// // // //     errorMessage = error.message;
// // // //   }
// // // //   toast({
// // // //     title: 'Error',
// // // //     description: errorMessage,
// // // //     status: 'error',
// // // //     duration: 5000,
// // // //     isClosable: true,
// // // //     position: 'top-right',
// // // //   });
// // // // };

// // // // /**
// // // //  * Main Library Component.
// // // //  */
// // // // function Library({ onPlayAudio }) {
// // // //   const [files, setFiles] = useState([]);
// // // //   const [tags, setTags] = useState(['All']);
// // // //   const [activeTag, setActiveTag] = useState('All');
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [page, setPage] = useState(1);
// // // //   const [selectedFile, setSelectedFile] = useState(null);

// // // //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

// // // //   const toast = useToast();

// // // //   /**
// // // //    * Fetch files from the API based on the active tag and page number.
// // // //    */
// // // //   const fetchFiles = useCallback(
// // // //     async (pageNum = 1) => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const response = await api.get('/file_history', {
// // // //           params: {
// // // //             page: pageNum,
// // // //             per_page: 20,
// // // //             tag: activeTag !== 'All' ? activeTag : undefined,
// // // //           },
// // // //         });

// // // //         if (response.data && Array.isArray(response.data.files)) {
// // // //           setFiles((prevFiles) =>
// // // //             pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
// // // //           );
// // // //           if (pageNum === 1) {
// // // //             const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// // // //             setTags(allTags);
// // // //           }
// // // //           setPage(pageNum);
// // // //         } else {
// // // //           console.warn('No files returned from the API or incorrect data structure.');
// // // //           if (pageNum === 1) {
// // // //             setFiles([]);
// // // //           }
// // // //         }
// // // //       } catch (error) {
// // // //         handleError(error, toast, 'Failed to fetch files.');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     },
// // // //     [activeTag, toast]
// // // //   );

// // // //   /**
// // // //    * Load more files for pagination.
// // // //    */
// // // //   const loadMore = useCallback(() => {
// // // //     fetchFiles(page + 1);
// // // //   }, [fetchFiles, page]);

// // // //   /**
// // // //    * Fetch files on component mount and when activeTag changes.
// // // //    */
// // // //   useEffect(() => {
// // // //     fetchFiles();
// // // //   }, [fetchFiles]);

// // // //   /**
// // // //    * Define filtered file arrays based on file type.
// // // //    */
// // // //   const audioFiles = useMemo(() => files.filter(isAudioFile), [files]);
// // // //   const videoFiles = useMemo(() => files.filter(isVideoFile), [files]);
// // // //   const imageFiles = useMemo(() => files.filter((file) => !isAudioFile(file.type) && !isVideoFile(file.type)), [files]);

// // // //   /**
// // // //    * Memoize filtered files to improve performance.
// // // //    */
// // // //   const filteredFiles = useMemo(() => {
// // // //     if (activeTag === 'All') return files;
// // // //     return files.filter((file) => file.tags && file.tags.includes(activeTag));
// // // //   }, [activeTag, files]);

// // // //   /**
// // // //    * Handle adding tags to a file.
// // // //    */
// // // //   const handleTagFile = useCallback(
// // // //     async (fileId, tagsInput) => {
// // // //       try {
// // // //         const tagsArray = tagsInput
// // // //           .split(',')
// // // //           .map((tag) => tag.trim())
// // // //           .filter((tag) => tag.length > 0)
// // // //           .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // // //         await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// // // //         toast({
// // // //           title: 'Success',
// // // //           description: 'Tags added successfully.',
// // // //           status: 'success',
// // // //           duration: 3000,
// // // //           isClosable: true,
// // // //           position: 'top-right',
// // // //         });
// // // //         fetchFiles(); // Refresh the file list
// // // //       } catch (error) {
// // // //         handleError(error, toast, 'Failed to add tags.');
// // // //       }
// // // //     },
// // // //     [fetchFiles, toast]
// // // //   );

// // // //   /**
// // // //    * Handle removing tags from a file.
// // // //    */
// // // //   const handleRemoveTag = useCallback(
// // // //     async (fileId, tag) => {
// // // //       try {
// // // //         await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
// // // //         toast({
// // // //           title: 'Success',
// // // //           description: 'Tags removed successfully.',
// // // //           status: 'success',
// // // //           duration: 3000,
// // // //           isClosable: true,
// // // //           position: 'top-right',
// // // //         });
// // // //         fetchFiles(); // Refresh the file list
// // // //       } catch (error) {
// // // //         handleError(error, toast, 'Failed to remove tags.');
// // // //       }
// // // //     },
// // // //     [fetchFiles, toast]
// // // //   );

// // // //   /**
// // // //    * Handle opening contextual menu for a specific file.
// // // //    */
// // // //   const handleMenuOpen = useCallback((file) => {
// // // //     setSelectedFile(file);
// // // //   }, []);

// // // //   /**
// // // //    * Handle closing contextual menu.
// // // //    */
// // // //   const handleMenuClose = useCallback(() => {
// // // //     setSelectedFile(null);
// // // //   }, []);

// // // //   /**
// // // //    * Handle actions from the contextual menu.
// // // //    */
// // // //   const handleMenuAction = useCallback(
// // // //     async (action, file, event) => {
// // // //       if (!file) return;
// // // //       switch (action) {
// // // //         case 'process':
// // // //           // Implement API call for processing
// // // //           try {
// // // //             await api.post(`/files/${file.id}/process`);
// // // //             toast({
// // // //               title: 'Processing',
// // // //               description: `Processing started for "${file.filename}".`,
// // // //               status: 'info',
// // // //               duration: 3000,
// // // //               isClosable: true,
// // // //               position: 'top-right',
// // // //             });
// // // //             fetchFiles();
// // // //           } catch (error) {
// // // //             handleError(error, toast, 'Failed to initiate processing.');
// // // //           }
// // // //           break;
// // // //         case 'analyze':
// // // //           // Implement API call for analysis
// // // //           try {
// // // //             await api.post(`/files/${file.id}/analyze`);
// // // //             toast({
// // // //               title: 'Analysis',
// // // //               description: `Analysis started for "${file.filename}".`,
// // // //               status: 'info',
// // // //               duration: 3000,
// // // //               isClosable: true,
// // // //               position: 'top-right',
// // // //             });
// // // //             fetchFiles();
// // // //           } catch (error) {
// // // //             handleError(error, toast, 'Failed to initiate analysis.');
// // // //           }
// // // //           break;
// // // //         case 'download':
// // // //           // Implement download functionality
// // // //           try {
// // // //             const response = await api.get(`/files/${file.id}/download`, { responseType: 'blob' });
// // // //             const url = window.URL.createObjectURL(new Blob([response.data]));
// // // //             const link = document.createElement('a');
// // // //             link.href = url;
// // // //             link.setAttribute('download', file.filename || `file_${file.id}`);
// // // //             document.body.appendChild(link);
// // // //             link.click();
// // // //             link.parentNode.removeChild(link);
// // // //             toast({
// // // //               title: 'Download',
// // // //               description: `Download started for "${file.filename}".`,
// // // //               status: 'success',
// // // //               duration: 3000,
// // // //               isClosable: true,
// // // //               position: 'top-right',
// // // //             });
// // // //           } catch (error) {
// // // //             handleError(error, toast, 'Failed to download file.');
// // // //           }
// // // //           break;
// // // //         case 'delete':
// // // //           onDeleteFile(file.id);
// // // //           toast({
// // // //             title: 'File Deleted',
// // // //             description: `"${file.filename}" has been deleted.`,
// // // //             status: 'success',
// // // //             duration: 3000,
// // // //             isClosable: true,
// // // //             position: 'top-right',
// // // //           });
// // // //           break;
// // // //         default:
// // // //           break;
// // // //       }
// // // //     },
// // // //     [fetchFiles, onDeleteFile, toast]
// // // //   );

// // // //   /**
// // // //    * Delete a file with confirmation.
// // // //    */
// // // //   const deleteFile = useCallback(async () => {
// // // //     if (!selectedFile) return;

// // // //     try {
// // // //       await api.delete(`/files/${selectedFile.id}`);
// // // //       toast({
// // // //         title: 'Deleted',
// // // //         description: 'File deleted successfully.',
// // // //         status: 'success',
// // // //         duration: 3000,
// // // //         isClosable: true,
// // // //         position: 'top-right',
// // // //       });
// // // //       fetchFiles();
// // // //     } catch (error) {
// // // //       handleError(error, toast, 'Failed to delete file.');
// // // //     } finally {
// // // //       setSelectedFile(null);
// // // //       onDeleteClose();
// // // //     }
// // // //   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

// // // //   /**
// // // //    * Conditional rendering based on loading state and file availability.
// // // //    */
// // // //   if (loading && page === 1) {
// // // //     return <Loader />;
// // // //   }

// // // //   if (!files.length) {
// // // //     return (
// // // //       <Box p={5}>
// // // //         <Text fontSize="3xl" fontWeight="bold" mb={4}>
// // // //           Library
// // // //         </Text>
// // // //         <Text fontSize="lg" color="gray.600">
// // // //           No files uploaded yet. Start by uploading your first file!
// // // //         </Text>
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Box p={5}>
// // // //       <Text fontSize="2xl" mb={4}>
// // // //         Library
// // // //       </Text>

// // // //       {/* Tag Filters */}
// // // //       <Flex mb={6} wrap="wrap" gap={2}>
// // // //         {tags.map((tag) => (
// // // //           <Button
// // // //             key={tag}
// // // //             size="sm"
// // // //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// // // //             onClick={() => setActiveTag(tag)}
// // // //             aria-pressed={activeTag === tag}
// // // //             aria-label={`Filter by ${tag}`}
// // // //           >
// // // //             {tag}
// // // //           </Button>
// // // //         ))}
// // // //       </Flex>

// // // //       {/* Tabs with FileDashboard Components */}
// // // //       <Tabs isFitted variant="enclosed">
// // // //         <TabList>
// // // //           <Tab>All</Tab>
// // // //           <Tab>Audio</Tab>
// // // //           <Tab>Video</Tab>
// // // //           <Tab>Images</Tab>
// // // //         </TabList>

// // // //         <TabPanels>
// // // //           <TabPanel>
// // // //             <FileDashboard
// // // //               uploadedFiles={filteredFiles}
// // // //               onTagFile={handleTagFile}
// // // //               onRemoveTag={handleRemoveTag}
// // // //               onPlayAudio={onPlayAudio}
// // // //               onDeleteFile={handleMenuAction} // Pass handleMenuAction for delete
// // // //             />
// // // //           </TabPanel>
// // // //           <TabPanel>
// // // //             <FileDashboard
// // // //               uploadedFiles={audioFiles}
// // // //               onTagFile={handleTagFile}
// // // //               onRemoveTag={handleRemoveTag}
// // // //               onPlayAudio={onPlayAudio}
// // // //               onDeleteFile={handleMenuAction}
// // // //             />
// // // //           </TabPanel>
// // // //           <TabPanel>
// // // //             <FileDashboard
// // // //               uploadedFiles={videoFiles}
// // // //               onTagFile={handleTagFile}
// // // //               onRemoveTag={handleRemoveTag}
// // // //               onPlayAudio={onPlayAudio}
// // // //               onDeleteFile={handleMenuAction}
// // // //             />
// // // //           </TabPanel>
// // // //           <TabPanel>
// // // //             <FileDashboard
// // // //               uploadedFiles={imageFiles}
// // // //               onTagFile={handleTagFile}
// // // //               onRemoveTag={handleRemoveTag}
// // // //               onPlayAudio={onPlayAudio}
// // // //               onDeleteFile={handleMenuAction}
// // // //             />
// // // //           </TabPanel>
// // // //         </TabPanels>
// // // //       </Tabs>

// // // //       {/* Load More Button */}
// // // //       {!loading && files.length >= 20 && (
// // // //         <Flex justify="center" mt={6}>
// // // //           <Button onClick={loadMore} colorScheme="blue" aria-label="Load More Files">
// // // //             Load More
// // // //           </Button>
// // // //         </Flex>
// // // //       )}

// // // //       {/* Loading Indicator for Pagination */}
// // // //       {loading && page > 1 && (
// // // //         <Flex justify="center" mt={6}>
// // // //           <Spinner size="lg" color="blue.500" />
// // // //         </Flex>
// // // //       )}

// // // //       {/* Delete Confirmation Dialog */}
// // // //       <ConfirmationDialog
// // // //         isOpen={isDeleteOpen}
// // // //         onClose={onDeleteClose}
// // // //         onConfirm={deleteFile}
// // // //         title="Confirm Deletion"
// // // //         description={`Are you sure you want to delete "${selectedFile?.filename}"? This action cannot be undone.`}
// // // //       />
// // // //     </Box>
// // // //   );
// // // // }

// // // // Library.propTypes = {
// // // //   onPlayAudio: PropTypes.func.isRequired,
// // // // };

// // // // export default Library;

// // // // src/components/pages/Library.jsx

// // // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // // import {
// // //   Box,
// // //   Text,
// // //   Button,
// // //   Spinner,
// // //   useToast,
// // //   Flex,
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
// // //   FaEllipsisV,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // // } from 'react-icons/fa';
// // // import { Link } from 'react-router-dom';
// // // import api from '../../utils/api';
// // // import Loader from '../common/Loader';
// // // import PropTypes from 'prop-types';
// // // import FileDashboard from '../common/FileDashboard';
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
// // //  * Helper function for error handling.
// // //  */
// // // const handleError = (error, toast, defaultMessage) => {
// // //   console.error(error);
// // //   let errorMessage = defaultMessage;
// // //   if (error.response) {
// // //     // Server responded with a status other than 2xx
// // //     errorMessage = error.response.data?.message || errorMessage;
// // //   } else if (error.request) {
// // //     // Request was made but no response received
// // //     errorMessage = 'Network error. Please check your connection and try again.';
// // //   } else {
// // //     // Something else caused the error
// // //     errorMessage = error.message;
// // //   }
// // //   toast({
// // //     title: 'Error',
// // //     description: errorMessage,
// // //     status: 'error',
// // //     duration: 5000,
// // //     isClosable: true,
// // //     position: 'top-right',
// // //   });
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
// // //   const fetchFiles = useCallback(
// // //     async (pageNum = 1) => {
// // //       setLoading(true);
// // //       try {
// // //         const response = await api.get('/file_history', {
// // //           params: {
// // //             page: pageNum,
// // //             per_page: 20,
// // //             tag: activeTag !== 'All' ? activeTag : undefined,
// // //           },
// // //         });

// // //         if (response.data && Array.isArray(response.data.files)) {
// // //           setFiles((prevFiles) =>
// // //             pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
// // //           );
// // //           if (pageNum === 1) {
// // //             const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// // //             setTags(allTags);
// // //           }
// // //           setPage(pageNum);
// // //         } else {
// // //           console.warn('No files returned from the API or incorrect data structure.');
// // //           if (pageNum === 1) {
// // //             setFiles([]);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         handleError(error, toast, 'Failed to fetch files.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     },
// // //     [activeTag, toast]
// // //   );

// // //   /**
// // //    * Load more files for pagination.
// // //    */
// // //   const loadMore = useCallback(() => {
// // //     fetchFiles(page + 1);
// // //   }, [fetchFiles, page]);

// // //   /**
// // //    * Fetch files on component mount and when activeTag changes.
// // //    */
// // //   useEffect(() => {
// // //     fetchFiles();
// // //   }, [fetchFiles]);

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
// // //     if (activeTag === 'All') return files;
// // //     return files.filter((file) => file.tags && file.tags.includes(activeTag));
// // //   }, [activeTag, files]);

// // //   /**
// // //    * Handle adding tags to a file.
// // //    */
// // //   const handleTagFile = useCallback(
// // //     async (fileId, tagsInput) => {
// // //       try {
// // //         const tagsArray = tagsInput
// // //           .split(',')
// // //           .map((tag) => tag.trim())
// // //           .filter((tag) => tag.length > 0)
// // //           .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// // //         await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// // //         toast({
// // //           title: 'Success',
// // //           description: 'Tags added successfully.',
// // //           status: 'success',
// // //           duration: 3000,
// // //           isClosable: true,
// // //           position: 'top-right',
// // //         });
// // //         fetchFiles(); // Refresh the file list
// // //       } catch (error) {
// // //         handleError(error, toast, 'Failed to add tags.');
// // //       }
// // //     },
// // //     [fetchFiles, toast]
// // //   );

// // //   /**
// // //    * Handle removing tags from a file.
// // //    */
// // //   const handleRemoveTag = useCallback(
// // //     async (fileId, tag) => {
// // //       try {
// // //         await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
// // //         toast({
// // //           title: 'Success',
// // //           description: 'Tags removed successfully.',
// // //           status: 'success',
// // //           duration: 3000,
// // //           isClosable: true,
// // //           position: 'top-right',
// // //         });
// // //         fetchFiles(); // Refresh the file list
// // //       } catch (error) {
// // //         handleError(error, toast, 'Failed to remove tags.');
// // //       }
// // //     },
// // //     [fetchFiles, toast]
// // //   );

// // //   /**
// // //    * Handle actions from the contextual menu.
// // //    */
// // //   const handleMenuAction = useCallback(
// // //     async (action, file, event) => {
// // //       event.stopPropagation();
// // //       switch (action) {
// // //         case 'process':
// // //           try {
// // //             await api.post(`/files/${file.id}/process`);
// // //             toast({
// // //               title: 'Processing',
// // //               description: `Processing started for "${file.filename}".`,
// // //               status: 'info',
// // //               duration: 3000,
// // //               isClosable: true,
// // //               position: 'top-right',
// // //             });
// // //             fetchFiles();
// // //           } catch (error) {
// // //             handleError(error, toast, 'Failed to initiate processing.');
// // //           }
// // //           break;
// // //         case 'analyze':
// // //           try {
// // //             await api.post(`/files/${file.id}/analyze`);
// // //             toast({
// // //               title: 'Analysis',
// // //               description: `Analysis started for "${file.filename}".`,
// // //               status: 'info',
// // //               duration: 3000,
// // //               isClosable: true,
// // //               position: 'top-right',
// // //             });
// // //             fetchFiles();
// // //           } catch (error) {
// // //             handleError(error, toast, 'Failed to initiate analysis.');
// // //           }
// // //           break;
// // //         case 'download':
// // //           try {
// // //             const response = await api.get(`/files/${file.id}/download`, { responseType: 'blob' });
// // //             const url = window.URL.createObjectURL(new Blob([response.data]));
// // //             const link = document.createElement('a');
// // //             link.href = url;
// // //             link.setAttribute('download', file.filename || `file_${file.id}`);
// // //             document.body.appendChild(link);
// // //             link.click();
// // //             link.parentNode.removeChild(link);
// // //             toast({
// // //               title: 'Download',
// // //               description: `Download started for "${file.filename}".`,
// // //               status: 'success',
// // //               duration: 3000,
// // //               isClosable: true,
// // //               position: 'top-right',
// // //             });
// // //           } catch (error) {
// // //             handleError(error, toast, 'Failed to download file.');
// // //           }
// // //           break;
// // //         case 'delete':
// // //           setSelectedFile(file);
// // //           onDeleteOpen();
// // //           break;
// // //         default:
// // //           break;
// // //       }
// // //     },
// // //     [fetchFiles, onDeleteOpen, toast]
// // //   );

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
// // //         position: 'top-right',
// // //       });
// // //       fetchFiles();
// // //     } catch (error) {
// // //       handleError(error, toast, 'Failed to delete file.');
// // //     } finally {
// // //       setSelectedFile(null);
// // //       onDeleteClose();
// // //     }
// // //   }, [selectedFile, fetchFiles, onDeleteClose, toast]);

// // //   /**
// // //    * Conditional rendering based on loading state and file availability.
// // //    */
// // //   if (loading && page === 1) {
// // //     return <Loader />;
// // //   }

// // //   if (!files.length) {
// // //     return (
// // //       <Box p={5}>
// // //         <Text fontSize="3xl" fontWeight="bold" mb={4}>
// // //           Library
// // //         </Text>
// // //         <Text fontSize="lg" color="gray.600">
// // //           No files uploaded yet. Start by uploading your first file!
// // //         </Text>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box p={5}>
// // //       <Text fontSize="2xl" mb={4}>
// // //         Library
// // //       </Text>

// // //       {/* Tag Filters */}
// // //       <Flex mb={6} wrap="wrap" gap={2}>
// // //         {tags.map((tag) => (
// // //           <Button
// // //             key={tag}
// // //             size="sm"
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
// // //       <Tabs isFitted variant="enclosed">
// // //         <TabList>
// // //           <Tab>All</Tab>
// // //           <Tab>Audio</Tab>
// // //           <Tab>Video</Tab>
// // //           <Tab>Images</Tab>
// // //         </TabList>

// // //         <TabPanels>
// // //           <TabPanel>
// // //             <FileDashboard
// // //               uploadedFiles={filteredFiles}
// // //               onTagFile={handleTagFile}
// // //               onRemoveTag={handleRemoveTag}
// // //               onPlayAudio={onPlayAudio}
// // //               onDeleteFile={handleMenuAction}
// // //             />
// // //           </TabPanel>
// // //           <TabPanel>
// // //             <FileDashboard
// // //               uploadedFiles={audioFiles}
// // //               onTagFile={handleTagFile}
// // //               onRemoveTag={handleRemoveTag}
// // //               onPlayAudio={onPlayAudio}
// // //               onDeleteFile={handleMenuAction}
// // //             />
// // //           </TabPanel>
// // //           <TabPanel>
// // //             <FileDashboard
// // //               uploadedFiles={videoFiles}
// // //               onTagFile={handleTagFile}
// // //               onRemoveTag={handleRemoveTag}
// // //               onPlayAudio={onPlayAudio}
// // //               onDeleteFile={handleMenuAction}
// // //             />
// // //           </TabPanel>
// // //           <TabPanel>
// // //             <FileDashboard
// // //               uploadedFiles={imageFiles}
// // //               onTagFile={handleTagFile}
// // //               onRemoveTag={handleRemoveTag}
// // //               onPlayAudio={onPlayAudio}
// // //               onDeleteFile={handleMenuAction}
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
// // //           <Spinner size="lg" color="blue.500" />
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

// // // src/components/pages/Library.jsx

// // import React, { useState, useEffect, useMemo, useCallback } from 'react';
// // import {
// //   Box,
// //   Text,
// //   Button,
// //   Spinner,
// //   useToast,
// //   Flex,
// //   Tabs,
// //   TabList,
// //   TabPanels,
// //   Tab,
// //   TabPanel,
// //   Modal,
// //   ModalOverlay,
// //   ModalContent,
// //   ModalHeader,
// //   ModalBody,
// //   ModalCloseButton,
// //   useDisclosure,
// // } from '@chakra-ui/react';
// // import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// // import api from '../../utils/api';
// // import Loader from '../common/Loader';
// // import PropTypes from 'prop-types';
// // import FileDashboard from '../common/FileDashboard';
// // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

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

// // /**
// //  * Helper function for error handling.
// //  */
// // const handleError = (error, toast, defaultMessage) => {
// //   console.error(error);
// //   let errorMessage = defaultMessage;
// //   if (error.response) {
// //     // Server responded with a status other than 2xx
// //     errorMessage = error.response.data?.message || errorMessage;
// //   } else if (error.request) {
// //     // Request was made but no response received
// //     errorMessage = 'Network error. Please check your connection and try again.';
// //   } else {
// //     // Something else caused the error
// //     errorMessage = error.message;
// //   }
// //   toast({
// //     title: 'Error',
// //     description: errorMessage,
// //     status: 'error',
// //     duration: 5000,
// //     isClosable: true,
// //     position: 'top-right',
// //   });
// // };

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

// //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

// //   const toast = useToast();

// //   /**
// //    * Fetch files from the API based on the active tag and page number.
// //    */
// //   const fetchFiles = useCallback(
// //     async (pageNum = 1) => {
// //       setLoading(true);
// //       try {
// //         const response = await api.get('/file_history', {
// //           params: {
// //             page: pageNum,
// //             per_page: 20,
// //             tag: activeTag !== 'All' ? activeTag : undefined,
// //           },
// //         });

// //         if (response.data && Array.isArray(response.data.files)) {
// //           setFiles((prevFiles) =>
// //             pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
// //           );
// //           if (pageNum === 1) {
// //             const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// //             setTags(allTags);
// //           }
// //           setPage(pageNum);
// //         } else {
// //           console.warn('No files returned from the API or incorrect data structure.');
// //           if (pageNum === 1) {
// //             setFiles([]);
// //           }
// //         }
// //       } catch (error) {
// //         handleError(error, toast, 'Failed to fetch files.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     [activeTag, toast]
// //   );

// //   /**
// //    * Load more files for pagination.
// //    */
// //   const loadMore = useCallback(() => {
// //     fetchFiles(page + 1);
// //   }, [fetchFiles, page]);

// //   /**
// //    * Fetch files on component mount and when activeTag changes.
// //    */
// //   useEffect(() => {
// //     fetchFiles();
// //   }, [fetchFiles]);

// //   /**
// //    * Define filtered file arrays based on file type.
// //    */
// //   const audioFiles = useMemo(() => files.filter(isAudioFile), [files]);
// //   const videoFiles = useMemo(() => files.filter(isVideoFile), [files]);
// //   const imageFiles = useMemo(() => files.filter(isImageFile), [files]);

// //   /**
// //    * Memoize filtered files to improve performance.
// //    */
// //   const filteredFiles = useMemo(() => {
// //     if (activeTag === 'All') return files;
// //     return files.filter((file) => file.tags && file.tags.includes(activeTag));
// //   }, [activeTag, files]);

// //   /**
// //    * Handle adding tags to a file.
// //    */
// //   const handleTagFile = useCallback(
// //     async (fileId, tagsInput) => {
// //       try {
// //         const tagsArray = tagsInput
// //           .split(',')
// //           .map((tag) => tag.trim())
// //           .filter((tag) => tag.length > 0)
// //           .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// //         await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// //         toast({
// //           title: 'Success',
// //           description: 'Tags added successfully.',
// //           status: 'success',
// //           duration: 3000,
// //           isClosable: true,
// //           position: 'top-right',
// //         });
// //         fetchFiles(); // Refresh the file list
// //       } catch (error) {
// //         handleError(error, toast, 'Failed to add tags.');
// //       }
// //     },
// //     [fetchFiles, toast]
// //   );

// //   /**
// //    * Handle removing tags from a file.
// //    */
// //   const handleRemoveTag = useCallback(
// //     async (fileId, tag) => {
// //       try {
// //         await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
// //         toast({
// //           title: 'Success',
// //           description: 'Tags removed successfully.',
// //           status: 'success',
// //           duration: 3000,
// //           isClosable: true,
// //           position: 'top-right',
// //         });
// //         fetchFiles(); // Refresh the file list
// //       } catch (error) {
// //         handleError(error, toast, 'Failed to remove tags.');
// //       }
// //     },
// //     [fetchFiles, toast]
// //   );

// //   /**
// //    * Handle actions from the contextual menu.
// //    */
// //   const handleMenuAction = useCallback(
// //     async (action, file, event) => {
// //       event.stopPropagation();
// //       switch (action) {
// //         case 'process':
// //           try {
// //             await api.post(`/files/${file.id}/process`);
// //             toast({
// //               title: 'Processing',
// //               description: `Processing started for "${file.filename}".`,
// //               status: 'info',
// //               duration: 3000,
// //               isClosable: true,
// //               position: 'top-right',
// //             });
// //             fetchFiles();
// //           } catch (error) {
// //             handleError(error, toast, 'Failed to initiate processing.');
// //           }
// //           break;
// //         case 'analyze':
// //           try {
// //             await api.post(`/files/${file.id}/analyze`);
// //             toast({
// //               title: 'Analysis',
// //               description: `Analysis started for "${file.filename}".`,
// //               status: 'info',
// //               duration: 3000,
// //               isClosable: true,
// //               position: 'top-right',
// //             });
// //             fetchFiles();
// //           } catch (error) {
// //             handleError(error, toast, 'Failed to initiate analysis.');
// //           }
// //           break;
// //         case 'download':
// //           try {
// //             const response = await api.get(`/files/${file.id}/download`, { responseType: 'blob' });
// //             const url = window.URL.createObjectURL(new Blob([response.data]));
// //             const link = document.createElement('a');
// //             link.href = url;
// //             link.setAttribute('download', file.filename || `file_${file.id}`);
// //             document.body.appendChild(link);
// //             link.click();
// //             link.parentNode.removeChild(link);
// //             toast({
// //               title: 'Download',
// //               description: `Download started for "${file.filename}".`,
// //               status: 'success',
// //               duration: 3000,
// //               isClosable: true,
// //               position: 'top-right',
// //             });
// //           } catch (error) {
// //             handleError(error, toast, 'Failed to download file.');
// //           }
// //           break;
// //         case 'delete':
// //           setSelectedFile(file);
// //           onDeleteOpen();
// //           break;
// //         default:
// //           break;
// //       }
// //     },
// //     [fetchFiles, onDeleteOpen, toast]
// //   );

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
// //         position: 'top-right',
// //       });
// //       fetchFiles();
// //     } catch (error) {
// //       handleError(error, toast, 'Failed to delete file.');
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

// //   if (!files.length) {
// //     return (
// //       <Box p={5}>
// //         <Text fontSize="3xl" fontWeight="bold" mb={4}>
// //           Library
// //         </Text>
// //         <Text fontSize="lg" color="gray.600">
// //           No files uploaded yet. Start by uploading your first file!
// //         </Text>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={5}>
// //       {/* <Text fontSize="2xl" mb={4}>
// //         Library
// //       </Text> */}

// //       {/* Tag Filters */}
// //       <Flex mb={6} wrap="wrap" gap={2}>
// //         {tags.map((tag) => (
// //           <Button
// //             key={tag}
// //             size="sm"
// //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// //             onClick={() => setActiveTag(tag)}
// //             aria-pressed={activeTag === tag}
// //             aria-label={`Filter by ${tag}`}
// //           >
// //             {tag}
// //           </Button>
// //         ))}
// //       </Flex>

// //       {/* Tabs with FileDashboard Components */}
// //       <Tabs isFitted variant="enclosed">
// //         {/* <TabList>
// //           <Tab>All</Tab>
// //           <Tab>Audio</Tab>
// //           <Tab>Video</Tab>
// //           <Tab>Images</Tab>
// //         </TabList> */}

// //         <TabPanels>
// //           <TabPanel>
// //             <FileDashboard
// //               uploadedFiles={filteredFiles}
// //               onTagFile={handleTagFile}
// //               onRemoveTag={handleRemoveTag}
// //               onPlayAudio={onPlayAudio}
// //               onDeleteFile={handleMenuAction}
// //             />
// //           </TabPanel>
// //           <TabPanel>
// //             <FileDashboard
// //               uploadedFiles={audioFiles}
// //               onTagFile={handleTagFile}
// //               onRemoveTag={handleRemoveTag}
// //               onPlayAudio={onPlayAudio}
// //               onDeleteFile={handleMenuAction}
// //             />
// //           </TabPanel>
// //           <TabPanel>
// //             <FileDashboard
// //               uploadedFiles={videoFiles}
// //               onTagFile={handleTagFile}
// //               onRemoveTag={handleRemoveTag}
// //               onPlayAudio={onPlayAudio}
// //               onDeleteFile={handleMenuAction}
// //             />
// //           </TabPanel>
// //           <TabPanel>
// //             <FileDashboard
// //               uploadedFiles={imageFiles}
// //               onTagFile={handleTagFile}
// //               onRemoveTag={handleRemoveTag}
// //               onPlayAudio={onPlayAudio}
// //               onDeleteFile={handleMenuAction}
// //             />
// //           </TabPanel>
// //         </TabPanels>
// //       </Tabs>

// //       {/* Load More Button */}
// //       {!loading && files.length >= 20 && (
// //         <Flex justify="center" mt={6}>
// //           <Button onClick={loadMore} colorScheme="blue" aria-label="Load More Files">
// //             Load More
// //           </Button>
// //         </Flex>
// //       )}

// //       {/* Loading Indicator for Pagination */}
// //       {loading && page > 1 && (
// //         <Flex justify="center" mt={6}>
// //           <Spinner size="lg" color="blue.500" />
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
// //   );
// // }

// // Library.propTypes = {
// //   onPlayAudio: PropTypes.func.isRequired,
// // };

// // export default Library;

// // import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// // import {
// //   Box,
// //   Text,
// //   Button,
// //   Spinner,
// //   useToast,
// //   Flex,
// //   Tabs,
// //   TabList,
// //   TabPanels,
// //   Tab,
// //   TabPanel,
// //   Modal,
// //   ModalOverlay,
// //   ModalContent,
// //   ModalHeader,
// //   ModalBody,
// //   ModalCloseButton,
// //   useDisclosure,
// // } from '@chakra-ui/react';
// // import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// // import api from '../../utils/api';
// // import Loader from '../common/Loader';
// // import PropTypes from 'prop-types';
// // import FileDashboard from '../common/FileDashboard';
// // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

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

// // /**
// //  * Helper function for error handling.
// //  */
// // const handleError = (error, toast, defaultMessage) => {
// //   console.error(error);
// //   let errorMessage = defaultMessage;
// //   if (error.response) {
// //     errorMessage = error.response.data?.message || errorMessage;
// //   } else if (error.request) {
// //     errorMessage = 'Network error. Please check your connection and try again.';
// //   } else {
// //     errorMessage = error.message;
// //   }
// //   toast({
// //     title: 'Error',
// //     description: errorMessage,
// //     status: 'error',
// //     duration: 5000,
// //     isClosable: true,
// //     position: 'top-right',
// //   });
// // };

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
// //   const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
// //   const toast = useToast();
// //   const cachedFiles = useRef(null);

// //   /**
// //    * Fetch files from the API based on the active tag and page number.
// //    */
// //   const fetchFiles = useCallback(
// //     async (pageNum = 1) => {
// //       setLoading(true);
// //       try {
// //         const response = await api.get('/file_history', {
// //           params: {
// //             page: pageNum,
// //             per_page: 20,
// //             tag: activeTag !== 'All' ? activeTag : undefined,
// //           },
// //         });

// //         if (response.data && Array.isArray(response.data.files)) {
// //           setFiles((prevFiles) =>
// //             pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
// //           );
// //           if (pageNum === 1) {
// //             const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
// //             setTags(allTags);
// //           }
// //           setPage(pageNum);
// //         } else {
// //           if (pageNum === 1) setFiles([]);
// //         }
// //       } catch (error) {
// //         handleError(error, toast, 'Failed to fetch files.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     [activeTag, toast]
// //   );

// //   /**
// //    * Load more files for pagination.
// //    */
// //   const loadMore = useCallback(() => {
// //     fetchFiles(page + 1);
// //   }, [fetchFiles, page]);

// //   /**
// //    * Fetch files on component mount and when activeTag changes.
// //    */
// //   useEffect(() => {
// //     fetchFiles(page); // Fetch when page or activeTag changes
// //   }, [fetchFiles, activeTag, page]);

// //   useEffect(() => {
// //     cachedFiles.current = files;
// //   }, [files]);

// //   /**
// //    * Define filtered file arrays based on file type.
// //    */
// //   const audioFiles = useMemo(() => files.filter(isAudioFile), [files]);
// //   const videoFiles = useMemo(() => files.filter(isVideoFile), [files]);
// //   const imageFiles = useMemo(() => files.filter(isImageFile), [files]);

// //   /**
// //    * Memoize filtered files to improve performance.
// //    */
// //   const filteredFiles = useMemo(() => {
// //     return activeTag === 'All' ? files : files.filter((file) => file.tags && file.tags.includes(activeTag));
// //   }, [activeTag, files]);

// //   /**
// //    * Handle adding tags to a file.
// //    */
// //   const handleTagFile = useCallback(
// //     async (fileId, tagsInput) => {
// //       try {
// //         const tagsArray = tagsInput
// //           .split(',')
// //           .map((tag) => tag.trim())
// //           .filter((tag) => tag.length > 0)
// //           .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

// //         await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
// //         toast({
// //           title: 'Success',
// //           description: 'Tags added successfully.',
// //           status: 'success',
// //           duration: 3000,
// //           isClosable: true,
// //           position: 'top-right',
// //         });
// //         setFiles((prevFiles) =>
// //           prevFiles.map((file) => (file.id === fileId ? { ...file, tags: [...file.tags, ...tagsArray] } : file))
// //         ); // Update state instead of re-fetching files
// //       } catch (error) {
// //         handleError(error, toast, 'Failed to add tags.');
// //       }
// //     },
// //     [toast]
// //   );

// //   /**
// //    * Handle removing tags from a file.
// //    */
// //   const handleRemoveTag = useCallback(
// //     async (fileId, tag) => {
// //       try {
// //         await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
// //         toast({
// //           title: 'Success',
// //           description: 'Tags removed successfully.',
// //           status: 'success',
// //           duration: 3000,
// //           isClosable: true,
// //           position: 'top-right',
// //         });
// //         setFiles((prevFiles) =>
// //           prevFiles.map((file) => (file.id === fileId ? { ...file, tags: file.tags.filter((t) => t !== tag) } : file))
// //         ); // Update state instead of re-fetching files
// //       } catch (error) {
// //         handleError(error, toast, 'Failed to remove tags.');
// //       }
// //     },
// //     [toast]
// //   );

// //   /**
// //    * Handle actions from the contextual menu.
// //    */
// //   const handleMenuAction = useCallback(
// //     async (action, file, event) => {
// //       event.stopPropagation();
// //       switch (action) {
// //         case 'process':
// //           try {
// //             await api.post(`/files/${file.id}/process`);
// //             toast({
// //               title: 'Processing',
// //               description: `Processing started for "${file.filename}".`,
// //               status: 'info',
// //               duration: 3000,
// //               isClosable: true,
// //               position: 'top-right',
// //             });
// //           } catch (error) {
// //             handleError(error, toast, 'Failed to initiate processing.');
// //           }
// //           break;
// //         case 'analyze':
// //           try {
// //             await api.post(`/files/${file.id}/analyze`);
// //             toast({
// //               title: 'Analysis',
// //               description: `Analysis started for "${file.filename}".`,
// //               status: 'info',
// //               duration: 3000,
// //               isClosable: true,
// //               position: 'top-right',
// //             });
// //           } catch (error) {
// //             handleError(error, toast, 'Failed to initiate analysis.');
// //           }
// //           break;
// //         case 'download':
// //           try {
// //             const response = await api.get(`/files/${file.id}/download`, { responseType: 'blob' });
// //             const url = window.URL.createObjectURL(new Blob([response.data]));
// //             const link = document.createElement('a');
// //             link.href = url;
// //             link.setAttribute('download', file.filename || `file_${file.id}`);
// //             document.body.appendChild(link);
// //             link.click();
// //             link.parentNode.removeChild(link);
// //             toast({
// //               title: 'Download',
// //               description: `Download started for "${file.filename}".`,
// //               status: 'success',
// //               duration: 3000,
// //               isClosable: true,
// //               position: 'top-right',
// //             });
// //           } catch (error) {
// //             handleError(error, toast, 'Failed to download file.');
// //           }
// //           break;
// //         case 'delete':
// //           setSelectedFile(file);
// //           onDeleteOpen();
// //           break;
// //         default:
// //           break;
// //       }
// //     },
// //     [onDeleteOpen, toast]
// //   );

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
// //         position: 'top-right',
// //       });
// //       setFiles((prevFiles) => prevFiles.filter((file) => file.id !== selectedFile.id)); // Remove from local state
// //     } catch (error) {
// //       handleError(error, toast, 'Failed to delete file.');
// //     } finally {
// //       setSelectedFile(null);
// //       onDeleteClose();
// //     }
// //   }, [selectedFile, onDeleteClose, toast]);

// //   /**
// //    * Conditional rendering based on loading state and file availability.
// //    */
// //   if (loading && page === 1) {
// //     return <Loader />;
// //   }

// //   if (!files.length) {
// //     return (
// //       <Box p={5}>
// //         <Text fontSize="3xl" fontWeight="bold" mb={4}>
// //           Library
// //         </Text>
// //         <Text fontSize="lg" color="gray.600">
// //           No files uploaded yet. Start by uploading your first file!
// //         </Text>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={5}>
// //       {/* Tag Filters */}
// //       <Flex mb={6} wrap="wrap" gap={2}>
// //         {tags.map((tag) => (
// //           <Button
// //             key={tag}
// //             size="sm"
// //             colorScheme={activeTag === tag ? 'blue' : 'gray'}
// //             onClick={() => setActiveTag(tag)}
// //             aria-pressed={activeTag === tag}
// //             aria-label={`Filter by ${tag}`}
// //           >
// //             {tag}
// //           </Button>
// //         ))}
// //       </Flex>

// //       {/* Tabs with FileDashboard Components */}
// //       <Tabs isFitted variant="enclosed">
// //         {/* <TabList>
// //           <Tab aria-selected={activeTag === 'All'} onClick={() => setActiveTag('All')}>
// //             All
// //           </Tab>
// //           <Tab aria-selected={activeTag === 'Audio'} onClick={() => setActiveTag('Audio')}>
// //             Audio
// //           </Tab>
// //           <Tab aria-selected={activeTag === 'Video'} onClick={() => setActiveTag('Video')}>
// //             Video
// //           </Tab>
// //           <Tab aria-selected={activeTag === 'Images'} onClick={() => setActiveTag('Images')}>
// //             Images
// //           </Tab>
// //         </TabList> */}

// //         <TabPanels>
// //           <TabPanel>
// //             <FileDashboard
// //               uploadedFiles={filteredFiles}
// //               onTagFile={handleTagFile}
// //               onRemoveTag={handleRemoveTag}
// //               onPlayAudio={onPlayAudio}
// //               onDeleteFile={handleMenuAction}
// //             />
// //           </TabPanel>
// //           <TabPanel>
// //             <FileDashboard
// //               uploadedFiles={audioFiles}
// //               onTagFile={handleTagFile}
// //               onRemoveTag={handleRemoveTag}
// //               onPlayAudio={onPlayAudio}
// //               onDeleteFile={handleMenuAction}
// //             />
// //           </TabPanel>
// //           <TabPanel>
// //             <FileDashboard
// //               uploadedFiles={videoFiles}
// //               onTagFile={handleTagFile}
// //               onRemoveTag={handleRemoveTag}
// //               onPlayAudio={onPlayAudio}
// //               onDeleteFile={handleMenuAction}
// //             />
// //           </TabPanel>
// //           <TabPanel>
// //             <FileDashboard
// //               uploadedFiles={imageFiles}
// //               onTagFile={handleTagFile}
// //               onRemoveTag={handleRemoveTag}
// //               onPlayAudio={onPlayAudio}
// //               onDeleteFile={handleMenuAction}
// //             />
// //           </TabPanel>
// //         </TabPanels>
// //       </Tabs>

// //       {/* Load More Button */}
// //       {!loading && files.length >= 20 && (
// //         <Flex justify="center" mt={6}>
// //           <Button onClick={loadMore} colorScheme="blue" aria-label="Load More Files">
// //             Load More
// //           </Button>
// //         </Flex>
// //       )}

// //       {/* Loading Indicator for Pagination */}
// //       {loading && page > 1 && (
// //         <Flex justify="center" mt={6}>
// //           <Spinner size="lg" color="blue.500" />
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
// //   );
// // }

// // Library.propTypes = {
// //   onPlayAudio: PropTypes.func.isRequired,
// // };

// // export default Library;
// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import {
//   Box,
//   Text,
//   Button,
//   Spinner,
//   useToast,
//   Flex,
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
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import api from '../../utils/api';
// import Loader from '../common/Loader';
// import PropTypes from 'prop-types';
// import FileDashboard from '../common/FileDashboard';
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
//  * Helper function for error handling.
//  */
// const handleError = (error, toast, defaultMessage) => {
//   console.error(error);
//   let errorMessage = defaultMessage;
//   if (error.response) {
//     errorMessage = error.response.data?.message || errorMessage;
//   } else if (error.request) {
//     errorMessage = 'Network error. Please check your connection and try again.';
//   } else {
//     errorMessage = error.message;
//   }
//   toast({
//     title: 'Error',
//     description: errorMessage,
//     status: 'error',
//     duration: 5000,
//     isClosable: true,
//     position: 'top-right',
//   });
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
//   const cachedFiles = useRef(null);

//   /**
//    * Fetch files from the API based on the active tag and page number.
//    */
//   const fetchFiles = useCallback(
//     async (pageNum = 1) => {
//       setLoading(true);
//       try {
//         const response = await api.get('/file_history', {
//           params: {
//             page: pageNum,
//             per_page: 20,
//             tag: activeTag !== 'All' ? activeTag : undefined,
//           },
//         });

//         if (response.data && Array.isArray(response.data.files)) {
//           setFiles((prevFiles) =>
//             pageNum === 1 ? response.data.files : [...prevFiles, ...response.data.files]
//           );
//           if (pageNum === 1) {
//             const allTags = ['All', ...new Set(response.data.files.flatMap((file) => file.tags || []))];
//             setTags(allTags);
//           }
//           setPage(pageNum);
//         } else {
//           if (pageNum === 1) setFiles([]);
//         }
//       } catch (error) {
//         handleError(error, toast, 'Failed to fetch files.');
//       } finally {
//         setLoading(false);
//       }
//     },
//     [activeTag, toast]
//   );

//   /**
//    * Load more files for pagination.
//    */
//   const loadMore = useCallback(() => {
//     fetchFiles(page + 1);
//   }, [fetchFiles, page]);

//   /**
//    * Fetch files on component mount and when activeTag changes.
//    */
//   useEffect(() => {
//     fetchFiles(page); // Fetch when page or activeTag changes
//   }, [fetchFiles, activeTag, page]);

//   useEffect(() => {
//     cachedFiles.current = files;
//   }, [files]);

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
//     return activeTag === 'All' ? files : files.filter((file) => file.tags && file.tags.includes(activeTag));
//   }, [activeTag, files]);

//   /**
//    * Handle adding tags to a file.
//    */
//   const handleTagFile = useCallback(
//     async (fileId, tagsInput) => {
//       try {
//         const tagsArray = tagsInput
//           .split(',')
//           .map((tag) => tag.trim())
//           .filter((tag) => tag.length > 0)
//           .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

//         await api.post(`/files/${fileId}/tag`, { tags: tagsArray });
//         toast({
//           title: 'Success',
//           description: 'Tags added successfully.',
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//           position: 'top-right',
//         });
//         setFiles((prevFiles) =>
//           prevFiles.map((file) => (file.id === fileId ? { ...file, tags: [...file.tags, ...tagsArray] } : file))
//         ); // Update state instead of re-fetching files
//       } catch (error) {
//         handleError(error, toast, 'Failed to add tags.');
//       }
//     },
//     [toast]
//   );

//   /**
//    * Handle removing tags from a file.
//    */
//   const handleRemoveTag = useCallback(
//     async (fileId, tag) => {
//       try {
//         await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
//         toast({
//           title: 'Success',
//           description: 'Tags removed successfully.',
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//           position: 'top-right',
//         });
//         setFiles((prevFiles) =>
//           prevFiles.map((file) => (file.id === fileId ? { ...file, tags: file.tags.filter((t) => t !== tag) } : file))
//         ); // Update state instead of re-fetching files
//       } catch (error) {
//         handleError(error, toast, 'Failed to remove tags.');
//       }
//     },
//     [toast]
//   );

//   /**
//    * Handle actions from the contextual menu.
//    */
//   const handleMenuAction = useCallback(
//     async (action, file, event) => {
//       event.stopPropagation();
//       switch (action) {
//         case 'process':
//           try {
//             await api.post(`/files/${file.id}/process`);
//             toast({
//               title: 'Processing',
//               description: `Processing started for "${file.filename}".`,
//               status: 'info',
//               duration: 3000,
//               isClosable: true,
//               position: 'top-right',
//             });
//           } catch (error) {
//             handleError(error, toast, 'Failed to initiate processing.');
//           }
//           break;
//         case 'analyze':
//           try {
//             await api.post(`/files/${file.id}/analyze`);
//             toast({
//               title: 'Analysis',
//               description: `Analysis started for "${file.filename}".`,
//               status: 'info',
//               duration: 3000,
//               isClosable: true,
//               position: 'top-right',
//             });
//           } catch (error) {
//             handleError(error, toast, 'Failed to initiate analysis.');
//           }
//           break;
//         case 'download':
//           try {
//             const response = await api.get(`/files/${file.id}/download`, { responseType: 'blob' });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', file.filename || `file_${file.id}`);
//             document.body.appendChild(link);
//             link.click();
//             link.parentNode.removeChild(link);
//             toast({
//               title: 'Download',
//               description: `Download started for "${file.filename}".`,
//               status: 'success',
//               duration: 3000,
//               isClosable: true,
//               position: 'top-right',
//             });
//           } catch (error) {
//             handleError(error, toast, 'Failed to download file.');
//           }
//           break;
//         case 'delete':
//           setSelectedFile(file);
//           onDeleteOpen();
//           break;
//         default:
//           break;
//       }
//     },
//     [onDeleteOpen, toast]
//   );

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
//         position: 'top-right',
//       });
//       setFiles((prevFiles) => prevFiles.filter((file) => file.id !== selectedFile.id)); // Remove from local state
//     } catch (error) {
//       handleError(error, toast, 'Failed to delete file.');
//     } finally {
//       setSelectedFile(null);
//       onDeleteClose();
//     }
//   }, [selectedFile, onDeleteClose, toast]);

//   /**
//    * Conditional rendering based on loading state and file availability.
//    */
//   if (loading && page === 1) {
//     return <Loader />;
//   }

//   // if (!files.length) {
//   //   return (
//   //     <Box p={5}>
//   //       <Text fontSize="3xl" fontWeight="bold" mb={4}>
//   //         Library
//   //       </Text>
//   //       <Text fontSize="lg" color="gray.600">
//   //         No files uploaded yet. Start by uploading your first file!
//   //       </Text>
//   //     </Box>
//   //   );
//   // }

//   return (
//     <Box p={5}>
//       {/* Tabs with FileDashboard Components */}
//       <Tabs isFitted variant="enclosed">
//         {/* <TabList>
//           <Tab aria-selected={activeTag === 'All'} onClick={() => setActiveTag('All')}>
//             All
//           </Tab>
//           <Tab aria-selected={activeTag === 'Audio'} onClick={() => setActiveTag('Audio')}>
//             Audio
//           </Tab>
//           <Tab aria-selected={activeTag === 'Video'} onClick={() => setActiveTag('Video')}>
//             Video
//           </Tab>
//           <Tab aria-selected={activeTag === 'Images'} onClick={() => setActiveTag('Images')}>
//             Images
//           </Tab>
//         </TabList> */}

//         <TabPanels>
//           <TabPanel>
//             <FileDashboard
//               uploadedFiles={filteredFiles}
//               onTagFile={handleTagFile}
//               onRemoveTag={handleRemoveTag}
//               onPlayAudio={onPlayAudio}
//               onDeleteFile={handleMenuAction}
//             />
//           </TabPanel>
//           <TabPanel>
//             <FileDashboard
//               uploadedFiles={audioFiles}
//               onTagFile={handleTagFile}
//               onRemoveTag={handleRemoveTag}
//               onPlayAudio={onPlayAudio}
//               onDeleteFile={handleMenuAction}
//             />
//           </TabPanel>
//           <TabPanel>
//             <FileDashboard
//               uploadedFiles={videoFiles}
//               onTagFile={handleTagFile}
//               onRemoveTag={handleRemoveTag}
//               onPlayAudio={onPlayAudio}
//               onDeleteFile={handleMenuAction}
//             />
//           </TabPanel>
//           <TabPanel>
//             <FileDashboard
//               uploadedFiles={imageFiles}
//               onTagFile={handleTagFile}
//               onRemoveTag={handleRemoveTag}
//               onPlayAudio={onPlayAudio}
//               onDeleteFile={handleMenuAction}
//             />
//           </TabPanel>
//         </TabPanels>
//       </Tabs>

//       {/* Tag Filters (Moved Below Tabs) */}
//       <Flex mb={6} mt={6} wrap="wrap" gap={2}>
//         {tags.map((tag) => (
//           <Button
//             key={tag}
//             size="sm"
//             colorScheme={activeTag === tag ? 'blue' : 'gray'}
//             onClick={() => setActiveTag(tag)}
//             aria-pressed={activeTag === tag}
//             aria-label={`Filter by ${tag}`}
//           >
//             {tag}
//           </Button>
//         ))}
//       </Flex>

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
//           <Spinner size="lg" color="blue.500" />
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


import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Box,
  Text,
  Button,
  Spinner,
  useToast,
  Flex,
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
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaUpload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';
import FileCard from '../common/FileCard';

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

const handleError = (error, toast, defaultMessage) => {
  console.error(error);
  let errorMessage = defaultMessage;
  if (error.response) {
    errorMessage = error.response.data?.message || errorMessage;
  } else if (error.request) {
    errorMessage = 'Network error. Please check your connection and try again.';
  } else {
    errorMessage = error.message;
  }
  toast({
    title: 'Error',
    description: errorMessage,
    status: 'error',
    duration: 5000,
    isClosable: true,
    position: 'top-right',
  });
};

function Library({ onPlayAudio }) {
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState(['All']);
  const [activeTag, setActiveTag] = useState('All');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();
  const cachedFiles = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tagInput, setTagInput] = useState('');
  const [fileToTag, setFileToTag] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const fetchFiles = useCallback(
    async (pageNum = 1) => {
      setLoading(true);
      try {
        const response = await api.get('/file_history', {
          params: {
            page: pageNum,
            per_page: 20,
            tag: activeTag !== 'All' ? activeTag : undefined,
          },
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
          cachedFiles.current = response.data.files;
        } else {
          if (pageNum === 1) {
            setFiles([]);
            cachedFiles.current = [];
          }
        }
      } catch (error) {
        handleError(error, toast, 'Failed to fetch files.');
      } finally {
        setLoading(false);
      }
    },
    [activeTag, toast]
  );

  const loadMore = useCallback(() => {
    fetchFiles(page + 1);
  }, [fetchFiles, page]);

  useEffect(() => {
    fetchFiles(1);
  }, [fetchFiles, activeTag]);

  const handleTagFile = useCallback(
    async (fileId, tagsInput) => {
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
          position: 'top-right',
        });
        setFiles((prevFiles) =>
          prevFiles.map((file) => (file.id === fileId ? { ...file, tags: [...(file.tags || []), ...tagsArray] } : file))
        );
      } catch (error) {
        handleError(error, toast, 'Failed to add tags.');
      }
    },
    [toast]
  );

  const handleRemoveTag = useCallback(
    async (fileId, tag) => {
      try {
        await api.post(`/files/${fileId}/remove_tag`, { tags: [tag] });
        toast({
          title: 'Success',
          description: 'Tag removed successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setFiles((prevFiles) =>
          prevFiles.map((file) => (file.id === fileId ? { ...file, tags: file.tags.filter((t) => t !== tag) } : file))
        );
      } catch (error) {
        handleError(error, toast, 'Failed to remove tag.');
      }
    },
    [toast]
  );

  const handleMenuAction = useCallback(
    async (action, file, event) => {
      event.stopPropagation();
      switch (action) {
        case 'process':
          try {
            await api.post(`/files/${file.id}/process`);
            toast({
              title: 'Processing',
              description: `Processing started for "${file.filename}".`,
              status: 'info',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
          } catch (error) {
            handleError(error, toast, 'Failed to initiate processing.');
          }
          break;
        case 'analyze':
          try {
            await api.post(`/files/${file.id}/analyze`);
            toast({
              title: 'Analysis',
              description: `Analysis started for "${file.filename}".`,
              status: 'info',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
          } catch (error) {
            handleError(error, toast, 'Failed to initiate analysis.');
          }
          break;
        case 'download':
          try {
            const response = await api.get(`/files/${file.id}/download`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.filename || `file_${file.id}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast({
              title: 'Download',
              description: `Download started for "${file.filename}".`,
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
          } catch (error) {
            handleError(error, toast, 'Failed to download file.');
          }
          break;
        case 'delete':
          setSelectedFile(file);
          onDeleteOpen();
          break;
        default:
          break;
      }
    },
    [onDeleteOpen, toast]
  );

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
        position: 'top-right',
      });
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== selectedFile.id));
    } catch (error) {
      handleError(error, toast, 'Failed to delete file.');
    } finally {
      setSelectedFile(null);
      onDeleteClose();
    }
  }, [selectedFile, onDeleteClose, toast]);

  const handleTabChange = useCallback((index) => {
    console.log('Tab changed to:', index); // Debug log
    setActiveTab(index);
  }, []);

  const handleTagClick = useCallback((file, event) => {
    event.stopPropagation();
    setFileToTag(file);
  }, []);

  const handleTagSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (fileToTag && tagInput.trim()) {
        handleTagFile(fileToTag.id, tagInput.trim());
        setTagInput('');
        setFileToTag(null);
      }
    },
    [fileToTag, tagInput, handleTagFile]
  );

  const filteredFiles = useMemo(() => {
    console.log('Filtering files. Active tab:', activeTab, 'Active tag:', activeTag); // Debug log

    let filtered = activeTag === 'All' ? files : files.filter(file => file.tags && file.tags.includes(activeTag));
    
    switch (activeTab) {
      case 1: 
        console.log('Filtering audio files');
        return filtered.filter(file => isAudioFile(file.type));
      case 2: 
        console.log('Filtering video files');
        return filtered.filter(file => isVideoFile(file.type));
      case 3: 
        console.log('Filtering image files');
        return filtered.filter(file => isImageFile(file.type));
      default: 
        console.log('Showing all files');
        return filtered;
    }
  }, [files, activeTag, activeTab]);

  const renderFileDashboard = useCallback((files) => {
    console.log('Rendering file dashboard. Files count:', files.length); // Debug log

    if (!files || files.length === 0) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" />
          <Text ml={4} fontSize="lg" color="gray.500">
            Loading files or no files to display.
          </Text>
        </Box>
      );
    }

    return (
      <Box bg={bgColor} borderRadius="lg" p={6} boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
        <Grid
          templateColumns={{
            base: 'repeat(auto-fill, minmax(250px, 1fr))',
            md: 'repeat(auto-fill, minmax(300px, 1fr))',
            lg: 'repeat(auto-fill, minmax(350px, 1fr))',
          }}
          gap={6}
        >
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              tagInput={tagInput}
              setTagInput={setTagInput}
              fileToTag={fileToTag}
              handleTagClick={handleTagClick}
              handleTagSubmit={handleTagSubmit}
              handleRemoveTagClick={handleRemoveTag}
              handleMenuAction={handleMenuAction}
              onPlayAudio={onPlayAudio}
            />
          ))}
        </Grid>
      </Box>
    );
  }, [bgColor, borderColor, tagInput, fileToTag, handleTagClick, handleTagSubmit, handleRemoveTag, handleMenuAction, onPlayAudio]);

  useEffect(() => {
    console.log('Filtered files:', filteredFiles); // Debug log
  }, [filteredFiles]);
  if (loading && page === 1) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold" color="blue.600">
          Library
        </Text>
        <Button leftIcon={<FaUpload />} colorScheme="blue">
          Upload
        </Button>
      </Flex>

      <Tabs
        variant="soft-rounded"
        colorScheme="blue"
        mb={6}
        onChange={handleTabChange}
        index={activeTab}
      >
        <TabList>
          <Tab>All</Tab>
          <Tab>Audio</Tab>
          <Tab>Video</Tab>
          <Tab>Images</Tab>
        </TabList>
      </Tabs>

      <Flex mb={6} mt={6} wrap="wrap" gap={2}>
        {tags.map((tag) => (
          <Button
            key={tag}
            size="sm"
            colorScheme={activeTag === tag ? 'blue' : 'gray'}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            aria-label={`Filter by ${tag}`}
          >
            {tag}
          </Button>
        ))}
      </Flex>

      {renderFileDashboard(filteredFiles)}

      {!loading && files.length >= 20 && (
        <Flex justify="center" mt={6}>
          <Button onClick={loadMore} colorScheme="blue" aria-label="Load More Files">
            Load More
          </Button>
        </Flex>
      )}

      {loading && page > 1 && (
        <Flex justify="center" mt={6}>
          <Spinner size="lg" color="blue.500" />
        </Flex>
      )}

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