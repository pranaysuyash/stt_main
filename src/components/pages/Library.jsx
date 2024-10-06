
// src/components/pages/Library.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileDashboard from '../common/FileDashboard'; // Adjust path as needed
import api from '../../utils/api'; // Adjust path as needed
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Loader from '../common/Loader'; // Import Loader for consistent UI

// Helper functions
const isAudioFile = (type) => type && type.startsWith('audio/');
const isVideoFile = (type) => type && type.startsWith('video/');
const isImageFile = (type) => type && type.startsWith('image/');

const LibraryContainer = styled.div`
  padding: 20px;
`;

const TagContainer = styled.div`
  margin-bottom: 20px;
`;

const TagButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: ${(props) => (props.$active ? '#007bff' : '#f0f0f0')};
  color: ${(props) => (props.$active ? '#fff' : '#333')};
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
`;

function Library({ onPlayAudio }) {
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState(['All']);
  const [activeTag, setActiveTag] = useState('All');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag]);

  const fetchFiles = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await api.get('/file_history', {
        params: { page: pageNum, per_page: 20, tag: activeTag !== 'All' ? activeTag : undefined },
      });

      if (response.data && Array.isArray(response.data.files)) {
        setFiles(pageNum === 1 ? response.data.files : [...(files || []), ...response.data.files]);
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
      setActionMessage('Failed to fetch files.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchFiles(page + 1);
  };

  const audioFiles = (files || []).filter((file) => isAudioFile(file.type));
  const videoFiles = (files || []).filter((file) => isVideoFile(file.type));
  const imageFiles = (files || []).filter((file) => isImageFile(file.type));
  const filteredFiles =
    activeTag === 'All' ? files : (files || []).filter((file) => file.tags && file.tags.includes(activeTag));

  // Updated handleTagFile to allow multiple tags
  const handleTagFile = async (fileId, tagsInput) => {
    try {
      // Split the input tags by commas and standardize them to sentence case
      const tagsArray = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
        .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

      await api.post(`/files/${fileId}/tag`, { tags: tagsArray }); // Ensure backend endpoint accepts multiple tags
      setActionMessage('Tags added successfully.');
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error tagging file:', error);
      setActionMessage('Failed to add tags.');
    }
  };

  // Updated handleRemoveTag to allow removing multiple tags
  const handleRemoveTag = async (fileId, tagsInput) => {
    try {
      const tagsArray = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
        .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

      await api.post(`/files/${fileId}/remove_tag`, { tags: tagsArray }); // Ensure backend endpoint exists for removing tags
      setActionMessage('Tags removed successfully.');
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error removing tags:', error);
      setActionMessage('Failed to remove tags.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!files || files.length === 0) {
    return <p>No files uploaded yet.</p>;
  }

  return (
    <LibraryContainer>
      <h1>Library</h1>
      {actionMessage && <p>{actionMessage}</p>}

      <TagContainer>
        {tags.map((tag) => (
          <TagButton
            key={tag}
            $active={activeTag === tag}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </TagButton>
        ))}
      </TagContainer>

      <Tabs>
        <TabList>
          <Tab>All Files</Tab>
          <Tab>Audio</Tab>
          <Tab>Video</Tab>
          <Tab>Images</Tab>
        </TabList>

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
      </Tabs>

      {loading && <p>Loading more...</p>}
      {!loading && files.length >= 20 && (
        <button onClick={loadMore} aria-label="Load More Files">
          Load More
        </button>
      )}
    </LibraryContainer>
  );
}

export default Library;
