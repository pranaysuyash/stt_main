// // // // // // // src/components/common/FileDashboard.jsx

// // // // // // import React, { useState } from 'react';
// // // // // // import {
// // // // // //   Box,
// // // // // //   Grid,
// // // // // //   Image,
// // // // // //   Text,
// // // // // //   Badge,
// // // // // //   IconButton,
// // // // // //   Button,
// // // // // //   Flex,
// // // // // //   Input,
// // // // // //   Tooltip,
// // // // // //   Menu,
// // // // // //   MenuButton,
// // // // // //   MenuList,
// // // // // //   MenuItem,
// // // // // //   useToast,
// // // // // //   Spinner,
// // // // // // } from '@chakra-ui/react';
// // // // // // import {
// // // // // //   FaTag,
// // // // // //   FaTimes,
// // // // // //   FaEllipsisV,
// // // // // //   FaPlay,
// // // // // //   FaCheckCircle,
// // // // // //   FaTimesCircle,
// // // // // //   // FaDownload,
// // // // // //   // FaTrash,
// // // // // //   // FaShareAlt,
// // // // // // } from 'react-icons/fa';
// // // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // // import PropTypes from 'prop-types';
// // // // // // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// // // // // // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio }) {
// // // // // //   const [tagInput, setTagInput] = useState('');
// // // // // //   const [fileToTag, setFileToTag] = useState(null);
// // // // // //   const toast = useToast();
// // // // // //   const navigate = useNavigate(); // For navigation after deletion


// // // // // //   /**
// // // // // //    * Handle clicking the "Add Tag" button.
// // // // // //    */
// // // // // //   const handleTagClick = (file, event) => {
// // // // // //     event.stopPropagation();
// // // // // //     setFileToTag(file);
// // // // // //   };

// // // // // //   /**
// // // // // //    * Handle submitting a new tag.
// // // // // //    */
// // // // // //   const handleTagSubmit = (event) => {
// // // // // //     event.preventDefault();
// // // // // //     if (fileToTag && tagInput.trim()) {
// // // // // //       onTagFile(fileToTag.id, [tagInput.trim()]);
// // // // // //       toast({
// // // // // //         title: 'Tag Added',
// // // // // //         description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
// // // // // //         status: 'success',
// // // // // //         duration: 3000,
// // // // // //         isClosable: true,
// // // // // //         position: 'top-right',
// // // // // //       });
// // // // // //       setTagInput('');
// // // // // //       setFileToTag(null);
// // // // // //     }
// // // // // //   };

// // // // // //   /**
// // // // // //    * Handle removing a tag.
// // // // // //    */
// // // // // //   const handleRemoveTag = (fileId, tag, event) => {
// // // // // //     event.stopPropagation();
// // // // // //     onRemoveTag(fileId, [tag]);
// // // // // //     toast({
// // // // // //       title: 'Tag Removed',
// // // // // //       description: `Tag "${tag}" removed from file.`,
// // // // // //       status: 'info',
// // // // // //       duration: 3000,
// // // // // //       isClosable: true,
// // // // // //       position: 'top-right',
// // // // // //     });
// // // // // //   };

// // // // // //   /**
// // // // // //    * Handle menu actions like Process, Analyze, Download, Delete.
// // // // // //    */
// // // // // //   const handleMenuAction = (action, file) => {
// // // // // //     switch (action) {
// // // // // //       case 'process':
// // // // // //         // Implement process action
// // // // // //         onTagFile(file.id, ['processing']); // Example: Adding 'processing' tag
// // // // // //         break;
// // // // // //       case 'analyze':
// // // // // //         // Implement analyze action
// // // // // //         onTagFile(file.id, ['analyzed']); // Example: Adding 'analyzed' tag
// // // // // //         break;
// // // // // //         case 'download':
// // // // // //         onPlayAudio(file.id); // Assuming onPlayAudio handles download if not audio
// // // // // //         break;
// // // // // //       // case 'download':
// // // // // //       //   // Implement download functionality
// // // // // //       //   window.open(file.path, '_blank');
// // // // // //       //   break;
// // // // // //     //   case 'delete':
// // // // // //     //     // Implement delete functionality
// // // // // //     //     onRemoveTag(file.id, []); // Placeholder for deletion
// // // // // //     //     break;
// // // // // //     //   default:
// // // // // //     //     break;
// // // // // //     // }
// // // // // //     case 'delete':
// // // // // //         // Implement actual delete functionality here
// // // // // //         // For example, call a prop function passed down to handle deletion
// // // // // //         // onDeleteFile(file.id);
// // // // // //         navigate('/app/library'); // Redirect to library after deletion
// // // // // //         toast({
// // // // // //           title: 'File Deleted',
// // // // // //           description: `"${file.filename}" has been deleted.`,
// // // // // //           status: 'success',
// // // // // //           duration: 3000,
// // // // // //           isClosable: true,
// // // // // //           position: 'top-right',
// // // // // //         });
// // // // // //         break;
// // // // // //       default:
// // // // // //         break;
// // // // // //   }};

// // // // // //   if (!uploadedFiles || uploadedFiles.length === 0) {
// // // // // //     return (
// // // // // //       <Text fontSize="lg" color="gray.600">
// // // // // //         Loading files... or No files to display.
// // // // // //       </Text>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <Box mt={8}>
// // // // // //       <Text fontSize="2xl" mb={4} fontWeight="bold">
// // // // // //         Uploaded Files
// // // // // //       </Text>
// // // // // //       <Grid
// // // // // //         templateColumns={{
// // // // // //           base: 'repeat(auto-fill, minmax(150px, 1fr))',
// // // // // //           md: 'repeat(auto-fill, minmax(200px, 1fr))',
// // // // // //           lg: 'repeat(auto-fill, minmax(250px, 1fr))',
// // // // // //         }}
// // // // // //         gap={6}
// // // // // //       >
// // // // // //         {uploadedFiles.map((file) => (
// // // // // //           <Box
// // // // // //             key={file.id}
// // // // // //             borderWidth="1px"
// // // // // //             borderRadius="lg"
// // // // // //             overflow="hidden"
// // // // // //             position="relative"
// // // // // //             bg="white"
// // // // // //             boxShadow="md"
// // // // // //             transition="box-shadow 0.2s, transform 0.2s"
// // // // // //             _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
// // // // // //             cursor="pointer"
// // // // // //             display="flex"
// // // // // //             flexDirection="column"
// // // // // //             height="100%"
// // // // // //           >
// // // // // //             {/* Media Section */}
// // // // // //             <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
// // // // // //               <Image
// // // // // //                 src={file.thumbnailUrl}
// // // // // //                 alt={file.filename}
// // // // // //                 objectFit="cover"
// // // // // //                 height="150px"
// // // // // //                 width="100%"
// // // // // //                 fallback={<Spinner />}
// // // // // //               />
// // // // // //             </Link>

// // // // // //             {/* File Info */}
// // // // // //             <Box p={4} flex="0 0 auto">
// // // // // //               <Tooltip label={file.filename} hasArrow>
// // // // // //                 <Text isTruncated fontWeight="medium" fontSize="md">
// // // // // //                   {file.filename}
// // // // // //                 </Text>
// // // // // //               </Tooltip>
// // // // // //               <Text fontSize="sm" color="gray.600">
// // // // // //                 {(file.size / (1024 * 1024)).toFixed(2)} MB
// // // // // //               </Text>

// // // // // //               {/* Tags */}
// // // // // //               <Flex mt={2} wrap="wrap" gap={1}>
// // // // // //                 {file.tags &&
// // // // // //                   file.tags.slice(0, 3).map((tag, index) => (
// // // // // //                     <Badge
// // // // // //                       key={index}
// // // // // //                       colorScheme={
// // // // // //                         tag.toLowerCase() === 'processing'
// // // // // //                           ? 'yellow'
// // // // // //                           : tag.toLowerCase() === 'analyzed'
// // // // // //                           ? 'purple'
// // // // // //                           : 'teal'
// // // // // //                       }
// // // // // //                       fontSize="xs"
// // // // // //                       display="flex"
// // // // // //                       alignItems="center"
// // // // // //                     >
// // // // // //                       {tag}
// // // // // //                       <IconButton
// // // // // //                         icon={<FaTimes />}
// // // // // //                         size="xs"
// // // // // //                         ml={1}
// // // // // //                         variant="ghost"
// // // // // //                         colorScheme="red"
// // // // // //                         aria-label={`Remove tag ${tag}`}
// // // // // //                         onClick={(e) => handleRemoveTag(file.id, tag, e)}
// // // // // //                       />
// // // // // //                     </Badge>
// // // // // //                   ))}
// // // // // //                 {file.tags && file.tags.length > 3 && (
// // // // // //                   <Badge colorScheme="teal" fontSize="xs">
// // // // // //                     +{file.tags.length - 3}
// // // // // //                   </Badge>
// // // // // //                 )}
// // // // // //               </Flex>

// // // // // //               {/* Add Tag */}
// // // // // //               {fileToTag && fileToTag.id === file.id ? (
// // // // // //                 <form onSubmit={handleTagSubmit}>
// // // // // //                   <Input
// // // // // //                     size="sm"
// // // // // //                     mt={2}
// // // // // //                     placeholder="Enter tag"
// // // // // //                     value={tagInput}
// // // // // //                     onChange={(e) => setTagInput(e.target.value)}
// // // // // //                     onClick={(e) => e.stopPropagation()}
// // // // // //                     aria-label="Enter new tag"
// // // // // //                   />
// // // // // //                 </form>
// // // // // //               ) : (
// // // // // //                 <Button
// // // // // //                   size="sm"
// // // // // //                   leftIcon={<FaTag />}
// // // // // //                   mt={2}
// // // // // //                   variant="outline"
// // // // // //                   colorScheme="teal"
// // // // // //                   onClick={(e) => handleTagClick(file, e)}
// // // // // //                   aria-label={`Add tag to ${file.filename}`}
// // // // // //                 >
// // // // // //                   Add Tag
// // // // // //                 </Button>
// // // // // //               )}
// // // // // //             </Box>

// // // // // //             {/* Footer with Play and Menu Buttons */}
// // // // // //             <Flex
// // // // // //               p={2}
// // // // // //               justify="space-between"
// // // // // //               align="center"
// // // // // //               borderTop="1px solid"
// // // // // //               borderColor="gray.200"
// // // // // //               flex="0 0 auto"
// // // // // //             >
// // // // // //               {/* Play Button */}
// // // // // //               {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// // // // // //                 <Tooltip label="Play" hasArrow>
// // // // // //                   <IconButton
// // // // // //                     icon={<FaPlay />}
// // // // // //                     colorScheme="teal"
// // // // // //                     aria-label={`Play ${file.filename}`}
// // // // // //                     onClick={() => {
// // // // // //                       // Navigate to details page or handle play action
// // // // // //                       window.location.href = `/app/media/${file.id}`;
// // // // // //                     }}
// // // // // //                     // onClick={() => onPlayAudio(file.id)}

// // // // // //                   />
// // // // // //                 </Tooltip>
// // // // // //               )}

