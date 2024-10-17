// // // cypress/component/FileCard.spec.jsx

// // import React from 'react';
// // import { mount } from '@cypress/react';
// // import { MemoryRouter } from 'react-router-dom';
// // import FileCard from '../../src/components/common/FileCard';
// // import { ChakraProvider } from '@chakra-ui/react';

// // describe('FileCard Component Tests', () => {
// //   const mockFile = {
// //     id: '1',
// //     filename: 'test-file.mp3',
// //     thumbnailUrl: 'https://via.placeholder.com/150',
// //     size: 1048576, // 1 MB in bytes
// //     type: 'audio/mpeg',
// //     tags: ['Processed', 'Analyzed'],
// //     processing_status: 'completed',
// //   };

// //   const mockOnPlayAudio = cy.stub().as('onPlayAudio');
// //   const mockHandleTagClick = cy.stub().as('handleTagClick');
// //   const mockHandleTagSubmit = cy.stub().as('handleTagSubmit');
// //   const mockHandleRemoveTagClick = cy.stub().as('handleRemoveTagClick');
// //   const mockHandleMenuAction = cy.stub().as('handleMenuAction');

// //   beforeEach(() => {
// //     mount(
// //       <ChakraProvider>
// //         <MemoryRouter>
// //           <FileCard
// //             file={mockFile}
// //             tagInput=""
// //             setTagInput={() => {}}
// //             fileToTag={null}
// //             handleTagClick={mockHandleTagClick}
// //             handleTagSubmit={mockHandleTagSubmit}
// //             handleRemoveTagClick={mockHandleRemoveTagClick}
// //             handleMenuAction={mockHandleMenuAction}
// //             onPlayAudio={mockOnPlayAudio}
// //           />
// //         </MemoryRouter>
// //       </ChakraProvider>
// //     );
// //   });

// //   it('renders file details correctly', () => {
// //     cy.get('img').should('have.attr', 'src', mockFile.thumbnailUrl);
// //     cy.contains(mockFile.filename).should('be.visible');
// //     cy.contains('1.00 MB').should('be.visible');
// //     cy.contains('Processed').should('be.visible');
// //     cy.contains('Analyzed').should('be.visible');
// //   });

// //   it('calls onPlayAudio when Play button is clicked', () => {
// //     cy.get('button[aria-label="Play test-file.mp3"]').click();
// //     cy.get('@onPlayAudio').should('have.been.calledOnceWith', mockFile.id);
// //   });

// //   it('calls handleTagClick when Add Tag button is clicked', () => {
// //     cy.get('button[aria-label="Add tag to test-file.mp3"]').click();
// //     cy.get('@handleTagClick').should('have.been.calledOnceWith', mockFile, Cypress.sinon.match.any);
// //   });

// //   it('calls handleRemoveTagClick when a tag remove button is clicked', () => {
// //     cy.get('button[aria-label="Remove tag Processed"]').click();
// //     cy.get('@handleRemoveTagClick').should('have.been.calledOnceWith', mockFile.id, 'Processed', Cypress.sinon.match.any);
// //   });

// //   it('opens menu and calls handleMenuAction when a menu item is clicked', () => {
// //     // Open the menu
// //     cy.get('button[aria-label="More actions"]').click();

// //     // Click on 'Download'
// //     cy.contains('Download').click();
// //     cy.get('@handleMenuAction').should('have.been.calledOnceWith', 'download', mockFile, Cypress.sinon.match.any);
// //   });
// // });


// import React from 'react';
// import { mount } from 'cypress/react';  // Updated import
// import { MemoryRouter } from 'react-router-dom';
// import FileCard from '../../src/components/common/FileCard';
// import { ChakraProvider } from '@chakra-ui/react';

// describe('FileCard Component Tests', () => {
//   const mockFile = {
//     id: '1',
//     filename: 'test-file.mp3',
//     thumbnailUrl: 'https://via.placeholder.com/150',
//     size: 1048576, // 1 MB in bytes
//     type: 'audio/mpeg',
//     tags: ['Processed', 'Analyzed'],
//     processing_status: 'completed',
//   };

//   const mockOnPlayAudio = cy.stub().as('onPlayAudio');
//   const mockHandleTagClick = cy.stub().as('handleTagClick');
//   const mockHandleTagSubmit = cy.stub().as('handleTagSubmit');
//   const mockHandleRemoveTagClick = cy.stub().as('handleRemoveTagClick');
//   const mockHandleMenuAction = cy.stub().as('handleMenuAction');

//   beforeEach(() => {
//     mount(
//       <ChakraProvider>
//         <MemoryRouter>
//           <FileCard
//             file={mockFile}
//             tagInput=""
//             setTagInput={() => {}}
//             fileToTag={null}
//             handleTagClick={mockHandleTagClick}
//             handleTagSubmit={mockHandleTagSubmit}
//             handleRemoveTagClick={mockHandleRemoveTagClick}
//             handleMenuAction={mockHandleMenuAction}
//             onPlayAudio={mockOnPlayAudio}
//           />
//         </MemoryRouter>
//       </ChakraProvider>
//     );
//   });

