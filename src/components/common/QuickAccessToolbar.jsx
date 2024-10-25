// // src/components/common/QuickAccessToolbar.jsx
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFile,
//   faChartLine,
//   faUpload,
//   faPlus,
//   faTimes,
//   faGripVertical,
// } from "@fortawesome/free-solid-svg-icons";
// import Button from "./Button";
// import Tooltip from "./Tooltip";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   TouchSensor, // Import TouchSensor
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   useSortable,
//   sortableKeyboardCoordinates,
//   horizontalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// const ToolbarContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   padding: 10px 20px;
//   background-color: #bdc3c7;
//   align-items: center;

//   @media (max-width: 768px) {
//     // padding: 10px 10px;
//     display:none;
//   }
// `;

// const DraggableArea = styled.div`
//   display: flex;
//   align-items: center;
//   flex-grow: 1;
//   flex-wrap: nowrap;
//   overflow-x: auto;
//  -webkit-overflow-scrolling: touch;

//   @media (max-width: 768px) {
//     justify-content: flex-start;
//   }
// `;

// const SortableItemContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 5px;
//   padding: 5px;
//   background-color: ${(props) =>
//     props.isDragging ? "#f0f0f0" : "transparent"};
//   border-radius: 4px;
//   flex-shrink: 0;
//   min-width: 100px;
//   @media(max-width: 768px) {
//     min-width:80px;
//   }
// `;

// const DragHandleStyled = styled.div`
//   cursor: grab;
//   color: #888;
//   margin-right: 8px;
//   &:active {
//     cursor: grabbing;
//   }
//   &:hover {
//     color: #333;
//   }
// `;

// const OverflowMenu = styled.div`
//   position: relative;
// `;

// const OverflowButton = styled(Button)`
// `;

// const OverflowContent = styled.div`
//   position: absolute;
//   right: 0;
//   top: 100%;
//   background-color: #ecf0f1;
//   min-width: 160px;
//   box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
//   border-radius: 4px;
//   display: ${({ $open }) => ($open ? "block" : "none")};
//   z-index: 1000;
// `;

// const OverflowItem = styled.button`
//   color: black;
//   padding: 12px 16px;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   text-align: left;
//   border: none;
//   background: none;
//   cursor: pointer;
//   &:hover {
//     background-color: #ddd;
//   }
// `;

// function SortableItem({ id, item, removeItem }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     zIndex: isDragging ? 2 : 1,
//   };
//   return (
//     <SortableItemContainer ref={setNodeRef} style={style} isDragging={isDragging}>
//       <DragHandleStyled {...attributes} {...listeners}>
//         <FontAwesomeIcon icon={faGripVertical} />
//       </DragHandleStyled>
//       <Tooltip $text={item.label}>
//         <Button
//           variant="secondary"
//           icon={item.icon}
//           onClick={item.action}
//           aria-label={item.label}
//         >
//           {item.label}
//         </Button>
//       </Tooltip>
//       <Button
//         variant="tertiary"
//         icon={faTimes}
//         onClick={() => removeItem(item.id)}
//         aria-label={`Remove ${item.label}`}
//       />
//     </SortableItemContainer>
//   );
// }

// function QuickAccessToolbar() {
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 5,
//       },
//     }),
//     useSensor(TouchSensor, {
//       activationConstraint: {
//         delay: 250,
//         tolerance: 5,
//       },
//     })
//   );
//   const [pinnedItems, setPinnedItems] = useState([]);
//   const [overflowOpen, setOverflowOpen] = useState(false);
//   const overflowRef = useRef(null);
//   const availableItems = [
//     {
//       id: "1",
//       icon: faFile,
//       label: "Recent File",
//       action: () => console.log("Recent File clicked"),
//     },
//     {
//       id: "2",
//       icon: faChartLine,
//       label: "Sentiment Analysis",
//       action: () => console.log("Sentiment Analysis clicked"),
//     },
//     {
//       id: "3",
//       icon: faUpload,
//       label: "Upload New File",
//       action: () => console.log("Upload New File clicked"),
//     },
//   ];