// // // // // //               {/* Contextual Menu */}
// // // // // //               <Menu>
// // // // // //                 <MenuButton
// // // // // //                   as={IconButton}
// // // // // //                   aria-label="More actions"
// // // // // //                   icon={<FaEllipsisV />}
// // // // // //                   variant="ghost"
// // // // // //                   size="sm"
// // // // // //                   _focus={{ boxShadow: 'none' }}
// // // // // //                 />
// // // // // //                 <MenuList>
// // // // // //                   <MenuItem as={Link} to={`/app/media/${file.id}`}>
// // // // // //                     View Details
// // // // // //                   </MenuItem>
// // // // // //                   <MenuItem onClick={() => handleMenuAction('process', file)}>
// // // // // //                     Process
// // // // // //                   </MenuItem>
// // // // // //                   <MenuItem onClick={() => handleMenuAction('analyze', file)}>
// // // // // //                     Analyze
// // // // // //                   </MenuItem>
// // // // // //                   <MenuItem onClick={() => handleMenuAction('download', file)}>
// // // // // //                     Download
// // // // // //                   </MenuItem>
// // // // // //                   <MenuItem onClick={() => handleMenuAction('delete', file)}>
// // // // // //                     Delete
// // // // // //                   </MenuItem>
// // // // // //                 </MenuList>
// // // // // //               </Menu>
// // // // // //             </Flex>

// // // // // //             {/* Status Indicator */}
// // // // // //             {file.processing_status && (
// // // // // //               <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
// // // // // //                 <Box position="absolute" top="2" left="2">
// // // // // //                   {file.processing_status.toLowerCase() === 'completed' && (
// // // // // //                     <FaCheckCircle color="green" size="20" />
// // // // // //                   )}
// // // // // //                   {file.processing_status.toLowerCase() === 'processing' && (
// // // // // //                     <Spinner size="sm" color="blue.500" />
// // // // // //                   )}
// // // // // //                   {file.processing_status.toLowerCase() === 'error' && (
// // // // // //                     <FaTimesCircle color="red" size="20" />
// // // // // //                   )}
// // // // // //                 </Box>
// // // // // //               </Tooltip>
// // // // // //             )}
// // // // // //           </Box>
// // // // // //         ))}
// // // // // //       </Grid>
// // // // // //     </Box>
// // // // // //   );
// // // // // // }

// // // // // // FileDashboard.propTypes = {
// // // // // //   uploadedFiles: PropTypes.arrayOf(
// // // // // //     PropTypes.shape({
// // // // // //       id: PropTypes.number.isRequired,
// // // // // //       filename: PropTypes.string.isRequired,
// // // // // //       thumbnailUrl: PropTypes.string.isRequired,
// // // // // //       size: PropTypes.number.isRequired,
// // // // // //       type: PropTypes.string.isRequired,
// // // // // //       tags: PropTypes.arrayOf(PropTypes.string),
// // // // // //       processing_status: PropTypes.string,
// // // // // //       path: PropTypes.string, // For download
// // // // // //     })
// // // // // //   ).isRequired,
// // // // // //   onTagFile: PropTypes.func.isRequired,
// // // // // //   onRemoveTag: PropTypes.func.isRequired,
// // // // // //   onPlayAudio: PropTypes.func.isRequired,
// // // // // // };

// // // // // // export default FileDashboard;

// // // // // // src/components/common/FileDashboard.jsx

// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Grid,
// // // // //   Image,
// // // // //   Text,
// // // // //   Badge,
// // // // //   IconButton,
// // // // //   Button,
// // // // //   Flex,
// // // // //   Input,
// // // // //   Tooltip,
// // // // //   Menu,
// // // // //   MenuButton,
// // // // //   MenuList,
// // // // //   MenuItem,
// // // // //   useToast,
// // // // //   Spinner,
// // // // // } from '@chakra-ui/react';
// // // // // import {
// // // // //   FaTag,
// // // // //   FaTimes,
// // // // //   FaEllipsisV,
// // // // //   FaPlay,
// // // // //   FaCheckCircle,
// // // // //   FaTimesCircle,
// // // // // } from 'react-icons/fa';
// // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // import PropTypes from 'prop-types';
// // // // // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// // // // // /**
// // // // //  * FileDashboard Component
// // // // //  * Displays a grid of uploaded files with tagging and action capabilities.
// // // // //  */
// // // // // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio, onDeleteFile }) {
// // // // //   const [tagInput, setTagInput] = useState('');
// // // // //   const [fileToTag, setFileToTag] = useState(null);
// // // // //   const toast = useToast();
// // // // //   const navigate = useNavigate(); // For navigation after deletion

// // // // //   /**
// // // // //    * Handle clicking the "Add Tag" button.
// // // // //    */
// // // // //   const handleTagClick = (file, event) => {
// // // // //     event.stopPropagation();
// // // // //     setFileToTag(file);
// // // // //   };

// // // // //   /**
// // // // //    * Handle submitting a new tag.
// // // // //    */
// // // // //   const handleTagSubmit = (event) => {
// // // // //     event.preventDefault();
// // // // //     if (fileToTag && tagInput.trim()) {
// // // // //       onTagFile(fileToTag.id, tagInput.trim());
// // // // //       toast({
// // // // //         title: 'Tag Added',
// // // // //         description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
// // // // //         status: 'success',
// // // // //         duration: 3000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right',
// // // // //       });
// // // // //       setTagInput('');
// // // // //       setFileToTag(null);
// // // // //     }
// // // // //   };

// // // // //   /**
// // // // //    * Handle removing a tag.
// // // // //    */
// // // // //   const handleRemoveTagClick = (fileId, tag, event) => {
// // // // //     event.stopPropagation();
// // // // //     onRemoveTag(fileId, tag);
// // // // //     toast({
// // // // //       title: 'Tag Removed',
// // // // //       description: `Tag "${tag}" removed from file.`,
// // // // //       status: 'info',
// // // // //       duration: 3000,
// // // // //       isClosable: true,
// // // // //       position: 'top-right',
// // // // //     });
// // // // //   };

// // // // //   /**
// // // // //    * Handle menu actions like Process, Analyze, Download, Delete.
// // // // //    */
// // // // //   const handleMenuAction = (action, file, event) => {
// // // // //     event.stopPropagation(); // Prevent menu from closing due to parent handlers
// // // // //     switch (action) {
// // // // //       case 'process':
// // // // //         onTagFile(file.id, 'processing'); // Example: Adding 'processing' tag
// // // // //         toast({
// // // // //           title: 'Processing',
// // // // //           description: `Started processing "${file.filename}".`,
// // // // //           status: 'info',
// // // // //           duration: 3000,
// // // // //           isClosable: true,
// // // // //           position: 'top-right',
// // // // //         });
// // // // //         break;
// // // // //       case 'analyze':
// // // // //         onTagFile(file.id, 'analyzed'); // Example: Adding 'analyzed' tag
// // // // //         toast({
// // // // //           title: 'Analysis',
// // // // //           description: `Started analysis for "${file.filename}".`,
// // // // //           status: 'info',
// // // // //           duration: 3000,
// // // // //           isClosable: true,
// // // // //           position: 'top-right',
// // // // //         });
// // // // //         break;
// // // // //       case 'download':
// // // // //         // Assuming onPlayAudio can handle downloads, or you might want to implement a separate download handler
// // // // //         onPlayAudio(file.id);
// // // // //         toast({
// // // // //           title: 'Download',
// // // // //           description: `Download initiated for "${file.filename}".`,
// // // // //           status: 'success',
// // // // //           duration: 3000,
// // // // //           isClosable: true,
// // // // //           position: 'top-right',
// // // // //         });
// // // // //         break;
// // // // //       case 'delete':
// // // // //         onDeleteFile(file.id);
// // // // //         navigate('/app/library'); // Redirect to library after deletion
// // // // //         toast({
// // // // //           title: 'File Deleted',
// // // // //           description: `"${file.filename}" has been deleted.`,
// // // // //           status: 'success',
// // // // //           duration: 3000,
// // // // //           isClosable: true,
// // // // //           position: 'top-right',
// // // // //         });
// // // // //         break;
// // // // //       default:
// // // // //         break;
// // // // //     }
// // // // //   };

// // // // //   if (!uploadedFiles || uploadedFiles.length === 0) {
// // // // //     return (
// // // // //       <Text fontSize="lg" color="gray.600">
// // // // //         Loading files... or No files to display.
// // // // //       </Text>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Box mt={8}>
// // // // //       <Text fontSize="2xl" mb={4} fontWeight="bold">
// // // // //         Uploaded Files
// // // // //       </Text>
// // // // //       <Grid
// // // // //         templateColumns={{
// // // // //           base: 'repeat(auto-fill, minmax(150px, 1fr))',
// // // // //           md: 'repeat(auto-fill, minmax(200px, 1fr))',
// // // // //           lg: 'repeat(auto-fill, minmax(250px, 1fr))',
// // // // //         }}
// // // // //         gap={6}
// // // // //       >
// // // // //         {uploadedFiles.map((file) => (
// // // // //           <Box
// // // // //             key={file.id}
// // // // //             borderWidth="1px"
// // // // //             borderRadius="lg"
// // // // //             overflow="hidden"
// // // // //             position="relative"
// // // // //             bg="white"
// // // // //             boxShadow="md"
// // // // //             transition="box-shadow 0.2s, transform 0.2s"
// // // // //             _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
// // // // //             cursor="pointer"
// // // // //             display="flex"
// // // // //             flexDirection="column"
// // // // //             height="100%"
// // // // //             onClick={() => navigate(`/app/media/${file.id}`)} // Navigate when clicking the card
// // // // //           >
// // // // //             {/* Media Section */}
// // // // //             <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
// // // // //               <Image
// // // // //                 src={file.thumbnailUrl}
// // // // //                 alt={file.filename}
// // // // //                 objectFit="cover"
// // // // //                 height="150px"
// // // // //                 width="100%"
// // // // //                 fallback={<Spinner />}
// // // // //               />
// // // // //             </Link>

// // // // //             {/* File Info */}
// // // // //             <Box p={4} flex="0 0 auto">
// // // // //               <Tooltip label={file.filename} hasArrow>
// // // // //                 <Text isTruncated fontWeight="medium" fontSize="md">
// // // // //                   {file.filename}
// // // // //                 </Text>
// // // // //               </Tooltip>
// // // // //               <Text fontSize="sm" color="gray.600">
// // // // //                 {(file.size / (1024 * 1024)).toFixed(2)} MB
// // // // //               </Text>

// // // // //               {/* Tags */}
// // // // //               <Flex mt={2} wrap="wrap" gap={1}>
// // // // //                 {file.tags &&
// // // // //                   file.tags.slice(0, 3).map((tag, index) => (
// // // // //                     <Badge
// // // // //                       key={index}
// // // // //                       colorScheme={
// // // // //                         tag.toLowerCase() === 'processing'
// // // // //                           ? 'yellow'
// // // // //                           : tag.toLowerCase() === 'analyzed'
// // // // //                           ? 'purple'
// // // // //                           : 'teal'
// // // // //                       }
// // // // //                       fontSize="xs"
// // // // //                       display="flex"
// // // // //                       alignItems="center"
// // // // //                     >
// // // // //                       {tag}
// // // // //                       <IconButton
// // // // //                         icon={<FaTimes />}
// // // // //                         size="xs"
// // // // //                         ml={1}
// // // // //                         variant="ghost"
// // // // //                         colorScheme="red"
// // // // //                         aria-label={`Remove tag ${tag}`}
// // // // //                         onClick={(e) => handleRemoveTagClick(file.id, tag, e)}
// // // // //                       />
// // // // //                     </Badge>
// // // // //                   ))}
// // // // //                 {file.tags && file.tags.length > 3 && (
// // // // //                   <Badge colorScheme="teal" fontSize="xs">
// // // // //                     +{file.tags.length - 3}
// // // // //                   </Badge>
// // // // //                 )}
// // // // //               </Flex>

