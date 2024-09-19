const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  background-color: #bdc3c7;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px 10px;
  }
`;

const DraggableArea = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-wrap: nowrap; /* Change to nowrap to allow horizontal scrolling */
  overflow-x: auto; /* Enable horizontal scrolling */
  -webkit-overflow-scrolling: touch;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const SortableItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#f0f0f0" : "transparent"};
  border-radius: 4px;
  flex-shrink: 0;
  min-width: 100px; /* Prevent items from collapsing */
  @media (max-width: 768px) {
    min-width: 80px; /* Reduce min-width on small screens */
  }
`;