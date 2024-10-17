// // // // // src/components/common/FileCard.jsx

// // // // import React from 'react';
// // // // import {
// // // //   Box,
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
// // // //   useColorModeValue,
// // // //   Spinner,
// // // // } from '@chakra-ui/react';
// // // // import {
// // // //   FaTag,
// // // //   FaTimes,
// // // //   FaEllipsisV,
// // // //   FaPlay,
// // // //   FaCheckCircle,
// // // //   FaTimesCircle,
// // // // } from 'react-icons/fa';
// // // // import { Link } from 'react-router-dom';
// // // // import PropTypes from 'prop-types';
// // // // import { isAudioFile, isVideoFile } from '../../utils/fileUtils';
// // // // import { useNavigate } from 'react-router-dom';

// // // // /**
// // // //  * Memoized FileCard Component.
// // // //  */
// // // // const FileCard = React.memo(({ 
// // // //   file, 
// // // //   tagInput, 
// // // //   setTagInput, 
// // // //   fileToTag, 
// // // //   handleTagClick, 
// // // //   handleTagSubmit, 
// // // //   handleRemoveTagClick, 
// // // //   handleMenuAction 
// // // // }) => {
// // // //   const bgColor = useColorModeValue('white', 'gray.700');
// // // //   const borderColor = useColorModeValue('gray.200', 'gray.600');
// // // //   const navigate = useNavigate();

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
// // // //                 onPlayAudio(file.id); // Ensure onPlayAudio is passed correctly
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
// // // //     id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
// // // //   onPlayAudio: PropTypes.func.isRequired, // Added onPlayAudio prop
// // // // };

// // // // export default FileCard;

// // // // src/components/common/FileCard.jsx

// // // import React from 'react';
// // // import {
// // //   Box,
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
// // //   useColorModeValue,
// // //   Spinner,
// // // } from '@chakra-ui/react';
// // // import {
// // //   FaTimes,
// // //   FaEllipsisV,
// // //   FaPlay,
// // //   FaCheckCircle,
// // //   FaTimesCircle,
// // //   FaTag,
// // // } from 'react-icons/fa';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import PropTypes from 'prop-types';
// // // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// // // /**
// // //  * Memoized FileCard Component.
// // //  */
// // // const FileCard = React.memo(({ 
// // //   file, 
// // //   tagInput, 
// // //   setTagInput, 
// // //   fileToTag, 
// // //   handleTagClick, 
// // //   handleTagSubmit, 
// // //   handleRemoveTagClick, 
// // //   handleMenuAction,
// // //   onPlayAudio
// // // }) => {
// // //   const bgColor = useColorModeValue('white', 'gray.700');
// // //   const borderColor = useColorModeValue('gray.200', 'gray.600');
// // //   const navigate = useNavigate();

// // //   /**
// // //    * Prevent event bubbling when clicking on tag buttons or menu actions.
// // //    */
// // //   const stopPropagation = (e) => {
// // //     e.stopPropagation();
// // //   };

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
// // //               onClick={stopPropagation}
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
// // //                 onPlayAudio(file.id);
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
// // //             onClick={stopPropagation}
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
// // //     id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
// // //   onPlayAudio: PropTypes.func.isRequired,
// // // };

// // // export default FileCard;

// // // src/components/common/FileCard.jsx

// // import React from 'react';
// // import {
// //   Box,
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
// //   useColorModeValue,
// //   Spinner,
// // } from '@chakra-ui/react';
// // import {
// //   FaTimes,
// //   FaEllipsisV,
// //   FaPlay,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaTag,
// // } from 'react-icons/fa';
// // import { Link, useNavigate } from 'react-router-dom';
// // import PropTypes from 'prop-types';
// // import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// // /**
// //  * Memoized FileCard Component.
// //  */
// // const FileCard = React.memo(({ 
// //   file, 
// //   tagInput, 
// //   setTagInput, 
// //   fileToTag, 
// //   handleTagClick, 
// //   handleTagSubmit, 
// //   handleRemoveTagClick, 
// //   handleMenuAction,
// //   onPlayAudio
// // }) => {
// //   const bgColor = useColorModeValue('white', 'gray.700');
// //   const borderColor = useColorModeValue('gray.200', 'gray.600');
// //   const navigate = useNavigate();

