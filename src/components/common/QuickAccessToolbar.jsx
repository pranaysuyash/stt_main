// src/components/common/QuickAccessToolbar.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faChartLine,
  faUpload,
  faPlus,
  faTimes,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Tooltip from "./Tooltip";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ToolbarContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #bdc3c7;
  align-items: center;
`;

const DraggableArea = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const SortableItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  padding: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#f0f0f0" : "transparent"};
  border-radius: 4px;
`;

const DragHandleStyled = styled.div`
  cursor: grab;
  color: #888;
  margin-right: 8px;
  &:active {
    cursor: grabbing;
  }
  &:hover {
    color: #333;
  }
`;

const OverflowMenu = styled.div`
  position: relative;
`;

const OverflowButton = styled(Button)`
`;

const OverflowContent = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #ecf0f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: ${({ $open }) => ($open ? "block" : "none")};
  z-index: 1000;
`;

const OverflowItem = styled.button`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

function SortableItem({ id, item, removeItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
  };
  return (
    <SortableItemContainer ref={setNodeRef} style={style} isDragging={isDragging}>
      <DragHandleStyled {...attributes} {...listeners}>
        <FontAwesomeIcon icon={faGripVertical} />
      </DragHandleStyled>
      <Tooltip $text={item.label}>
        <Button
          variant="secondary"
          icon={item.icon}
          onClick={item.action}
          aria-label={item.label}
        >
          {item.label}
        </Button>
      </Tooltip>
      <Button
        variant="tertiary"
        icon={faTimes}
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.label}`}
      />
    </SortableItemContainer>
  );
}

function QuickAccessToolbar() {
  const [pinnedItems, setPinnedItems] = useState([]);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowRef = useRef(null);
  const availableItems = [
    {
      id: "1",
      icon: faFile,
      label: "Recent File",
      action: () => console.log("Recent File clicked"),
    },
    {
      id: "2",
      icon: faChartLine,
      label: "Sentiment Analysis",
      action: () => console.log("Sentiment Analysis clicked"),
    },
    {
      id: "3",
      icon: faUpload,
      label: "Upload New File",
      action: () => console.log("Upload New File clicked"),
    },
  ];

  useEffect(() => {
    const savedItems = localStorage.getItem("quickAccess");
    if (savedItems) {
      setPinnedItems(JSON.parse(savedItems));
    } else {
      setPinnedItems(availableItems.slice(0, 2)); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quickAccess", JSON.stringify(pinnedItems));
  }, [pinnedItems]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        overflowRef.current &&
        !overflowRef.current.contains(event.target)
      ) {
        setOverflowOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addItem = (item) => {
    if (pinnedItems.length < availableItems.length) {
      setPinnedItems([...pinnedItems, item]);
    }
  };

  const removeItem = (id) => {
    setPinnedItems(pinnedItems.filter((item) => item.id !== id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, 
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = pinnedItems.findIndex((item) => item.id === active.id);
      const newIndex = pinnedItems.findIndex((item) => item.id === over.id);
      setPinnedItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <ToolbarContainer>
        <SortableContext
          items={pinnedItems.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <DraggableArea>
            {pinnedItems.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                item={item}
                removeItem={removeItem}
              />
            ))}
          </DraggableArea>
        </SortableContext>
        {pinnedItems.length < availableItems.length && (
          <OverflowMenu ref={overflowRef}>
            <OverflowButton
              variant="primary"
              icon={faPlus}
              onClick={() => setOverflowOpen(!overflowOpen)}
              aria-label="More Quick Access Options"
              aria-expanded={overflowOpen}
            />
            <OverflowContent $open={overflowOpen}>
              {availableItems
                .filter(
                  (item) =>
                    !pinnedItems.some(
                      (pinned) => pinned.id === item.id
                    )
                )
                .map((item) => (
                  <OverflowItem
                    key={item.id}
                    onClick={() => {
                      addItem(item);
                      setOverflowOpen(false);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      style={{ marginRight: "8px" }}
                    />
                    {item.label}
                  </OverflowItem>
                ))}
            </OverflowContent>
          </OverflowMenu>
        )}
      </ToolbarContainer>
    </DndContext>
  );
}

export default QuickAccessToolbar;
