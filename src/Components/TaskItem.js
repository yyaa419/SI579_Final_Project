import React from "react";
import { Card, Flex, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useDrag } from "react-dnd";


export const TaskItem = ({item, handleRemoveTask}) => {

  // this useDrag function is from the reference, it's used in the task item component
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {uid: item.uid},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))


  return (
    <Card
      size="sm"
      padding="2"
      ref={drag}
      style={{
        // this small effect is from the reference, it's used to show the drag effect
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text>{item.name}</Text>
        <CloseIcon
          onClick={() => handleRemoveTask(item.uid)}
          // I imitate the style in the example to attach the delete icon, but I choose a more common icon
          cursor="pointer"
          color="gray.300"
        ></CloseIcon>
      </Flex>
    </Card>
  );
};

export default TaskItem;