// //   /**
// //    * Prevent event bubbling when clicking on tag buttons or menu actions.
// //    */
// //   const stopPropagation = (e) => {
// //     e.stopPropagation();
// //   };

// //   return (
// //     <Box
// //       borderWidth="1px"
// //       borderColor={borderColor}
// //       borderRadius="lg"
// //       overflow="hidden"
// //       position="relative"
// //       bg={bgColor}
// //       boxShadow="md"
// //       transition="all 0.3s"
// //       _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
// //       cursor="pointer"
// //       display="flex"
// //       flexDirection="column"
// //       height="100%"
// //       onClick={() => navigate(`/app/media/${file.id}`)}
// //     >
// //       <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
// //         <Image
// //           src={file.thumbnailUrl}
// //           alt={file.filename}
// //           objectFit="cover"
// //           height="150px"
// //           width="100%"
// //           fallback={<Spinner />}
// //         />
// //       </Link>

// //       <Box p={4} flex="0 0 auto">
// //         <Tooltip label={file.filename} hasArrow>
// //           <Text isTruncated fontWeight="medium" fontSize="md">
// //             {file.filename}
// //           </Text>
// //         </Tooltip>
// //         <Text fontSize="sm" color="gray.500">
// //           {(file.size / (1024 * 1024)).toFixed(2)} MB
// //         </Text>

// //         <Flex mt={2} wrap="wrap" gap={1}>
// //           {file.tags &&
// //             file.tags.slice(0, 3).map((tag, index) => (
// //               <Badge
// //                 key={index}
// //                 colorScheme={
// //                   tag.toLowerCase() === 'processing'
// //                     ? 'yellow'
// //                     : tag.toLowerCase() === 'analyzed'
// //                     ? 'purple'
// //                     : 'blue'
// //                 }
// //                 fontSize="xs"
// //                 display="flex"
// //                 alignItems="center"
// //               >
// //                 {tag}
// //                 <IconButton
// //                   icon={<FaTimes />}
// //                   size="xs"
// //                   ml={1}
// //                   variant="ghost"
// //                   colorScheme="red"
// //                   aria-label={`Remove tag ${tag}`}
// //                   onClick={(e) => handleRemoveTagClick(file.id, tag, e)}
// //                 />
// //               </Badge>
// //             ))}
// //           {file.tags && file.tags.length > 3 && (
// //             <Badge colorScheme="blue" fontSize="xs">
// //               +{file.tags.length - 3}
// //             </Badge>
// //           )}
// //         </Flex>

// //         {fileToTag && fileToTag.id === file.id ? (
// //           <form onSubmit={handleTagSubmit}>
// //             <Input
// //               size="sm"
// //               mt={2}
// //               placeholder="Enter tag"
// //               value={tagInput}
// //               onChange={(e) => setTagInput(e.target.value)}
// //               onClick={stopPropagation}
// //               aria-label="Enter new tag"
// //             />
// //           </form>
// //         ) : (
// //           <Button
// //             size="sm"
// //             leftIcon={<FaTag />}
// //             mt={2}
// //             variant="outline"
// //             colorScheme="blue"
// //             onClick={(e) => handleTagClick(file, e)}
// //             aria-label={`Add tag to ${file.filename}`}
// //           >
// //             Add Tag
// //           </Button>
// //         )}
// //       </Box>