// // // // //               {/* Add Tag */}
// // // // //               {fileToTag && fileToTag.id === file.id ? (
// // // // //                 <form onSubmit={handleTagSubmit}>
// // // // //                   <Input
// // // // //                     size="sm"
// // // // //                     mt={2}
// // // // //                     placeholder="Enter tag"
// // // // //                     value={tagInput}
// // // // //                     onChange={(e) => setTagInput(e.target.value)}
// // // // //                     onClick={(e) => e.stopPropagation()}
// // // // //                     aria-label="Enter new tag"
// // // // //                   />
// // // // //                 </form>
// // // // //               ) : (
// // // // //                 <Button
// // // // //                   size="sm"
// // // // //                   leftIcon={<FaTag />}
// // // // //                   mt={2}
// // // // //                   variant="outline"
// // // // //                   colorScheme="teal"
// // // // //                   onClick={(e) => handleTagClick(file, e)}
// // // // //                   aria-label={`Add tag to ${file.filename}`}
// // // // //                 >
// // // // //                   Add Tag
// // // // //                 </Button>
// // // // //               )}
// // // // //             </Box>

// // // // //             {/* Footer with Play and Menu Buttons */}
// // // // //             <Flex
// // // // //               p={2}
// // // // //               justify="space-between"
// // // // //               align="center"
// // // // //               borderTop="1px solid"
// // // // //               borderColor="gray.200"
// // // // //               flex="0 0 auto"
// // // // //             >
// // // // //               {/* Play Button */}
// // // // //               {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// // // // //                 <Tooltip label="Play" hasArrow>
// // // // //                   <IconButton
// // // // //                     icon={<FaPlay />}
// // // // //                     colorScheme="teal"
// // // // //                     aria-label={`Play ${file.filename}`}
// // // // //                     onClick={(e) => {
// // // // //                       e.stopPropagation(); // Prevent card click
// // // // //                       navigate(`/app/media/${file.id}`); // Navigate to details page
// // // // //                     }}
// // // // //                   />
// // // // //                 </Tooltip>
// // // // //               )}

// // // // //               {/* Contextual Menu */}
// // // // //               <Menu>
// // // // //                 <MenuButton
// // // // //                   as={IconButton}
// // // // //                   aria-label="More actions"
// // // // //                   icon={<FaEllipsisV />}
// // // // //                   variant="ghost"
// // // // //                   size="sm"
// // // // //                   _focus={{ boxShadow: 'none' }}
// // // // //                   onClick={(e) => e.stopPropagation()} // Prevent card click
// // // // //                 />
// // // // //                 <MenuList>
// // // // //                   <MenuItem as={Link} to={`/app/media/${file.id}`}>
// // // // //                     View Details
// // // // //                   </MenuItem>
// // // // //                   <MenuItem onClick={(e) => handleMenuAction('process', file, e)}>
// // // // //                     Process
// // // // //                   </MenuItem>
// // // // //                   <MenuItem onClick={(e) => handleMenuAction('analyze', file, e)}>
// // // // //                     Analyze
// // // // //                   </MenuItem>
// // // // //                   <MenuItem onClick={(e) => handleMenuAction('download', file, e)}>
// // // // //                     Download
// // // // //                   </MenuItem>
// // // // //                   <MenuItem onClick={(e) => handleMenuAction('delete', file, e)}>
// // // // //                     Delete
// // // // //                   </MenuItem>
// // // // //                 </MenuList>
// // // // //               </Menu>
// // // // //             </Flex>

// // // // //             {/* Status Indicator */}
// // // // //             {file.processing_status && (
// // // // //               <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
// // // // //                 <Box position="absolute" top="2" left="2">
// // // // //                   {file.processing_status.toLowerCase() === 'completed' && (
// // // // //                     <FaCheckCircle color="green" size="20" />
// // // // //                   )}
// // // // //                   {file.processing_status.toLowerCase() === 'processing' && (
// // // // //                     <Spinner size="sm" color="blue.500" />
// // // // //                   )}
// // // // //                   {file.processing_status.toLowerCase() === 'error' && (
// // // // //                     <FaTimesCircle color="red" size="20" />
// // // // //                   )}
// // // // //                 </Box>
// // // // //               </Tooltip>
// // // // //             )}
// // // // //           </Box>
// // // // //         ))}
// // // // //       </Grid>
// // // // //     </Box>
// // // // //   );
// // // // // }

// // // // // FileDashboard.propTypes = {
// // // // //   uploadedFiles: PropTypes.arrayOf(
// // // // //     PropTypes.shape({
// // // // //       id: PropTypes.number.isRequired,
// // // // //       filename: PropTypes.string.isRequired,
// // // // //       thumbnailUrl: PropTypes.string.isRequired,
// // // // //       size: PropTypes.number.isRequired,
// // // // //       type: PropTypes.string.isRequired,
// // // // //       tags: PropTypes.arrayOf(PropTypes.string),
// // // // //       processing_status: PropTypes.string,
// // // // //       path: PropTypes.string, // For download
// // // // //     })
// // // // //   ).isRequired,
// // // // //   onTagFile: PropTypes.func.isRequired,
// // // // //   onRemoveTag: PropTypes.func.isRequired,
// // // // //   onPlayAudio: PropTypes.func.isRequired,
// // // // //   onDeleteFile: PropTypes.func.isRequired, // New prop for deletion
// // // // // };

// // // // // export default FileDashboard;
// // // // // import React, { useState, useCallback, useMemo } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Grid,
// // // // //   Image,
// // // // //   Text,
// // // // //   Badge,
// // // // //   IconButton,
// // // // //   Button,
// // // // //   Flex,
// // // // //   Input,
// // // // //   Tooltip,
// // // // //   Menu,
// // // // //   MenuButton,
// // // // //   MenuList,
// // // // //   MenuItem,
// // // // //   useToast,
// // // // //   Spinner,
// // // // // } from '@chakra-ui/react';
// // // // // import {
// // // // //   FaTag,
// // // // //   FaTimes,
// // // // //   FaEllipsisV,
// // // // //   FaPlay,
// // // // //   FaCheckCircle,
// // // // //   FaTimesCircle,
// // // // // } from 'react-icons/fa';
// // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // import PropTypes from 'prop-types';
// // // // // import { isAudioFile, isVideoFile } from '../../utils/fileUtils';

// // // // // const FileCard = React.memo(({ 
// // // // //   file, 
// // // // //   tagInput, 
// // // // //   setTagInput, 
// // // // //   fileToTag, 
// // // // //   handleTagClick, 
// // // // //   handleTagSubmit, 
// // // // //   handleRemoveTagClick, 
// // // // //   handleMenuAction, 
// // // // //   navigate 
// // // // // }) => {
// // // // //   return (
// // // // //     <Box
// // // // //       borderWidth="1px"
// // // // //       borderRadius="lg"
// // // // //       overflow="hidden"
// // // // //       position="relative"
// // // // //       bg="white"
// // // // //       boxShadow="md"
// // // // //       transition="box-shadow 0.2s, transform 0.2s"
// // // // //       _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
// // // // //       cursor="pointer"
// // // // //       display="flex"
// // // // //       flexDirection="column"
// // // // //       height="100%"
// // // // //       onClick={() => navigate(`/app/media/${file.id}`)}
// // // // //     >
// // // // //       <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
// // // // //         <Image
// // // // //           src={file.thumbnailUrl}
// // // // //           alt={file.filename}
// // // // //           objectFit="cover"
// // // // //           height="150px"
// // // // //           width="100%"
// // // // //           fallback={<Spinner />}
// // // // //         />
// // // // //       </Link>

// // // // //       <Box p={4} flex="0 0 auto">
// // // // //         <Tooltip label={file.filename} hasArrow>
// // // // //           <Text isTruncated fontWeight="medium" fontSize="md">
// // // // //             {file.filename}
// // // // //           </Text>
// // // // //         </Tooltip>
// // // // //         <Text fontSize="sm" color="gray.600">
// // // // //           {(file.size / (1024 * 1024)).toFixed(2)} MB
// // // // //         </Text>

// // // // //         <Flex mt={2} wrap="wrap" gap={1}>
// // // // //           {file.tags &&
// // // // //             file.tags.slice(0, 3).map((tag, index) => (
// // // // //               <Badge
// // // // //                 key={index}
// // // // //                 colorScheme={
// // // // //                   tag.toLowerCase() === 'processing'
// // // // //                     ? 'yellow'
// // // // //                     : tag.toLowerCase() === 'analyzed'
// // // // //                     ? 'purple'
// // // // //                     : 'teal'
// // // // //                 }
// // // // //                 fontSize="xs"
// // // // //                 display="flex"
// // // // //                 alignItems="center"
// // // // //               >
// // // // //                 {tag}
// // // // //                 <IconButton
// // // // //                   icon={<FaTimes />}
// // // // //                   size="xs"
// // // // //                   ml={1}
// // // // //                   variant="ghost"
// // // // //                   colorScheme="red"
// // // // //                   aria-label={`Remove tag ${tag}`}
// // // // //                   onClick={(e) => handleRemoveTagClick(file.id, tag, e)}
// // // // //                 />
// // // // //               </Badge>
// // // // //             ))}
// // // // //           {file.tags && file.tags.length > 3 && (
// // // // //             <Badge colorScheme="teal" fontSize="xs">
// // // // //               +{file.tags.length - 3}
// // // // //             </Badge>
// // // // //           )}
// // // // //         </Flex>

// // // // //         {fileToTag && fileToTag.id === file.id ? (
// // // // //           <form onSubmit={handleTagSubmit}>
// // // // //             <Input
// // // // //               size="sm"
// // // // //               mt={2}
// // // // //               placeholder="Enter tag"
// // // // //               value={tagInput}
// // // // //               onChange={(e) => setTagInput(e.target.value)}
// // // // //               onClick={(e) => e.stopPropagation()}
// // // // //               aria-label="Enter new tag"
// // // // //             />
// // // // //           </form>
// // // // //         ) : (
// // // // //           <Button
// // // // //             size="sm"
// // // // //             leftIcon={<FaTag />}
// // // // //             mt={2}
// // // // //             variant="outline"
// // // // //             colorScheme="teal"
// // // // //             onClick={(e) => handleTagClick(file, e)}
// // // // //             aria-label={`Add tag to ${file.filename}`}
// // // // //           >
// // // // //             Add Tag
// // // // //           </Button>
// // // // //         )}
// // // // //       </Box>

// // // // //       <Flex
// // // // //         p={2}
// // // // //         justify="space-between"
// // // // //         align="center"
// // // // //         borderTop="1px solid"
// // // // //         borderColor="gray.200"
// // // // //         flex="0 0 auto"
// // // // //       >
// // // // //         {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// // // // //           <Tooltip label="Play" hasArrow>
// // // // //             <IconButton
// // // // //               icon={<FaPlay />}
// // // // //               colorScheme="teal"
// // // // //               aria-label={`Play ${file.filename}`}
// // // // //               onClick={(e) => {
// // // // //                 e.stopPropagation();
// // // // //                 navigate(`/app/media/${file.id}`);
// // // // //               }}
// // // // //             />
// // // // //           </Tooltip>
// // // // //         )}