//   useEffect(() => {
//     const savedItems = localStorage.getItem("quickAccess");
//     if (savedItems) {
//       setPinnedItems(JSON.parse(savedItems));
//     } else {
//       setPinnedItems(availableItems.slice(0, 2));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("quickAccess", JSON.stringify(pinnedItems));
//   }, [pinnedItems]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         overflowRef.current &&
//         !overflowRef.current.contains(event.target)
//       ) {
//         setOverflowOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const addItem = (item) => {
//     if (pinnedItems.length < availableItems.length) {
//       setPinnedItems([...pinnedItems, item]);
//     }
//   };

//   const removeItem = (id) => {
//     setPinnedItems(pinnedItems.filter((item) => item.id !== id));
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (over && active.id !== over.id) {
//       const oldIndex = pinnedItems.findIndex((item) => item.id === active.id);
//       const newIndex = pinnedItems.findIndex((item) => item.id === over.id);
//       setPinnedItems((items) => arrayMove(items, oldIndex, newIndex));
//     }
//   };

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <ToolbarContainer>
//         <SortableContext
//           items={pinnedItems.map((item) => item.id)}
//           strategy={horizontalListSortingStrategy}
//         >
//           <DraggableArea>
//             {pinnedItems.map((item) => (
//               <SortableItem
//                 key={item.id}
//                 id={item.id}
//                 item={item}
//                 removeItem={removeItem}
//               />
//             ))}
//           </DraggableArea>
//         </SortableContext>
//         {pinnedItems.length < availableItems.length && (
//           <OverflowMenu ref={overflowRef}>
//             <OverflowButton
//               variant="primary"
//               icon={faPlus}
//               onClick={() => setOverflowOpen(!overflowOpen)}
//               aria-label="More Quick Access Options"
//               aria-expanded={overflowOpen}
//             />
//             <OverflowContent $open={overflowOpen}>
//               {availableItems
//                 .filter(
//                   (item) =>
//                     !pinnedItems.some(
//                       (pinned) => pinned.id === item.id
//                     )
//                 )
//                 .map((item) => (
//                   <OverflowItem
//                     key={item.id}
//                     onClick={() => {
//                       addItem(item);
//                       setOverflowOpen(false);
//                     }}
//                   >
//                     <FontAwesomeIcon
//                       icon={item.icon}
//                       style={{ marginRight: "8px" }}
//                     />
//                     {item.label}
//                   </OverflowItem>
//                 ))}
//             </OverflowContent>
//           </OverflowMenu>
//         )}
//       </ToolbarContainer>
//     </DndContext>
//   );
// }

// export default QuickAccessToolbar;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   HStack,
//   Icon,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuGroup,
//   Tooltip,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import {
//   DndContext,
//   closestCenter,
//   useSensor,
//   useSensors,
//   PointerSensor,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   horizontalListSortingStrategy,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { arrayMove } from "@dnd-kit/sortable";
// import {
//   Camera,
//   BarChart2,
//   Upload,
//   Plus,
//   X,
//   GripVertical,
//   FileText,
//   Settings,
//   History,
// } from "lucide-react";
// import p from "@blueprintjs/icons/lib/esm/generated/16px/paths/blank";
// import key from "@blueprintjs/icons/lib/esm/generated/components/key";
// import label from "@blueprintjs/icons/lib/esm/generated/components/label";
// import { icon } from "@fortawesome/fontawesome-svg-core";
// import { distance } from "framer-motion";
// import {
//   size,
//   slice,
//   filter,
//   findIndex,
//   reduce,
//   some,
//   map,
//   entries,
// } from "lodash";
// import { parse, stringify } from "postcss";
// import { css } from "styled-components";

// // Sortable Item Component
// const SortableItem = ({ id, item, removeItem }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id });

//   const style = {
//     transform: transform
//       ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
//       : undefined,
//     transition,
//     zIndex: isDragging ? 2 : 1,
//   };

//   const bgColor = useColorModeValue("white", "gray.800");
//   const hoverBg = useColorModeValue("gray.50", "gray.700");

//   return (
//     <Box
//       ref={setNodeRef}
//       style={style}
//       bg={isDragging ? hoverBg : bgColor}
//       borderRadius="md"
//       display="flex"
//       alignItems="center"
//       p={1}
//       boxShadow={isDragging ? "md" : "none"}
//       transition="all 0.2s"
//       _hover={{ bg: hoverBg }}
//     >
//       <Tooltip label={item.label} placement="bottom">
//         <HStack spacing={1}>
//           <IconButton
//             {...attributes}
//             {...listeners}
//             icon={<Icon as={GripVertical} />}
//             variant="ghost"
//             size="sm"
//             cursor="grab"
//             aria-label="Drag handle"
//             _active={{ cursor: "grabbing" }}
//           />

//           <IconButton
//             icon={<Icon as={item.icon} />}
//             variant="ghost"
//             size="sm"
//             onClick={item.action}
//             aria-label={item.label}
//           />

//           <IconButton
//             icon={<Icon as={X} />}
//             variant="ghost"
//             size="sm"
//             onClick={() => removeItem(id)}
//             aria-label={`Remove ${item.label}`}
//           />
//         </HStack>
//       </Tooltip>
//     </Box>
//   );
// };

// const QuickAccessToolbar = () => {
//   const [pinnedItems, setPinnedItems] = useState([]);

//   // Available items with categories
//   const availableItems = [
//     {
//       id: "1",
//       icon: Camera,
//       label: "Recent Media",
//       action: () => console.log("Recent Media clicked"),
//       category: "Media",
//     },
//     {
//       id: "2",
//       icon: BarChart2,
//       label: "Analysis Dashboard",
//       action: () => console.log("Analysis Dashboard clicked"),
//       category: "Analysis",
//     },
//     {
//       id: "3",
//       icon: Upload,
//       label: "Upload Media",
//       action: () => console.log("Upload Media clicked"),
//       category: "Media",
//     },
//     {
//       id: "4",
//       icon: FileText,
//       label: "Analytics",
//       action: () => console.log("Analytics clicked"),
//       category: "Analysis",
//     },
//     {
//       id: "5",
//       icon: History,
//       label: "Recent Analysis",
//       action: () => console.log("Recent Analysis clicked"),
//       category: "History",
//     },
//     {
//       id: "6",
//       icon: Settings,
//       label: "Settings",
//       action: () => console.log("Settings clicked"),
//       category: "Settings",
//     },
//   ];

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: { distance: 5 },
//     })
//   );

//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("quickAccess");
//       if (saved) {
//         setPinnedItems(JSON.parse(saved));
//       } else {
//         setPinnedItems(availableItems.slice(0, 3));
//       }
//     } catch (error) {
//       console.error("Error loading saved items:", error);
//       setPinnedItems(availableItems.slice(0, 3));
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       localStorage.setItem("quickAccess", JSON.stringify(pinnedItems));
//     } catch (error) {
//       console.error("Error saving items:", error);
//     }
//   }, [pinnedItems]);

//   const addItem = (item) => {
//     if (pinnedItems.length < availableItems.length) {
//       setPinnedItems((prev) => [...prev, item]);
//     }
//   };

//   const removeItem = (id) => {
//     setPinnedItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       setPinnedItems((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   // Group available items by category
//   const groupedItems = availableItems.reduce((acc, item) => {
//     if (!pinnedItems.some((pinned) => pinned.id === item.id)) {
//       const category = item.category || "Other";
//       if (!acc[category]) acc[category] = [];
//       acc[category].push(item);
//     }
//     return acc;
//   }, {});

//   const bgColor = useColorModeValue("white", "gray.800");
//   const borderColor = useColorModeValue("gray.200", "gray.700");

//   return (
//     <Box
//       bg={bgColor}
//       borderWidth="1px"
//       borderColor={borderColor}
//       borderRadius="lg"
//       p={2}
//       shadow="sm"
//     >
//       <HStack spacing={2}>
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={pinnedItems.map((item) => item.id)}
//             strategy={horizontalListSortingStrategy}
//           >
//             <HStack
//               spacing={1}
//               flex={1}
//               overflowX="auto"
//               css={{
//                 "&::-webkit-scrollbar": { display: "none" },
//                 scrollbarWidth: "none",
//               }}
//             >
//               {pinnedItems.map((item) => (
//                 <SortableItem
//                   key={item.id}
//                   id={item.id}
//                   item={item}
//                   removeItem={removeItem}
//                 />
//               ))}
//             </HStack>
//           </SortableContext>
//         </DndContext>

//         {pinnedItems.length < availableItems.length && (
//           <Menu>
//             <MenuButton
//               as={IconButton}
//               icon={<Icon as={Plus} />}
//               variant="outline"
//               size="sm"
//               aria-label="Add quick access item"
//             />
//             <MenuList>
//               {Object.entries(groupedItems).map(([category, items]) => (
//                 <MenuGroup key={category} title={category}>
//                   {items.map((item) => (
//                     <MenuItem
//                       key={item.id}
//                       icon={<Icon as={item.icon} />}
//                       onClick={() => addItem(item)}
//                     >
//                       {item.label}
//                     </MenuItem>
//                   ))}
//                 </MenuGroup>
//               ))}
//             </MenuList>
//           </Menu>
//         )}
//       </HStack>
//     </Box>
//   );
// };

// export default QuickAccessToolbar;

import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Tooltip,
  useColorModeValue,
  color,
  css,
  filter,
  transition,
} from "@chakra-ui/react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import {
  Camera,
  BarChart2,
  Upload,
  Plus,
  X,
  GripVertical,
  FileText,
  Settings,
  History,
} from "lucide-react";
import p from "@blueprintjs/icons/lib/esm/generated/16px/paths/blank";
import key from "@blueprintjs/icons/lib/esm/generated/components/key";
import label from "@blueprintjs/icons/lib/esm/generated/components/label";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { distance } from "framer-motion";
import { slice, findIndex, reduce, some, map, size, entries } from "lodash";
import { parse, stringify } from "postcss";