// //       <Flex
// //         p={2}
// //         justify="space-between"
// //         align="center"
// //         borderTop="1px solid"
// //         borderColor={borderColor}
// //         flex="0 0 auto"
// //       >
// //         {(isAudioFile(file.type) || isVideoFile(file.type)) && (
// //           <Tooltip label="Play" hasArrow>
// //             <IconButton
// //               icon={<FaPlay />}
// //               colorScheme="blue"
// //               aria-label={`Play ${file.filename}`}
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 onPlayAudio(file.id);
// //               }}
// //             />
// //           </Tooltip>
// //         )}

// //         <Menu>
// //           <MenuButton
// //             as={IconButton}
// //             aria-label="More actions"
// //             icon={<FaEllipsisV />}
// //             variant="ghost"
// //             size="sm"
// //             _focus={{ boxShadow: 'none' }}
// //             onClick={stopPropagation}
// //           />
// //           <MenuList>
// //             <MenuItem as={Link} to={`/app/media/${file.id}`}>
// //               View Details
// //             </MenuItem>
// //             <MenuItem onClick={(e) => handleMenuAction('process', file, e)}>
// //               Process
// //             </MenuItem>
// //             <MenuItem onClick={(e) => handleMenuAction('analyze', file, e)}>
// //               Analyze
// //             </MenuItem>
// //             <MenuItem onClick={(e) => handleMenuAction('download', file, e)}>
// //               Download
// //             </MenuItem>
// //             <MenuItem onClick={(e) => handleMenuAction('delete', file, e)}>
// //               Delete
// //             </MenuItem>
// //           </MenuList>
// //         </Menu>
// //       </Flex>

// //       {file.processing_status && (
// //         <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
// //           <Box position="absolute" top="2" left="2">
// //             {file.processing_status.toLowerCase() === 'completed' && (
// //               <FaCheckCircle color="green" size="20" />
// //             )}
// //             {file.processing_status.toLowerCase() === 'processing' && (
// //               <Spinner size="sm" color="blue.500" />
// //             )}
// //             {file.processing_status.toLowerCase() === 'error' && (
// //               <FaTimesCircle color="red" size="20" />
// //             )}
// //           </Box>
// //         </Tooltip>
// //       )}
// //     </Box>
// //   );
// // });

// // FileCard.displayName = 'FileCard';

// // FileCard.propTypes = {
// //   file: PropTypes.shape({
// //     id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
// //     filename: PropTypes.string.isRequired,
// //     thumbnailUrl: PropTypes.string.isRequired,
// //     size: PropTypes.number.isRequired,
// //     type: PropTypes.string.isRequired,
// //     tags: PropTypes.arrayOf(PropTypes.string),
// //     processing_status: PropTypes.string,
// //   }).isRequired,
// //   tagInput: PropTypes.string.isRequired,
// //   setTagInput: PropTypes.func.isRequired,
// //   fileToTag: PropTypes.object,
// //   handleTagClick: PropTypes.func.isRequired,
// //   handleTagSubmit: PropTypes.func.isRequired,
// //   handleRemoveTagClick: PropTypes.func.isRequired,
// //   handleMenuAction: PropTypes.func.isRequired,
// //   onPlayAudio: PropTypes.func.isRequired,
// // };

// // export default FileCard;

// // src/components/common/FileCard.jsx

// import React from 'react';
// import {
//   Box,
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
//   useColorModeValue,
//   Spinner,
// } from '@chakra-ui/react';
// import {
//   FaTimes,
//   FaEllipsisV,
//   FaPlay,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaTag,
// } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// /**
//  * Memoized FileCard Component.
//  */
// const FileCard = React.memo(({ 
//   file, 
//   tagInput, 
//   setTagInput, 
//   fileToTag, 
//   handleTagClick, 
//   handleTagSubmit, 
//   handleRemoveTagClick, 
//   handleMenuAction,
//   onPlayAudio
// }) => {
//   const bgColor = useColorModeValue('white', 'gray.700');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const navigate = useNavigate();