// // // // //         <Menu>
// // // // //           <MenuButton
// // // // //             as={IconButton}
// // // // //             aria-label="More actions"
// // // // //             icon={<FaEllipsisV />}
// // // // //             variant="ghost"
// // // // //             size="sm"
// // // // //             _focus={{ boxShadow: 'none' }}
// // // // //             onClick={(e) => e.stopPropagation()}
// // // // //           />
// // // // //           <MenuList>
// // // // //             <MenuItem as={Link} to={`/app/media/${file.id}`}>
// // // // //               View Details
// // // // //             </MenuItem>
// // // // //             <MenuItem onClick={(e) => handleMenuAction('process', file, e)}>
// // // // //               Process
// // // // //             </MenuItem>
// // // // //             <MenuItem onClick={(e) => handleMenuAction('analyze', file, e)}>
// // // // //               Analyze
// // // // //             </MenuItem>
// // // // //             <MenuItem onClick={(e) => handleMenuAction('download', file, e)}>
// // // // //               Download
// // // // //             </MenuItem>
// // // // //             <MenuItem onClick={(e) => handleMenuAction('delete', file, e)}>
// // // // //               Delete
// // // // //             </MenuItem>
// // // // //           </MenuList>
// // // // //         </Menu>
// // // // //       </Flex>

// // // // //       {file.processing_status && (
// // // // //         <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
// // // // //           <Box position="absolute" top="2" left="2">
// // // // //             {file.processing_status.toLowerCase() === 'completed' && (
// // // // //               <FaCheckCircle color="green" size="20" />
// // // // //             )}
// // // // //             {file.processing_status.toLowerCase() === 'processing' && (
// // // // //               <Spinner size="sm" color="blue.500" />
// // // // //             )}
// // // // //             {file.processing_status.toLowerCase() === 'error' && (
// // // // //               <FaTimesCircle color="red" size="20" />
// // // // //             )}
// // // // //           </Box>
// // // // //         </Tooltip>
// // // // //       )}
// // // // //     </Box>
// // // // //   );
// // // // // });

// // // // // FileCard.displayName = 'FileCard';

// // // // // FileCard.propTypes = {
// // // // //   file: PropTypes.shape({
// // // // //     id: PropTypes.number.isRequired,
// // // // //     filename: PropTypes.string.isRequired,
// // // // //     thumbnailUrl: PropTypes.string.isRequired,
// // // // //     size: PropTypes.number.isRequired,
// // // // //     type: PropTypes.string.isRequired,
// // // // //     tags: PropTypes.arrayOf(PropTypes.string),
// // // // //     processing_status: PropTypes.string,
// // // // //   }).isRequired,
// // // // //   tagInput: PropTypes.string.isRequired,
// // // // //   setTagInput: PropTypes.func.isRequired,
// // // // //   fileToTag: PropTypes.object,
// // // // //   handleTagClick: PropTypes.func.isRequired,
// // // // //   handleTagSubmit: PropTypes.func.isRequired,
// // // // //   handleRemoveTagClick: PropTypes.func.isRequired,
// // // // //   handleMenuAction: PropTypes.func.isRequired,
// // // // //   navigate: PropTypes.func.isRequired,
// // // // // };

// // // // // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio, onDeleteFile }) {
// // // // //   const [tagInput, setTagInput] = useState('');
// // // // //   const [fileToTag, setFileToTag] = useState(null);
// // // // //   const toast = useToast();
// // // // //   const navigate = useNavigate();

// // // // //   const handleTagClick = useCallback((file, event) => {
// // // // //     event.stopPropagation();
// // // // //     setFileToTag(file);
// // // // //   }, []);

// // // // //   const handleTagSubmit = useCallback((event) => {
// // // // //     event.preventDefault();
// // // // //     if (fileToTag && tagInput.trim()) {
// // // // //       onTagFile(fileToTag.id, tagInput.trim());
// // // // //       toast({
// // // // //         title: 'Tag Added',
// // // // //         description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
// // // // //         status: 'success',
// // // // //         duration: 3000,
// // // // //         isClosable: true,
// // // // //         position: 'top-right',
// // // // //       });
// // // // //       setTagInput('');
// // // // //       setFileToTag(null);
// // // // //     }
// // // // //   }, [fileToTag, tagInput, onTagFile, toast]);

// // // // //   const handleRemoveTagClick = useCallback((fileId, tag, event) => {
// // // // //     event.stopPropagation();
// // // // //     onRemoveTag(fileId, tag);
// // // // //     toast({
// // // // //       title: 'Tag Removed',
// // // // //       description: `Tag "${tag}" removed from file.`,
// // // // //       status: 'info',
// // // // //       duration: 3000,
// // // // //       isClosable: true,
// // // // //       position: 'top-right',
// // // // //     });
// // // // //   }, [onRemoveTag, toast]);

// // // // //   const handleMenuAction = useCallback((action, file, event) => {
// // // // //     event.stopPropagation();
// // // // //     switch (action) {
// // // // //       case 'process':
// // // // //         onTagFile(file.id, 'processing');
// // // // //         toast({
// // // // //           title: 'Processing',
// // // // //           description: `Started processing "${file.filename}".`,
// // // // //           status: 'info',
// // // // //           duration: 3000,
// // // // //           isClosable: true,
// // // // //           position: 'top-right',
// // // // //         });
// // // // //         break;
// // // // //       case 'analyze':
// // // // //         onTagFile(file.id, 'analyzed');
// // // // //         toast({
// // // // //           title: 'Analysis',
// // // // //           description: `Started analysis for "${file.filename}".`,
// // // // //           status: 'info',
// // // // //           duration: 3000,
// // // // //           isClosable: true,
// // // // //           position: 'top-right',
// // // // //         });
// // // // //         break;
// // // // //       case 'download':
// // // // //         onPlayAudio(file.id);
// // // // //         toast({
// // // // //           title: 'Download',
// // // // //           description: `Download initiated for "${file.filename}".`,
// // // // //           status: 'success',
// // // // //           duration: 3000,
// // // // //           isClosable: true,
// // // // //           position: 'top-right',
// // // // //         });
// // // // //         break;
// // // // //       case 'delete':
// // // // //         onDeleteFile(file.id);
// // // // //         navigate('/app/library');
// // // // //         toast({
// // // // //           title: 'File Deleted',
// // // // //           description: `"${file.filename}" has been deleted.`,
// // // // //           status: 'success',
// // // // //           duration: 3000,
// // // // //           isClosable: true,
// // // // //           position: 'top-right',
// // // // //         });
// // // // //         break;
// // // // //       default:
// // // // //         break;
// // // // //     }
// // // // //   }, [onTagFile, onPlayAudio, onDeleteFile, navigate, toast]);

// // // // //   const memoizedFiles = useMemo(() => uploadedFiles, [uploadedFiles]);

// // // // //   if (!memoizedFiles || memoizedFiles.length === 0) {
// // // // //     return (
// // // // //       <Box display="flex" justifyContent="center" alignItems="center" height="200px">
// // // // //         <Spinner size="xl" />
// // // // //         <Text ml={4} fontSize="lg" color="gray.600">
// // // // //           Loading files or no files to display.
// // // // //         </Text>
// // // // //       </Box>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Box mt={8}>
// // // // //       <Text fontSize="2xl" mb={4} fontWeight="bold">
// // // // //         Uploaded Files
// // // // //       </Text>
// // // // //       <Grid
// // // // //         templateColumns={{
// // // // //           base: 'repeat(auto-fill, minmax(150px, 1fr))',
// // // // //           sm: 'repeat(auto-fill, minmax(200px, 1fr))',
// // // // //           md: 'repeat(auto-fill, minmax(250px, 1fr))',
// // // // //           lg: 'repeat(auto-fill, minmax(300px, 1fr))',
// // // // //         }}
// // // // //         gap={6}
// // // // //       >
// // // // //         {memoizedFiles.map((file) => (
// // // // //           <FileCard
// // // // //             key={file.id}
// // // // //             file={file}
// // // // //             tagInput={tagInput}
// // // // //             setTagInput={setTagInput}
// // // // //             fileToTag={fileToTag}
// // // // //             handleTagClick={handleTagClick}
// // // // //             handleTagSubmit={handleTagSubmit}
// // // // //             handleRemoveTagClick={handleRemoveTagClick}
// // // // //             handleMenuAction={handleMenuAction}
// // // // //             navigate={navigate}
// // // // //           />
// // // // //         ))}
// // // // //       </Grid>
// // // // //     </Box>
// // // // //   );
// // // // // }

// // // // // FileDashboard.propTypes = {
// // // // //   uploadedFiles: PropTypes.arrayOf(
// // // // //     PropTypes.shape({
// // // // //       id: PropTypes.number.isRequired,
// // // // //       filename: PropTypes.string.isRequired,
// // // // //       thumbnailUrl: PropTypes.string.isRequired,
// // // // //       size: PropTypes.number.isRequired,
// // // // //       type: PropTypes.string.isRequired,
// // // // //       tags: PropTypes.arrayOf(PropTypes.string),
// // // // //       processing_status: PropTypes.string,
// // // // //       path: PropTypes.string,
// // // // //     })
// // // // //   ).isRequired,
// // // // //   onTagFile: PropTypes.func.isRequired,
// // // // //   onRemoveTag: PropTypes.func.isRequired,
// // // // //   onPlayAudio: PropTypes.func.isRequired,
// // // // //   onDeleteFile: PropTypes.func.isRequired,
// // // // // };

// // // // // export default React.memo(FileDashboard);

// // // // import React, { useState, useCallback, useMemo } from 'react';
// // // // import {
// // // //   Box,
// // // //   Grid,
// // // //   Image,
// // // //   Text,
// // // //   Badge,
// // // //   IconButton,
// // // //   Button,
// // // //   Flex,
// // // //   Input,
// // // //   Tooltip,
// // // //   Menu,
// // // //   MenuButton,
// // // //   MenuList,
// // // //   MenuItem,
// // // //   useToast,
// // // //   Spinner,
// // // //   useColorModeValue,
// // // // } from '@chakra-ui/react';
// // // // import {
// // // //   FaTag,
// // // //   FaTimes,
// // // //   FaEllipsisV,
// // // //   FaPlay,
// // // //   FaCheckCircle,
// // // //   FaTimesCircle,
// // // // } from 'react-icons/fa';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import PropTypes from 'prop-types';
// // // // import { isAudioFile, isVideoFile } from '../../utils/fileUtils';

// // // // const FileCard = React.memo(({ 
// // // //   file, 
// // // //   tagInput, 
// // // //   setTagInput, 
// // // //   fileToTag, 
// // // //   handleTagClick, 
// // // //   handleTagSubmit, 
// // // //   handleRemoveTagClick, 
// // // //   handleMenuAction, 
// // // //   navigate 
// // // // }) => {
// // // //   const bgColor = useColorModeValue('white', 'gray.700');
// // // //   const borderColor = useColorModeValue('gray.200', 'gray.600');

// // // //   return (
// // // //     <Box
// // // //       borderWidth="1px"
// // // //       borderColor={borderColor}
// // // //       borderRadius="lg"
// // // //       overflow="hidden"
// // // //       position="relative"
// // // //       bg={bgColor}
// // // //       boxShadow="md"
// // // //       transition="all 0.3s"
// // // //       _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
// // // //       cursor="pointer"
// // // //       display="flex"
// // // //       flexDirection="column"
// // // //       height="100%"
// // // //       onClick={() => navigate(`/app/media/${file.id}`)}
// // // //     >
// // // //       <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
// // // //         <Image
// // // //           src={file.thumbnailUrl}
// // // //           alt={file.filename}
// // // //           objectFit="cover"
// // // //           height="150px"
// // // //           width="100%"
// // // //           fallback={<Spinner />}
// // // //         />
// // // //       </Link>