// Sortable Item Component
const SortableItem = ({ id, item, removeItem }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    zIndex: isDragging ? 2 : 1,
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      ref={setNodeRef}
      style={style}
      bg={isDragging ? hoverBg : bgColor}
      borderRadius="md"
      display="flex"
      alignItems="center"
      p={1}
      boxShadow={isDragging ? "lg" : "sm"}
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{
        bg: hoverBg,
        boxShadow: "md",
        borderColor: useColorModeValue("gray.300", "gray.500"),
      }}
    >
      <Tooltip label={item.label} placement="bottom">
        <HStack spacing={1}>
          <IconButton
            {...attributes}
            {...listeners}
            icon={<Icon as={GripVertical} />}
            variant="ghost"
            size="sm"
            cursor="grab"
            aria-label="Drag handle"
            _active={{
              cursor: "grabbing",
              bg: buttonHoverBg,
            }}
            _hover={{
              bg: buttonHoverBg,
            }}
          />

          <IconButton
            icon={<Icon as={item.icon} />}
            variant="ghost"
            size="sm"
            onClick={item.action}
            aria-label={item.label}
            _hover={{
              bg: buttonHoverBg,
            }}
          />

          <IconButton
            icon={<Icon as={X} />}
            variant="ghost"
            size="sm"
            onClick={() => removeItem(id)}
            aria-label={`Remove ${item.label}`}
            _hover={{
              bg: buttonHoverBg,
              color: "red.500",
            }}
          />
        </HStack>
      </Tooltip>
    </Box>
  );
};