//   /**
//    * Prevent event bubbling when clicking on tag buttons or menu actions.
//    */
//   const stopPropagation = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <Box
//       borderWidth="1px"
//       borderColor={borderColor}
//       borderRadius="lg"
//       overflow="hidden"
//       position="relative"
//       bg={bgColor}
//       boxShadow="md"
//       transition="all 0.3s"
//       _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
//       cursor="pointer"
//       display="flex"
//       flexDirection="column"
//       height="100%"
//       onClick={() => navigate(`/app/media/${file.id}`)}
//       data-cy="file-card"
//     >
//       <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
//         <Image
//           src={file.thumbnailUrl}
//           alt={file.filename}
//           objectFit="cover"
//           height="150px"
//           width="100%"
//           fallback={<Spinner />}
//           data-cy="file-thumbnail"
//         />
//       </Link>

//       <Box p={4} flex="0 0 auto">
//         <Tooltip label={file.filename} hasArrow>
//           <Text isTruncated fontWeight="medium" fontSize="md" data-cy="file-filename">
//             {file.filename}
//           </Text>
//         </Tooltip>
//         <Text fontSize="sm" color="gray.500" data-cy="file-size">
//           {(file.size / (1024 * 1024)).toFixed(2)} MB
//         </Text>

//         <Flex mt={2} wrap="wrap" gap={1}>
//           {file.tags &&
//             file.tags.slice(0, 3).map((tag, index) => (
//               <Badge
//                 key={index}
//                 colorScheme={
//                   tag.toLowerCase() === 'processing'
//                     ? 'yellow'
//                     : tag.toLowerCase() === 'analyzed'
//                     ? 'purple'
//                     : 'blue'
//                 }
//                 fontSize="xs"
//                 display="flex"
//                 alignItems="center"
//                 data-cy={`tag-${tag}`}
//               >
//                 {tag}
//                 <IconButton
//                   icon={<FaTimes />}
//                   size="xs"
//                   ml={1}
//                   variant="ghost"
//                   colorScheme="red"
//                   aria-label={`Remove tag ${tag}`}
//                   onClick={(e) => handleRemoveTagClick(file.id, tag, e)}
//                   data-cy={`remove-tag-${tag}`}
//                 />
//               </Badge>
//             ))}
//           {file.tags && file.tags.length > 3 && (
//             <Badge colorScheme="blue" fontSize="xs" data-cy="extra-tags">
//               +{file.tags.length - 3}
//             </Badge>
//           )}
//         </Flex>

//         {fileToTag && fileToTag.id === file.id ? (
//           <form onSubmit={handleTagSubmit}>
//             <Input
//               size="sm"
//               mt={2}
//               placeholder="Enter tag"
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               onClick={stopPropagation}
//               aria-label="Enter new tag"
//               data-cy="tag-input"
//             />
//           </form>
//         ) : (
//           <Button
//             size="sm"
//             leftIcon={<FaTag />}
//             mt={2}
//             variant="outline"
//             colorScheme="blue"
//             onClick={(e) => handleTagClick(file, e)}
//             aria-label={`Add tag to ${file.filename}`}
//             data-cy="add-tag-button"
//           >
//             Add Tag
//           </Button>
//         )}
//       </Box>

//       <Flex
//         p={2}
//         justify="space-between"
//         align="center"
//         borderTop="1px solid"
//         borderColor={borderColor}
//         flex="0 0 auto"
//       >
//         {(isAudioFile(file.type) || isVideoFile(file.type)) && (
//           <Tooltip label="Play" hasArrow>
//             <IconButton
//               icon={<FaPlay />}
//               colorScheme="blue"
//               aria-label={`Play ${file.filename}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onPlayAudio(file.id);
//               }}
//               data-cy="play-button"
//             />
//           </Tooltip>
//         )}