// // // //       <Box p={4} flex="0 0 auto">
// // // //         <Tooltip label={file.filename} hasArrow>
// // // //           <Text isTruncated fontWeight="medium" fontSize="md">
// // // //             {file.filename}
// // // //           </Text>
// // // //         </Tooltip>
// // // //         <Text fontSize="sm" color="gray.500">
// // // //           {(file.size / (1024 * 1024)).toFixed(2)} MB
// // // //         </Text>

// // // //         <Flex mt={2} wrap="wrap" gap={1}>
// // // //           {file.tags &&
// // // //             file.tags.slice(0, 3).map((tag, index) => (
// // // //               <Badge
// // // //                 key={index}
// // // //                 colorScheme={
// // // //                   tag.toLowerCase() === 'processing'
// // // //                     ? 'yellow'
// // // //                     : tag.toLowerCase() === 'analyzed'
// // // //                     ? 'purple'
// // // //                     : 'blue'
// // // //                 }
// // // //                 fontSize="xs"
// // // //                 display="flex"
// // // //                 alignItems="center"
// // // //               >
// // // //                 {tag}
// // // //                 <IconButton
// // // //                   icon={<FaTimes />}
// // // //                   size="xs"
// // // //                   ml={1}
// // // //                   variant="ghost"
// // // //                   colorScheme="red"
// // // //                   aria-label={`Remove tag ${tag}`}
// // // //                   onClick={(e) => handleRemoveTagClick(file.id, tag, e)}
// // // //                 />
// // // //               </Badge>
// // // //             ))}
// // // //           {file.tags && file.tags.length > 3 && (
// // // //             <Badge colorScheme="blue" fontSize="xs">
// // // //               +{file.tags.length - 3}
// // // //             </Badge>
// // // //           )}
// // // //         </Flex>

// // // //         {fileToTag && fileToTag.id === file.id ? (
// // // //           <form onSubmit={handleTagSubmit}>
// // // //             <Input
// // // //               size="sm"
// // // //               mt={2}
// // // //               placeholder="Enter tag"
// // // //               value={tagInput}
// // // //               onChange={(e) => setTagInput(e.target.value)}
// // // //               onClick={(e) => e.stopPropagation()}
// // // //               aria-label="Enter new tag"
// // // //             />
// // // //           </form>
// // // //         ) : (
// // // //           <Button
// // // //             size="sm"
// // // //             leftIcon={<FaTag />}
// // // //             mt={2}
// // // //             variant="outline"
// // // //             colorScheme="blue"
// // // //             onClick={(e) => handleTagClick(file, e)}
// // // //             aria-label={`Add tag to ${file.filename}`}
// // // //           >
// // // //             Add Tag
// // // //           </Button>
// // // //         )}
// // // //       </Box>

// // // //       <Flex
// // // //         p={2}
// // // //         justify="space-between"
// // // //         align="center"
// // // //         borderTop="1px solid"
// // // //         borderColor={borderColor}
// // // //         flex="0 0 auto"
// // // //       >
// // // //         {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// // // //           <Tooltip label="Play" hasArrow>
// // // //             <IconButton
// // // //               icon={<FaPlay />}
// // // //               colorScheme="blue"
// // // //               aria-label={`Play ${file.filename}`}
// // // //               onClick={(e) => {
// // // //                 e.stopPropagation();
// // // //                 navigate(`/app/media/${file.id}`);
// // // //               }}
// // // //             />
// // // //           </Tooltip>
// // // //         )}

// // // //         <Menu>
// // // //           <MenuButton
// // // //             as={IconButton}
// // // //             aria-label="More actions"
// // // //             icon={<FaEllipsisV />}
// // // //             variant="ghost"
// // // //             size="sm"
// // // //             _focus={{ boxShadow: 'none' }}
// // // //             onClick={(e) => e.stopPropagation()}
// // // //           />
// // // //           <MenuList>
// // // //             <MenuItem as={Link} to={`/app/media/${file.id}`}>
// // // //               View Details
// // // //             </MenuItem>
// // // //             <MenuItem onClick={(e) => handleMenuAction('process', file, e)}>
// // // //               Process
// // // //             </MenuItem>
// // // //             <MenuItem onClick={(e) => handleMenuAction('analyze', file, e)}>
// // // //               Analyze
// // // //             </MenuItem>
// // // //             <MenuItem onClick={(e) => handleMenuAction('download', file, e)}>
// // // //               Download
// // // //             </MenuItem>
// // // //             <MenuItem onClick={(e) => handleMenuAction('delete', file, e)}>
// // // //               Delete
// // // //             </MenuItem>
// // // //           </MenuList>
// // // //         </Menu>
// // // //       </Flex>

// // // //       {file.processing_status && (
// // // //         <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
// // // //           <Box position="absolute" top="2" left="2">
// // // //             {file.processing_status.toLowerCase() === 'completed' && (
// // // //               <FaCheckCircle color="green" size="20" />
// // // //             )}
// // // //             {file.processing_status.toLowerCase() === 'processing' && (
// // // //               <Spinner size="sm" color="blue.500" />
// // // //             )}
// // // //             {file.processing_status.toLowerCase() === 'error' && (
// // // //               <FaTimesCircle color="red" size="20" />
// // // //             )}
// // // //           </Box>
// // // //         </Tooltip>
// // // //       )}
// // // //     </Box>
// // // //   );
// // // // });

// // // // FileCard.displayName = 'FileCard';

// // // // FileCard.propTypes = {
// // // //   file: PropTypes.shape({
// // // //     id: PropTypes.number.isRequired,
// // // //     filename: PropTypes.string.isRequired,
// // // //     thumbnailUrl: PropTypes.string.isRequired,
// // // //     size: PropTypes.number.isRequired,
// // // //     type: PropTypes.string.isRequired,
// // // //     tags: PropTypes.arrayOf(PropTypes.string),
// // // //     processing_status: PropTypes.string,
// // // //   }).isRequired,
// // // //   tagInput: PropTypes.string.isRequired,
// // // //   setTagInput: PropTypes.func.isRequired,
// // // //   fileToTag: PropTypes.object,
// // // //   handleTagClick: PropTypes.func.isRequired,
// // // //   handleTagSubmit: PropTypes.func.isRequired,
// // // //   handleRemoveTagClick: PropTypes.func.isRequired,
// // // //   handleMenuAction: PropTypes.func.isRequired,
// // // //   navigate: PropTypes.func.isRequired,
// // // // };

// // // // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio, onDeleteFile }) {
// // // //   const [tagInput, setTagInput] = useState('');
// // // //   const [fileToTag, setFileToTag] = useState(null);
// // // //   const toast = useToast();
// // // //   const navigate = useNavigate();

// // // //   const handleTagClick = useCallback((file, event) => {
// // // //     event.stopPropagation();
// // // //     setFileToTag(file);
// // // //   }, []);

// // // //   const handleTagSubmit = useCallback((event) => {
// // // //     event.preventDefault();
// // // //     if (fileToTag && tagInput.trim()) {
// // // //       onTagFile(fileToTag.id, tagInput.trim());
// // // //       toast({
// // // //         title: 'Tag Added',
// // // //         description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
// // // //         status: 'success',
// // // //         duration: 3000,
// // // //         isClosable: true,
// // // //         position: 'top-right',
// // // //       });
// // // //       setTagInput('');
// // // //       setFileToTag(null);
// // // //     }
// // // //   }, [fileToTag, tagInput, onTagFile, toast]);

// // // //   const handleRemoveTagClick = useCallback((fileId, tag, event) => {
// // // //     event.stopPropagation();
// // // //     onRemoveTag(fileId, tag);
// // // //     toast({
// // // //       title: 'Tag Removed',
// // // //       description: `Tag "${tag}" removed from file.`,
// // // //       status: 'info',
// // // //       duration: 3000,
// // // //       isClosable: true,
// // // //       position: 'top-right',
// // // //     });
// // // //   }, [onRemoveTag, toast]);

// // // //   const handleMenuAction = useCallback((action, file, event) => {
// // // //     event.stopPropagation();
// // // //     switch (action) {
// // // //       case 'process':
// // // //         onTagFile(file.id, 'processing');
// // // //         toast({
// // // //           title: 'Processing',
// // // //           description: `Started processing "${file.filename}".`,
// // // //           status: 'info',
// // // //           duration: 3000,
// // // //           isClosable: true,
// // // //           position: 'top-right',
// // // //         });
// // // //         break;
// // // //       case 'analyze':
// // // //         onTagFile(file.id, 'analyzed');
// // // //         toast({
// // // //           title: 'Analysis',
// // // //           description: `Started analysis for "${file.filename}".`,
// // // //           status: 'info',
// // // //           duration: 3000,
// // // //           isClosable: true,
// // // //           position: 'top-right',
// // // //         });
// // // //         break;
// // // //       case 'download':
// // // //         onPlayAudio(file.id);
// // // //         toast({
// // // //           title: 'Download',
// // // //           description: `Download initiated for "${file.filename}".`,
// // // //           status: 'success',
// // // //           duration: 3000,
// // // //           isClosable: true,
// // // //           position: 'top-right',
// // // //         });
// // // //         break;
// // // //       case 'delete':
// // // //         onDeleteFile(file.id);
// // // //         navigate('/app/library');
// // // //         toast({
// // // //           title: 'File Deleted',
// // // //           description: `"${file.filename}" has been deleted.`,
// // // //           status: 'success',
// // // //           duration: 3000,
// // // //           isClosable: true,
// // // //           position: 'top-right',
// // // //         });
// // // //         break;
// // // //       default:
// // // //         break;
// // // //     }
// // // //   }, [onTagFile, onPlayAudio, onDeleteFile, navigate, toast]);

// // // //   const memoizedFiles = useMemo(() => uploadedFiles, [uploadedFiles]);

// // // //   if (!memoizedFiles || memoizedFiles.length === 0) {
// // // //     return (
// // // //       <Box display="flex" justifyContent="center" alignItems="center" height="200px">
// // // //         <Spinner size="xl" />
// // // //         <Text ml={4} fontSize="lg" color="gray.500">
// // // //           Loading files or no files to display.
// // // //         </Text>
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Box mt={8}>
// // // //       <Text fontSize="2xl" mb={6} fontWeight="bold" color="blue.600">
// // // //         Uploaded Files
// // // //       </Text>
// // // //       <Grid
// // // //         templateColumns={{
// // // //           base: 'repeat(auto-fill, minmax(250px, 1fr))',
// // // //           md: 'repeat(auto-fill, minmax(300px, 1fr))',
// // // //           lg: 'repeat(auto-fill, minmax(350px, 1fr))',
// // // //         }}
// // // //         gap={6}
// // // //       >
// // // //         {memoizedFiles.map((file) => (
// // // //           <FileCard
// // // //             key={file.id}
// // // //             file={file}
// // // //             tagInput={tagInput}
// // // //             setTagInput={setTagInput}
// // // //             fileToTag={fileToTag}
// // // //             handleTagClick={handleTagClick}
// // // //             handleTagSubmit={handleTagSubmit}
// // // //             handleRemoveTagClick={handleRemoveTagClick}
// // // //             handleMenuAction={handleMenuAction}
// // // //             navigate={navigate}
// // // //           />
// // // //         ))}
// // // //       </Grid>
// // // //     </Box>
// // // //   );
// // // // }

