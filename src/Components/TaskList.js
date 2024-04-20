import { Text, Flex, Divider, Circle } from "@chakra-ui/react";
import { useDrop } from "react-dnd";

import TaskItem from "./TaskItem";


const TaskList = ({ title, itemLists, addItemtoList, handleRemoveTask }) => {


  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item) => addItemtoList(item.uid, title),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
  )


  
  return (
    <Flex
      direction="column"
      flex="3"
      padding="5"
      margin="5"
      gap={5}
      border="solid 2px"
      borderColor={
        title === "ToDo"
          ? "#FFB6C1"
          : title === "InProgress"
          ? "#FFD700"
          : "#008000"
      }
      bg={
        title === "ToDo"
          ? "#FDEBF3"
          : title === "InProgress"
          ? "#FFF4E0"
          : "#DAF0E7"
      }
      width="30%"
    >
      <Flex justifyContent="space-between">
      <Text fontWeight="bold">{title}</Text>
      <Circle
      size={"30px"}
      bg={
        title === "ToDo"
          ? "#FFB6C1"
          : title === "InProgress"
          ? "#FFD700"
          : "#008000"
      }>
        <Text color={"white"} fontWeight={"bold"}>{itemLists.length}</Text>
      </Circle>
      </Flex>
      <Divider orientation="horizontal" />

        <Flex
          direction="column"
          gap={2}
          width={"100%"}
          height={"100%"}
          ref={drop}
          bg={ isOver ? "whitesmoke" : "transparent"}
        >
          {itemLists.map((item) => (
            <TaskItem item={item} handleRemoveTask={handleRemoveTask}></TaskItem>
          ))}
        </Flex>
    </Flex>
  );
};

export default TaskList;