//         <Menu>
//           <MenuButton
//             as={IconButton}
//             aria-label="More actions"
//             icon={<FaEllipsisV />}
//             variant="ghost"
//             size="sm"
//             _focus={{ boxShadow: 'none' }}
//             onClick={stopPropagation}
//             data-cy="more-actions-button"
//           />
//           <MenuList>
//             <MenuItem as={Link} to={`/app/media/${file.id}`} data-cy="menu-view-details">
//               View Details
//             </MenuItem>
//             <MenuItem onClick={(e) => handleMenuAction('process', file, e)} data-cy="menu-process">
//               Process
//             </MenuItem>
//             <MenuItem onClick={(e) => handleMenuAction('analyze', file, e)} data-cy="menu-analyze">
//               Analyze
//             </MenuItem>
//             <MenuItem onClick={(e) => handleMenuAction('download', file, e)} data-cy="menu-download">
//               Download
//             </MenuItem>
//             <MenuItem onClick={(e) => handleMenuAction('delete', file, e)} data-cy="menu-delete">
//               Delete
//             </MenuItem>
//           </MenuList>
//         </Menu>
//       </Flex>

//       {file.processing_status && (
//         <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
//           <Box position="absolute" top="2" left="2" data-cy="processing-status">
//             {file.processing_status.toLowerCase() === 'completed' && (
//               <FaCheckCircle color="green" size="20" />
//             )}
//             {file.processing_status.toLowerCase() === 'processing' && (
//               <Spinner size="sm" color="blue.500" />
//             )}
//             {file.processing_status.toLowerCase() === 'error' && (
//               <FaTimesCircle color="red" size="20" />
//             )}
//           </Box>
//         </Tooltip>
//       )}
//     </Box>
//   );
// });

// FileCard.displayName = 'FileCard';

// FileCard.propTypes = {
//   file: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
//     filename: PropTypes.string.isRequired,
//     thumbnailUrl: PropTypes.string.isRequired,
//     size: PropTypes.number.isRequired,
//     type: PropTypes.string.isRequired,
//     tags: PropTypes.arrayOf(PropTypes.string),
//     processing_status: PropTypes.string,
//   }).isRequired,
//   tagInput: PropTypes.string.isRequired,
//   setTagInput: PropTypes.func.isRequired,
//   fileToTag: PropTypes.object,
//   handleTagClick: PropTypes.func.isRequired,
//   handleTagSubmit: PropTypes.func.isRequired,
//   handleRemoveTagClick: PropTypes.func.isRequired,
//   handleMenuAction: PropTypes.func.isRequired,
//   onPlayAudio: PropTypes.func.isRequired,
// };

// export default FileCard;


// src/components/common/FileCard.jsx