// // // // FileDashboard.propTypes = {
// // // //   uploadedFiles: PropTypes.arrayOf(
// // // //     PropTypes.shape({
// // // //       id: PropTypes.number.isRequired,
// // // //       filename: PropTypes.string.isRequired,
// // // //       thumbnailUrl: PropTypes.string.isRequired,
// // // //       size: PropTypes.number.isRequired,
// // // //       type: PropTypes.string.isRequired,
// // // //       tags: PropTypes.arrayOf(PropTypes.string),
// // // //       processing_status: PropTypes.string,
// // // //       path: PropTypes.string,
// // // //     })
// // // //   ).isRequired,
// // // //   onTagFile: PropTypes.func.isRequired,
// // // //   onRemoveTag: PropTypes.func.isRequired,
// // // //   onPlayAudio: PropTypes.func.isRequired,
// // // //   onDeleteFile: PropTypes.func.isRequired,
// // // // };

// // // // export default React.memo(FileDashboard);

// // // import React, { useState, useCallback, useMemo } from 'react';
// // // import {
// // //   Box,
// // //   Grid,
// // //   Image,
// // //   Text,
// // //   Badge,
// // //   IconButton,
// // //   Button,
// // //   Flex,
// // //   Input,
// // //   Tooltip,
// // //   Menu,
// // //   MenuButton,
// // //   MenuList,
// // //   MenuItem,
// // //   useToast,
// // //   Spinner,
// // //   useColorModeValue,
// // //   Tabs,
// // //   TabList,
// // //   Tab,
// // //   TabPanels,
// // //   TabPanel,
// // //   Breadcrumb,
// // //   BreadcrumbItem,
// // //   BreadcrumbLink,
// // // } from '@chakra-ui/react';
// // // import {
// // //   FaTag,
// // //   FaTimes,
// // //   FaEllipsisV,
// // //   FaPlay,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaUpload,
// // //   FaHome,
// // // } from 'react-icons/fa';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import PropTypes from 'prop-types';
// // // import { isAudioFile, isVideoFile } from '../../utils/fileUtils';

// // // const FileCard = React.memo(({ 
// // //   file, 
// // //   tagInput, 
// // //   setTagInput, 
// // //   fileToTag, 
// // //   handleTagClick, 
// // //   handleTagSubmit, 
// // //   handleRemoveTagClick, 
// // //   handleMenuAction, 
// // //   navigate 
// // // }) => {
// // //   const bgColor = useColorModeValue('white', 'gray.700');
// // //   const borderColor = useColorModeValue('gray.200', 'gray.600');

// // //   return (
// // //     <Box
// // //       borderWidth="1px"
// // //       borderColor={borderColor}
// // //       borderRadius="lg"
// // //       overflow="hidden"
// // //       position="relative"
// // //       bg={bgColor}
// // //       boxShadow="md"
// // //       transition="all 0.3s"
// // //       _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
// // //       cursor="pointer"
// // //       display="flex"
// // //       flexDirection="column"
// // //       height="100%"
// // //       onClick={() => navigate(`/app/media/${file.id}`)}
// // //     >
// // //       <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
// // //         <Image
// // //           src={file.thumbnailUrl}
// // //           alt={file.filename}
// // //           objectFit="cover"
// // //           height="150px"
// // //           width="100%"
// // //           fallback={<Spinner />}
// // //         />
// // //       </Link>

// // //       <Box p={4} flex="0 0 auto">
// // //         <Tooltip label={file.filename} hasArrow>
// // //           <Text isTruncated fontWeight="medium" fontSize="md">
// // //             {file.filename}
// // //           </Text>
// // //         </Tooltip>
// // //         <Text fontSize="sm" color="gray.500">
// // //           {(file.size / (1024 * 1024)).toFixed(2)} MB
// // //         </Text>

// // //         <Flex mt={2} wrap="wrap" gap={1}>
// // //           {file.tags &&
// // //             file.tags.slice(0, 3).map((tag, index) => (
// // //               <Badge
// // //                 key={index}
// // //                 colorScheme={
// // //                   tag.toLowerCase() === 'processing'
// // //                     ? 'yellow'
// // //                     : tag.toLowerCase() === 'analyzed'
// // //                     ? 'purple'
// // //                     : 'blue'
// // //                 }
// // //                 fontSize="xs"
// // //                 display="flex"
// // //                 alignItems="center"
// // //               >
// // //                 {tag}
// // //                 <IconButton
// // //                   icon={<FaTimes />}
// // //                   size="xs"
// // //                   ml={1}
// // //                   variant="ghost"
// // //                   colorScheme="red"
// // //                   aria-label={`Remove tag ${tag}`}
// // //                   onClick={(e) => handleRemoveTagClick(file.id, tag, e)}
// // //                 />
// // //               </Badge>
// // //             ))}
// // //           {file.tags && file.tags.length > 3 && (
// // //             <Badge colorScheme="blue" fontSize="xs">
// // //               +{file.tags.length - 3}
// // //             </Badge>
// // //           )}
// // //         </Flex>

// // //         {fileToTag && fileToTag.id === file.id ? (
// // //           <form onSubmit={handleTagSubmit}>
// // //             <Input
// // //               size="sm"
// // //               mt={2}
// // //               placeholder="Enter tag"
// // //               value={tagInput}
// // //               onChange={(e) => setTagInput(e.target.value)}
// // //               onClick={(e) => e.stopPropagation()}
// // //               aria-label="Enter new tag"
// // //             />
// // //           </form>
// // //         ) : (
// // //           <Button
// // //             size="sm"
// // //             leftIcon={<FaTag />}
// // //             mt={2}
// // //             variant="outline"
// // //             colorScheme="blue"
// // //             onClick={(e) => handleTagClick(file, e)}
// // //             aria-label={`Add tag to ${file.filename}`}
// // //           >
// // //             Add Tag
// // //           </Button>
// // //         )}
// // //       </Box>

// // //       <Flex
// // //         p={2}
// // //         justify="space-between"
// // //         align="center"
// // //         borderTop="1px solid"
// // //         borderColor={borderColor}
// // //         flex="0 0 auto"
// // //       >
// // //         {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// // //           <Tooltip label="Play" hasArrow>
// // //             <IconButton
// // //               icon={<FaPlay />}
// // //               colorScheme="blue"
// // //               aria-label={`Play ${file.filename}`}
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 navigate(`/app/media/${file.id}`);
// // //               }}
// // //             />
// // //           </Tooltip>
// // //         )}

// // //         <Menu>
// // //           <MenuButton
// // //             as={IconButton}
// // //             aria-label="More actions"
// // //             icon={<FaEllipsisV />}
// // //             variant="ghost"
// // //             size="sm"
// // //             _focus={{ boxShadow: 'none' }}
// // //             onClick={(e) => e.stopPropagation()}
// // //           />
// // //           <MenuList>
// // //             <MenuItem as={Link} to={`/app/media/${file.id}`}>
// // //               View Details
// // //             </MenuItem>
// // //             <MenuItem onClick={(e) => handleMenuAction('process', file, e)}>
// // //               Process
// // //             </MenuItem>
// // //             <MenuItem onClick={(e) => handleMenuAction('analyze', file, e)}>
// // //               Analyze
// // //             </MenuItem>
// // //             <MenuItem onClick={(e) => handleMenuAction('download', file, e)}>
// // //               Download
// // //             </MenuItem>
// // //             <MenuItem onClick={(e) => handleMenuAction('delete', file, e)}>
// // //               Delete
// // //             </MenuItem>
// // //           </MenuList>
// // //         </Menu>
// // //       </Flex>

// // //       {file.processing_status && (
// // //         <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
// // //           <Box position="absolute" top="2" left="2">
// // //             {file.processing_status.toLowerCase() === 'completed' && (
// // //               <FaCheckCircle color="green" size="20" />
// // //             )}
// // //             {file.processing_status.toLowerCase() === 'processing' && (
// // //               <Spinner size="sm" color="blue.500" />
// // //             )}
// // //             {file.processing_status.toLowerCase() === 'error' && (
// // //               <FaTimesCircle color="red" size="20" />
// // //             )}
// // //           </Box>
// // //         </Tooltip>
// // //       )}
// // //     </Box>
// // //   );
// // // });

// // // FileCard.displayName = 'FileCard';

// // // FileCard.propTypes = {
// // //   file: PropTypes.shape({
// // //     id: PropTypes.number.isRequired,
// // //     filename: PropTypes.string.isRequired,
// // //     thumbnailUrl: PropTypes.string.isRequired,
// // //     size: PropTypes.number.isRequired,
// // //     type: PropTypes.string.isRequired,
// // //     tags: PropTypes.arrayOf(PropTypes.string),
// // //     processing_status: PropTypes.string,
// // //   }).isRequired,
// // //   tagInput: PropTypes.string.isRequired,
// // //   setTagInput: PropTypes.func.isRequired,
// // //   fileToTag: PropTypes.object,
// // //   handleTagClick: PropTypes.func.isRequired,
// // //   handleTagSubmit: PropTypes.func.isRequired,
// // //   handleRemoveTagClick: PropTypes.func.isRequired,
// // //   handleMenuAction: PropTypes.func.isRequired,
// // //   navigate: PropTypes.func.isRequired,
// // // };

// // // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio, onDeleteFile }) {
// // //   const [tagInput, setTagInput] = useState('');
// // //   const [fileToTag, setFileToTag] = useState(null);
// // //   const [activeTab, setActiveTab] = useState(0);
// // //   const toast = useToast();
// // //   const navigate = useNavigate();

// // //   const bgColor = useColorModeValue('gray.50', 'gray.800');
// // //   const borderColor = useColorModeValue('gray.200', 'gray.600');

// // //   const handleTagClick = useCallback((file, event) => {
// // //     event.stopPropagation();
// // //     setFileToTag(file);
// // //   }, []);

// // //   const handleTagSubmit = useCallback((event) => {
// // //     event.preventDefault();
// // //     if (fileToTag && tagInput.trim()) {
// // //       onTagFile(fileToTag.id, tagInput.trim());
// // //       toast({
// // //         title: 'Tag Added',
// // //         description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
// // //         status: 'success',
// // //         duration: 3000,
// // //         isClosable: true,
// // //         position: 'top-right',
// // //       });
// // //       setTagInput('');
// // //       setFileToTag(null);
// // //     }
// // //   }, [fileToTag, tagInput, onTagFile, toast]);

// // //   const handleRemoveTagClick = useCallback((fileId, tag, event) => {
// // //     event.stopPropagation();
// // //     onRemoveTag(fileId, tag);
// // //     toast({
// // //       title: 'Tag Removed',
// // //       description: `Tag "${tag}" removed from file.`,
// // //       status: 'info',
// // //       duration: 3000,
// // //       isClosable: true,
// // //       position: 'top-right',
// // //     });
// // //   }, [onRemoveTag, toast]);