const QuickAccessToolbar = () => {
  const [pinnedItems, setPinnedItems] = useState([]);

  // Available items with categories
  const availableItems = [
    {
      id: "1",
      icon: Camera,
      label: "Recent Media",
      action: () => console.log("Recent Media clicked"),
      category: "Media",
    },
    {
      id: "2",
      icon: BarChart2,
      label: "Analysis Dashboard",
      action: () => console.log("Analysis Dashboard clicked"),
      category: "Analysis",
    },
    {
      id: "3",
      icon: Upload,
      label: "Upload Media",
      action: () => console.log("Upload Media clicked"),
      category: "Media",
    },
    {
      id: "4",
      icon: FileText,
      label: "Analytics",
      action: () => console.log("Analytics clicked"),
      category: "Analysis",
    },
    {
      id: "5",
      icon: History,
      label: "Recent Analysis",
      action: () => console.log("Recent Analysis clicked"),
      category: "History",
    },
    {
      id: "6",
      icon: Settings,
      label: "Settings",
      action: () => console.log("Settings clicked"),
      category: "Settings",
    },
  ];

  // Initialize sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("quickAccess");
      if (saved) {
        setPinnedItems(JSON.parse(saved));
      } else {
        setPinnedItems(availableItems.slice(0, 3));
      }
    } catch (error) {
      console.error("Error loading saved items:", error);
      setPinnedItems(availableItems.slice(0, 3));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("quickAccess", JSON.stringify(pinnedItems));
    } catch (error) {
      console.error("Error saving items:", error);
    }
  }, [pinnedItems]);

  const addItem = (item) => {
    if (pinnedItems.length < availableItems.length) {
      setPinnedItems((prev) => [...prev, item]);
    }
  };

  const removeItem = (id) => {
    setPinnedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPinnedItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Group available items by category
  const groupedItems = availableItems.reduce((acc, item) => {
    if (!pinnedItems.some((pinned) => pinned.id === item.id)) {
      const category = item.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
    }
    return acc;
  }, {});

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const menuBg = useColorModeValue("white", "gray.700");
  const menuBorderColor = useColorModeValue("gray.200", "gray.600");
  const menuHoverBg = useColorModeValue("gray.50", "gray.600");
  const menuGroupColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={2}
      boxShadow="sm"
      _hover={{
        boxShadow: "md",
        borderColor: useColorModeValue("gray.300", "gray.600"),
      }}
      transition="all 0.2s"
    >
      <HStack spacing={2}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pinnedItems.map((item) => item.id)}
            strategy={horizontalListSortingStrategy}
          >
            <HStack
              spacing={1}
              flex={1}
              overflowX="auto"
              css={{
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
            >
              {pinnedItems.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  removeItem={removeItem}
                />
              ))}
            </HStack>
          </SortableContext>
        </DndContext>

        {pinnedItems.length < availableItems.length && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={Plus} />}
              variant="outline"
              size="sm"
              aria-label="Add quick access item"
              borderColor={borderColor}
              _hover={{
                bg: menuHoverBg,
                borderColor: menuBorderColor,
              }}
            />
            <MenuList
              bg={menuBg}
              borderColor={menuBorderColor}
              boxShadow="lg"
              p={1}
            >
              {Object.entries(groupedItems).map(([category, items]) => (
                <MenuGroup
                  key={category}
                  title={category}
                  color={menuGroupColor}
                  mx={2}
                  mb={2}
                  fontWeight="medium"
                >
                  {items.map((item) => (
                    <MenuItem
                      key={item.id}
                      icon={<Icon as={item.icon} />}
                      onClick={() => addItem(item)}
                      _hover={{
                        bg: menuHoverBg,
                      }}
                      borderRadius="md"
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuGroup>
              ))}
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Box>
  );
};

export default QuickAccessToolbar;
