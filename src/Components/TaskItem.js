 import React from "react";
 import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Flex } from "@chakra-ui/react";
import "./TaskItem.css";

export const TaskItem = ({title }) => {
  const { attributes,listeners, setNodeRef, transform } = useSortable({
    id: title,
  });


  return (
    <Flex 
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    style={{
      transform: CSS.Translate.toString(transform),
    }}
    className="task"
    >
      {title}
    </Flex>

   
  );
};

export default TaskItem;