// // //   const handleMenuAction = useCallback((action, file, event) => {
// // //     event.stopPropagation();
// // //     switch (action) {
// // //       case 'process':
// // //         onTagFile(file.id, 'processing');
// // //         toast({
// // //           title: 'Processing',
// // //           description: `Started processing "${file.filename}".`,
// // //           status: 'info',
// // //           duration: 3000,
// // //           isClosable: true,
// // //           position: 'top-right',
// // //         });
// // //         break;
// // //       case 'analyze':
// // //         onTagFile(file.id, 'analyzed');
// // //         toast({
// // //           title: 'Analysis',
// // //           description: `Started analysis for "${file.filename}".`,
// // //           status: 'info',
// // //           duration: 3000,
// // //           isClosable: true,
// // //           position: 'top-right',
// // //         });
// // //         break;
// // //       case 'download':
// // //         onPlayAudio(file.id);
// // //         toast({
// // //           title: 'Download',
// // //           description: `Download initiated for "${file.filename}".`,
// // //           status: 'success',
// // //           duration: 3000,
// // //           isClosable: true,
// // //           position: 'top-right',
// // //         });
// // //         break;
// // //       case 'delete':
// // //         onDeleteFile(file.id);
// // //         navigate('/app/library');
// // //         toast({
// // //           title: 'File Deleted',
// // //           description: `"${file.filename}" has been deleted.`,
// // //           status: 'success',
// // //           duration: 3000,
// // //           isClosable: true,
// // //           position: 'top-right',
// // //         });
// // //         break;
// // //       default:
// // //         break;
// // //     }
// // //   }, [onTagFile, onPlayAudio, onDeleteFile, navigate, toast]);

// // //   const memoizedFiles = useMemo(() => uploadedFiles, [uploadedFiles]);

// // //   const filteredFiles = useMemo(() => {
// // //     switch (activeTab) {
// // //       case 1:
// // //         return memoizedFiles.filter(file => isAudioFile(file.type));
// // //       case 2:
// // //         return memoizedFiles.filter(file => isVideoFile(file.type));
// // //       case 3:
// // //         return memoizedFiles.filter(file => !isAudioFile(file.type) && !isVideoFile(file.type));
// // //       default:
// // //         return memoizedFiles;
// // //     }
// // //   }, [memoizedFiles, activeTab]);

// // //   if (!memoizedFiles || memoizedFiles.length === 0) {
// // //     return (
// // //       <Box display="flex" justifyContent="center" alignItems="center" height="200px">
// // //         <Spinner size="xl" />
// // //         <Text ml={4} fontSize="lg" color="gray.500">
// // //           Loading files or no files to display.
// // //         </Text>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box>
// // //       <Breadcrumb mb={4}>
// // //         <BreadcrumbItem>
// // //           <BreadcrumbLink as={Link} to="/app/dashboard">
// // //             <FaHome />
// // //           </BreadcrumbLink>
// // //         </BreadcrumbItem>
// // //         <BreadcrumbItem isCurrentPage>
// // //           <BreadcrumbLink>Library</BreadcrumbLink>
// // //         </BreadcrumbItem>
// // //       </Breadcrumb>

// // //       <Flex justify="space-between" align="center" mb={6}>
// // //         <Text fontSize="3xl" fontWeight="bold" color="blue.600">
// // //           Library
// // //         </Text>
// // //         <Button leftIcon={<FaUpload />} colorScheme="blue">
// // //           Upload
// // //         </Button>
// // //       </Flex>

// // //       <Tabs 
// // //         variant="soft-rounded" 
// // //         colorScheme="blue" 
// // //         mb={6} 
// // //         onChange={(index) => setActiveTab(index)}
// // //       >
// // //         <TabList>
// // //           <Tab>All</Tab>
// // //           <Tab>Audio</Tab>
// // //           <Tab>Video</Tab>
// // //           <Tab>Images</Tab>
// // //         </TabList>
// // //       </Tabs>

// // //       <Box 
// // //         bg={bgColor} 
// // //         borderRadius="lg" 
// // //         p={6} 
// // //         boxShadow="sm" 
// // //         borderWidth="1px" 
// // //         borderColor={borderColor}
// // //       >
// // //         <Grid
// // //           templateColumns={{
// // //             base: 'repeat(auto-fill, minmax(250px, 1fr))',
// // //             md: 'repeat(auto-fill, minmax(300px, 1fr))',
// // //             lg: 'repeat(auto-fill, minmax(350px, 1fr))',
// // //           }}
// // //           gap={6}
// // //         >
// // //           {filteredFiles.map((file) => (
// // //             <FileCard
// // //               key={file.id}
// // //               file={file}
// // //               tagInput={tagInput}
// // //               setTagInput={setTagInput}
// // //               fileToTag={fileToTag}
// // //               handleTagClick={handleTagClick}
// // //               handleTagSubmit={handleTagSubmit}
// // //               handleRemoveTagClick={handleRemoveTagClick}
// // //               handleMenuAction={handleMenuAction}
// // //               navigate={navigate}
// // //             />
// // //           ))}
// // //         </Grid>
// // //       </Box>
// // //     </Box>
// // //   );
// // // }
// // // FileDashboard.propTypes = {
// // //   uploadedFiles: PropTypes.arrayOf(
// // //     PropTypes.shape({
// // //       id: PropTypes.number.isRequired,
// // //       filename: PropTypes.string.isRequired,
// // //       thumbnailUrl: PropTypes.string.isRequired,
// // //       size: PropTypes.number.isRequired,
// // //       type: PropTypes.string.isRequired,
// // //       tags: PropTypes.arrayOf(PropTypes.string),
// // //       processing_status: PropTypes.string,
// // //       path: PropTypes.string,
// // //     })
// // //   ).isRequired,
// // //   onTagFile: PropTypes.func.isRequired,
// // //   onRemoveTag: PropTypes.func.isRequired,
// // //   onPlayAudio: PropTypes.func.isRequired,
// // //   onDeleteFile: PropTypes.func.isRequired,
// // // };

// // // export default React.memo(FileDashboard);

// // // src/components/common/FileDashboard.jsx

// // import React, { useState, useCallback, useMemo } from 'react';
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
// //   useToast,
// //   Spinner,
// //   useColorModeValue,
// //   Breadcrumb,
// //   BreadcrumbItem,
// //   BreadcrumbLink,
// // } from '@chakra-ui/react';
// // import {
// //   FaTag,
// //   FaTimes,
// //   FaEllipsisV,
// //   FaPlay,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaUpload,
// //   FaHome,
// // } from 'react-icons/fa';
// // import { Link, useNavigate } from 'react-router-dom';
// // import PropTypes from 'prop-types';
// // import { isAudioFile, isVideoFile } from '../../utils/fileUtils';
// // import FileCard from './FileCard'; // Ensure FileCard is exported separately

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
// //  * Main FileDashboard Component.
// //  */
// // function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio, onDeleteFile }) {
// //   const [tagInput, setTagInput] = useState('');
// //   const [fileToTag, setFileToTag] = useState(null);
// //   const [activeTab, setActiveTab] = useState(0);
// //   const toast = useToast();
// //   const navigate = useNavigate();

// //   const bgColor = useColorModeValue('gray.50', 'gray.800');
// //   const borderColor = useColorModeValue('gray.200', 'gray.600');

// //   /**
// //    * Handle initiating tag addition for a file.
// //    */
// //   const handleTagClick = useCallback((file, event) => {
// //     event.stopPropagation();
// //     setFileToTag(file);
// //   }, []);

// //   /**
// //    * Handle submitting a new tag.
// //    */
// //   const handleTagSubmit = useCallback(
// //     (event) => {
// //       event.preventDefault();
// //       if (fileToTag && tagInput.trim()) {
// //         onTagFile(fileToTag.id, tagInput.trim());
// //         toast({
// //           title: 'Tag Added',
// //           description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
// //           status: 'success',
// //           duration: 3000,
// //           isClosable: true,
// //           position: 'top-right',
// //         });
// //         setTagInput('');
// //         setFileToTag(null);
// //       }
// //     },
// //     [fileToTag, tagInput, onTagFile, toast]
// //   );

// //   /**
// //    * Handle removing a tag from a file.
// //    */
// //   const handleRemoveTagClick = useCallback(
// //     (fileId, tag, event) => {
// //       event.stopPropagation();
// //       onRemoveTag(fileId, tag);
// //       toast({
// //         title: 'Tag Removed',
// //         description: `Tag "${tag}" removed from file.`,
// //         status: 'info',
// //         duration: 3000,
// //         isClosable: true,
// //         position: 'top-right',
// //       });
// //     },
// //     [onRemoveTag, toast]
// //   );

// //   /**
// //    * Handle actions from the contextual menu.
// //    */
// //   const handleMenuAction = useCallback(
// //     (action, file, event) => {
// //       event.stopPropagation();
// //       switch (action) {
// //         case 'process':
// //           onTagFile(file.id, 'processing');
// //           toast({
// //             title: 'Processing',
// //             description: `Started processing "${file.filename}".`,
// //             status: 'info',
// //             duration: 3000,
// //             isClosable: true,
// //             position: 'top-right',
// //           });
// //           break;
// //         case 'analyze':
// //           onTagFile(file.id, 'analyzed');
// //           toast({
// //             title: 'Analysis',
// //             description: `Started analysis for "${file.filename}".`,
// //             status: 'info',
// //             duration: 3000,
// //             isClosable: true,
// //             position: 'top-right',
// //           });
// //           break;
// //         case 'download':
// //           onPlayAudio(file.id);
// //           toast({
// //             title: 'Download',
// //             description: `Download initiated for "${file.filename}".`,
// //             status: 'success',
// //             duration: 3000,
// //             isClosable: true,
// //             position: 'top-right',
// //           });
// //           break;
// //         case 'delete':
// //           onDeleteFile(file.id);
// //           navigate('/app/library');
// //           toast({
// //             title: 'File Deleted',
// //             description: `"${file.filename}" has been deleted.`,
// //             status: 'success',
// //             duration: 3000,
// //             isClosable: true,
// //             position: 'top-right',
// //           });
// //           break;
// //         default:
// //           break;
// //       }
// //     },
// //     [onTagFile, onPlayAudio, onDeleteFile, navigate, toast]
// //   );

// //   /**
// //    * Filter files based on the active tab.
// //    */
// //   const filteredFiles = useMemo(() => {
// //     switch (activeTab) {
// //       case 1:
// //         return uploadedFiles.filter((file) => isAudioFile(file.type));
// //       case 2:
// //         return uploadedFiles.filter((file) => isVideoFile(file.type));
// //       case 3:
// //         return uploadedFiles.filter((file) => !isAudioFile(file.type) && !isVideoFile(file.type));
// //       default:
// //         return uploadedFiles;
// //     }
// //   }, [uploadedFiles, activeTab]);

// //   /**
// //    * Handle tab change.
// //    */
// //   const handleTabChange = useCallback((index) => {
// //     setActiveTab(index);
// //   }, []);

// //   if (!uploadedFiles || uploadedFiles.length === 0) {
// //     return (
// //       <Box display="flex" justifyContent="center" alignItems="center" height="200px">
// //         <Spinner size="xl" />
// //         <Text ml={4} fontSize="lg" color="gray.500">
// //           Loading files or no files to display.
// //         </Text>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box>
// //       <Breadcrumb mb={4}>
// //         <BreadcrumbItem>
// //           <BreadcrumbLink as={Link} to="/app/dashboard">
// //             <FaHome />
// //           </BreadcrumbLink>
// //         </BreadcrumbItem>
// //         <BreadcrumbItem isCurrentPage>
// //           <BreadcrumbLink>Library</BreadcrumbLink>
// //         </BreadcrumbItem>
// //       </Breadcrumb>

// //       <Flex justify="space-between" align="center" mb={6}>
// //         <Text fontSize="3xl" fontWeight="bold" color="blue.600">
// //           Library
// //         </Text>
// //         <Button leftIcon={<FaUpload />} colorScheme="blue">
// //           Upload
// //         </Button>
// //       </Flex>