//   it('renders file details correctly', () => {
//     cy.get('img').should('have.attr', 'src', mockFile.thumbnailUrl);
//     cy.contains(mockFile.filename).should('be.visible');
//     cy.contains('1.00 MB').should('be.visible');
//     cy.contains('Processed').should('be.visible');
//     cy.contains('Analyzed').should('be.visible');
//   });

//   it('calls onPlayAudio when Play button is clicked', () => {
//     cy.get('button[aria-label="Play test-file.mp3"]').click();
//     cy.get('@onPlayAudio').should('have.been.calledOnceWith', mockFile.id);
//   });

//   it('calls handleTagClick when Add Tag button is clicked', () => {
//     cy.get('button[aria-label="Add tag to test-file.mp3"]').click();
//     cy.get('@handleTagClick').should('have.been.calledOnceWith', mockFile, Cypress.sinon.match.any);
//   });

//   it('calls handleRemoveTagClick when a tag remove button is clicked', () => {
//     cy.get('button[aria-label="Remove tag Processed"]').click();
//     cy.get('@handleRemoveTagClick').should('have.been.calledOnceWith', mockFile.id, 'Processed', Cypress.sinon.match.any);
//   });

//   it('opens menu and calls handleMenuAction when a menu item is clicked', () => {
//     // Open the menu
//     cy.get('button[aria-label="More actions"]').click();

//     // Click on 'Download'
//     cy.contains('Download').click();
//     cy.get('@handleMenuAction').should('have.been.calledOnceWith', 'download', mockFile, Cypress.sinon.match.any);
//   });
// });


import React from 'react';
import { mount } from '@cypress/react18';  // Updated import
import { MemoryRouter } from 'react-router-dom';
import FileCard from '../../src/components/common/FileCard';
import { ChakraProvider } from '@chakra-ui/react';

describe('FileCard Component Tests', () => {
  let mockFile;
  let mockOnPlayAudio;
  let mockHandleTagClick;
  let mockHandleTagSubmit;
  let mockHandleRemoveTagClick;
  let mockHandleMenuAction;

  beforeEach(() => {
    // Initialize stubs inside the beforeEach block
    mockOnPlayAudio = cy.stub().as('onPlayAudio');
    mockHandleTagClick = cy.stub().as('handleTagClick');
    mockHandleTagSubmit = cy.stub().as('handleTagSubmit');
    mockHandleRemoveTagClick = cy.stub().as('handleRemoveTagClick');
    mockHandleMenuAction = cy.stub().as('handleMenuAction');

    // Define the mock file inside beforeEach
    mockFile = {
      id: '1',
      filename: 'test-file.mp3',
      thumbnailUrl: 'https://via.placeholder.com/150',
      size: 1048576, // 1 MB in bytes
      type: 'audio/mpeg',
      tags: ['Processed', 'Analyzed'],
      processing_status: 'completed',
    };

    // Mount the component with stubs and mock data before each test
    mount(
      <ChakraProvider>
        <MemoryRouter>
          <FileCard
            file={mockFile}
            tagInput=""
            setTagInput={() => {}}  // Empty function for tag input
            fileToTag={null}
            handleTagClick={mockHandleTagClick}
            handleTagSubmit={mockHandleTagSubmit}
            handleRemoveTagClick={mockHandleRemoveTagClick}
            handleMenuAction={mockHandleMenuAction}
            onPlayAudio={mockOnPlayAudio}
          />
        </MemoryRouter>
      </ChakraProvider>
    );
  });

  it('renders file details correctly', () => {
    cy.get('img').should('have.attr', 'src', mockFile.thumbnailUrl);
    cy.contains(mockFile.filename).should('be.visible');
    cy.contains('1.00 MB').should('be.visible');
    cy.contains('Processed').should('be.visible');
    cy.contains('Analyzed').should('be.visible');
  });

  it('calls onPlayAudio when Play button is clicked', () => {
    cy.get('button[aria-label="Play test-file.mp3"]').click();
    cy.get('@onPlayAudio').should('have.been.calledOnceWith', mockFile.id);
  });

  it('calls handleTagClick when Add Tag button is clicked', () => {
    cy.get('button[aria-label="Add tag to test-file.mp3"]').click();
    cy.get('@handleTagClick').should('have.been.calledOnceWith', mockFile, Cypress.sinon.match.any);
  });

  it('calls handleRemoveTagClick when a tag remove button is clicked', () => {
    cy.get('button[aria-label="Remove tag Processed"]').click();
    cy.get('@handleRemoveTagClick').should('have.been.calledOnceWith', mockFile.id, 'Processed', Cypress.sinon.match.any);
  });

  it('opens menu and calls handleMenuAction when a menu item is clicked', () => {
    // Open the menu
    cy.get('button[aria-label="More actions"]').click();

    // Click on 'Download'
    cy.contains('Download').click();
    cy.get('@handleMenuAction').should('have.been.calledOnceWith', 'download', mockFile, Cypress.sinon.match.any);
  });
});
