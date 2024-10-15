// src/components/pages/MediaDetails.jsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Badge,
  IconButton,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaShareAlt, FaPlay, FaPause, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import api from '../../utils/api';
import MediaPlayer from '../common/MediaPlayer'; // Ensure this component exists
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

function MediaDetails() {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await api.get(`/files/${fileId}`);
        setFile(response.data);
      } catch (error) {
        console.error('Error fetching file details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load file details.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [fileId, toast]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!file) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>File not found.</Text>
      </Flex>
    );
  }

  return (
    <Box p={8}>
      {/* Header with Breadcrumb and Actions */}
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center">
          <IconButton
            as={Link}
            to="/library"
            icon={<FaArrowLeft />}
            variant="ghost"
            aria-label="Back to Library"
            mr={2}
          />
          <Text fontSize="2xl" fontWeight="bold">
            {file.filename}
          </Text>
        </Flex>
        <Flex gap={2}>
          <IconButton
            icon={<FaDownload />}
            variant="outline"
            aria-label="Download File"
            onClick={() => {
              // Implement download functionality
              window.open(file.path, '_blank');
            }}
          />
          <IconButton
            icon={<FaShareAlt />}
            variant="outline"
            aria-label="Share File"
            onClick={() => {
              // Implement share functionality
              navigator.clipboard.writeText(window.location.href).then(() => {
                toast({
                  title: 'Link Copied',
                  description: 'Media link has been copied to your clipboard.',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              });
            }}
          />
        </Flex>
      </Flex>

      {/* Media Player */}
      <Box mb={6}>
        <MediaPlayer
          fileUrl={file.path}
          fileName={file.filename}
          fileType={file.type}
          fileSize={file.size}
          isPlaying={false}
          togglePlayPause={() => {}}
        />
      </Box>

      {/* Tabs for Metadata, Processing, Analysis */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Metadata</Tab>
          <Tab>Processing</Tab>
          <Tab>Analysis</Tab>
        </TabList>

        <TabPanels>
          {/* Metadata Tab */}
          <TabPanel>
            <Flex direction="column" gap={2}>
              <Text>
                <strong>Filename:</strong> {file.filename}
              </Text>
              <Text>
                <strong>Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
              <Text>
                <strong>Type:</strong> {file.type}
              </Text>
              <Text>
                <strong>Tags:</strong>
              </Text>
              <Flex wrap="wrap" gap={2}>
                {file.tags &&
                  file.tags.map((tag, index) => (
                    <Badge key={index} colorScheme="teal">
                      {tag}
                    </Badge>
                  ))}
              </Flex>
              {/* Add more metadata as needed */}
            </Flex>
          </TabPanel>

          {/* Processing Tab */}
          <TabPanel>
            <Flex direction="column" gap={4}>
              <Button colorScheme="blue" onClick={() => {/* Implement Process */}}>
                Process
              </Button>
              {/* Display Processing Status */}
              {file.processing_status === 'processing' && (
                <Flex align="center" gap={2}>
                  <Spinner />
                  <Text>Processing...</Text>
                </Flex>
              )}
              {file.processing_status === 'completed' && (
                <Flex align="center" gap={2}>
                  <FaCheckCircle color="green" />
                  <Text>Processing Completed</Text>
                </Flex>
              )}
              {file.processing_status === 'error' && (
                <Flex align="center" gap={2}>
                  <FaTimesCircle color="red" />
                  <Text>Processing Failed</Text>
                </Flex>
              )}
              {/* Add processing logs or details as needed */}
            </Flex>
          </TabPanel>

          {/* Analysis Tab */}
          <TabPanel>
            <Flex direction="column" gap={4}>
              <Button colorScheme="purple" onClick={() => {/* Implement Analyze */}}>
                Analyze
              </Button>
              {/* Display Analysis Results */}
              {file.analysis_results ? (
                <Box>
                  {/* Render analysis results, e.g., waveform, transcript */}
                  <Text>
                    <strong>Transcript:</strong>
                  </Text>
                  <Text>{file.analysis_results.transcript}</Text>
                  {/* Add more analysis data as needed */}
                </Box>
              ) : (
                <Text>No analysis results available.</Text>
              )}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );}
  
  export default MediaDetails;