// //       <Tabs
// //         variant="soft-rounded"
// //         colorScheme="blue"
// //         mb={6}
// //         onChange={handleTabChange}
// //         index={activeTab}
// //       >
// //         <TabList>
// //           <Tab>All</Tab>
// //           <Tab>Audio</Tab>
// //           <Tab>Video</Tab>
// //           <Tab>Images</Tab>
// //         </TabList>
// //       </Tabs>

// //       <Box bg={bgColor} borderRadius="lg" p={6} boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
// //         <Grid
// //           templateColumns={{
// //             base: 'repeat(auto-fill, minmax(250px, 1fr))',
// //             md: 'repeat(auto-fill, minmax(300px, 1fr))',
// //             lg: 'repeat(auto-fill, minmax(350px, 1fr))',
// //           }}
// //           gap={6}
// //         >
// //           {filteredFiles.map((file) => (
// //             <FileCard
// //               key={file.id}
// //               file={file}
// //               tagInput={tagInput}
// //               setTagInput={setTagInput}
// //               fileToTag={fileToTag}
// //               handleTagClick={handleTagClick}
// //               handleTagSubmit={handleTagSubmit}
// //               handleRemoveTagClick={handleRemoveTagClick}
// //               handleMenuAction={handleMenuAction}
// //             />
// //           ))}
// //         </Grid>
// //       </Box>
// //     </Box>
// //   );
// // }

// // FileDashboard.propTypes = {
// //   uploadedFiles: PropTypes.arrayOf(
// //     PropTypes.shape({
// //       id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
// //       filename: PropTypes.string.isRequired,
// //       thumbnailUrl: PropTypes.string.isRequired,
// //       size: PropTypes.number.isRequired,
// //       type: PropTypes.string.isRequired,
// //       tags: PropTypes.arrayOf(PropTypes.string),
// //       processing_status: PropTypes.string,
// //       path: PropTypes.string,
// //     })
// //   ).isRequired,
// //   onTagFile: PropTypes.func.isRequired,
// //   onRemoveTag: PropTypes.func.isRequired,
// //   onPlayAudio: PropTypes.func.isRequired,
// //   onDeleteFile: PropTypes.func.isRequired,
// // };

// // export default React.memo(FileDashboard);

// // src/components/common/FileDashboard.jsx

// import React, { useState, useCallback, useMemo } from 'react';
// import {
//   Box,
//   Grid,
//   Text,
//   Button,
//   Flex,
//   Spinner,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   useToast,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import {
//   FaUpload,
//   FaHome,
// } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';
// import FileCard from './FileCard'; // Ensure FileCard is in the same directory

// /**
//  * Helper function for error handling.
//  */
// const handleError = (error, toast, defaultMessage) => {
//   console.error(error);
//   let errorMessage = defaultMessage;
//   if (error.response) {
//     // Server responded with a status other than 2xx
//     errorMessage = error.response.data?.message || errorMessage;
//   } else if (error.request) {
//     // Request was made but no response received
//     errorMessage = 'Network error. Please check your connection and try again.';
//   } else {
//     // Something else caused the error
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
//  * Main FileDashboard Component.
//  */
// function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio, onDeleteFile }) {
//   const [tagInput, setTagInput] = useState('');
//   const [fileToTag, setFileToTag] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);
//   const toast = useToast();
//   const navigate = useNavigate();

//   const bgColor = useColorModeValue('gray.50', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');

//   /**
//    * Handle initiating tag addition for a file.
//    */
//   const handleTagClick = useCallback((file, event) => {
//     event.stopPropagation();
//     setFileToTag(file);
//   }, []);

//   /**
//    * Handle submitting a new tag.
//    */
//   const handleTagSubmit = useCallback(
//     (event) => {
//       event.preventDefault();
//       if (fileToTag && tagInput.trim()) {
//         onTagFile(fileToTag.id, tagInput.trim());
//         toast({
//           title: 'Tag Added',
//           description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//           position: 'top-right',
//         });
//         setTagInput('');
//         setFileToTag(null);
//       }
//     },
//     [fileToTag, tagInput, onTagFile, toast]
//   );

//   /**
//    * Handle removing a tag from a file.
//    */
//   const handleRemoveTagClick = useCallback(
//     (fileId, tag, event) => {
//       event.stopPropagation();
//       onRemoveTag(fileId, tag);
//       toast({
//         title: 'Tag Removed',
//         description: `Tag "${tag}" removed from file.`,
//         status: 'info',
//         duration: 3000,
//         isClosable: true,
//         position: 'top-right',
//       });
//     },
//     [onRemoveTag, toast]
//   );

//   /**
//    * Handle actions from the contextual menu.
//    */
//   const handleMenuAction = useCallback(
//     (action, file, event) => {
//       onDeleteFile(action, file, event);
//     },
//     [onDeleteFile]
//   );

//   /**
//    * Filter files based on the active tab.
//    */
//   const filteredFiles = useMemo(() => {
//     switch (activeTab) {
//       case 1:
//         return uploadedFiles.filter((file) => isAudioFile(file.type));
//       case 2:
//         return uploadedFiles.filter((file) => isVideoFile(file.type));
//       case 3:
//         return uploadedFiles.filter((file) => isImageFile(file.type));
//       default:
//         return uploadedFiles;
//     }
//   }, [uploadedFiles, activeTab]);

//   /**
//    * Handle tab change.
//    */
//   const handleTabChange = useCallback((index) => {
//     setActiveTab(index);
//   }, []);

//   /**
//    * Conditional rendering based on file availability.
//    */
//   if (!uploadedFiles || uploadedFiles.length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="200px">
//         <Spinner size="xl" />
//         <Text ml={4} fontSize="lg" color="gray.500">
//           Loading files or no files to display.
//         </Text>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Breadcrumb mb={4}>
//         <BreadcrumbItem>
//           <BreadcrumbLink as={Link} to="/app/dashboard">
//             <FaHome />
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbItem isCurrentPage>
//           <BreadcrumbLink>Library</BreadcrumbLink>
//         </BreadcrumbItem>
//       </Breadcrumb>

//       <Flex justify="space-between" align="center" mb={6}>
//         <Text fontSize="3xl" fontWeight="bold" color="blue.600">
//           Library
//         </Text>
//         <Button leftIcon={<FaUpload />} colorScheme="blue">
//           Upload
//         </Button>
//       </Flex>

//       <Tabs
//         variant="soft-rounded"
//         colorScheme="blue"
//         mb={6}
//         onChange={handleTabChange}
//         index={activeTab}
//       >
//         <TabList>
//           <Tab>All</Tab>
//           <Tab>Audio</Tab>
//           <Tab>Video</Tab>
//           <Tab>Images</Tab>
//         </TabList>
//       </Tabs>

//       <Box bg={bgColor} borderRadius="lg" p={6} boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
//         <Grid
//           templateColumns={{
//             base: 'repeat(auto-fill, minmax(250px, 1fr))',
//             md: 'repeat(auto-fill, minmax(300px, 1fr))',
//             lg: 'repeat(auto-fill, minmax(350px, 1fr))',
//           }}
//           gap={6}
//         >
//           {filteredFiles.map((file) => (
//             <FileCard
//               key={file.id}
//               file={file}
//               tagInput={tagInput}
//               setTagInput={setTagInput}
//               fileToTag={fileToTag}
//               handleTagClick={handleTagClick}
//               handleTagSubmit={handleTagSubmit}
//               handleRemoveTagClick={handleRemoveTagClick}
//               handleMenuAction={handleMenuAction}
//               onPlayAudio={onPlayAudio}
//             />
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }

// FileDashboard.propTypes = {
//   uploadedFiles: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
//       filename: PropTypes.string.isRequired,
//       thumbnailUrl: PropTypes.string.isRequired,
//       size: PropTypes.number.isRequired,
//       type: PropTypes.string.isRequired,
//       tags: PropTypes.arrayOf(PropTypes.string),
//       processing_status: PropTypes.string,
//       path: PropTypes.string,
//     })
//   ).isRequired,
//   onTagFile: PropTypes.func.isRequired,
//   onRemoveTag: PropTypes.func.isRequired,
//   onPlayAudio: PropTypes.func.isRequired,
//   onDeleteFile: PropTypes.func.isRequired,
// };

// export default React.memo(FileDashboard);

// src/components/common/FileDashboard.jsx

import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Grid,
  Text,
  Button,
  Flex,
  Spinner,
  // Breadcrumb,
  // BreadcrumbItem,
  // BreadcrumbLink,
  useToast,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { FaUpload, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';
import FileCard from './FileCard';

/**
 * Main FileDashboard Component.
 */
function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio, onDeleteFile }) {
  const [tagInput, setTagInput] = useState('');
  const [fileToTag, setFileToTag] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  /**
   * Handle initiating tag addition for a file.
   */
  const handleTagClick = useCallback((file, event) => {
    event.stopPropagation();
    setFileToTag(file);
  }, []);

  /**
   * Handle submitting a new tag.
   */
  const handleTagSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (fileToTag && tagInput.trim()) {
        onTagFile(fileToTag.id, tagInput.trim());
        toast({
          title: 'Tag Added',
          description: `Tag "${tagInput.trim()}" added to "${fileToTag.filename}".`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setTagInput('');
        setFileToTag(null);
      }
    },
    [fileToTag, tagInput, onTagFile, toast]
  );

  /**
   * Handle removing a tag from a file.
   */
  const handleRemoveTagClick = useCallback(
    (fileId, tag, event) => {
      event.stopPropagation();
      onRemoveTag(fileId, tag);
      toast({
        title: 'Tag Removed',
        description: `Tag "${tag}" removed from file.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [onRemoveTag, toast]
  );

  /**
   * Handle actions from the contextual menu.
   */
  const handleMenuAction = useCallback(
    (action, file, event) => {
      onDeleteFile(action, file, event);
    },
    [onDeleteFile]
  );

  /**
   * Filter files based on the active tab.
   */
  const filteredFiles = useMemo(() => {
    switch (activeTab) {
      case 1:
        return uploadedFiles.filter((file) => isAudioFile(file.type));
      case 2:
        return uploadedFiles.filter((file) => isVideoFile(file.type));
      case 3:
        return uploadedFiles.filter((file) => isImageFile(file.type));
      default:
        return uploadedFiles;
    }
  }, [uploadedFiles, activeTab]);

  /**
   * Handle tab change.
   */
  const handleTabChange = useCallback((index) => {
    setActiveTab(index);
  }, []);

  /**
   * Conditional rendering based on file availability.
   */
  if (!uploadedFiles || uploadedFiles.length === 0) {
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
    <Box>
      {/* <Breadcrumb mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/app/dashboard">
            <FaHome />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Library</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb> */}

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

      <Box bg={bgColor} borderRadius="lg" p={6} boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
        <Grid
          templateColumns={{
            base: 'repeat(auto-fill, minmax(250px, 1fr))',
            md: 'repeat(auto-fill, minmax(300px, 1fr))',
            lg: 'repeat(auto-fill, minmax(350px, 1fr))',
          }}
          gap={6}
        >
          {filteredFiles.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              tagInput={tagInput}
              setTagInput={setTagInput}
              fileToTag={fileToTag}
              handleTagClick={handleTagClick}
              handleTagSubmit={handleTagSubmit}
              handleRemoveTagClick={handleRemoveTagClick}
              handleMenuAction={handleMenuAction}
              onPlayAudio={onPlayAudio}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

FileDashboard.propTypes = {
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      filename: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      processing_status: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
  onTagFile: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
  onPlayAudio: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
};

export default React.memo(FileDashboard);