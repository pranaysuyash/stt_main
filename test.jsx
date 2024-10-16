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
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

/**
 * FileDashboard Component
 * Displays a grid of uploaded files with tagging and action capabilities.
 */
function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag, onPlayAudio }) {
  const [tagInput, setTagInput] = useState('');
  const [fileToTag, setFileToTag] = useState(null);
  const toast = useToast();
  const navigate = useNavigate(); // For navigation after deletion

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
  };

  /**
   * Handle removing a tag.
   */
  const handleRemoveTagClick = (fileId, tag, event) => {
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
  };

  /**
   * Handle menu actions like Process, Analyze, Download, Delete.
   */
  const handleMenuAction = (action, file) => {
    switch (action) {
      case 'process':
        onTagFile(file.id, 'processing'); // Example: Adding 'processing' tag
        break;
      case 'analyze':
        onTagFile(file.id, 'analyzed'); // Example: Adding 'analyzed' tag
        break;
      case 'download':
        onPlayAudio(file.id); // Assuming onPlayAudio handles download if not audio
        break;
      case 'delete':
        // Implement actual delete functionality here
        // For example, call a prop function passed down to handle deletion
        // onDeleteFile(file.id);
        navigate('/app/library'); // Redirect to library after deletion
        toast({
          title: 'File Deleted',
          description: `"${file.filename}" has been deleted.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        break;
      default:
        break;
    }
  };

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return (
      <Text fontSize="lg" color="gray.600">
        Loading files... or No files to display.
      </Text>
    );
  }

  return (
    <Box mt={8}>
      <Text fontSize="2xl" mb={4} fontWeight="bold">
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
                fallback={<Spinner />}
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
                        onClick={(e) => handleRemoveTagClick(file.id, tag, e)}
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
                    aria-label="Enter new tag"
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
                  aria-label={`Add tag to ${file.filename}`}
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
                    onClick={() => onPlayAudio(file.id)}
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
                  _focus={{ boxShadow: 'none' }}
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
  onPlayAudio: PropTypes.func.isRequired,
};

export default FileDashboard;