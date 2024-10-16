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
      let errorMessage = error.response?.data?.message || 'Failed to fetch files.';
      if (error.response) {
        // Server responded with a status other than 2xx
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        // Something else caused the error
        errorMessage = error.message;
      }

      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right', // Standardized position
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
        position: 'top-right', // Standardized position
      });
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error tagging file:', error);
      let errorMessage = error.response?.data?.message || 'Failed to add tags.';
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
        position: 'top-right', // Standardized position
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
        position: 'top-right', // Standardized position
      });
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error removing tags:', error);
      let errorMessage = error.response?.data?.message || 'Failed to remove tags.';
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
        position: 'top-right', // Standardized position
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
        position: 'top-right', // Standardized position
      });
      fetchFiles();
    } catch (error) {
      console.error('Error initiating processing:', error);
      let errorMessage = error.response?.data?.message || 'Failed to start processing.';
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
        position: 'top-right', // Standardized position
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
        position: 'top-right', // Standardized position
      });
      fetchFiles();
    } catch (error) {
      console.error('Error initiating analysis:', error);
      let errorMessage = error.response?.data?.message || 'Failed to start analysis.';
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
        position: 'top-right', // Standardized position
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
        position: 'top-right', // Standardized position
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      let errorMessage = error.response?.data?.message || 'Failed to download file.';
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
        position: 'top-right', // Standardized position
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
        position: 'top-right', // Standardized position
      });
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      let errorMessage = error.response?.data?.message || 'Failed to delete file.';
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
        position: 'top-right', // Standardized position
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
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
  Library
</Text>
<Text fontSize="lg" color="gray.600">
  No files uploaded yet. Start by uploading your first file!
</Text>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        Library
      </Text>

      {/* Tag Filters */}
      <Flex mb={6} wrap="wrap" gap={2}>
        {tags.map((tag) => (
          <Button
            key={tag}
            size="sm"
            // mr={2}
            // mb={2}
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
      <Tabs isFitted variant={"enclosed"}>
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
          <Spinner size="lg" color="blue.500" />
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