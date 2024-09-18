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
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Tooltip from "./Tooltip";
import PropTypes from "prop-types";

// Styled Components
const ToolbarContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #bdc3c7;
  align-items: center;
  /* Removed overflow-x: auto to prevent clipping */
  position: relative; /* Added for proper positioning of OverflowContent */
`;

const QuickAccessItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  gap: 8px; /* Added gap for spacing between buttons */
`;

const OverflowMenu = styled.div`
  position: relative;
`;

const OverflowButtonStyled = styled(Button)`
  padding: 5px 10px;
`;

const OverflowContent = styled.div`
  position: absolute;
  right: 0;
  top: 110%; /* Positioned slightly below the button */
  background-color: #ecf0f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transform: translateY(${({ $open }) => ($open ? "0" : "-10px")});
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
  z-index: 1000; /* Ensure it appears above other elements */
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

// Available Items with Unique IDs
const availableItems = [
  {
    id: 1,
    icon: faFile,
    label: "Recent File",
    action: () => console.log("Recent File clicked"),
  },
  {
    id: 2,
    icon: faChartLine,
    label: "Sentiment Analysis",
    action: () => console.log("Sentiment Analysis clicked"),
  },
  {
    id: 3,
    icon: faUpload,
    label: "Upload New File",
    action: () => console.log("Upload New File clicked"),
  },
];

// Component
function QuickAccessToolbar() {
  const [pinnedItems, setPinnedItems] = useState([]);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowRef = useRef(null);

  // Load pinned items from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("quickAccess");
      if (savedItems) {
        setPinnedItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error("Failed to load pinned items:", error);
    }
  }, []);

  // Save pinned items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("quickAccess", JSON.stringify(pinnedItems));
    } catch (error) {
      console.error("Failed to save pinned items:", error);
    }
  }, [pinnedItems]);

  // Close overflow menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (overflowRef.current && !overflowRef.current.contains(event.target)) {
        setOverflowOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addItem = (item) => {
    if (pinnedItems.length < availableItems.length) {
      setPinnedItems([...pinnedItems, item]);
    }
  };

  const removeItem = (id) => {
    setPinnedItems(pinnedItems.filter((item) => item.id !== id));
  };

  const toggleOverflow = () => {
    setOverflowOpen(!overflowOpen);
  };

  return (
    <ToolbarContainer>
      {pinnedItems.map((item) => (
        <QuickAccessItem key={item.id}>
          <Tooltip $text={item.label}>
            <Button
              variant="secondary"
              icon={item.icon}
              onClick={() => {
                console.log(`${item.label} clicked`);
                item.action();
              }}
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
            /* Removed children to prevent duplicate icons */
          />
        </QuickAccessItem>
      ))}
      {pinnedItems.length < availableItems.length && (
        <OverflowMenu ref={overflowRef}>
          <Tooltip $text="Add Quick Access">
            <OverflowButtonStyled
              variant="primary"
              icon={faPlus}
              onClick={toggleOverflow}
              aria-label="More Quick Access Options"
              aria-expanded={overflowOpen}
            />
          </Tooltip>
          <OverflowContent $open={overflowOpen}>
            {availableItems
              .filter(
                (item) =>
                  !pinnedItems.some((pinned) => pinned.id === item.id)
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
  );
}

QuickAccessToolbar.propTypes = {};

export default QuickAccessToolbar;
