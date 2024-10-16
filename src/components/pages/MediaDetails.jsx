

// // src/components/pages/MediaDetails.jsx

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box,
//   Text,
//   Badge,
//   IconButton,
//   Flex,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Spinner,
//   useToast,
//   Button,
// } from '@chakra-ui/react';
// import { useParams, Link } from 'react-router-dom';
// import {
//   FaArrowLeft,
//   FaDownload,
//   FaShareAlt,
//   FaPlay,
//   FaPause,
//   FaCheckCircle,
//   FaTimesCircle,
// } from 'react-icons/fa';
// import api from '../../utils/api';
// import MediaPlayer from '../common/MediaPlayer'; // Ensure this component exists
// import ImageViewer from '../common/ImageViewer'; // Ensure this component exists
// import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

// function MediaDetails() {
//   const { fileId } = useParams();
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     const fetchFileDetails = async () => {
//       try {
//         const response = await api.get(`/files/${fileId}`);
//         setFile(response.data);
//       } catch (error) {
//         console.error('Error fetching file details:', error);
//         toast({
//           title: 'Error',
//           description: 'Failed to load file details.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFileDetails();
//   }, [fileId, toast]);

//   const togglePlayPause = useCallback(() => {
//     setIsPlaying((prev) => !prev);
//   }, []);

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" height="100vh">
//         <Spinner size="xl" />
//       </Flex>
//     );
//   }

//   if (!file) {
//     return (
//       <Flex justify="center" align="center" height="100vh">
//         <Text>File not found.</Text>
//       </Flex>
//     );
//   }

//   const handleDownload = () => {
//     window.open(file.path, '_blank');
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href).then(() => {
//       toast({
//         title: 'Link Copied',
//         description: 'Media link has been copied to your clipboard.',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//     });
//   };

//   const getFileCategory = (mimeType) => {
//     if (mimeType.startsWith('audio/')) return 'audio';
//     if (mimeType.startsWith('video/')) return 'video';
//     if (mimeType.startsWith('image/')) return 'image';
//     return 'unsupported';
//   };

//   const mediaCategory = getFileCategory(file.type);

//   return (
//     <Box p={8}>
//       {/* Header with Breadcrumb and Actions */}
//       <Flex justify="space-between" align="center" mb={4}>
//         <Flex align="center">
//           <IconButton
//             as={Link}
//             to="/library"
//             icon={<FaArrowLeft />}
//             variant="ghost"
//             aria-label="Back to Library"
//             mr={2}
//           />
//           <Text fontSize="2xl" fontWeight="bold">
//             {file.filename}
//           </Text>
//         </Flex>
//         <Flex gap={2}>
//           <IconButton
//             icon={<FaDownload />}
//             variant="outline"
//             aria-label="Download File"
//             onClick={handleDownload}
//           />
//           <IconButton
//             icon={<FaShareAlt />}
//             variant="outline"
//             aria-label="Share File"
//             onClick={handleShare}
//           />
//         </Flex>
//       </Flex>

//       {/* Media Player or Image Viewer */}
//       <Box mb={6}>
//         {mediaCategory === 'audio' || mediaCategory === 'video' ? (
//           <MediaPlayer
//             fileUrl={file.path}
//             fileName={file.filename}
//             fileType={file.type}
//             fileSize={file.size}
//             isPlaying={isPlaying}
//             togglePlayPause={togglePlayPause}
//             duration={file.duration}
//           />
//         ) : mediaCategory === 'image' ? (
//           <ImageViewer
//             fileUrl={file.path}
//             fileName={file.filename}
//             fileType={file.type}
//             fileSize={file.size}
//             metaData={file.meta_data}
//           />
//         ) : (
//           <Text>Unsupported media type.</Text>
//         )}
//       </Box>

//       {/* Tabs for Metadata, Processing, Analysis */}
//       <Tabs variant="enclosed" colorScheme="blue">
//         <TabList>
//           <Tab>Metadata</Tab>
//           <Tab>Processing</Tab>
//           <Tab>Analysis</Tab>
//         </TabList>

//         <TabPanels>
//           {/* Metadata Tab */}
//           <TabPanel>
//             <Flex direction="column" gap={2}>
//               <Text>
//                 <strong>Filename:</strong> {file.filename}
//               </Text>
//               <Text>
//                 <strong>Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB
//               </Text>
//               <Text>
//                 <strong>Type:</strong> {file.type}
//               </Text>
//               <Text>
//                 <strong>Tags:</strong>
//               </Text>
//               <Flex wrap="wrap" gap={2}>
//                 {file.tags &&
//                   file.tags.map((tag, index) => (
//                     <Badge key={index} colorScheme="teal">
//                       {tag}
//                     </Badge>
//                   ))}
//               </Flex>
//               {/* Display additional metadata if available */}
//               {file.meta_data && (
//                 <>
//                   {mediaCategory === 'audio' && (
//                     <>
//                       <Text>
//                         <strong>Duration:</strong> {file.duration}
//                       </Text>
//                       {/* Add more audio-specific metadata */}
//                     </>
//                   )}
//                   {mediaCategory === 'video' && (
//                     <>
//                       <Text>
//                         <strong>Duration:</strong> {file.duration}
//                       </Text>
//                       {/* Add more video-specific metadata */}
//                     </>
//                   )}
//                   {mediaCategory === 'image' && (
//                     <>
//                       <Text>
//                         <strong>Resolution:</strong> {file.meta_data.resolution}
//                       </Text>
//                       {/* Add more image-specific metadata */}
//                     </>
//                   )}
//                 </>
//               )}
//             </Flex>
//           </TabPanel>

//           {/* Processing Tab */}
//           <TabPanel>
//             <Flex direction="column" gap={4}>
//               <Button
//                 colorScheme="blue"
//                 onClick={() => {
//                   // Implement processing functionality
//                   toast({
//                     title: 'Processing Started',
//                     description: 'Your file is being processed.',
//                     status: 'info',
//                     duration: 3000,
//                     isClosable: true,
//                   });
//                 }}
//               >
//                 Process
//               </Button>
//               {/* Display Processing Status */}
//               {file.processing_status === 'processing' && (
//                 <Flex align="center" gap={2}>
//                   <Spinner />
//                   <Text>Processing...</Text>
//                 </Flex>
//               )}
//               {file.processing_status === 'completed' && (
//                 <Flex align="center" gap={2}>
//                   <FaCheckCircle color="green" />
//                   <Text>Processing Completed</Text>
//                 </Flex>
//               )}
//               {file.processing_status === 'error' && (
//                 <Flex align="center" gap={2}>
//                   <FaTimesCircle color="red" />
//                   <Text>Processing Failed</Text>
//                 </Flex>
//               )}
//               {/* Add processing logs or details as needed */}
//             </Flex>
//           </TabPanel>

//           {/* Analysis Tab */}
//           <TabPanel>
//             <Flex direction="column" gap={4}>
//               <Button
//                 colorScheme="purple"
//                 onClick={() => {
//                   // Implement analysis functionality
//                   toast({
//                     title: 'Analysis Started',
//                     description: 'Your file is being analyzed.',
//                     status: 'info',
//                     duration: 3000,
//                     isClosable: true,
//                   });
//                 }}
//               >
//                 Analyze
//               </Button>
//               {/* Display Analysis Results */}
//               {file.analysis_results ? (
//                 <Box>
//                   {/* Render analysis results, e.g., waveform, transcript */}
//                   <Text>
//                     <strong>Transcript:</strong>
//                   </Text>
//                   <Text>{file.analysis_results.transcript}</Text>
//                   {/* Add more analysis data as needed */}
//                 </Box>
//               ) : (
//                 <Text>No analysis results available.</Text>
//               )}
//             </Flex>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </Box>
//   );
// }

// export default MediaDetails;

// src/components/pages/MediaDetails.jsx

import React, { useEffect, useState, useCallback } from 'react';
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
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaDownload,
  FaShareAlt,
  FaPlay,
  FaPause,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import api from '../../utils/api';
import MediaPlayer from '../common/MediaPlayer'; // Ensure this component exists
import ImageViewer from '../common/ImageViewer'; // Ensure this component exists
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/fileUtils';

/**
 * MediaDetails Component
 * Displays detailed information about a specific media file.
 */
function MediaDetails() {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // For navigation actions

  /**
   * Fetch file details from the API.
   */
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
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [fileId, toast]);

  /**
   * Toggle play/pause state.
   */
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  /**
   * Handle file download.
   */
  const handleDownload = () => {
    window.open(file.path, '_blank');
  };

  /**
   * Handle file sharing by copying the link to clipboard.
   */
  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast({
          title: 'Link Copied',
          description: 'Media link has been copied to your clipboard.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast({
          title: 'Error',
          description: 'Failed to copy link.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  /**
   * Determine the media category based on MIME type.
   */
  const getFileCategory = (mimeType) => {
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('image/')) return 'image';
    return 'unsupported';
  };

  const mediaCategory = file ? getFileCategory(file.type) : 'unsupported';

  /**
   * Handle deletion of the file.
   */
  const handleDelete = async () => {
    try {
      await api.delete(`/files/${fileId}`);
      toast({
        title: 'Deleted',
        description: 'File deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate('/app/library'); // Redirect to library after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
      let errorMessage = 'Failed to delete file.';
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
    }
  };

  /**
   * Handle processing of the file.
   */
  const handleProcess = async () => {
    try {
      await api.post(`/files/${fileId}/process`);
      toast({
        title: 'Processing Started',
        description: 'Your file is being processed.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      // Optionally, refresh the file details to update processing_status
      const response = await api.get(`/files/${fileId}`);
      setFile(response.data);
    } catch (error) {
      console.error('Error initiating processing:', error);
      let errorMessage = 'Failed to start processing.';
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
    }
  };

  /**
   * Handle analysis of the file.
   */
  const handleAnalyze = async () => {
    try {
      await api.post(`/files/${fileId}/analyze`);
      toast({
        title: 'Analysis Started',
        description: 'Your file is being analyzed.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      // Optionally, refresh the file details to update analysis_results
      const response = await api.get(`/files/${fileId}`);
      setFile(response.data);
    } catch (error) {
      console.error('Error initiating analysis:', error);
      let errorMessage = 'Failed to start analysis.';
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
    }
  };

  /**
   * Conditional rendering based on loading state and file availability.
   */
  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="blue.500" />
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
            onClick={() => navigate(-1)} // Navigate back in history
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
            onClick={handleDownload}
          />
          <IconButton
            icon={<FaShareAlt />}
            variant="outline"
            aria-label="Share File"
            onClick={handleShare}
          />
          <IconButton
            icon={<FaTimesCircle />}
            variant="outline"
            colorScheme="red"
            aria-label="Delete File"
            onClick={handleDelete}
          />
        </Flex>
      </Flex>

      {/* Media Player or Image Viewer */}
      <Box mb={6}>
        {mediaCategory === 'audio' || mediaCategory === 'video' ? (
          <MediaPlayer
            fileUrl={file.path}
            fileName={file.filename}
            fileType={file.type}
            fileSize={file.size}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            duration={file.duration}
          />
        ) : mediaCategory === 'image' ? (
          <ImageViewer
            fileUrl={file.path}
            fileName={file.filename}
            fileType={file.type}
            fileSize={file.size}
            metaData={file.meta_data}
          />
        ) : (
          <Text>Unsupported media type.</Text>
        )}
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
              {/* Display additional metadata if available */}
              {file.meta_data && (
                <>
                  {mediaCategory === 'audio' && (
                    <>
                      <Text>
                        <strong>Duration:</strong> {file.duration} seconds
                      </Text>
                      {/* Add more audio-specific metadata */}
                    </>
                  )}
                  {mediaCategory === 'video' && (
                    <>
                      <Text>
                        <strong>Duration:</strong> {file.duration} seconds
                      </Text>
                      {/* Add more video-specific metadata */}
                    </>
                  )}
                  {mediaCategory === 'image' && (
                    <>
                      <Text>
                        <strong>Resolution:</strong> {file.meta_data.resolution}
                      </Text>
                      {/* Add more image-specific metadata */}
                    </>
                  )}
                </>
              )}
            </Flex>
          </TabPanel>

          {/* Processing Tab */}
          <TabPanel>
            <Flex direction="column" gap={4}>
              <Button
                colorScheme="blue"
                onClick={handleProcess}
                isDisabled={file.processing_status === 'processing'}
                aria-label="Start Processing"
              >
                {file.processing_status === 'processing' ? 'Processing...' : 'Process'}
              </Button>
              {/* Display Processing Status */}
              {file.processing_status === 'processing' && (
                <Flex align="center" gap={2}>
                  <Spinner size="sm" color="blue.500" />
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
              <Button
                colorScheme="purple"
                onClick={handleAnalyze}
                isDisabled={file.analysis_results}
                aria-label="Start Analysis"
              >
                {file.analysis_results ? 'Analysis Completed' : 'Analyze'}
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
  )
    }

    export default MediaDetails;