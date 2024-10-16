
// src/components/common/Metadata.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MetadataContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
`;

const MetadataContent = styled.div`
  padding: 15px;
`;

const MetadataItem = styled.div`
  margin-bottom: 10px;
  font-size: 0.95rem;
`;

const MetadataLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const MetadataValue = styled.span`
  word-break: break-word;
`;

const ViewDetailsLink = styled(Link)`
  display: inline-block;
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Metadata({ metadata, fileId }) {
  const formatValue = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  };

  const hasMetadata = metadata && Object.keys(metadata).length > 0;

  return (
    <MetadataContainer>
      <MetadataContent>
        {hasMetadata ? (
          <>
            {Object.entries(metadata).map(([key, value]) => (
              <MetadataItem key={key}>
                <MetadataLabel>{key}:</MetadataLabel>
                <MetadataValue>{formatValue(value)}</MetadataValue>
              </MetadataItem>
            ))}
            <ViewDetailsLink to={`/metadata/${fileId}`}>
              View Full Metadata <FontAwesomeIcon icon={faExternalLinkAlt} />
            </ViewDetailsLink>
          </>
        ) : (
          <MetadataItem>No metadata available for this file.</MetadataItem>
        )}
      </MetadataContent>
    </MetadataContainer>
  );
}

Metadata.propTypes = {
  metadata: PropTypes.object,
  fileId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Metadata.defaultProps = {
  metadata: {},
};

export default Metadata;