import React from 'react';
import {
  Box,
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
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import {
  FaTimes,
  FaEllipsisV,
  FaPlay,
  FaCheckCircle,
  FaTimesCircle,
  FaTag,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

/**
 * Memoized FileCard Component.
 */
const FileCard = React.memo(({ 
  file, 
  tagInput, 
  setTagInput, 
  fileToTag, 
  handleTagClick, 
  handleTagSubmit, 
  handleRemoveTagClick, 
  handleMenuAction,
  onPlayAudio
}) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const navigate = useNavigate();

  /**
   * Prevent event bubbling when clicking on tag buttons or menu actions.
   */
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      bg={bgColor}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ boxShadow: 'xl', transform: 'translateY(-5px)' }}
      cursor="pointer"
      display="flex"
      flexDirection="column"
      height="100%"
      onClick={() => navigate(`/app/media/${file.id}`)}
      data-cy="file-card"
    >
      <Link to={`/app/media/${file.id}`} style={{ flex: '1 1 auto' }}>
        <Image
          src={file.thumbnailUrl}
          alt={file.filename}
          objectFit="cover"
          height="150px"
          width="100%"
          fallback={<Spinner />}
          data-cy="file-thumbnail"
        />
      </Link>

      <Box p={4} flex="0 0 auto">
        <Tooltip label={file.filename} hasArrow>
          <Text isTruncated fontWeight="medium" fontSize="md" data-cy="file-filename">
            {file.filename}
          </Text>
        </Tooltip>
        <Text fontSize="sm" color="gray.500" data-cy="file-size">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </Text>

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
                    : 'blue'
                }
                fontSize="xs"
                display="flex"
                alignItems="center"
                data-cy={`tag-${tag}`}
              >
                {tag}
                <IconButton
                  icon={<FaTimes />}
                  size="xs"
                  ml={1}
                  variant="ghost"
                  colorScheme="red"
                  aria-label={`Remove tag ${tag}`}
                  onClick={(e) => handleRemoveTagClick(file.id, tag, e)}
                  data-cy={`remove-tag-${tag}`}
                />
              </Badge>
            ))}
          {file.tags && file.tags.length > 3 && (
            <Badge colorScheme="blue" fontSize="xs" data-cy="extra-tags">
              +{file.tags.length - 3}
            </Badge>
          )}
        </Flex>

        {fileToTag && fileToTag.id === file.id ? (
          <form onSubmit={handleTagSubmit}>
            <Input
              size="sm"
              mt={2}
              placeholder="Enter tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onClick={stopPropagation}
              aria-label="Enter new tag"
              data-cy="tag-input"
            />
          </form>
        ) : (
          <Button
            size="sm"
            leftIcon={<FaTag />}
            mt={2}
            variant="outline"
            colorScheme="blue"
            onClick={(e) => handleTagClick(file, e)}
            aria-label={`Add tag to ${file.filename}`}
            data-cy="add-tag-button"
          >
            Add Tag
          </Button>
        )}
      </Box>

      <Flex
        p={2}
        justify="space-between"
        align="center"
        borderTop="1px solid"
        borderColor={borderColor}
        flex="0 0 auto"
      >
        {(isAudioFile(file.type) || isVideoFile(file.type)) && (
          <Tooltip label="Play" hasArrow>
            <IconButton
              icon={<FaPlay />}
              colorScheme="blue"
              aria-label={`Play ${file.filename}`}
              onClick={(e) => {
                e.stopPropagation();
                onPlayAudio(file.id);
              }}
              data-cy="play-button"
            />
          </Tooltip>
        )}

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="More actions"
            icon={<FaEllipsisV />}
            variant="ghost"
            size="sm"
            _focus={{ boxShadow: 'none' }}
            onClick={stopPropagation}
            data-cy="more-actions-button"
          />
          <MenuList>
            <MenuItem as={Link} to={`/app/media/${file.id}`} data-cy="menu-view-details">
              View Details
            </MenuItem>
            <MenuItem onClick={(e) => handleMenuAction('process', file, e)} data-cy="menu-process">
              Process
            </MenuItem>
            <MenuItem onClick={(e) => handleMenuAction('analyze', file, e)} data-cy="menu-analyze">
              Analyze
            </MenuItem>
            <MenuItem onClick={(e) => handleMenuAction('download', file, e)} data-cy="menu-download">
              Download
            </MenuItem>
            <MenuItem onClick={(e) => handleMenuAction('delete', file, e)} data-cy="menu-delete">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {file.processing_status && (
        <Tooltip label={`Status: ${file.processing_status}`} hasArrow>
          <Box position="absolute" top="2" left="2" data-cy="processing-status">
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
  );
});

FileCard.displayName = 'FileCard';

FileCard.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    filename: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    processing_status: PropTypes.string,
  }).isRequired,
  tagInput: PropTypes.string.isRequired,
  setTagInput: PropTypes.func.isRequired,
  fileToTag: PropTypes.object,
  handleTagClick: PropTypes.func.isRequired,
  handleTagSubmit: PropTypes.func.isRequired,
  handleRemoveTagClick: PropTypes.func.isRequired,
  handleMenuAction: PropTypes.func.isRequired,
  onPlayAudio: PropTypes.func.isRequired,
};

export default FileCard;
