import React, { useState } from "react";

import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Flex } from "@chakra-ui/react";

import TaskList from "./TaskList";
import AddTask from "./AddTask";

const TaskBoard = () => {
  const [itemLists, setItemLists] = useState({
    ToDo: ["can", "thing", "here"],
    InProgress: ["which", "some"],
    Done: ["that", "rer"],
  });


  const addTask = (type, title) => {
    console.log("addTask", title, type);
    if (type === "ToDo") {
      console.log("addTask", title, type);
      setItemLists({ ...itemLists, ToDo: [...itemLists.ToDo, title] });
    }
    if (type === "InProgress") {
      setItemLists({
        ...itemLists,
        InProgress: [...itemLists.InProgress, title],
      });
    }
    if (type === "Done") {
      setItemLists({ ...itemLists, Done: [...itemLists.Done, title] });
    }
  };

  const deleteTask = (title) => {
    console.log("deleteTask", title);
    setItemLists((itemLists) => {
      const temp = { ...itemLists };
      temp.ToDo = temp.ToDo.filter((item) => item !== title);
      temp.InProgress = temp.InProgress.filter((item) => item !== title);
      temp.Done = temp.Done.filter((item) => item !== title);
      return temp;
    });
  };

  const handleDragEnd = (e) => {
    //check whether item is dragged into unknown area
    if (!e.over || !e.active.data.current || !e.over.data.current) return;

    //check whether item is dragged into the same area
    if (e.active.id === e.over.id) return;

    //check whether item is dragged into another container
    if (
      e.active.data.current.sortable.containerId !==
      e.over.data.current.sortable.containerId
    ) {
      return;
    }

    const containerName = e.active.data?.current.sortable.containerId;
    setItemLists((itemLists) => {
      const temp = { ...itemLists };
      if (!e.over) return temp;
      const oldIndex = temp[containerName].indexOf(e.active.id.toString());
      const newIndex = temp[containerName].indexOf(e.over.id.toString());
      temp[containerName] = arrayMove(temp[containerName], oldIndex, newIndex);
      return temp;
    });
  };

  const handleDragOver = (e) => {
    if (!e.over) return;

    const oldContainerName = e.active.data.current?.sortable?.containerId;
    const newContainerName = e.over.data.current?.sortable?.containerId;

    if (!oldContainerName) return;

    setItemLists((itemLists) => {
      const temp = { ...itemLists };

      //if there's no target container, directly add the item into drappable zone
      if (!newContainerName) {
        //there should be ! before id
        if (itemLists[e.over.id].includes(e.active.id.toString())) {
          return temp;
        }

        //remove the item from the old container
        temp[oldContainerName] = temp[oldContainerName].filter(
          (item) => item !== e.active.id.toString()
        );

        temp[e.over.id].push(e.active.id.toString());
        return temp;
      }

      //if the newcontainer is the same as the old container, reoder the item
      if (oldContainerName === newContainerName) {
        const oldIndex = temp[oldContainerName].indexOf(e.active.id.toString());
        const newIndex = temp[oldContainerName].indexOf(e.over.id.toString());
        temp[oldContainerName] = arrayMove(
          temp[oldContainerName],
          oldIndex,
          newIndex
        );
        return temp;
      } else {
        //if the new container is different from the old container, move the item
        //remove the item from the old container
        temp[oldContainerName] = temp[oldContainerName].filter(
          (item) => item !== e.active.id.toString()
        );

        //add the item to the new container
        const newIndex = temp[newContainerName].indexOf(e.over.id.toString());
        temp[newContainerName].splice(newIndex, 0, e.active.id.toString());
        return temp;
      }
    });
  };

  return (
    <DndContext 
    onDragEnd={handleDragEnd} 
    onDragOver={handleDragOver}>
      <AddTask addTask={addTask}></AddTask>
      <Flex flex="3">
        <TaskList title="ToDo" tasks={itemLists.ToDo}></TaskList>
        <TaskList title="InProgress" tasks={itemLists.InProgress}></TaskList>
        <TaskList
          title="Done"
          tasks={itemLists.Done}
          onDelete={deleteTask}
        ></TaskList>
      </Flex>
    </DndContext>
  );
};

export default TaskBoard;
